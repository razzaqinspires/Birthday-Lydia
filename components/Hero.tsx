"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center text-center relative z-10 px-4 md:px-6 w-full max-w-[100vw] overflow-hidden">
      <motion.article
        className="glass-panel p-8 md:p-24 w-full max-w-4xl flex flex-col items-center justify-center relative bg-white/40 border-white/60 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <header className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-4 md:mb-6"
          >
            <span className="font-script text-4xl md:text-5xl lg:text-6xl text-pink-500 font-bold tracking-wide">
              Teruntuk bidadariku,
            </span>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl lg:text-[7rem] font-serif font-bold tracking-tight text-pink-900 leading-none mb-4 md:mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Happy Birthday,<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600 block mt-2">Lidya 🤍</span>
          </motion.h1>
          
          <motion.p
            className="mt-2 md:mt-4 text-xs md:text-sm font-sans tracking-[0.2em] md:tracking-[0.3em] uppercase text-pink-800/60 font-medium max-w-xs md:max-w-none mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1.5 }}
          >
            Semesta tersenyum saat kamu lahir ke dunia, sayang.
          </motion.p>
        </header>
      </motion.article>
    </div>
  );
}
