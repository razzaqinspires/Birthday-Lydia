"use client";

import { useEffect, useState } from "react";

// Zero-Lag CSS Particle System (Hardware Accelerated)
export default function Particles() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Membuat partikel acak hanya di klien untuk mencegah Hydration Error
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 10}s`, // 10s - 20s
    animationDelay: `-${Math.random() * 10}s`,
    scale: Math.random() * 0.6 + 0.4,
    type: Math.random() > 0.5 ? "🌸" : "✨",
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 
        INJEKSI CSS MURNI: Sangat ringan karena di-render oleh GPU, bukan CPU JS.
        Ini yang membuat animasi menjadi 60fps tanpa lag sama sekali.
      */}
      <style suppressHydrationWarning>{`
        @keyframes floatUpSoftly {
          0% {
            transform: translateY(110vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        .particle-cute {
          position: absolute;
          top: 0;
          font-size: 1.5rem;
          will-change: transform, opacity;
          animation: floatUpSoftly linear infinite;
          filter: drop-shadow(0 2px 4px rgba(244, 114, 182, 0.3));
        }
      `}</style>

      {/* Ornamen cahaya blur statis di sudut agar aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300/30 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-300/30 rounded-full blur-[100px]"></div>

      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-cute"
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
