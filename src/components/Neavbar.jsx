

// import { motion, AnimatePresence } from "framer-motion";
// import logo from "../assets/logo.png";
// import { useState, useEffect } from "react";
// import ResumeAssistant from "./ResumeAssistant";

// export default function Navbar() {
//   const [showLogo, setLogo] = useState(true);
//   const [chatOpen, setChatOpen] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setLogo((prev) => !prev);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <nav className="bg-blue-600/20 backdrop-blur-lg text-white px-6 py-4 flex justify-between items-center rounded-b-2xl shadow-lg">

//         {/* Logo / Title */}
//         <motion.div
//           key={showLogo ? "logo" : "text"}
//           initial={{ opacity: 0, y: -3 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 10 }}
//           transition={{ duration: 0.8 }}
//           className="flex items-center gap-2"
//         >
//           {showLogo ? (
//             <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
//           ) : (
//             <h1 className="text-xl font-bold">Subhajit's Portfolio</h1>
//           )}
//         </motion.div>

//         {/* Right Side */}
//         <div className="flex items-center gap-6">

//           {/* Tagline */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1.2 }}
//             className="hidden md:block italic text-gray-300 text-sm"
//           >
//             "Crafting code with creativity ✨"
//           </motion.p>

//           {/* Social Icons */}
//           <div className="flex gap-4 text-xl">
//             <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
//               <i className="fab fa-github"></i>
//             </a>
//             <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
//               <i className="fab fa-linkedin"></i>
//             </a>
//             <a href="mailto:bardhansubhajit3@gmail.com" className="hover:text-yellow-400 transition-colors">
//               <i className="fas fa-envelope"></i>
//             </a>
//           </div>

//           {/* ✅ Animated Genie Chat Button */}
//           <motion.button
//             onClick={() => setChatOpen((prev) => !prev)}
//             whileTap={{ scale: 0.92 }}
//             className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/30 to-yellow-400/20 border border-purple-400/40 text-white text-sm font-medium hover:from-purple-500/50 hover:to-yellow-400/30 transition-all"
//           >
//             {/* Pulsing glow ring */}
//             <motion.span
//               className="absolute inset-0 rounded-xl"
//               animate={{ boxShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 12px rgba(168,85,247,0.6)", "0 0 0px rgba(168,85,247,0)"] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//             {/* Swaying genie emoji */}
//             <motion.span
//               animate={{ rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] }}
//               transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
//               className="text-lg"
//             >
//               🧞
//             </motion.span>
//             <span className="hidden sm:inline">Get Resume</span>
//           </motion.button>

//           {/* Resume Download Button */}
//           <motion.a
//             whileHover={{ scale: 1.05 }}
//             href="/resume.pdf"
//             download
//             className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors text-sm font-medium"
//           >
//             📄 Resume
//           </motion.a>

//         </div>
//       </nav>

//       {/* Side Panel */}
//       <AnimatePresence>
//         {chatOpen && <ResumeAssistant onClose={() => setChatOpen(false)} />}
//       </AnimatePresence>
//     </>
//   );
// }



import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ResumeAssistant from "./ResumeAssistant";

// ⚠️ IMPORTANT: Ensure these image files exist in your src/assets/ folder!
import logo from "../assets/logo.png";
import githubLogo1 from "../assets/gitone.png";  
import githubLogo2 from "../assets/gittwo.png";    // Add your local GitHub logo here
import linkedinLogo from "../assets/in.jpg"; // Add your local LinkedIn logo here

export default function Navbar() {
  const [chatOpen, setChatOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Feature: Live Time Tracker
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(`${time} IST`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Header Container */}
      <header className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 w-full pointer-events-none">
        
        {/* The "Pill" Navbar */}
        <nav className="pointer-events-auto w-full max-w-5xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white px-3 py-2.5 flex justify-between items-center rounded-full transition-all duration-300 hover:bg-black/50 hover:border-white/20">

          {/* LEFT: Profile & Status */}
          <div className="flex items-center gap-3 pl-1">
            <div className="relative group cursor-pointer">
              <img src={logo} alt="Subhajit" className="h-10 w-10 rounded-full object-cover border border-white/20 group-hover:border-blue-400 transition-colors" />
              {/* Live Status Dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]">
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></span>
              </span>
            </div>
            
            <div className="hidden sm:flex flex-col justify-center">
              <h1 className="text-sm font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Subhajit Bardhan
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-green-400 font-semibold mt-0.5">
                Open to work
              </p>
            </div>
          </div>

          {/* CENTER: Vibe / Location Badge (Hidden on mobile) */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300"
          >
            <span>📍 Kolkata</span>
            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
            <span className="text-gray-400 font-mono tracking-tighter">{currentTime}</span>
          </motion.div>

          {/* RIGHT: Socials & Calls to Action */}
          <div className="flex items-center gap-2 sm:gap-4 pr-1">
            
            {/* Minimal Glass Socials using Local Images */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/5 border border-white/10">
              
              {/* GitHub 1 (Main/PC) */}
              <a 
                href="https://github.com/SubhajitBardhanPc/SubhajitBardhanPc" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="GitHub (Main)"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all group"
              >
                <img src={githubLogo1} alt="GitHub Main" className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </a>

              {/* GitHub 2 (Secondary/Projects) */}
              <a 
                href="https://github.com/SubhajitSupernova" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="GitHub (Projects)"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all group"
              >
                {/* Notice the slight visual tweak (w-4 h-4) to keep them looking clean inside the pill */}
                <img src={githubLogo2} alt="GitHub Projects" className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/subhajitbardhan" 
                target="_blank" 
                rel="noopener noreferrer" 
                title="LinkedIn Profile"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500/20 transition-all group"
              >
                <img src={linkedinLogo} alt="LinkedIn" className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </a>
            </div>

            {/* Standard Resume - Minimal Icon Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-white/20 transition-all tooltip-trigger"
              title="Download Standard Resume"
            >
              <span className="text-sm">📄</span>
            </motion.a>

            {/* AI Genie Button (The Star of the Show) */}
            <motion.button
              onClick={() => setChatOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all overflow-hidden group"
            >
              {/* Shimmer effect moving across the button */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              
              <motion.span
                animate={{ rotate: [0, 10, -10, 0], y: [0, -2, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-lg relative z-10"
              >
                🧞
              </motion.span>
              <span className="relative z-10 tracking-wide pr-1">Ask Genie</span>
            </motion.button>

          </div>
        </nav>
      </header>

      {/* Side Panel Overlay (z-50 ensures it goes over the navbar) */}
      <AnimatePresence>
        {chatOpen && (
          <>
            {/* Backdrop blur when chat is open */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            {/* The Chat Interface */}
            <div className="fixed inset-y-0 right-0 z-50">
              <ResumeAssistant onClose={() => setChatOpen(false)} />
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}