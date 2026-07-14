"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Mendefinisikan tipe data untuk sistem partikel
type ParticleType = "sakura" | "heart" | "star";

interface Particle {
  id: number;
  type: ParticleType;
  startX: number;
  startY: number;
  scale: number;
  duration: number;
  delay: number;
}

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Mencegah Hydration Mismatch dengan meng-generate data random hanya di sisi Client
    if (typeof window !== "undefined") {
      const generateParticles = (): Particle[] => {
        const newParticles: Particle[] = [];
        const types: ParticleType[] = ["sakura", "heart", "star"];
        
        // Membatasi 30 partikel agar menjaga 60fps di HP (iPhone/Android)
        for (let i = 0; i < 30; i++) {
          newParticles.push({
            id: i,
            type: types[Math.floor(Math.random() * types.length)],
            startX: Math.random() * window.innerWidth,
            startY: Math.random() * window.innerHeight,
            scale: Math.random() * 0.8 + 0.4, // Ukuran bervariasi antara 0.4x hingga 1.2x
            duration: Math.random() * 10 + 10, // Durasi animasi 10-20 detik
            delay: Math.random() * 5, // Delay agar tidak muncul bersamaan
          });
        }
        return newParticles;
      };

      setParticles(generateParticles());
    }
  }, []);

  // Jangan render apapun di server untuk mencegah Hydration Error
  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => {
        // Logika pergerakan berdasarkan tipe elemen
        let animateProps = {};
        let initialProps = {};

        if (particle.type === "sakura") {
          // Sakura jatuh dari atas ke bawah sambil berputar
          initialProps = { y: -50, x: particle.startX, opacity: 0, rotate: 0, scale: particle.scale };
          animateProps = { 
            y: window.innerHeight + 100, 
            x: particle.startX + (Math.random() * 200 - 100), // Berayun ke kiri/kanan
            opacity: [0, 1, 1, 0], 
            rotate: 360 
          };
        } else if (particle.type === "heart") {
          // Hati melayang dari bawah ke atas seperti balon
          initialProps = { y: window.innerHeight + 50, x: particle.startX, opacity: 0, scale: particle.scale };
          animateProps = { 
            y: -100, 
            x: particle.startX + (Math.random() * 100 - 50),
            opacity: [0, 1, 0.8, 0],
          };
        } else if (particle.type === "star") {
          // Bintang berkelip dan bergerak sangat lambat
          initialProps = { y: particle.startY, x: particle.startX, opacity: 0, scale: particle.scale };
          animateProps = {
            opacity: [0, 1, 0.2, 1, 0],
            scale: [particle.scale, particle.scale * 1.5, particle.scale],
            y: particle.startY - 50,
          };
        }

        const emojis = { sakura: "🌸", heart: "💖", star: "✨" };

        return (
          <motion.div
            key={particle.id}
            className="absolute text-2xl drop-shadow-lg"
            initial={initialProps}
            animate={animateProps}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          >
            {emojis[particle.type]}
          </motion.div>
        );
      })}
    </div>
  );
}
