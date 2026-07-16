"use client";

import { useState, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Mengambil elemen HTML murni (Menembus blokade browser)
    const audio = document.getElementById("global-bgm") as HTMLAudioElement;
    if (!audio) return;

    audio.volume = volume;

    const handlePlay = () => setIsActive(true);
    const handlePause = () => setIsActive(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Auto-play instan saat layar disentuh di mana saja
    const playOnInteraction = () => {
      if (audio.paused && !isMuted) {
        const promise = audio.play();
        if (promise !== undefined) {
          promise.then(() => {
            document.removeEventListener("click", playOnInteraction);
            document.removeEventListener("touchstart", playOnInteraction);
          }).catch(() => {});
        }
      }
    };

    document.addEventListener("click", playOnInteraction);
    document.addEventListener("touchstart", playOnInteraction, { passive: true });

    // Sinkronisasi dengan VideoCarousel (BGM mati saat video nyala)
    const pauseBgm = () => audio.pause();
    const resumeBgm = () => { if (!isMuted) audio.play().catch(()=>{}); };

    window.addEventListener("pause-bgm", pauseBgm);
    window.addEventListener("resume-bgm", resumeBgm);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      document.removeEventListener("click", playOnInteraction);
      document.removeEventListener("touchstart", playOnInteraction);
      window.removeEventListener("pause-bgm", pauseBgm);
      window.removeEventListener("resume-bgm", resumeBgm);
    };
  }, [volume, isMuted]);

  // Fungsi memaksa musik menyala dari ikon speaker
  const toggleMuteOrPlay = () => {
    const audio = document.getElementById("global-bgm") as HTMLAudioElement;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(()=>{});
      setIsMuted(false);
      if (volume === 0) setVolume(0.5);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  const changeVolume = (val: number) => {
    setVolume(val);
    setIsMuted(val === 0);
    const audio = document.getElementById("global-bgm") as HTMLAudioElement;
    if (audio) {
      audio.volume = val;
      if (val > 0 && audio.paused) {
        audio.play().catch(()=>{});
      }
    }
  };

  return (
    <>
      {/* NATIVE HTML AUDIO TAG (Kunci anti-gagal autoplay) */}
      <audio id="global-bgm" src="/audio/bgm.mp3" loop preload="auto" />

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
            type="range" min="0" max="1" step="0.05" 
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
    </>
  );
}
