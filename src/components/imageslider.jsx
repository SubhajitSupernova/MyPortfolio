
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const appGallery = [
//   {
//     id: 1,
//     type: "android",
//     title: "Hand Cricket",
//     description: "A digital take on the classic nostalgic game.",
//     src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop", 
//     link: "https://play.google.com/store/apps/details?id=com.subhajit.handcricket",
//     status: "Live on Play Store",
//     audience: "Public",
//     lastUpdated: "2026",
//   },
//   {
//     id: 2,
//     type: "android",
//     title: "Study Mate / Planner",
//     description: "Organize tasks and plan your study schedule effectively.",
//     src: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1000&auto=format&fit=crop", 
//     link: "https://play.google.com/store/apps/details?id=com.subhajitstudy.study_planner",
//     status: "Live on Play Store",
//     audience: "Public",
//     lastUpdated: "2026",
//   },
//   {
//     id: 3,
//     type: "web",
//     title: "OneMed Billing Dashboard",
//     description: "Medical billing dashboard with accounts receivable reporting.",
//     src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
//     link: "https://github.com/SubhajitSupernova/OneMD",
//     status: "GitHub",
//     audience: "Private / Client",
//     lastUpdated: "April 2026",
//   },

//   {
//     id: 4,
//     type: "android",
//     title: "KF Loyality",
//     description: "Medical billing dashboard with accounts receivable reporting.",
//     src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
//     link: "https://play.google.com/store/apps/details?id=com.kf.retailer&pcampaignid=web_share",
//     status: "Development",
//     audience: "Live on Play Store",
//     lastUpdated: "March 2025",
//   },
  
// ];

// export default function AppGallery() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const currentApp = appGallery[currentIndex];

//   const nextApp = () => {
//     setCurrentIndex((prev) => (prev + 1) % appGallery.length);
//   };

//   const prevApp = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? appGallery.length - 1 : prev - 1
//     );
//   };

//   return (
//     <div className="bg-slate-950 text-white p-6 flex flex-col items-center justify-center min-h-screen">
//       <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
//         My Published Projects
//       </h2>

//       <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Main App Preview */}
//         <div className="lg:col-span-2 flex flex-col justify-between">
//           <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video bg-black/40 shadow-inner flex items-center justify-center">
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={currentApp.id}
//                 src={currentApp.src}
//                 alt={currentApp.title}
//                 className="w-full h-full object-cover"
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.4 }}
//               />
//             </AnimatePresence>
            
//             {/* Badge showing if it's Web or Android on the image */}
//             <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider shadow-lg">
//               {currentApp.type === "android" ? "📱 Android" : "💻 Web"}
//             </div>
//           </div>

//           {/* Info + Controls */}
//           <div className="mt-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//             <div className="flex-1">
//               <h3 className="text-2xl font-bold">{currentApp.title}</h3>
//               <p className="text-sm text-gray-300 mt-1 mb-4">{currentApp.description}</p>
              
//               {/* HIGHLIGHTED STATUS BADGES */}
//               <div className="flex flex-wrap gap-2.5 mt-2">
//                 <div className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border shadow-sm ${
//                   currentApp.status.includes("Live") 
//                     ? "bg-green-500/10 border-green-500/40 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.1)]" 
//                     : "bg-orange-500/10 border-orange-500/40 text-orange-400"
//                 }`}>
//                   {currentApp.status.includes("Live") && (
//                     <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
//                   )}
//                   {currentApp.status}
//                 </div>

//                 <div className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5">
//                   👥 Audience: {currentApp.audience}
//                 </div>

//                 <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold flex items-center gap-1.5">
//                   📅 Updated {currentApp.lastUpdated}
//                 </div>
//               </div>

//               <a
//                 href={currentApp.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
//               >
//                 {currentApp.type === "android" 
//                   ? "View on Play Store ↗" 
//                   : currentApp.link.includes("github.com") 
//                     ? "View on GitHub ↗" 
//                     : "Visit Website ↗"}
//               </a>
//             </div>

