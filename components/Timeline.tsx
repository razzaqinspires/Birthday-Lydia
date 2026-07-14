"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

export default function Timeline() {
  const milestones = [
    { id: 1, title: "Pertama Bertemu", desc: "Hari di mana segalanya berubah menjadi lebih berwarna.", icon: <Star size={20} className="text-pink-500" /> },
    { id: 2, title: "Tawa Bersama", desc: "Momen-momen sederhana yang menjadi kenangan paling berharga.", icon: <Sparkles size={20} className="text-pink-500" /> },
    { id: 3, title: "Hari Ini & Selamanya", desc: "Menemanimu di setiap langkah, merayakan setiap detikmu.", icon: <Heart size={20} className="text-pink-500" fill="currentColor" /> },
  ];

  return (
    <section className="py-32 z-10 relative flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="font-script text-5xl text-pink-600 mb-2">Perjalanan Kita</h2>
        <p className="font-sans text-xs tracking-widest text-pink-900/50 uppercase">Alasan mengapa aku mencintaimu</p>
      </motion.div>

      <div className="relative max-w-2xl w-full">
        {/* Garis vertikal tengah */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-pink-200 -translate-x-1/2 rounded-full"></div>

        {milestones.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            {/* Lingkaran Ikon di tengah */}
            <div className="absolute left-4 md:left-1/2 w-10 h-10 bg-white border-4 border-pink-100 rounded-full flex items-center justify-center -translate-x-1/2 z-10 shadow-lg">
              {item.icon}
            </div>

            {/* Kotak Konten */}
            <div className={`ml-12 md:ml-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
              <div className="glass-panel p-6 shadow-sm border border-white hover:-translate-y-1 transition-transform">
                <h3 className="font-serif font-bold text-2xl text-pink-800 mb-2">{item.title}</h3>
                <p className="font-sans text-sm text-pink-900/70 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
