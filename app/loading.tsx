export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#fef5f7] z-[999] flex flex-col items-center justify-center">
      {/* Menggunakan CSS murni untuk animasi ringan LCP < 2s */}
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
      <p 
        className="font-sans text-sm tracking-[0.3em] uppercase text-pink-700/60 animate-pulse"
        aria-live="polite"
      >
        Mempersiapkan Kejutan...
      </p>
    </div>
  );
}
