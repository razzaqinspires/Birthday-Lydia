"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- SYNTHESIZER SOUND ENGINE (Full Coding Tanpa File Eksternal) ---
const playTone = (frequency: number, type: OscillatorType, duration: number, vol = 0.1) => {
  if (typeof window === "undefined") return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Abaikan jika browser tidak mendukung
  }
};

const playFlipSound = () => playTone(600, "sine", 0.1, 0.05);
const playMatchSound = () => {
  playTone(523.25, "sine", 0.3, 0.05); // C5
  setTimeout(() => playTone(659.25, "sine", 0.4, 0.05), 100); // E5
  setTimeout(() => playTone(783.99, "sine", 0.5, 0.05), 200); // G5
};
const playWinSound = () => {
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    setTimeout(() => playTone(freq, "triangle", 0.5, 0.1), i * 150);
  });
};
// -------------------------------------------------------------------

const CARDS_DATA = ["💖", "🎀", "🌸", "💍", "💌", "🦋"];

export default function MiniGame() {
  const [cards, setCards] = useState<{ id: number; icon: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...CARDS_DATA, ...CARDS_DATA]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    playFlipSound();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves((prev) => prev + 1);
      checkForMatch(newFlippedIndices, newCards);
    }
  };

  const checkForMatch = (indices: number[], currentCards: any[]) => {
    const [first, second] = indices;

    if (currentCards[first].icon === currentCards[second].icon) {
      playMatchSound();
      const newCards = [...currentCards];
      newCards[first].isMatched = true;
      newCards[second].isMatched = true;
      setCards(newCards);
      setFlippedIndices([]);

      // Cek Menang
      if (newCards.every((card) => card.isMatched)) {
        setTimeout(() => {
          playWinSound();
          setIsWon(true);
        }, 500);
      }
    } else {
      // Tutup kembali jika tidak cocok
      setTimeout(() => {
        const resetCards = [...currentCards];
        resetCards[first].isFlipped = false;
        resetCards[second].isFlipped = false;
        setCards(resetCards);
        setFlippedIndices([]);
      }, 1000);
    }
  };

  return (
    <section className="py-32 z-10 relative flex flex-col items-center px-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-4xl md:text-5xl text-pink-900 mb-2 font-bold">Memory of Love</h2>
        <p className="font-sans text-xs tracking-widest text-pink-700/60 uppercase">Mainkan untuk sebuah kejutan, Lidya</p>
      </motion.div>

      <div className="glass-panel p-8 md:p-12 max-w-2xl w-full flex flex-col items-center bg-white/30 border border-white shadow-[0_20px_50px_rgba(200,100,150,0.15)]">
        <div className="flex justify-between w-full mb-8 font-sans font-medium text-pink-800">
          <span>Langkah: {moves}</span>
          {isWon && <span className="text-pink-500 font-bold animate-pulse">Berhasil! 🤍</span>}
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="relative aspect-[3/4] w-full cursor-pointer perspective-1000"
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-full h-full absolute preserve-3d"
                initial={false}
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Bagian Belakang Kartu (Ketutup) */}
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-pink-200 to-pink-300 rounded-xl border-2 border-white/50 shadow-md flex items-center justify-center">
                  <span className="font-script text-3xl text-white opacity-50">L</span>
                </div>
                {/* Bagian Depan Kartu (Terbuka) */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl border-2 border-pink-100 shadow-md flex items-center justify-center text-4xl md:text-5xl">
                  {card.icon}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {isWon && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={initializeGame}
            className="mt-10 px-8 py-3 bg-pink-500 text-white font-sans font-medium rounded-full shadow-[0_5px_15px_rgba(236,72,153,0.4)] hover:bg-pink-600 transition-colors"
          >
            Main Lagi, Sayang?
          </motion.button>
        )}
      </div>
    </section>
  );
}
