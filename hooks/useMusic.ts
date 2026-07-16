"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useMusic(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const startAudioEngine = () => {
      if (!isActive && audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsActive(true);
              document.removeEventListener("touchstart", startAudioEngine);
              document.removeEventListener("click", startAudioEngine);
              document.removeEventListener("scroll", startAudioEngine);
            })
            .catch(() => { /* Autoplay terblokir, tunggu interaksi */ });
        }
      }
    };

    document.addEventListener("touchstart", startAudioEngine, { passive: true });
    document.addEventListener("click", startAudioEngine);
    document.addEventListener("scroll", startAudioEngine, { passive: true });

    // Event Global untuk sinkronisasi dengan VideoCarousel
    const handlePauseBGM = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    };

    const handleResumeBGM = () => {
      if (audioRef.current && audioRef.current.paused && isActive) {
        audioRef.current.play().catch(() => {});
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
  }, [isActive, src]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  }, []);

  return { volume, isMuted, isActive, changeVolume };
}
