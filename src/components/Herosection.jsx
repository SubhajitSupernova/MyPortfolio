
import { motion } from "framer-motion";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function Hero() {
  return (
    <div className="relative bg-slate-950 text-white min-h-[45vh] flex items-center justify-center overflow-hidden px-6 pt-16 pb-2">
      
      {/* ================= BACKGROUND GLOW ELEMENTS ================= */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" style={{ animationDuration: '4s' }}></div>

      {/* Subtle Technical Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* ================= MAIN CONTAINER ================= */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center"
      >
        
        {/* Tech Focus Pill Tag */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-blue-400 mb-3 backdrop-blur-md shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Full-Stack & Android Architecture
        </motion.div>

        {/* Dynamic Dual-Tone Gradient Heading */}
        <motion.h1 
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2] mb-3"
        >
          Crafting Scalable Apps <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            Driven by High-Volume Data
          </span>
        </motion.h1>

        {/* Short, Punchy Professional Pitch */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-normal"
        >
          Software Engineer specializing in production-ready backend systems, native Android, and large-scale document management systems handling hundreds of millions of records.
        </motion.p>

      </motion.div>
    </div>
  );
}