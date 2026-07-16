"use client";

import { useState, useEffect, useRef } from "react";

export type QualityLevel = "high" | "medium" | "low";

/**
 * Custom Hook untuk memonitor Frame Per Second (FPS).
 * Menurunkan kualitas visual secara otomatis jika terdeteksi lag.
 */
export function usePerformanceMonitor(): QualityLevel {
  const [quality, setQuality] = useState<QualityLevel>("high");
  const frames = useRef(0);
  const prevTime = useRef(performance.now());
  const lowFpsCount = useRef(0);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    // Hindari menjalankan monitor di server
    if (typeof window === "undefined") return;

    const checkFPS = () => {
      const time = performance.now();
      frames.current += 1;

      // Evaluasi FPS setiap detik
      if (time >= prevTime.current + 1000) {
        const fps = (frames.current * 1000) / (time - prevTime.current);
        
        if (fps < 30) {
          lowFpsCount.current += 1;
        } else if (fps > 50) {
          lowFpsCount.current = Math.max(0, lowFpsCount.current - 1);
        }

        // Degradasi Elegan (Downgrade)
        if (lowFpsCount.current > 3 && quality === "high") {
          setQuality("medium");
        } else if (lowFpsCount.current > 6 && quality !== "low") {
          setQuality("low");
        }

        prevTime.current = time;
        frames.current = 0;
      }

      animationFrameId.current = requestAnimationFrame(checkFPS);
    };

    animationFrameId.current = requestAnimationFrame(checkFPS);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [quality]);

  return quality;
}
