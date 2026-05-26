
// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const RESUME_MAP = {
//   android: { file: "/resumes/resume-android.pdf", label: "Android Developer" },
//   flutter: { file: "/resumes/resume-flutter.pdf", label: "Flutter Developer" },
//   backend: { file: "/resumes/resume-backend.pdf", label: "Java Backend Engineer" },
//   react: { file: "/resumes/resume-react.pdf", label: "Frontend / React Developer" },
//   fullstack: { file: "/resumes/resume-fullstack.pdf", label: "Full Stack Developer" },
//   general: { file: "/resumes/resume-general.pdf", label: "Software Engineer" },
// };

// const SYSTEM_PROMPT = `You are a friendly AI assistant on Subhajit Bardhan's portfolio website.
// Your ONLY job is to figure out what role the visitor is hiring for, then respond with a JSON object.
// Subhajit's available resumes:

// android   → Android Developer (Java, XML, Android SDK)
// flutter   → Flutter Developer (Dart, cross-platform iOS & Android)
// backend   → Java Backend Engineer (Spring Boot, REST APIs)
// react     → Frontend Developer (React, Tailwind, JavaScript)
// fullstack → Full Stack Developer (React + Spring Boot)
// general   → General Software Engineer (broad skills)

// Rules:
// Greet the user warmly and ask what role they are hiring for. Keep it short and friendly.
// Once you know the role, respond ONLY with this exact JSON (no extra text):
// {"role": "android", "message": "Great! Downloading Subhajit's Android resume for you now..."}
// If unsure, ask one clarifying question.
// Match keywords: "mobile"/"android"→android, "flutter"/"cross-platform"→flutter,
// "backend"/"java"/"spring"/"api"→backend, "frontend"/"react"/"ui"→react,
// "fullstack"/"full stack"/"full-stack"→fullstack, anything else→general.
// Never discuss anything outside resume/hiring. Stay focused.`;

// // ⚠️ IMPORTANT: Move this to your .env file before deploying!
// const GROQ_API_KEY = "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";

// export default function ResumeAssistant({ onClose }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [downloading, setDownloading] = useState(null);
//   const bottomRef = useRef(null);
//   const hasStarted = useRef(false); // ✅ prevents multiple calls

//   // ✅ Only fires ONCE when panel opens
//   useEffect(() => {
//     if (hasStarted.current) return;
//     hasStarted.current = true;
//     setTimeout(() => sendToAI([], true), 300);
//   }, []);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   const triggerDownload = (roleKey) => {
//     const resume = RESUME_MAP[roleKey] || RESUME_MAP.general;
//     setDownloading(resume.label);
//     const link = document.createElement("a");
//     link.href = resume.file;
//     link.download = `Subhajit_Bardhan_${resume.label.replace(/ /g, "_")}_Resume.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const sendToAI = async (history, isFirstMessage = false) => {
//     setLoading(true);

//     // ✅ Always start the background history with a user message so Groq doesn't crash
//     let formattedMessages = [
//       { role: "system", content: SYSTEM_PROMPT },
//       { role: "user", content: "Start the conversation." } 
//     ];

//     // ✅ If it's not the first message, append the rest of the visible chat history
//     if (!isFirstMessage) {
//       const historyMessages = history.map((m) => ({
//         role: m.from === "user" ? "user" : "assistant",
//         content: m.text,
//       }));
//       formattedMessages = [...formattedMessages, ...historyMessages];
//     }

//     try {
//       const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${GROQ_API_KEY}`
//         },
//         body: JSON.stringify({
//           model: "llama-3.1-8b-instant", // Using Groq's most stable fast model
//           messages: formattedMessages,
//           temperature: 0.2,
//         }),
//       });

//       const data = await res.json();

//       // ✅ Catch API Errors properly (e.g., Invalid API Key, Bad Request)
//       if (!res.ok) {
//         console.error("Groq API Error:", data);
//         setMessages((prev) => [
//           ...prev,
//           { from: "ai", text: `API Error: ${data.error?.message || "Check the console for details."}` },
//         ]);
//         setLoading(false);
//         return;
//       }

//       const raw = data.choices?.[0]?.message?.content || "";

//       // ✅ Fallback if empty response
//       if (!raw) {
//         setMessages((prev) => [
//           ...prev,
//           { from: "ai", text: "I'm having trouble thinking right now. Please try again!" },
//         ]);
//         setLoading(false);
//         return;
//       }

