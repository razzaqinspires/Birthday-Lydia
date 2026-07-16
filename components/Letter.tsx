"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePerformance } from "../contexts/PerformanceContext";

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);
  const { quality } = usePerformance();

  const handleOpenLetter = useCallback(async () => {
    setIsOpen(prev => !prev);
    
    // Dynamic import untuk canvas-confetti (Hanya di-load jika HP mampu dan surat ditekan)
    if (!isOpen && quality !== "low") {
      try {
        const confetti = (await import("canvas-confetti")).default;
        const end = Date.now() + 2 * 1000;
        const colors = ['#fce7f3', '#fbcfe8', '#f9a8d4', '#ffffff', '#e11d48'];

        (function frame() {
          confetti({ particleCount: 4, angle: 60, spread: 50, origin: { x: 0, y: 0.8 }, colors });
          confetti({ particleCount: 4, angle: 120, spread: 50, origin: { x: 1, y: 0.8 }, colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      } catch (e) {
        console.warn("Confetti failed to load");
      }
    }
  }, [isOpen, quality]);

  return (
    <article className="py-24 md:py-32 flex flex-col items-center justify-center z-10 relative px-4 md:px-6 w-full max-w-[100vw]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl"
      >
        <button 
          className="glass-panel bg-white/70 w-full p-8 md:p-16 cursor-pointer relative overflow-hidden group transition-shadow duration-500 hover:shadow-lg border-white/80 block text-left text-inherit focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300"
          onClick={handleOpenLetter}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Tutup surat cinta" : "Buka surat cinta"}
        >
          <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 relative z-10" aria-hidden="true">
            <motion.div
              animate={{ scale: isOpen ? 1.1 : 1, opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-50 to-rose-50 rounded-full flex items-center justify-center shadow-inner border border-white"
            >
              <span className="text-2xl md:text-3xl">💌</span>
            </motion.div>
            
            <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-pink-700 font-semibold group-hover:text-pink-500 transition-colors text-center">
              {isOpen ? "" : "Sentuh untuk membuka surat, sayang"}
            </p>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="overflow-hidden relative z-10"
              >
                <div className="mt-2 bg-white text-gray-800 p-6 md:p-12 rounded-xl md:rounded-2xl shadow-sm border border-pink-50 relative">
                  <h3 className="font-script text-3xl md:text-5xl text-pink-600 mb-6 md:mb-8">
                    Halo Lidya Kesayanganku,
                  </h3>
                  
                  <div className="font-sans text-xs md:text-sm leading-loose text-gray-700 space-y-4 md:space-y-5 text-justify relative z-10">
                    <p>Selamat bertambah usia, adek. Semoga di tahun-tahun ke depan, senyummu semakin cerah, tawamu semakin lepas, dan kebahagiaan selalu memelukmu erat.</p>
                    <p>Website ini hanyalah hal kecil yang bisa aku buat untuk merayakan keberadaan kamu. Tapi percayalah, perasaanku pada kamu jauh lebih besar dari sekadar barisan kode dan desain di layar ini.</p>
                    <p>Terima kasih sudah lahir ke dunia dan menjadi bagian terindah dalam hidupku. Aku akan terus berusaha membuatmu tersenyum, Lidya. Hari ini, esok, dan selamanya.</p>
                  </div>

                  <div className="mt-10 md:mt-14 text-right relative z-10">
                    <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-pink-400 mb-2 font-semibold">Selamanya milik kamu,</p>
                    <p className="font-script text-4xl md:text-5xl text-pink-600">Aku 🤍</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </article>
  );
}
