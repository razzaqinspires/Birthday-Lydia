"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";
import { Howl } from "howler";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sound, setSound] = useState<Howl | null>(null);
  
  // Ref untuk mencegah pemanggilan play() berkali-kali pada scroll yang sama
  const hasInteracted = useRef(false);

  useEffect(() => {
    const bgm = new Howl({
      src: ["/audio/bgm.mp3"],
      loop: true,
      volume: 0.6,
      html5: true, // Wajib true untuk menghindari bug autoplay di mobile/iOS
    });

    setSound(bgm);

    // Engine "Smart Autoplay" - Memicu musik pada interaksi pertama (scroll/touch)
    const handleFirstInteraction = () => {
      if (!hasInteracted.current && !bgm.playing()) {
        hasInteracted.current = true;
        bgm.play();
        setIsPlaying(true);
        
        // Membersihkan event listener agar memori tetap ringan setelah musik menyala
        window.removeEventListener("scroll", handleFirstInteraction);
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      }
    };

    // Pasang mata-mata pada aktivitas pengguna
    // Saat mereka men-scroll ke bawah melihat Album, ini akan langsung tertrigger!
    window.addEventListener("scroll", handleFirstInteraction, { once: true, passive: true });
    window.addEventListener("click", handleFirstInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true, passive: true });

    return () => {
      bgm.unload();
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (!sound) return;

    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
      // Jika user sengaja mem-pause, jangan biarkan scroll menyalakannya lagi
      hasInteracted.current = true; 
    } else {
      sound.play();
      setIsPlaying(true);
      hasInteracted.current = true;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      className="fixed bottom-8 right-8 z-[100] group"
    >
      {/* Efek Gelombang Suara (Aura) yang menyala saat musik berputar */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 rounded-full bg-pink-500/20 blur-md -z-10"
          />
        )}
      </AnimatePresence>

      <button
        onClick={togglePlay}
        className="glass-panel p-4 md:p-5 rounded-full flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-[0_0_30px_rgba(244,114,182,0.4)] border border-pink-200/20 relative bg-black/20 backdrop-blur-xl"
      >
        {isPlaying ? (
          <Pause size={22} className="text-pink-100 group-hover:scale-110 transition-transform" />
        ) : (
          <Play size={22} className="text-pink-100 group-hover:scale-110 transition-transform ml-1" />
        )}
        
        <div className="relative flex items-center justify-center">
          <Music size={18} className={`${isPlaying ? 'text-pink-300' : 'text-gray-400'} transition-colors duration-500`} />
        </div>
      </button>
    </motion.div>
  );
}
