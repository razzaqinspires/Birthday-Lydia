"use client";

import { useCountdown } from "../hooks/useCountdown";
import { motion } from "framer-motion";

interface TimeBoxProps {
  value: number;
  label: string;
}

const TimeBox = ({ value, label }: TimeBoxProps) => (
  <div className="glass-panel flex flex-col items-center justify-center w-28 h-32 md:w-36 md:h-44 rounded-2xl relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <span className="font-serif text-5xl md:text-7xl font-light text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)] z-10">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="font-sans text-[10px] md:text-xs font-medium uppercase tracking-[0.4em] mt-4 text-pink-200/70 z-10">
      {label}
    </span>
    {/* Garis glowing halus di bawah angka */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-pink-400/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
  </div>
);

export default function Countdown() {
  const { time, isMounted } = useCountdown("2027-03-08T00:00:00");

  if (!isMounted) {
    return (
      <section className="py-32 flex flex-col items-center z-10 relative min-h-[40vh] justify-center">
        <div className="w-12 h-12 border-y-2 border-pink-300 rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="py-32 flex flex-col items-center z-10 relative px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center w-full max-w-5xl"
      >
        <h2 className="font-script text-4xl md:text-6xl mb-4 text-pink-300 text-center">
          Menghitung Waktu
        </h2>
        <p className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-white/50 mb-16 text-center">
          Menuju hari yang paling ditunggu
        </p>
        
        <div className="flex gap-4 md:gap-8 flex-wrap justify-center w-full">
          <TimeBox value={time.days} label="Hari" />
          <TimeBox value={time.hours} label="Jam" />
          <TimeBox value={time.minutes} label="Menit" />
          <TimeBox value={time.seconds} label="Detik" />
        </div>
      </motion.div>
    </section>
  );
}
