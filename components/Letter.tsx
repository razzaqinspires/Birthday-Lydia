"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      const end = Date.now() + 3 * 1000;
      const colors = ['#fce7f3', '#fbcfe8', '#f9a8d4', '#ffffff', '#e11d48'];

      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.8 },
          colors: colors
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.8 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  };

  return (
    <section className="py-32 flex flex-col items-center justify-center z-10 relative px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-3xl"
      >
        <div 
          className="glass-panel bg-white/60 w-full p-10 md:p-16 cursor-pointer relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(200,100,150,0.15)] border border-white"
          onClick={handleOpenLetter}
        >
          <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
            <motion.div
              animate={{ scale: isOpen ? 1.2 : 1, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center shadow-inner border border-white"
            >
              <span className="text-3xl">💌</span>
            </motion.div>
            
            <p className="font-sans text-xs tracking-widest uppercase text-pink-700 font-semibold group-hover:text-pink-500 transition-colors">
              {isOpen ? "" : "Sentuh untuk membuka surat, sayang"}
            </p>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="overflow-hidden relative z-10"
              >
                <div className="mt-2 bg-white text-gray-800 p-8 md:p-14 rounded-2xl shadow-sm border border-pink-50 relative">
                  <h3 className="font-script text-4xl md:text-5xl text-pink-600 mb-8">
                    Halo Lidya Kesayanganku,
                  </h3>
                  
                  <div className="font-sans text-sm md:text-base leading-loose text-gray-700 space-y-5 text-justify relative z-10">
                    <p>
                      Selamat bertambah usia, adek. Semoga di tahun-tahun ke depan, senyummu semakin cerah, tawamu semakin lepas, dan kebahagiaan selalu memelukmu erat.
                    </p>
                    <p>
                      Website ini hanyalah hal kecil yang bisa aku buat untuk merayakan keberadaan kamu. Tapi percayalah, perasaanku pada kamu jauh lebih besar dari sekadar barisan kode dan desain di layar ini.
                    </p>
                    <p>
                      Terima kasih sudah lahir ke dunia dan menjadi bagian terindah dalam hidupku. Aku akan terus berusaha membuatmu tersenyum, Lidya. Hari ini, esok, dan selamanya.
                    </p>
                  </div>

                  <div className="mt-14 text-right relative z-10">
                    <p className="font-sans text-xs tracking-widest uppercase text-pink-400 mb-2 font-semibold">Selamanya milik kamu,</p>
                    <p className="font-script text-5xl text-pink-600">Aku 🤍</p>
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
