// import { motion } from "framer-motion";
// import HeritageImg from "../assets/Heritage.jpg";
// import CTSImg from "../assets/CTS.jpg";

// // ================= EXPERIENCE + EDUCATION DATA =================
// const timelineData = [
//   {
//     id: 1,
//     type: "experience",
//     role: "Junior Software Engineer",
//     company: "Nevaeh Technology Pvt. Ltd.",
//     period: "Sep 2025 – Present",
//     location: "Kolkata",
//     description:
//       "Building and maintaining production-grade Java/Spring Boot services and full-stack features across web and mobile platforms. Contributing to system design, API development, and cloud deployment pipelines.",
//     tags: ["Java", "Spring Boot", "REST APIs", "Full-Stack"],
//   },
//   {
//     id: 2,
//     type: "experience",
//     role: "Android Developer",
//     company: "Divergent Consultancy Services Limited",
//     period: "Jan 2025 – Jun 2025",
//     location: "Kolkata",
//     description:
//       "Developed and deployed native Android apps using Java, XML & Android SDK. Built cross-platform apps with Flutter for simultaneous Android & iOS delivery. Integrated REST APIs, optimised UI performance across diverse devices, and collaborated in Agile teams with Git-based version control.",
//     tags: ["Android (Java)", "Flutter", "XML", "REST APIs", "Agile", "Git"],
//   },
//   {
//     id: 3,
//     type: "education",
//     school: "Heritage Institute",
//     degree: "B.Tech",
//     cgpa: "7.95 CGPA",
//     location: "Kolkata",
//     ranking: "Top 10 Private Engineering Colleges in WB",
//     image: HeritageImg,
//     website: "https://heritageit.edu/",
//     maps: "https://www.google.com/maps/place/Heritage+Institute+Kolkata",
//   },
//   {
//     id: 4,
//     type: "education",
//     school: "CTS",
//     degree: "Diploma",
//     cgpa: "8.5 CGPA",
//     location: "Kolkata",
//     ranking: "Top 5 Technical Institutes in WB",
//     image: CTSImg,
//     website: "https://polytechnic.wbtetsd.gov.in/ctskolkata",
//     maps: "https://www.google.com/maps/place/Central+Technical+School+Kolkata",
//   },
// ];

// // ================= ANIMATION VARIANTS =================
// const itemVariants = {
//   hidden: { opacity: 0, x: -50 },
//   show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
// };

// export default function ExperienceAndEducation() {
//   return (
//     <div className="bg-slate-950 min-h-screen text-white py-20 px-6 font-sans">
//       <div className="max-w-5xl mx-auto space-y-24">
        
//         {/* ================= TIMELINE SECTION ================= */}
//         <section>
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.5 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 inline-block mb-3">
//               Career & Education Journey
//             </h2>
//             <p className="text-gray-400 text-sm tracking-widest uppercase">
//               My professional and academic path
//             </p>
//           </motion.div>

//           <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
//             {timelineData.map((item, index) => (
//               <motion.div
//                 key={item.id}
//                 variants={itemVariants}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, amount: 0.2 }}
//                 className="relative pl-8 md:pl-12"
//               >
//                 {/* Timeline Dot */}
//                 <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] ring-4 ring-slate-950">
//                   <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
//                 </span>

//                 {/* Experience vs Education Card */}
//                 {item.type === "experience" ? (
//                   <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors group">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                       <div>
//                         <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
//                           {item.role}
//                         </h3>
//                         <p className="text-lg text-gray-300 mt-1 font-medium flex items-center gap-2">
//                           🏢 {item.company}
//                         </p>
//                       </div>
//                       <div className="text-left md:text-right shrink-0">
//                         <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold border border-blue-500/30">
//                           🗓️ {item.period}
//                         </div>
//                         <p className="text-sm text-gray-500 mt-2">📍 {item.location}</p>
//                       </div>
//                     </div>
//                     <p className="text-gray-400 leading-relaxed mb-6">
//                       {item.description}
//                     </p>
//                     <div className="flex flex-wrap gap-2">
//                       {item.tags.map((tag) => (
//                         <span key={tag} className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-default">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
//                     <img src={item.image} alt={item.school} className="w-full h-40 object-cover rounded-xl mb-4" />
//                     <h3 className="text-xl font-bold text-white">{item.school}</h3>
//                     <p className="text-gray-300">{item.degree} — {item.cgpa}</p>
//                     <p className="text-sm text-gray-400 mt-2">📍 {item.location}</p>
//                     <p className="text-xs text-gray-500 mt-1">🏆 {item.ranking}</p>
//                     <div className="flex gap-3 mt-4">
//                       {item.website && (
//                         <a href={item.website} target="_blank" rel="noopener noreferrer"
//                           className="px-4 py-2 text-sm font-medium text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition-colors">
//                           🌐 Website
//                         </a>
//                       )}
//                       {item.maps && (
//                         <a href={item.maps} target="_blank" rel="noopener noreferrer"
//                           className="px-4 py-2 text-sm font-medium text-green-400 border border-green-400/30 rounded-lg hover:bg-green-500/20 hover:text-green-300 transition-colors">
//                           📍 View on Map
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }


