"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center items-center text-center relative z-10 px-6">
      <motion.div
        className="glass-panel p-12 md:p-24 rounded-[3rem] w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 pointer-events-none"></div>
        
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Happy Birthday ❤️
        </motion.h1>
        
        <motion.p
          className="mt-8 text-xl md:text-3xl text-white/90 font-light tracking-wide max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Untuk manusia paling spesial di alam semesta.
        </motion.p>
      </motion.div>
    </section>
  );
}
