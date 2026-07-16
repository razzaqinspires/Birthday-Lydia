"use client";

import { motion } from "framer-motion";
import { useCallback } from "react";
import { usePerformance } from "../contexts/PerformanceContext";

export default function VideoCarousel() {
  const { quality } = usePerformance();
  const animationProps = quality === "low" ? { opacity: 1, y: 0 } : undefined;

  const videos = [
    { id: 1, src: "/video/vid1.mp4", title: "Senyum Manismu" },
    { id: 2, src: "/video/vid2.mp4", title: "Momen Lucu Kita" },
    { id: 3, src: "/video/vid3.mp4", title: "Tawa yang Kurindukan" },
  ];

  const handleVideoPlay = useCallback(() => {
    window.dispatchEvent(new Event("pause-bgm"));
  }, []);

  const handleVideoPauseOrEnded = useCallback(() => {
    window.dispatchEvent(new Event("resume-bgm"));
  }, []);

  return (
    <article className="py-24 md:py-32 z-10 relative flex flex-col items-center w-full max-w-[100vw] overflow-hidden">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={animationProps || { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-12 md:mb-16 px-4"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-pink-900 mb-3 font-bold tracking-tight">
          Rekaman <span className="font-script text-pink-500 font-normal">Waktu</span>
        </h2>
        <p className="font-sans text-[10px] md:text-xs tracking-widest text-pink-700/60 uppercase">
          Kilas balik momen indah bersamamu, sayang
        </p>
      </motion.header>

      <div className="w-full max-w-7xl px-0 md:px-12">
        <div 
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 md:pb-12 px-6 snap-x snap-mandatory" 
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          role="region"
          aria-label="Carousel Video Kenangan"
        >
          {videos.map((vid, index) => (
            <motion.figure 
              key={vid.id}
              initial={{ opacity: 0, scale: quality === "low" ? 1 : 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ delay: quality === "low" ? 0 : index * 0.1, duration: 0.6 }}
              className="min-w-[85vw] md:min-w-[350px] lg:min-w-[400px] snap-center flex-shrink-0 m-0"
            >
              <div className="glass-panel p-3 md:p-4 bg-white/60 border border-white relative overflow-hidden group rounded-2xl md:rounded-3xl">
                <div className="aspect-[9/16] md:aspect-video w-full bg-pink-100 rounded-xl md:rounded-2xl overflow-hidden relative shadow-inner">
                  <video
                    controls
                    preload="metadata"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPauseOrEnded}
                    onEnded={handleVideoPauseOrEnded}
                    className="w-full h-full object-cover"
                    aria-label={`Video: ${vid.title}`}
                    // poster={`/img/poster${vid.id}.jpg`} // Uncomment jika poster tersedia
                  >
                    <source src={vid.src} type="video/mp4" />
                    Browser kamu tidak mendukung pemutaran video sayang.
                  </video>
                </div>
                <figcaption className="font-serif italic text-center mt-4 md:mt-5 mb-1 text-lg md:text-xl text-pink-800">
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
