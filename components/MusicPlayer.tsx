"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { Howl } from "howler";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const bgm = new Howl({
      src: ["/audio/bgm.mp3"], // Pastikan file berada di folder public/audio/
      loop: true,
      volume: 0.5,
      html5: true, // Force HTML5 untuk menghindari masalah audio di iOS
    });

    setSound(bgm);

    return () => {
      bgm.unload();
    };
  }, []);

  const togglePlay = () => {
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onClick={togglePlay}
      className="fixed bottom-8 right-8 z-50 glass-panel p-5 rounded-full flex items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300 shadow-[0_0_20px_rgba(255,192,203,0.3)] group"
    >
      {isPlaying ? (
        <Pause size={24} className="text-white group-hover:scale-110 transition-transform" />
      ) : (
        <Play size={24} className="text-white group-hover:scale-110 transition-transform ml-1" />
      )}
      
      <div className="relative">
        <Music size={20} className="text-pink-300" />
        {isPlaying && (
          <span className="absolute top-0 right-0 w-full h-full animate-ping rounded-full bg-pink-400 opacity-40"></span>
        )}
      </div>
    </motion.button>
  );
}
