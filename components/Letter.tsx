"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-40 flex flex-col items-center justify-center z-10 relative px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="w-full max-w-4xl"
      >
        <div 
          className="glass-panel w-full p-12 md:p-20 rounded-[2rem] cursor-pointer relative overflow-hidden group transition-all duration-700 hover:shadow-[0_0_60px_rgba(244,114,182,0.15)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Ornamen Wax Seal (Stempel Lilin Klasik) */}
          <div className="flex flex-col items-center justify-center space-y-8 relative z-10">
            <motion.div
              animate={{ 
                scale: isOpen ? 1.5 : 1,
                opacity: isOpen ? 0 : 1
              }}
              transition={{ duration: 0.6 }}
              className="w-20 h-20 bg-gradient-to-br from-red-700 to-red-950 rounded-full flex items-center justify-center shadow-lg border-[3px] border-red-900/50 relative"
            >
              <span className="font-script text-3xl text-red-200">C</span>
              {/* Lelehan lilin imitasi */}
              <div className="absolute -bottom-2 right-2 w-3 h-4 bg-red-900 rounded-full"></div>
              <div className="absolute top-2 -left-1 w-2 h-2 bg-red-800 rounded-full"></div>
            </motion.div>
            
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-white/50 group-hover:text-pink-200 transition-colors">
              {isOpen ? "" : "Pecahkan segel untuk membaca"}
            </p>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden relative z-10 mt-0"
              >
                <div className="mt-4 bg-[#fbf9f6] text-gray-800 p-10 md:p-16 rounded-xl shadow-2xl relative">
                  {/* Watermark Bunga di dalam surat */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                    <span className="text-[20rem]">🌸</span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl text-gray-900 mb-8">
                    Cici Sayang,
                  </h3>
                  
                  <div className="font-serif text-lg md:text-xl leading-relaxed text-gray-700 space-y-6 text-justify relative z-10">
                    <p>
                      Selamat ulang tahun. Saat kamu membaca surat ini, mungkin kamu akan tersenyum melihat hitungan mundur yang terus berjalan. Setiap detik yang berlalu adalah pengingat bahwa hari bahagiamu semakin dekat.
                    </p>
                    <p>
                      Aku sengaja merangkai barisan kode ini, menyatukan desain, warna, dan memori kita menjadi satu tempat khusus yang hanya milik kita. Alam semesta mungkin sangat luas, tapi duniaku selalu berpusat padamu.
                    </p>
                    <p>
                      Tetaplah bersinar, tetaplah menjadi dirimu yang luar biasa. Semoga tahun ini membawa lebih banyak tawa, kedamaian, dan memori indah yang akan kita isi di bingkai-bingkai foto berikutnya.
                    </p>
                  </div>

                  <div className="mt-16 text-right relative z-10">
                    <p className="font-sans text-sm tracking-widest uppercase text-gray-400 mb-4">Selamanya milikmu,</p>
                    <p className="font-script text-5xl text-pink-700">Aku ❤️</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
