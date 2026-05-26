import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace these src paths with your actual local image paths
// Example: src: require('../assets/my-banner.png') OR import it at the top
const banners = [
  {
    id: 1,
    src: require("../assets/Banner.png"), 
    alt: "Subhajit Profile Banner",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop", 
    alt: "Web Apps Banner",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop", 
    alt: "SaaS Products Banner",
  }
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll logic: Runs every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    // Cleans up the timer if the user manually clicks next/prev
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    // Matches the slate-950 background of your other components
    <div className="w-full bg-slate-950 py-15 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        
        <div className="relative group w-full 
            h-[400px] sm:h-[450px] md:h-[400px] lg:h-[450px] 
            rounded-3xl overflow-hidden 
            border border-white/10 
            shadow-[0_0_30px_rgba(0,0,0,0.5)] 
            bg-white/5 backdrop-blur-md">

          
          {/* Banner Images with Framer Motion slide effect */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={banners[currentIndex].src}
              alt={banners[currentIndex].alt}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Subtle Gradient Overlays for better text/button contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60 pointer-events-none" />

          {/* Navigation Buttons (Appear on Hover) */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 text-white border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 text-white border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 hover:border-white/30 active:scale-95"
          >
            →
          </button>

          {/* Indicators (The asterisks/dots matching your theme) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-inner">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ease-in-out flex items-center justify-center rounded-full ${
                  index === currentIndex 
                    ? "w-8 h-2 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" // Glowing blue line for active
                    : "w-2 h-2 bg-gray-500/50 hover:bg-gray-300" // Subtle gray dot for inactive
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}