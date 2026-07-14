"use client";

import { useCountdown } from "../hooks/useCountdown";
import { motion } from "framer-motion";

interface TimeBoxProps {
  value: number;
  label: string;
}

const TimeBox = ({ value, label }: TimeBoxProps) => (
  <div className="glass-panel flex flex-col items-center justify-center w-24 h-28 md:w-32 md:h-36 relative overflow-hidden group border border-white">
    <div className="absolute inset-0 bg-gradient-to-b from-pink-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <span className="font-serif text-4xl md:text-6xl font-medium text-pink-600 drop-shadow-sm z-10">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-3 text-pink-400 z-10">
      {label}
    </span>
  </div>
);

export default function Countdown() {
  const { time, isMounted } = useCountdown("2027-03-08T00:00:00");

  if (!isMounted) {
    return (
      <section className="py-24 flex flex-col items-center z-10 relative min-h-[30vh] justify-center">
        <div className="w-10 h-10 border-y-2 border-pink-400 rounded-full animate-spin"></div>
      </section>
    );
  }

  return (
    <section className="py-24 flex flex-col items-center z-10 relative px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center w-full max-w-3xl"
      >
        <h2 className="font-script text-4xl md:text-6xl mb-2 text-pink-600 text-center">
          Menunggu Hari Spesial
        </h2>
        <p className="font-sans text-xs tracking-widest text-pink-900/50 uppercase mb-12 text-center">
          Setiap detik begitu berharga
        </p>
        
        <div className="flex gap-3 md:gap-6 flex-wrap justify-center w-full">
          <TimeBox value={time.days} label="Hari" />
          <TimeBox value={time.hours} label="Jam" />
          <TimeBox value={time.minutes} label="Menit" />
          <TimeBox value={time.seconds} label="Detik" />
        </div>
      </motion.div>
    </section>
  );
}
