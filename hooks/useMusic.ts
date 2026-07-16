"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Inisialisasi Audio
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const attemptPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsActive(true);
          document.removeEventListener("touchstart", attemptPlay);
          document.removeEventListener("click", attemptPlay);
        }).catch(() => {
          // Abaikan error, tunggu klik selanjutnya
        });
      }
    };

    // Lapis 1: Pasif Listener
    document.addEventListener("touchstart", attemptPlay, { passive: true });
    document.addEventListener("click", attemptPlay);

    // Lapis 2: Sinkronisasi Global
    const handlePauseBGM = () => audioRef.current?.pause();
    const handleResumeBGM = () => {
      if (isActive && audioRef.current?.paused) audioRef.current?.play().catch(()=>{});
    };
    
    // Lapis 3: Force Play dari Komponen Lain (seperti WelcomeToast)
    const handleForcePlay = () => attemptPlay();

    window.addEventListener("pause-bgm", handlePauseBGM);
    window.addEventListener("resume-bgm", handleResumeBGM);
    window.addEventListener("force-play-bgm", handleForcePlay);

    return () => {
      document.removeEventListener("touchstart", attemptPlay);
      document.removeEventListener("click", attemptPlay);
      window.removeEventListener("pause-bgm", handlePauseBGM);
      window.removeEventListener("resume-bgm", handleResumeBGM);
      window.removeEventListener("force-play-bgm", handleForcePlay);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [isActive, src]);

  // Fungsi Force Toggle untuk Ikon Speaker
  const toggleMuteOrPlay = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().then(() => setIsActive(true)).catch(()=>{});
        audioRef.current.volume = 0.5;
        setVolume(0.5);
        setIsMuted(false);
      } else {
        const newMuteState = !isMuted;
        audioRef.current.volume = newMuteState ? 0 : 0.5;
        setVolume(newMuteState ? 0 : 0.5);
        setIsMuted(newMuteState);
      }
    }
  }, [isMuted]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume > 0 && audioRef.current.paused) {
         audioRef.current.play().then(() => setIsActive(true)).catch(()=>{});
      }
    }
    setIsMuted(newVolume === 0);
  }, []);

  return { volume, isMuted, isActive, toggleMuteOrPlay, changeVolume };
}
