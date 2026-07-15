"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function VideoCarousel() {
  // Arsitektur data video. (Pastikan menaruh file video asli di folder public/video/)
  const videos = [
    { id: 1, src: "/video/vid1.mp4", title: "Senyum Manismu" },
    { id: 2, src: "/video/vid2.mp4", title: "Momen Lucu Kita" },
    { id: 3, src: "/video/vid3.mp4", title: "Tawa yang Kurindukan" },
  ];

  // Memancarkan sinyal ke MusicPlayer untuk mematikan BGM saat video diputar
  const handleVideoPlay = () => {
    window.dispatchEvent(new Event("pause-bgm"));
  };

  // Memancarkan sinyal ke MusicPlayer untuk menyalakan BGM saat video dijeda/selesai
  const handleVideoPauseOrEnded = () => {
    window.dispatchEvent(new Event("resume-bgm"));
  };

  return (
    <section className="py-32 z-10 relative flex flex-col items-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-center mb-16 px-6"
      >
        <h2 className="font-serif text-5xl md:text-6xl text-pink-900 mb-4 font-bold tracking-tight">
          Rekaman <span className="font-script text-pink-500 font-normal">Waktu</span>
        </h2>
        <p className="font-sans text-xs tracking-widest text-pink-700/60 uppercase">
          Kilas balik momen indah bersamamu, sayang
        </p>
      </motion.div>

      {/* Carousel Container (CSS Native Snap - Smooth & Ringan) */}
      <div className="w-full max-w-7xl px-4 md:px-12">
        <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {videos.map((vid, index) => (
            <motion.div 
              key={vid.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="min-w-[85vw] md:min-w-[400px] snap-center flex-shrink-0"
            >
              <div className="glass-panel p-4 bg-white/50 border border-white relative overflow-hidden group rounded-3xl">
                <div className="aspect-[9/16] md:aspect-video w-full bg-pink-100 rounded-2xl overflow-hidden relative shadow-inner">
                  <video
                    controls
                    preload="metadata"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPauseOrEnded}
                    onEnded={handleVideoPauseOrEnded}
                    className="w-full h-full object-cover"
                    poster={`/img/poster${vid.id}.jpg`} // Opsional: Gambar pratinjau
                  >
                    <source src={vid.src} type="video/mp4" />
                    Video tidak didukung.
                  </video>
                </div>
                <h3 className="font-serif italic text-center mt-6 mb-2 text-xl text-pink-800">
                  {vid.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
