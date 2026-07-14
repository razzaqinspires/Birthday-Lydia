"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center items-center text-center relative z-10 px-6 overflow-hidden">
      
      {/* Efek Aurora Magis di Latar Belakang Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-pink-600/30 rounded-full blur-[120px] -top-20 -left-20 mix-blend-screen"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute w-[500px] h-[500px] bg-purple-700/30 rounded-full blur-[100px] bottom-0 right-0 mix-blend-screen"
        />
      </div>

      <motion.div
        className="glass-panel p-12 md:p-24 rounded-[3rem] w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative z-10"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-6"
        >
          <span className="font-script text-4xl md:text-5xl text-pink-300 drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">
            Teruntuk yang paling spesial,
          </span>
        </motion.div>
        
        <motion.h1
          className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-medium tracking-tight text-white leading-none mb-6 drop-shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Happy Birthday,<br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-200">Cici.</span>
        </motion.h1>
        
        <motion.div
          className="h-[1px] w-32 bg-gradient-to-r from-transparent via-pink-300 to-transparent my-6"
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          transition={{ delay: 1.2, duration: 1.5 }}
        />
      </motion.div>
    </section>
  );
}
