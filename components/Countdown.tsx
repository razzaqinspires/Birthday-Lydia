"use client";

import { useCountdown } from "../hooks/useCountdown";
import { motion } from "framer-motion";

interface TimeBoxProps {
  value: number;
  label: string;
}

const TimeBox = ({ value, label }: TimeBoxProps) => (
  <div 
    className="glass-panel flex flex-col items-center justify-center w-20 h-24 md:w-32 md:h-36 relative overflow-hidden group border-white/50"
    role="timer"
    aria-label={`${value} ${label}`}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-pink-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    <span className="font-serif text-3xl md:text-6xl font-medium text-pink-600 z-10" aria-hidden="true">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="font-sans text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2 md:mt-3 text-pink-500 z-10" aria-hidden="true">
      {label}
    </span>
  </div>
);

export default function Countdown() {
  const { time, isMounted } = useCountdown("2027-03-08T00:00:00");

  if (!isMounted) {
    return (
      <div className="py-24 flex flex-col items-center min-h-[30vh] justify-center" aria-busy="true">
        <div className="w-8 h-8 border-y-2 border-pink-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-20 md:py-24 flex flex-col items-center z-10 relative px-4 w-full max-w-[100vw]">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full max-w-3xl"
      >
        <header className="text-center mb-8 md:mb-12">
          <h2 className="font-script text-4xl md:text-6xl mb-2 text-pink-600">
            Menunggu Hari Spesial
          </h2>
          <p className="font-sans text-[10px] md:text-xs tracking-widest text-pink-900/50 uppercase">
            Setiap detik begitu berharga, kamu tahu itu kan?
          </p>
        </header>
        
        <div className="flex gap-2 md:gap-6 flex-wrap justify-center w-full">
          <TimeBox value={time.days} label="Hari" />
          <TimeBox value={time.hours} label="Jam" />
          <TimeBox value={time.minutes} label="Menit" />
          <TimeBox value={time.seconds} label="Detik" />
        </div>
      </motion.article>
    </div>
  );
}
