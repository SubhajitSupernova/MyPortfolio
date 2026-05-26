import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initializeApp } from "firebase/app";
import emailjs from "@emailjs/browser";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

// ================= FIREBASE CONFIGURATION =================
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: OTP Verification, 3: Chat Room
  
  // Form States
  const [formData, setFormData] = useState({
    hrName: "",
    companyName: "",
    companyEmail: "",
    position: ""
  });
  
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Check for an existing verified chat session when the page loads
  useEffect(() => {
    const savedRoomId = localStorage.getItem("subhajit_chat_room_id");
    const savedFormData = localStorage.getItem("subhajit_chat_form_data");
    if (savedRoomId && savedFormData) {
      setRoomId(savedRoomId);
      setFormData(JSON.parse(savedFormData));
      setStep(3); // Jump straight to active chat room window
    }
  }, []);

  // Auto-scroll chat window to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Listen to live Firebase chat thread when room is established
  useEffect(() => {
    if (!roomId) return;

    const messagesRef = collection(db, "chat_rooms", roomId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgList);
    });

    return () => unsubscribe();
  }, [roomId]);

  // Live EmailJS dispatch execution
  const sendOtpEmail = async (email, otpCode) => {
    const templateParams = {
      hrName: formData.hrName,
      companyName: formData.companyName,
      position: formData.position,
      to_email: email,
      otpCode: otpCode,
    };

    try {
      await emailjs.send(
        "YOUR_EMAILJS_SERVICE_ID",  // Replace with your EmailJS Service ID
        "YOUR_EMAILJS_TEMPLATE_ID", // Replace with your EmailJS Template ID
        templateParams,
        "YOUR_EMAILJS_PUBLIC_KEY"   // Replace with your EmailJS Public Key
      );
      console.log("OTP code dispatched to inbox successfully.");
    } catch (error) {
      console.error("EmailJS failed to deliver OTP token:", error);
      alert("Failed to send verification token. Please verify network configuration.");
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyEmail.trim().includes("@")) return alert("Please enter a valid email");

    // Generate secure clean 6-digit random code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    
    await sendOtpEmail(formData.companyEmail, otp);
    setStep(2);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (userOtp.trim() !== generatedOtp) {
      return alert("Invalid security token code. Please try again.");
    }

    try {
      // 1. Provisions new secure conversation document inside Firestore
      const roomRef = await addDoc(collection(db, "chat_rooms"), {
        hrName: formData.hrName,
        companyName: formData.companyName,
        companyEmail: formData.companyEmail,
        targetPosition: formData.position,
        createdAt: serverTimestamp()
      });

      // Cache identification credentials locally so layout survives refreshes
      localStorage.setItem("subhajit_chat_room_id", roomRef.id);
      localStorage.setItem("subhajit_chat_form_data", JSON.stringify(formData));
      setRoomId(roomRef.id);
      
      // 2. Insert initial dynamic system greeting text
      await addDoc(collection(db, "chat_rooms", roomRef.id, "messages"), {
        sender: "admin",
        text: `Hello ${formData.hrName}! Thanks for verification. I've logged your profile for the ${formData.position} role at ${formData.companyName}. How can I assist you today?`,
        timestamp: serverTimestamp()
      });

      setStep(3);
    } catch (err) {
      console.error("Error creating secure chat matrix: ", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !roomId) return;

    const typedText = inputMessage.trim();
    setInputMessage("");

    await addDoc(collection(db, "chat_rooms", roomId, "messages"), {
      sender: "user",
      text: typedText,
      timestamp: serverTimestamp()
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-white">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            className="w-[360px] h-[500px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header section banner */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">💬</span>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Direct Messenger</h3>
                  <p className="text-[10px] text-blue-200 uppercase tracking-widest">Connect with Subhajit</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors text-sm">✕</button>
            </div>

            {/* ================= STEP 1: CONTACT DATA GATHERING ================= */}
            {step === 1 && (
              <form onSubmit={handleDetailsSubmit} className="flex-1 p-5 flex flex-col gap-3 justify-center">
                <p className="text-xs text-gray-400 mb-2">Verify your business details to initialize a live dedicated channel with Subhajit.</p>
                <input 
                  required type="text" placeholder="Your Name / HR Representative"
                  value={formData.hrName} onChange={e => setFormData({...formData, hrName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                />
                <input 
                  required type="text" placeholder="Company Name"
                  value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                />
                <input 
                  required type="email" placeholder="Official Business Email"
                  value={formData.companyEmail} onChange={e => setFormData({...formData, companyEmail: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                />
                <input 
                  required type="text" placeholder="Target Hiring Position (e.g. Android)"
                  value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400"
                />
                <button type="submit" className="mt-2 w-full py-2.5 bg-blue-600 hover:bg-blue-500 font-bold text-sm rounded-xl transition-colors shadow-lg">
                  Send OTP Token
                </button>
              </form>
            )}

            {/* ================= STEP 2: DYNAMIC SECURITY TOKEN AUTH ================= */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="flex-1 p-5 flex flex-col gap-4 justify-center text-center">
                <div>
                  <span className="text-3xl block mb-2">🔑</span>
                  <h4 className="font-bold text-base">Verify your Identity</h4>
                  <p className="text-xs text-gray-400 mt-1">We sent a free pass code to <br/><span className="text-blue-400 font-medium">{formData.companyEmail}</span></p>
                </div>
                <input 
                  required type="text" maxLength={6} placeholder="Enter 6-digit verification code"
                  value={userOtp} onChange={e => setUserOtp(e.target.value)}
                  className="w-full text-center tracking-widest font-mono text-lg bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-purple-400"
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold rounded-xl transition-colors">
                    Back
                  </button>
                  <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-xs font-bold rounded-xl transition-all shadow-md">
                    Verify & Connect
                  </button>
                </div>
              </form>
            )}

            {/* ================= STEP 3: REALTIME LIVE CHAT CHANNEL ================= */}
            {step === 3 && (
              <div className="flex-1 flex flex-col overflow-hidden bg-black/20">
                {/* Scrolling message feed box */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-white/10 border border-white/10 text-gray-200 rounded-tl-none"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Form Message entry tray bar */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2 bg-slate-900/90">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-blue-400/50"
                  />
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors shrink-0">
                    Send
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= ELEVATED GLOWING FLOATING TRIGGER BUTTON ================= */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-[0_4px_20px_rgba(59,130,246,0.5)] border border-white/20 relative group overflow-hidden"
      >
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
        <motion.span
          animate={isOpen ? { rotate: 90 } : { rotate: [0, -10, 10, 0] }}
          transition={isOpen ? { duration: 0.2 } : { duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {isOpen ? "✕" : "💬"}
        </motion.span>
      </motion.button>
    </div>
  );
}