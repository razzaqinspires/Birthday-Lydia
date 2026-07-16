"use client";

import { useScrollProgress } from "../hooks/useScrollProgress";

export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9999] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-pink-300 to-rose-500 rounded-r-full transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