//             <div className="flex gap-3 shrink-0 mt-2 sm:mt-0">
//               <button
//                 onClick={prevApp}
//                 className="px-4 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl transition-all text-sm font-bold active:scale-95"
//               >
//                 ← Prev
//               </button>
//               <button
//                 onClick={nextApp}
//                 className="px-4 py-2.5 bg-blue-600/80 hover:bg-blue-500 border border-blue-400/50 rounded-xl transition-all text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Thumbnail Panel - Separated into Two Boxes */}
//         <div className="flex flex-col gap-6 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
          
//           {/* Box 1: Android Apps */}
//           <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
//             <h4 className="text-xs font-bold tracking-widest text-green-400 uppercase mb-1 px-1 flex items-center gap-2">
//               📱 Android Apps
//             </h4>
            
//             {appGallery.map((app, index) => {
//               if (app.type !== "android") return null;
//               const isActive = index === currentIndex;
              
//               return (
//                 <button
//                   key={app.id}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 relative overflow-hidden group ${
//                     isActive
//                       ? "bg-green-500/10 border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
//                       : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
//                   }`}
//                 >
//                   <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black/50">
//                     <img src={app.src} alt="thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h5 className={`text-sm font-bold truncate ${isActive ? "text-green-400" : "text-white"}`}>
//                       {app.title}
//                     </h5>
//                     <p className="text-xs text-gray-400 truncate mt-0.5">
//                       {app.description}
//                     </p>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Box 2: Web Apps */}
//           <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
//             <h4 className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-1 px-1 flex items-center gap-2">
//               💻 Web Apps
//             </h4>
            
//             {appGallery.map((app, index) => {
//               if (app.type !== "web") return null;
//               const isActive = index === currentIndex;
              
//               return (
//                 <button
//                   key={app.id}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 relative overflow-hidden group ${
//                     isActive
//                       ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
//                       : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
//                   }`}
//                 >
//                   <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black/50">
//                     <img src={app.src} alt="thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h5 className={`text-sm font-bold truncate ${isActive ? "text-blue-400" : "text-white"}`}>
//                       {app.title}
//                     </h5>
//                     <p className="text-xs text-gray-400 truncate mt-0.5">
//                       {app.description}
//                     </p>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const appGallery = [
  {
    id: 1,
    type: "android",
    title: "Hand Cricket",
    description: "A digital take on the classic nostalgic game.",
    src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop", 
    link: "https://play.google.com/store/apps/details?id=com.subhajit.handcricket",
    status: "Live on Play Store",
    audience: "Public",
    lastUpdated: "2026",
  },
  {
    id: 2,
    type: "android",
    title: "Study Mate / Planner",
    description: "Organize tasks and plan your study schedule effectively.",
    src: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1000&auto=format&fit=crop", 
    link: "https://play.google.com/store/apps/details?id=com.subhajitstudy.study_planner",
    status: "Live on Play Store",
    audience: "Public",
    lastUpdated: "2026",
  },
  {
    id: 3,
    type: "web",
    title: "OneMed Billing Dashboard",
    description: "Medical billing dashboard with accounts receivable reporting.",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    link: "https://github.com/SubhajitSupernova/OneMD",
    status: "GitHub",
    audience: "Private / Client",
    lastUpdated: "April 2026",
  },
  {
    id: 4,
    type: "android",
    title: "KF Loyality",
    description: "Retailer loyalty program and reward tracking system.",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    link: "https://play.google.com/store/apps/details?id=com.kf.retailer&pcampaignid=web_share",
    status: "Development",
    audience: "Live on Play Store",
    lastUpdated: "March 2025",
  },
];

// New Array for Enterprise DMS Projects
const dmsProjects = [
  {
    id: 1,
    title: "Tripura High Court DMS",
    dataScale: "13-15 Cr Records",
    role: "Backend & Data Migration",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Chandigarh Land Record",
    dataScale: "Massive Scale",
    role: "Document Management System",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "CAG Bengal Project",
    dataScale: "6 Cr Records",
    role: "DMS Architecture",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    title: "IB DMS",
    dataScale: "4 Cr Records",
    role: "Secure Data Archival",
    color: "from-green-500 to-emerald-500",
  },
];

