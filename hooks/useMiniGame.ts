"use client";

import { useState, useCallback } from "react";
import { playFlipSound, playMatchSound, playWinSound } from "../utils/audioSynth";

export interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function useMiniGame(cardIcons: string[]) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const initializeGame = useCallback(() => {
    const shuffledCards = [...cardIcons, ...cardIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false }));
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMoves(0);
    setIsWon(false);
    setIsLocked(false);
  }, [cardIcons]);

  const handleCardClick = useCallback((index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    playFlipSound();
    
    setCards((prev) => {
      const newCards = [...prev];
      newCards[index] = { ...newCards[index], isFlipped: true };
      return newCards;
    });

    setFlippedIndices((prev) => {
      const newFlipped = [...prev, index];
      
      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setIsLocked(true); // Kunci papan saat mengevaluasi
        evaluateMatch(newFlipped);
      }
      return newFlipped;
    });
  }, [cards, isLocked]);

  const evaluateMatch = (indices: number[]) => {
    const [first, second] = indices;

    setTimeout(() => {
      setCards((prev) => {
        const newCards = [...prev];
        if (newCards[first].icon === newCards[second].icon) {
          playMatchSound();
          newCards[first].isMatched = true;
          newCards[second].isMatched = true;
          
          if (newCards.every((card) => card.isMatched)) {
            setTimeout(() => {
              playWinSound();
              setIsWon(true);
            }, 400);
          }
        } else {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
        }
        return newCards;
      });
      setFlippedIndices([]);
      setIsLocked(false);
    }, 800); // Waktu jeda melihat kartu salah
  };

  return { cards, moves, isWon, handleCardClick, initializeGame };
}
