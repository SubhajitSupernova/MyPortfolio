// import { motion } from "framer-motion";

// const footerVariants = {
//   hidden: { opacity: 0, y: 40 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
// };

// export default function EducationSection() {
//   return (
//     <>
//       {/* ================= FOOTER ================= */}
//       <motion.footer
//         variants={footerVariants}
//         initial="hidden"
//         animate="show"
//         className="mt-16 w-full max-w-4xl mx-auto text-center border-t border-white/20 pt-8"
//       >
//         <motion.p
//           whileHover={{ scale: 1.05, color: "#60A5FA" }}
//           className="text-gray-300 text-sm mb-2"
//         >
//           📧 Email:{" "}
//           <a
//             href="mailto:bardhansubhajit3@gmail.com"
//             className="text-blue-400 hover:underline"
//           >
//             bardhansubhajit3@gmail.com
//           </a>
//         </motion.p>

//         <motion.p
//           whileHover={{ scale: 1.05, color: "#60A5FA" }}
//           className="text-gray-300 text-sm mb-2"
//         >
//           📞 Phone:{" "}
//           <a
//             href="tel:+919433601566"
//             className="text-blue-400 hover:underline"
//           >
//             +91 9433601566
//           </a>
//         </motion.p>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="text-gray-400 text-xs mt-4"
//         >
//           © {new Date().getFullYear()} Subhajit Bardhan — All Rights Reserved
//         </motion.p>
//       </motion.footer>
//     </>
//   );
// }





import { motion } from "framer-motion";

// Local asset imports (matching your new navbar setup)
import githubLogo from "../assets/gitone.png";
import linkedinLogo from "../assets/in.jpg";

const footerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function EducationSection() {
  return (
    <>
      {/* ================= PREMIUM GEN-Z FOOTER ================= */}
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="show" // Triggers beautifully when scrolling into view
        viewport={{ once: true, amount: 0.3 }}
        className="mt-24 w-full max-w-5xl mx-auto text-center px-6 pb-12 relative flex flex-col items-center"
      >
        {/* Futuristic Gradient Beam Divider instead of a plain border */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent mb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[1px] bg-gradient-to-r from-blue-500 to-purple-500 blur-sm"></div>
        </div>

        {/* Contact Deck - Grid layout that creates clean responsive glass boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
          
          {/* Email Box */}
          <motion.a
            href="mailto:bardhansubhajit3@gmail.com"
            whileHover={{ y: -4, borderColor: "rgba(59, 130, 246, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-left transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
              📧
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Drop an email</p>
              <p className="text-sm font-medium text-gray-200 group-hover:text-blue-400 transition-colors mt-0.5">
                bardhansubhajit3@gmail.com
              </p>
            </div>
          </motion.a>

          {/* Phone Box */}
          <motion.a
            href="tel:+919433601566"
            whileHover={{ y: -4, borderColor: "rgba(168, 85, 247, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 px-5 py-4 bg-white/[0.02] border border-white/10 rounded-2xl text-left transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
              📞
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Let's talk</p>
              <p className="text-sm font-medium text-gray-200 group-hover:text-purple-400 transition-colors mt-0.5">
                +91 9433601566
              </p>
            </div>
          </motion.a>

        </div>

        {/* Footer Bottom Strip: Quick Links & Copyright */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5 max-w-2xl">
          
          {/* Minimal Icon Row matching your navbar branding */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <a 
              href="https://github.com/SubhajitBardhanPc/SubhajitBardhanPc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all group"
            >
              <img src={githubLogo} alt="GitHub" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="https://github.com/SubhajitSupernova" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all group"
            >
              <img src={githubLogo} alt="GitHub Projects" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="https://www.linkedin.com/in/subhajitbardhan" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500/20 transition-all group"
            >
              <img src={linkedinLogo} alt="LinkedIn" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Copyright Tagline */}
          <p className="text-[11px] text-gray-500 tracking-wide font-mono">
            © {new Date().getFullYear()} Subhajit Bardhan — Designed to Build
          </p>
        </div>
      </motion.footer>
    </>
  );
}