export default function AppGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentApp = appGallery[currentIndex];

  const nextApp = () => {
    setCurrentIndex((prev) => (prev + 1) % appGallery.length);
  };

  const prevApp = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? appGallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-slate-950 text-white p-6 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        My Published Projects & Enterprise Experience
      </h2>

      {/* Expanded Max-Width and changed to 4 columns */}
      <div className="w-full max-w-[1400px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* ================= COLUMN 1 & 2: Main App Preview ================= */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-video bg-black/40 shadow-inner flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentApp.id}
                src={currentApp.src}
                alt={currentApp.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            
            {/* Badge showing if it's Web or Android on the image */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider shadow-lg">
              {currentApp.type === "android" ? "📱 Android" : "💻 Web"}
            </div>
          </div>

          {/* Info + Controls */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{currentApp.title}</h3>
              <p className="text-sm text-gray-300 mt-1 mb-4">{currentApp.description}</p>
              
              {/* HIGHLIGHTED STATUS BADGES */}
              <div className="flex flex-wrap gap-2.5 mt-2">
                <div className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border shadow-sm ${
                  currentApp.status.includes("Live") 
                    ? "bg-green-500/10 border-green-500/40 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.1)]" 
                    : "bg-orange-500/10 border-orange-500/40 text-orange-400"
                }`}>
                  {currentApp.status.includes("Live") && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  )}
                  {currentApp.status}
                </div>

                <div className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5">
                  👥 Audience: {currentApp.audience}
                </div>

                <div className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold flex items-center gap-1.5">
                  📅 Updated {currentApp.lastUpdated}
                </div>
              </div>

              <a
                href={currentApp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                {currentApp.type === "android" 
                  ? "View on Play Store ↗" 
                  : currentApp.link.includes("github.com") 
                    ? "View on GitHub ↗" 
                    : "Visit Website ↗"}
              </a>
            </div>

            <div className="flex gap-3 shrink-0 mt-2 sm:mt-0">
              <button
                onClick={prevApp}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl transition-all text-sm font-bold active:scale-95"
              >
                ← Prev
              </button>
              <button
                onClick={nextApp}
                className="px-4 py-2.5 bg-blue-600/80 hover:bg-blue-500 border border-blue-400/50 rounded-xl transition-all text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* ================= COLUMN 3: App Thumbnails ================= */}
        <div className="lg:col-span-1 flex flex-col gap-6 max-h-[550px] overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Box 1: Android Apps */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-widest text-green-400 uppercase mb-1 px-1 flex items-center gap-2">
              📱 Android Apps
            </h4>
            
            {appGallery.map((app, index) => {
              if (app.type !== "android") return null;
              const isActive = index === currentIndex;
              
              return (
                <button
                  key={app.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 relative overflow-hidden group ${
                    isActive
                      ? "bg-green-500/10 border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                      : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black/50">
                    <img src={app.src} alt="thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className={`text-sm font-bold truncate ${isActive ? "text-green-400" : "text-white"}`}>
                      {app.title}
                    </h5>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {app.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Box 2: Web Apps */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-1 px-1 flex items-center gap-2">
              💻 Web Apps
            </h4>
            
            {appGallery.map((app, index) => {
              if (app.type !== "web") return null;
              const isActive = index === currentIndex;
              
              return (
                <button
                  key={app.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 relative overflow-hidden group ${
                    isActive
                      ? "bg-blue-500/10 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-black/50">
                    <img src={app.src} alt="thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className={`text-sm font-bold truncate ${isActive ? "text-blue-400" : "text-white"}`}>
                      {app.title}
                    </h5>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {app.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= COLUMN 4: Enterprise DMS Projects ================= */}
        <div className="lg:col-span-1 flex flex-col max-h-[550px]">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col h-full relative overflow-hidden">
            
            {/* Background glowing accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none"></div>

            <h4 className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-5 flex items-center gap-2 relative z-10">
              🏢 Enterprise DMS 
            </h4>

            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar relative z-10 flex-1">
              {dmsProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <h5 className="text-white font-bold text-sm mb-1 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h5>
                  <p className="text-xs text-gray-400 mb-3">
                    {project.role}
                  </p>
                  
                  {/* Data Scale Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 border border-white/10">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`}></div>
                    <span className="text-xs font-semibold text-gray-200">
                      {project.dataScale}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest text-center">
                High-Volume Data Engineering
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}