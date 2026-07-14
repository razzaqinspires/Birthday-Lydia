"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { motion } from "framer-motion";

interface TimeBoxProps {
  value: number;
  label: string;
}

const TimeBox = ({ value, label }: TimeBoxProps) => (
  <div className="glass-panel flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-3xl relative overflow-hidden group">
    <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500"></div>
    <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-100 to-purple-300 drop-shadow-lg z-10">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] mt-3 text-pink-200/80 z-10">
      {label}
    </span>
  </div>
);

export default function Countdown() {
  const { time, isMounted } = useCountdown("2027-03-08T00:00:00");

  if (!isMounted) {
    return (
      <section className="py-32 flex flex-col items-center z-10 relative min-h-[40vh] justify-center">
        <div className="w-8 h-8 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="py-32 flex flex-col items-center z-10 relative px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-white/90 tracking-wide text-center drop-shadow-md">
          Menuju Hari Paling Spesial ✨
        </h2>
        
        <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
          <TimeBox value={time.days} label="Hari" />
          <TimeBox value={time.hours} label="Jam" />
          <TimeBox value={time.minutes} label="Menit" />
          <TimeBox value={time.seconds} label="Detik" />
        </div>
      </motion.div>
    </section>
  );
}
