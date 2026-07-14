"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-40 flex flex-col items-center justify-center z-10 relative px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl"
      >
        <div 
          className="glass-panel w-full p-10 md:p-16 rounded-[2.5rem] cursor-pointer relative overflow-hidden group shadow-2xl transition-all duration-500 hover:shadow-pink-500/20 hover:border-pink-300/30"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col items-center justify-center space-y-6 relative z-10">
            <motion.div
              animate={{ 
                scale: isOpen ? 1.2 : 1,
                rotate: isOpen ? 0 : [0, 5, -5, 0]
              }}
              transition={{ repeat: isOpen ? 0 : Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Heart 
                size={64} 
                className={`${isOpen ? 'fill-pink-500 text-pink-500' : 'text-pink-300 group-hover:text-pink-200 group-hover:fill-pink-300/50'} transition-all duration-500`} 
              />
            </motion.div>
            <p className="text-sm md:text-base text-white/60 font-medium tracking-widest uppercase">
              {isOpen ? "Tutup Surat" : "Ketuk untuk Membuka Surat"}
            </p>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden relative z-10"
              >
                <div className="mt-10 bg-white/95 backdrop-blur-xl text-gray-800 p-8 md:p-12 rounded-2xl shadow-inner border border-gray-100">
                  <h3 className="mb-6 font-bold text-2xl md:text-3xl text-pink-900 border-b border-pink-100 pb-4">
                    Hai Sayang,
                  </h3>
                  <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-600 font-medium text-justify">
                    <p>
                      Selamat ulang tahun! Waktu terus berjalan menuju tanggal 8 Maret 2027, dan aku tidak sabar untuk merayakan momen berharga itu bersamamu.
                    </p>
                    <p>
                      Setiap baris kode di website ini aku tulis khusus untukmu. Mungkin ini bukan hadiah yang mewah, tapi ini adalah caraku mengabadikan perasaan dan waktu yang kita miliki.
                    </p>
                    <p>
                      Semoga kamu selalu bahagia, sehat, dan segala hal baik selalu mengelilingimu. Mari ukir lebih banyak kenangan bersama hingga hari itu tiba, dan seterusnya.
                    </p>
                  </div>
                  <p className="text-right font-bold text-pink-600 mt-10 text-xl font-serif italic">
                    - Yang selalu mencintaimu ❤️
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
