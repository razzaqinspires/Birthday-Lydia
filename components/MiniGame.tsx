"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useMiniGame } from "../hooks/useMiniGame";
import { usePerformance } from "../contexts/PerformanceContext";

const CARDS_DATA = ["💖", "🎀", "🌸", "💍", "💌", "🦋"];

export default function MiniGame() {
  const { cards, moves, isWon, handleCardClick, initializeGame } = useMiniGame(CARDS_DATA);
  const { quality } = usePerformance();
  const animationProps = quality === "low" ? { opacity: 1, y: 0 } : undefined;

  // Render sisi klien saja
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  if (cards.length === 0) return null; // Hydration safe

  return (
    <article className="py-24 md:py-32 z-10 relative flex flex-col items-center px-4 w-full max-w-[100vw]">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={animationProps || { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-10 md:mb-12 px-2"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-pink-900 mb-2 font-bold">Memory of Love</h2>
        <p className="font-sans text-[10px] md:text-xs tracking-widest text-pink-700/60 uppercase">Mainkan untuk sebuah kejutan, Lidya</p>
      </motion.header>

      <div className="glass-panel p-6 md:p-12 max-w-2xl w-full flex flex-col items-center bg-white/50 border border-white/80 shadow-[0_10px_30px_rgba(200,100,150,0.1)]">
        <header className="flex justify-between w-full mb-6 md:mb-8 font-sans font-medium text-pink-800 text-xs md:text-sm">
          <span aria-live="polite">Langkah: {moves}</span>
          {isWon && <span className="text-pink-600 font-bold animate-pulse" aria-live="assertive">Berhasil, kamu hebat! 🤍</span>}
        </header>

        <div 
          className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 w-full"
          role="grid"
          aria-label="Papan Permainan Memory Match"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] w-full perspective-1000"
              role="gridcell"
            >
              <button
                className="w-full h-full relative focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 rounded-lg md:rounded-xl"
                onClick={() => handleCardClick(index)}
                aria-label={`Kartu ${index + 1}. ${card.isFlipped || card.isMatched ? `Terbuka: ${card.icon}` : 'Tertutup'}`}
                disabled={card.isFlipped || card.isMatched}
              >
                <motion.div
                  className="w-full h-full absolute preserve-3d"
                  initial={false}
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  transition={{ duration: 0.3, type: "tween" }} // Tween lebih ringan dari Spring
                >
                  {/* Backface */}
                  <div 
                    className="absolute w-full h-full backface-hidden bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg md:rounded-xl border border-white shadow-sm flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="font-script text-xl md:text-3xl text-pink-300">L</span>
                  </div>
                  {/* Frontface */}
                  <div 
                    className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg md:rounded-xl border border-pink-50 shadow-sm flex items-center justify-center text-3xl md:text-5xl"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </div>
                </motion.div>
              </button>
            </div>
          ))}
        </div>

        {isWon && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={initializeGame}
            className="mt-8 md:mt-10 px-6 py-2.5 md:px-8 md:py-3 bg-pink-500 text-white font-sans text-xs md:text-sm font-medium rounded-full shadow-md hover:bg-pink-600 transition-colors focus:ring-4 focus:ring-pink-300"
          >
            Main Lagi, Sayang?
          </motion.button>
        )}
      </div>
    </article>
  );
}