//       // ✅ Check if AI returned a JSON role decision
//       const jsonMatch = raw.match(/{[\s\S]*}/);
//       if (jsonMatch) {
//         try {
//           const parsed = JSON.parse(jsonMatch[0]);
//           if (parsed.role) {
//             const aiMsg = {
//               from: "ai",
//               text: parsed.message || "Downloading your resume now...",
//             };
//             setMessages((prev) => [...prev, aiMsg]);
//             setTimeout(() => triggerDownload(parsed.role), 800);
//             setLoading(false);
//             return;
//           }
//         } catch (err) {
//           console.warn("Failed to parse JSON snippet", err);
//         }
//       }

//       // ✅ Normal conversational reply
//       const aiMsg = { from: "ai", text: raw };
//       setMessages((prev) => (isFirstMessage ? [aiMsg] : [...prev, aiMsg]));

//     } catch (e) {
//       console.error("Fetch error:", e);
//       setMessages((prev) => [
//         ...prev,
//         { from: "ai", text: "Oops! Network error. Please try again in a moment." },
//       ]);
//     }
//     setLoading(false);
//   };

//   const handleSend = async () => {
//     if (!input.trim() || loading) return;
//     const userMsg = { from: "user", text: input.trim() };
//     const updated = [...messages, userMsg];
//     setMessages(updated);
//     setInput("");
//     await sendToAI(updated);
//   };

//   const handleKey = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className="fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col z-50"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900">
//         <div className="flex items-center gap-3">
//           <motion.div
//             animate={{ rotate: [0, -10, 10, -10, 0] }}
//             transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//             className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-yellow-400 to-blue-500 flex items-center justify-center text-lg shadow-lg"
//           >
//             🧞
//           </motion.div>
//           <div>
//             <p className="text-white font-semibold text-sm">Resume Genie</p>
//             <p className="text-green-400 text-xs flex items-center gap-1">
//               <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
//               Ready to help
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-white transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
//         <AnimatePresence initial={false}>
//           {messages.map((msg, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
//             >
//               {msg.from === "ai" && (
//                 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 flex items-center justify-center text-xs mr-2 mt-1 shrink-0">
//                   🧞
//                 </div>
//               )}
//               <div
//                 className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
//                   msg.from === "user"
//                     ? "bg-blue-600 text-white rounded-br-sm"
//                     : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-sm"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </motion.div>
//           ))}

//           {/* Typing indicator */}
//           {loading && (
//             <motion.div
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex justify-start items-center gap-2"
//             >
//               <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 flex items-center justify-center text-xs shrink-0">
//                 🧞
//               </div>
//               <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
//                 {[0, 1, 2].map((i) => (
//                   <motion.span
//                     key={i}
//                     className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
//                     animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
//                     transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           )}

//           {/* Download confirmation */}
//           {downloading && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="flex justify-center"
//             >
//               <div className="bg-green-500/15 border border-green-500/30 text-green-400 text-xs px-4 py-2 rounded-full text-center">
//                 ✅ Downloading: {downloading} Resume
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <div ref={bottomRef} />
//       </div>

//       {/* Input */}
//       <div className="px-4 py-3 border-t border-white/10 flex gap-2 bg-slate-900">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKey}
//           placeholder="e.g. Android developer..."
//           disabled={loading || !!downloading}
//           className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-400/50 disabled:opacity-40"
//         />
//         <button
//           onClick={handleSend}
//           disabled={!input.trim() || loading || !!downloading}
//           className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-40 text-white rounded-xl text-sm font-medium transition-opacity"
//         >
//           Send
//         </button>
//       </div>
//     </motion.div>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RESUME_MAP = {
  android: { file: "/resumes/resume-android.pdf", label: "Android Developer" },
  flutter: { file: "/resumes/resume-flutter.pdf", label: "Flutter Developer" },
  backend: { file: "/resumes/resume-backend.pdf", label: "Java Backend Engineer" },
  react: { file: "/resumes/resume-react.pdf", label: "Frontend / React Developer" },
  fullstack: { file: "/resumes/resume-fullstack.pdf", label: "Full Stack Developer" },
  general: { file: "/resumes/resume-general.pdf", label: "Software Engineer" },
};

// Helper function to calculate total experience dynamically
const calculateTotalExperience = () => {
  const startDivergent = new Date("2025-01-11");
  const endDivergent = new Date("2025-08-31"); // Left in August
  const startNevaeh = new Date("2025-09-01");   // Joined in September
  const today = new Date();

  const divergentTime = endDivergent.getTime() - startDivergent.getTime();
  const nevaehTime = today.getTime() - startNevaeh.getTime();

  // Average milliseconds in a month (30.44 days)
  const msInMonth = 1000 * 60 * 60 * 24 * 30.4375;
  const totalMonths = Math.round((divergentTime + nevaehTime) / msInMonth);

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} and ${months} month${months !== 1 ? "s" : ""}`;
  }
  return `${months} months`;
};

const generateSystemPrompt = (expString) => `You are a friendly AI assistant on Subhajit Bardhan's portfolio website.
Your ONLY job is to figure out what role the visitor is hiring for, then respond with a JSON object.

