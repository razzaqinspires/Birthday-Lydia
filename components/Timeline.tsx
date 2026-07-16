"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import { usePerformance } from "../contexts/PerformanceContext";

export default function Timeline() {
  const { quality } = usePerformance();
  const animationProps = quality === "low" ? { opacity: 1, y: 0 } : undefined;

  const milestones = [
    { id: 1, title: "Pertama Bertemu", desc: "Hari di mana segalanya berubah menjadi lebih berwarna.", icon: <Star size={18} className="text-pink-500" aria-hidden="true" /> },
    { id: 2, title: "Tawa Bersama", desc: "Momen-momen sederhana yang menjadi kenangan paling berharga.", icon: <Sparkles size={18} className="text-pink-500" aria-hidden="true" /> },
    { id: 3, title: "Hari Ini & Selamanya", desc: "Menemanimu di setiap langkah, merayakan setiap detikmu.", icon: <Heart size={18} className="text-pink-500" fill="currentColor" aria-hidden="true" /> },
  ];

  return (
    <article className="py-24 md:py-32 z-10 relative flex flex-col items-center px-4 md:px-6 w-full max-w-[100vw]">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={animationProps || { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-16"
      >
        <h2 className="font-script text-4xl md:text-5xl text-pink-600 mb-2">Perjalanan Kita</h2>
        <p className="font-sans text-[10px] md:text-xs tracking-widest text-pink-900/50 uppercase">Alasan mengapa aku mencintaimu</p>
      </motion.header>

      <div className="relative max-w-2xl w-full">
        {/* Garis vertikal di tengah */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-pink-200 -translate-x-1/2 rounded-full hidden md:block" aria-hidden="true"></div>
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-pink-200 -translate-x-1/2 rounded-full block md:hidden" aria-hidden="true"></div>

        {milestones.map((item, index) => (
          <motion.section 
            key={item.id}
            initial={{ opacity: 0, x: quality === "low" ? 0 : (index % 2 === 0 ? -30 : 30) }}
            whileInView={animationProps || { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: quality === "low" ? 0 : index * 0.15 }}
            className={`relative flex items-center mb-10 md:mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            <div className="absolute left-6 md:left-1/2 w-8 h-8 md:w-10 md:h-10 bg-white border-[3px] border-pink-100 rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-sm">
              {item.icon}
            </div>

            <div className={`ml-14 md:ml-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-10 text-left md:text-right' : 'md:pl-10 text-left'}`}>
              <div className="glass-panel p-5 md:p-6 bg-white/60 border border-white/80 hover:-translate-y-1 transition-transform">
                <h3 className="font-serif font-bold text-xl md:text-2xl text-pink-800 mb-1.5">{item.title}</h3>
                <p className="font-sans text-xs md:text-sm text-pink-900/70 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </article>
  );
}
