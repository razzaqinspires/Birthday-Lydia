"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fef5f7] text-pink-900 px-6 text-center">
      <h2 className="font-serif text-3xl font-bold mb-4">Halaman sedang memuat ulang memori...</h2>
      <p className="font-sans mb-8 max-w-md text-pink-700/70">
        Sayang, sepertinya ada gangguan koneksi kecil. Jangan khawatir, kenangan kita tetap aman.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-pink-500 text-white rounded-full font-sans shadow-lg hover:bg-pink-600 focus:ring-4 focus:ring-pink-300 transition-all"
        aria-label="Coba muat ulang halaman"
      >
        Muat Ulang Halaman
      </button>
    </div>
  );
}
