

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
            {/* <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-white/20 transition-all tooltip-trigger"
              title="Download Standard Resume"
            >
              <span className="text-sm">📄</span>
            </motion.a> */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/MyPortfolio/resumes/Subhajit_Bardhan__Resume.pdf"
                download="Subhajit_Bardhan_Resume.pdf"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:bg-white/20 transition-all tooltip-trigger"
                title="Download Resume"
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