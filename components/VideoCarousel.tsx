"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";
import { usePerformance } from "../contexts/PerformanceContext";

export default function VideoCarousel() {
  const { quality } = usePerformance();
  const animationProps = quality === "low" ? { opacity: 1, y: 0 } : undefined;

  // Narasi diubah: Fokus ke media PAP Lidya
  const videos = [
    { id: 1, src: "/video/vid1.mp4", title: "Cantiknya Kesayanganku" },
    { id: 2, src: "/video/vid2.mp4", title: "Tingkah Gemasmu" },
    { id: 3, src: "/video/vid3.mp4", title: "Senyum Paling Manis" },
  ];

  const handleVideoPlay = useCallback(() => {
    window.dispatchEvent(new Event("pause-bgm"));
  }, []);

  const handleVideoPauseOrEnded = useCallback(() => {
    window.dispatchEvent(new Event("resume-bgm"));
  }, []);

  return (
    <article className="py-20 md:py-32 z-10 relative flex flex-col items-center w-full max-w-[100vw] overflow-hidden">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={animationProps || { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-10 md:mb-16 px-4"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-pink-900 mb-3 font-bold tracking-tight">
          Pesona <span className="font-script text-pink-500 font-normal">Bidadariku</span>
        </h2>
        <p className="font-sans text-[10px] md:text-xs tracking-widest text-pink-700/60 uppercase">
          Video-video acak yang selalu berhasil bikin aku senyum sendiri
        </p>
      </motion.header>

      {/* Perbaikan Mobile UI: max-w dan lebar disesuaikan agar rapi di HP */}
      <div className="w-full max-w-7xl px-0 md:px-12">
        <div 
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 md:pb-12 px-6 md:px-6 snap-x snap-mandatory" 
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          role="region"
          aria-label="Carousel Video"
        >
          {videos.map((vid, index) => (
            <motion.figure 
              key={vid.id}
              initial={{ opacity: 0, scale: quality === "low" ? 1 : 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ delay: quality === "low" ? 0 : index * 0.1, duration: 0.6 }}
              /* Mobile: 75vw (menyisakan ruang di samping). Desktop: 350px/400px */
              className="w-[75vw] max-w-[280px] md:max-w-none md:w-[350px] lg:w-[400px] snap-center flex-shrink-0 m-0"
            >
              <div className="glass-panel p-2.5 md:p-4 bg-white/60 border border-white relative overflow-hidden group rounded-2xl md:rounded-3xl shadow-sm">
                {/* Aspek rasio 9:16 sangat cocok untuk video vertical (PAP) dari HP */}
                <div className="aspect-[9/16] w-full bg-pink-50 rounded-xl md:rounded-2xl overflow-hidden relative shadow-inner">
                  <video
                    controls
                    preload="metadata"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPauseOrEnded}
                    onEnded={handleVideoPauseOrEnded}
                    className="w-full h-full object-cover"
                    aria-label={`Video: ${vid.title}`}
                  >
                    <source src={vid.src} type="video/mp4" />
                    Browser kamu tidak mendukung pemutaran video sayang.
                  </video>
                </div>
                <figcaption className="font-serif italic text-center mt-3 md:mt-5 mb-1 text-base md:text-xl text-pink-800">
                  {vid.title}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </article>
  );
}
