"use client";

import { useEffect, useState, useMemo } from "react";
import { usePerformance } from "../contexts/PerformanceContext";

export default function Particles() {
  const [isMounted, setIsMounted] = useState(false);
  const { quality } = usePerformance();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mengurangi jumlah partikel secara otomatis berdasarkan kualitas FPS
  const particleCount = useMemo(() => {
    if (quality === "low") return 0; // Matikan partikel untuk performa maksimal
    if (quality === "medium") return 10;
    return 25; // High
  }, [quality]);

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 12 + 10}s`,
      animationDelay: `-${Math.random() * 10}s`,
      scale: Math.random() * 0.5 + 0.3,
      type: Math.random() > 0.6 ? "✨" : (Math.random() > 0.5 ? "🌸" : "🤍"),
    }));
  }, [particleCount]);

  if (!isMounted || particleCount === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <style suppressHydrationWarning>{`
        @keyframes floatLuxury {
          0% { transform: translateY(110vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-10vh) translateX(30px) rotate(360deg); opacity: 0; }
        }
        .particle-luxury {
          position: absolute;
          top: 0;
          font-size: 1.5rem;
          will-change: transform, opacity;
          animation: floatLuxury linear infinite;
        }
      `}</style>

      {quality === "high" && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-pink-200/40 rounded-full blur-[100px] md:blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-rose-200/30 rounded-full blur-[100px] md:blur-[120px]"></div>
        </>
      )}

      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-luxury"
          style={{
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            transform: `scale(${p.scale})`,
          }}
        >
          {p.type}
        </div>
      ))}
    </div>
  );
}