Subhajit currently has a total of ${expString} of professional software development experience. 
His career timeline consists of:
1. Android Developer Intern at Divergent (Jan 11, 2025 - August 2025)
2. Software Engineer at Nevaeh Technology Private Limited (September 2025 - Present)

Subhajit's available resumes:
android   → Android Developer (Java, XML, Android SDK)
flutter   → Flutter Developer (Dart, cross-platform iOS & Android)
backend   → Java Backend Engineer (Spring Boot, REST APIs)
react     → Frontend Developer (React, Tailwind, JavaScript)
fullstack → Full Stack Developer (React + Spring Boot)
general   → General Software Engineer (broad skills)

Rules:
Greet the user warmly and ask what role they are hiring for. Keep it short and friendly. Mention Subhajit's total experience (${expString}) naturally if relevant to their confidence.
Once you know the role, respond ONLY with this exact JSON (no extra text):
{"role": "android", "message": "Great! Downloading Subhajit's Android resume for you now..."}
If unsure, ask one clarifying question.
Match keywords: "mobile"/"android"→android, "flutter"/"cross-platform"→flutter,
"backend"/"java"/"spring"/"api"→backend, "frontend"/"react"/"ui"→react,
"fullstack"/"full stack"/"full-stack"→fullstack, anything else→general.
Never discuss anything outside resume/hiring. Stay focused.`;

// ⚠️ IMPORTANT: Move this to your .env file before deploying!
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

export default function ResumeAssistant({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const bottomRef = useRef(null);
  const hasStarted = useRef(false);

  // Calculate experience once when component loads
  const experienceString = calculateTotalExperience();
  const SYSTEM_PROMPT = generateSystemPrompt(experienceString);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setTimeout(() => sendToAI([], true), 300);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const triggerDownload = (roleKey) => {
    const resume = RESUME_MAP[roleKey] || RESUME_MAP.general;
    setDownloading(resume.label);
    const link = document.createElement("a");
    link.href = resume.file;
    link.download = `Subhajit_Bardhan_${resume.label.replace(/ /g, "_")}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendToAI = async (history, isFirstMessage = false) => {
    setLoading(true);

    let formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: "Start the conversation." } 
    ];

    if (!isFirstMessage) {
      const historyMessages = history.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));
      formattedMessages = [...formattedMessages, ...historyMessages];
    }

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: formattedMessages,
          temperature: 0.2,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Groq API Error:", data);
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: `API Error: ${data.error?.message || "Check the console for details."}` },
        ]);
        setLoading(false);
        return;
      }

      const raw = data.choices?.[0]?.message?.content || "";

      if (!raw) {
        setMessages((prev) => [
          ...prev,
          { from: "ai", text: "I'm having trouble thinking right now. Please try again!" },
        ]);
        setLoading(false);
        return;
      }

      const jsonMatch = raw.match(/{[\s\S]*}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.role) {
            const aiMsg = {
              from: "ai",
              text: parsed.message || "Downloading your resume now...",
            };
            setMessages((prev) => [...prev, aiMsg]);
            setTimeout(() => triggerDownload(parsed.role), 800);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn("Failed to parse JSON snippet", err);
        }
      }

      const aiMsg = { from: "ai", text: raw };
      setMessages((prev) => (isFirstMessage ? [aiMsg] : [...prev, aiMsg]));

    } catch (e) {
      console.error("Fetch error:", e);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Oops! Network error. Please try again in a moment." },
      ]);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { from: "user", text: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    await sendToAI(updated);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-yellow-400 to-blue-500 flex items-center justify-center text-lg shadow-lg"
          >
            🧞
          </motion.div>
          <div>
            <p className="text-white font-semibold text-sm">Resume Genie</p>
            <p className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              Ready to help
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "ai" && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 flex items-center justify-center text-xs mr-2 mt-1 shrink-0">
                  🧞
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-yellow-400 flex items-center justify-center text-xs shrink-0">
                🧞
              </div>
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Download confirmation */}
          {downloading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center"
            >
              <div className="bg-green-500/15 border border-green-500/30 text-green-400 text-xs px-4 py-2 rounded-full text-center">
                ✅ Downloading: {downloading} Resume
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10 flex gap-2 bg-slate-900">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="e.g. Android developer..."
          disabled={loading || !!downloading}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-400/50 disabled:opacity-40"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading || !!downloading}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 disabled:opacity-40 text-white rounded-xl text-sm font-medium transition-opacity"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}