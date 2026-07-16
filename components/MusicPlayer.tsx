"use client";

import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useMusic } from "../hooks/useMusic";

export default function MusicPlayer() {
  const { volume, isMuted, isActive, toggleMuteOrPlay, changeVolume } = useMusic("/audio/bgm.mp3");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100]"
      role="region"
      aria-label="Kontrol Audio"
    >
      <div className="glass-panel px-3 py-2 md:px-4 md:py-3 flex items-center gap-3 md:gap-4 bg-white/60 border border-white shadow-lg relative overflow-hidden">
        {isActive && !isMuted && (
          <div className="absolute left-3 md:left-4 w-4 h-4 md:w-5 md:h-5 bg-pink-400/20 rounded-full animate-ping pointer-events-none" aria-hidden="true"></div>
        )}
        
        {/* Tombol ini sekarang berfungsi memaksa lagu berputar jika browser memblokirnya */}
        <button 
          onClick={toggleMuteOrPlay}
          aria-label={isMuted || !isActive ? "Bunyikan Musik" : "Bisukan Musik"}
          className="relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-full p-1"
        >
          {isMuted || !isActive ? (
            <VolumeX size={16} className="text-pink-600 md:w-[18px] md:h-[18px]" />
          ) : (
            <Volume2 size={16} className="text-pink-600 md:w-[18px] md:h-[18px]" />
          )}
        </button>
        
        <input 
          type="range" 
          min="0" max="1" step="0.05" 
          value={volume}
          onChange={(e) => changeVolume(parseFloat(e.target.value))}
          className="volume-slider relative z-10 w-16 md:w-20"
          aria-label="Volume Musik"
        />

        <div className="pl-2 border-l border-pink-200 relative z-10" aria-hidden="true">
          <Music size={14} className={`${isActive && !isMuted ? 'text-pink-600 animate-pulse' : 'text-gray-400'} transition-colors md:w-[16px] md:h-[16px]`} />
        </div>
      </div>
    </motion.div>
  );
}
