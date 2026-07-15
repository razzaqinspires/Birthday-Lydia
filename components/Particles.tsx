"use client";

import { useEffect, useState } from "react";

export default function Particles() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Elemen partikel mewah & estetik
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 12 + 10}s`,
    animationDelay: `-${Math.random() * 10}s`,
    scale: Math.random() * 0.5 + 0.3,
    type: Math.random() > 0.6 ? "✨" : (Math.random() > 0.5 ? "🌸" : "🤍"),
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style suppressHydrationWarning>{`
        @keyframes floatLuxury {
          0% {
            transform: translateY(110vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% {
            transform: translateY(-10vh) translateX(30px) rotate(360deg);
            opacity: 0;
          }
        }
        .particle-luxury {
          position: absolute;
          top: 0;
          font-size: 1.8rem;
          will-change: transform, opacity;
          animation: floatLuxury linear infinite;
          filter: drop-shadow(0 4px 6px rgba(255, 255, 255, 0.5));
        }
        /* Utilitas 3D untuk Mini Game */
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* Ornamen cahaya ambient mewah */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[120px]"></div>

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
