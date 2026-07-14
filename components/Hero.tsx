"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center items-center text-center relative z-10 px-6">
      
      <motion.div
        className="glass-panel p-10 md:p-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-4"
        >
          <span className="font-script text-4xl md:text-5xl text-pink-500 font-bold tracking-wide">
            Teruntuk bidadariku,
          </span>
        </motion.div>
        
        <motion.h1
          className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-bold tracking-tight text-pink-900 leading-none mb-6 drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Happy Birthday,<br />
          <span className="italic text-pink-600">Cici 🎀</span>
        </motion.h1>
        
        <motion.p
          className="mt-2 text-sm md:text-base font-sans tracking-[0.2em] uppercase text-pink-700/60 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
        >
          Semesta tersenyum saat kamu lahir ke dunia
        </motion.p>
      </motion.div>
    </section>
  );
}
