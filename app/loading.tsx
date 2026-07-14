"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#0f0c29] text-white z-50 fixed top-0 left-0">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="text-6xl mb-6"
      >
        ❤️
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-lg font-medium tracking-widest uppercase text-pink-300"
      >
        Loading Love...
      </motion.p>
    </div>
  );
}
