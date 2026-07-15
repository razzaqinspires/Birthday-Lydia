"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(false); // Penanda musik sudah jalan

  useEffect(() => {
    const audio = new Audio("/audio/bgm.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Sistem Pintar: Musik otomatis menyala pada sentuhan/interaksi pertama
    const startAudioEngine = () => {
      if (!isActive && audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsActive(true);
            document.removeEventListener("touchstart", startAudioEngine);
            document.removeEventListener("click", startAudioEngine);
            document.removeEventListener("scroll", startAudioEngine);
          }).catch(() => { /* Browser menolak, tunggu interaksi berikutnya */ });
        }
      }
    };

    document.addEventListener("touchstart", startAudioEngine, { passive: true });
    document.addEventListener("click", startAudioEngine);
    document.addEventListener("scroll", startAudioEngine, { passive: true });

    // Sistem Sinkronisasi Global (Mendengarkan Sinyal dari Video Carousel)
    const handlePauseBGM = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    };

    const handleResumeBGM = () => {
      if (audioRef.current && audioRef.current.paused && isActive) {
        audioRef.current.play();
      }
    };

    window.addEventListener("pause-bgm", handlePauseBGM);
    window.addEventListener("resume-bgm", handleResumeBGM);

    return () => {
      document.removeEventListener("touchstart", startAudioEngine);
      document.removeEventListener("click", startAudioEngine);
      document.removeEventListener("scroll", startAudioEngine);
      window.removeEventListener("pause-bgm", handlePauseBGM);
      window.removeEventListener("resume-bgm", handleResumeBGM);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [isActive]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-6 right-6 z-[100]"
    >
      <div className="glass-panel px-4 py-3 flex items-center gap-4 bg-white/40 border border-white/60 shadow-[0_10px_30px_rgba(200,100,150,0.15)] group relative overflow-hidden">
        {/* Indikator Gelombang Suara (Pulse) */}
        {isActive && !isMuted && (
          <div className="absolute left-4 w-5 h-5 bg-pink-400/20 rounded-full animate-ping pointer-events-none"></div>
        )}
        
        {isMuted ? (
          <VolumeX size={18} className="text-pink-600 relative z-10" />
        ) : (
          <Volume2 size={18} className="text-pink-600 relative z-10" />
        )}
        
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05" 
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider relative z-10"
        />

        <div className="pl-2 border-l border-pink-200 relative z-10">
          <Music size={16} className={`${isActive && !isMuted ? 'text-pink-600 animate-pulse' : 'text-gray-400'} transition-colors`} />
        </div>
      </div>
    </motion.div>
  );
}