import { motion } from "framer-motion";
import HeritageImg from "../assets/Heritage.jpg";
import CTSImg from "../assets/CTS.jpg";

// ================= EXPERIENCE + EDUCATION DATA =================
const timelineData = [
  {
    id: 1,
    type: "experience",
    role: "Junior Software Engineer",
    company: "Nevaeh Technology Pvt. Ltd.",
    period: "Sep 2025 – Present",
    location: "Kolkata",
    description:
      "Building and maintaining production-grade Java/Spring Boot services and full-stack features across web and mobile platforms. Contributing to system design, API development, and cloud deployment pipelines.",
    tags: ["Java", "Spring Boot", "REST APIs", "Full-Stack"],
  },
  {
    id: 2,
    type: "experience",
    role: "Android Developer",
    company: "Divergent Consultancy Services Limited",
    period: "Jan 2025 – Jun 2025",
    location: "Kolkata",
    description:
      "Developed and deployed native Android apps using Java, XML & Android SDK. Built cross-platform apps with Flutter for simultaneous Android & iOS delivery. Integrated REST APIs, optimised UI performance across diverse devices, and collaborated in Agile teams with Git-based version control.",
    tags: ["Android (Java)", "Flutter", "XML", "REST APIs", "Agile", "Git"],
  },
  {
    id: 3,
    type: "education",
    school: "Heritage Institute",
    degree: "B.Tech",
    cgpa: "7.95 CGPA",
    location: "Kolkata",
    ranking: "Top 10 Private Engineering Colleges in WB",
    image: HeritageImg,
    website: "https://heritageit.edu/",
    maps: "https://www.google.com/maps/place/Heritage+Institute+Kolkata",
  },
  {
    id: 4,
    type: "education",
    school: "CTS",
    degree: "Diploma",
    cgpa: "8.5 CGPA",
    location: "Kolkata",
    ranking: "Top 5 Technical Institutes in WB",
    image: CTSImg,
    website: "https://polytechnic.wbtetsd.gov.in/ctskolkata",
    maps: "https://www.google.com/maps/place/Central+Technical+School+Kolkata",
  },
];

// Split data for the columns
const experiences = timelineData.filter((item) => item.type === "experience");
const educations = timelineData.filter((item) => item.type === "education");

// ================= ANIMATION VARIANTS =================
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ExperienceAndEducation() {
  return (
    <div className="bg-slate-950 min-h-screen text-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* ================= HEADER SECTION ================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 inline-block mb-3">
            Career & Education Journey
          </h2>
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            My professional and academic path
          </p>
        </motion.div>

        {/* ================= TWO COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* ========== COLUMN 1: EXPERIENCE ========== */}
          <section>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="text-blue-400">💼</span> Experience
            </h3>
            <div className="relative border-l border-white/10 ml-3 space-y-10">
              {experiences.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative pl-8"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] ring-4 ring-slate-950">
                    <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
                  </span>

                  {/* Experience Card - Fixed Height with Flex */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col min-h-[360px]">
                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-md text-gray-300 mt-1 font-medium flex items-center gap-2">
                          🏢 {item.company}
                        </p>
                      </div>
                      <div className="text-left xl:text-right shrink-0">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30 mb-1">
                          🗓️ {item.period}
                        </div>
                        <p className="text-xs text-gray-500">📍 {item.location}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    {/* mt-auto pushes the tags to the absolute bottom of the card */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ========== COLUMN 2: EDUCATION ========== */}
          <section>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="text-purple-400">🎓</span> Education
            </h3>
            <div className="relative border-l border-white/10 ml-3 space-y-10">
              {educations.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative pl-8"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] ring-4 ring-slate-950">
                    <span className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75"></span>
                  </span>

                  {/* Education Card - Fixed Height with Flex */}
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group flex flex-col min-h-[360px]">
                    <img 
                      src={item.image} 
                      alt={item.school} 
                      className="w-full h-32 object-cover rounded-xl mb-5 shrink-0" 
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {item.school}
                      </h3>
                      <p className="text-gray-300 text-md font-medium mt-1">
                        {item.degree} <span className="text-purple-400">— {item.cgpa}</span>
                      </p>
                      <p className="text-sm text-gray-400 mt-2">📍 {item.location}</p>
                      <p className="text-xs text-gray-500 mt-1">🏆 {item.ranking}</p>
                    </div>
                    
                    {/* mt-auto pushes the buttons to the absolute bottom of the card */}
                    <div className="flex gap-3 mt-auto pt-6">
                      {item.website && (
                        <a href={item.website} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 text-xs font-medium text-blue-400 border border-blue-400/30 rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition-colors flex-1 text-center">
                          🌐 Website
                        </a>
                      )}
                      {item.maps && (
                        <a href={item.maps} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 text-xs font-medium text-green-400 border border-green-400/30 rounded-lg hover:bg-green-500/20 hover:text-green-300 transition-colors flex-1 text-center">
                          📍 Map
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}