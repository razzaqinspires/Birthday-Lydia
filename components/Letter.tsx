"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(!isOpen);
    
    // Confetti Surprise Effect HANYA saat surat dibuka!
    if (!isOpen) {
      const end = Date.now() + 3 * 1000;
      const colors = ['#fbcfe8', '#f9a8d4', '#f472b6', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
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
          className="glass-panel bg-white/40 w-full p-10 md:p-16 cursor-pointer relative overflow-hidden group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(244,114,182,0.15)] border border-white"
          onClick={handleOpenLetter}
        >
          <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
            <motion.div
              animate={{ scale: isOpen ? 1.2 : 1, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center shadow-inner border-2 border-pink-200"
            >
              <span className="text-2xl">💌</span>
            </motion.div>
            
            <p className="font-sans text-xs tracking-widest uppercase text-pink-600 font-semibold group-hover:text-pink-500 transition-colors">
              {isOpen ? "" : "Sentuh untuk membuka surat"}
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
                <div className="mt-2 bg-white text-gray-800 p-8 md:p-12 rounded-2xl shadow-sm border border-pink-50 relative">
                  <h3 className="font-script text-4xl md:text-5xl text-pink-600 mb-6">
                    Halo Cici Manis,
                  </h3>
                  
                  <div className="font-sans text-sm md:text-base leading-loose text-gray-600 space-y-4 text-justify relative z-10">
                    <p>
                      Selamat bertambah usia, bidadariku. Semoga di tahun-tahun ke depan, senyummu semakin cerah, tawamu semakin lepas, dan kebahagiaan selalu memelukmu erat.
                    </p>
                    <p>
                      Website ini hanyalah hal kecil yang bisa aku buat untuk merayakan keberadaanmu. Tapi percayalah, perasaanku padamu jauh lebih besar dari sekadar barisan kode di layar ini.
                    </p>
                    <p>
                      Terima kasih sudah lahir ke dunia dan menjadi bagian terindah dalam hidupku. Aku akan terus berusaha membuatmu tersenyum, hari ini, esok, dan selamanya.
                    </p>
                  </div>

                  <div className="mt-12 text-right relative z-10">
                    <p className="font-sans text-xs tracking-widest uppercase text-pink-300 mb-2 font-semibold">Peluk cium dari,</p>
                    <p className="font-script text-4xl text-pink-500">Aku 🎀</p>
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
