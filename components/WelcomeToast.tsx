"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

export default function WelcomeToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Munculkan notifikasi setelah 2.5 detik
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Saat notifikasi ditutup, kita paksa musik untuk menyala!
  const handleClose = () => {
    setIsVisible(false);
    window.dispatchEvent(new Event("force-play-bgm"));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-4 left-4 right-4 md:left-auto md:right-8 md:top-8 z-[9999] md:w-96"
        >
          <div className="glass-panel p-4 bg-white/70 border border-white/80 shadow-[0_20px_40px_rgba(225,150,180,0.2)] flex items-start gap-4">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 border border-pink-200">
              <Heart size={18} className="text-pink-500 fill-pink-500 animate-pulse" />
            </div>
            
            <div className="flex-1 pt-1">
              <h4 className="font-serif font-bold text-pink-900 text-base mb-1">Hai, Kesayanganku! 🎀</h4>
              <p className="font-sans text-xs text-pink-800/80 leading-relaxed">
                Selamat datang di tempat rahasia yang aku buat khusus untuk kamu. Jangan lupa scroll ke bawah ya, sayang.
              </p>
            </div>

            <button 
              onClick={handleClose}
              className="text-pink-400 hover:text-pink-600 transition-colors p-1 bg-white/50 rounded-full"
              aria-label="Tutup notifikasi dan putar musik"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
