"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  // EKSPANSI: Lebih banyak foto berserakan
  const photos = [
    { id: 1, src: "/img/foto1.jpg", rotate: "-rotate-6", offset: "md:translate-y-12 md:-translate-x-4", delay: 0.1 },
    { id: 2, src: "/img/foto2.jpg", rotate: "rotate-3", offset: "md:-translate-y-8", delay: 0.2 },
    { id: 3, src: "/img/foto3.jpg", rotate: "-rotate-12", offset: "md:translate-y-24 md:translate-x-8", delay: 0.4 },
    { id: 4, src: "/img/foto4.jpg", rotate: "rotate-6", offset: "md:-translate-y-4 md:translate-x-4", delay: 0.3 },
    { id: 5, src: "/img/foto5.jpg", rotate: "-rotate-3", offset: "md:translate-y-16 md:-translate-x-8", delay: 0.5 },
    { id: 6, src: "/img/foto6.jpg", rotate: "rotate-12", offset: "md:-translate-y-12 md:translate-x-12", delay: 0.6 },
  ];

  return (
    <section className="py-32 z-10 relative flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1 }}
        className="text-center mb-24 relative"
      >
        <h2 className="font-serif text-5xl md:text-7xl text-pink-900 mb-4 font-bold relative z-10">
          Galeri <span className="font-script text-pink-500 font-normal">Estetika</span>
        </h2>
        <p className="font-sans font-medium tracking-[0.2em] text-pink-700/60 uppercase text-xs md:text-sm relative z-10">
          Bingkai waktu kita, adek sayang
        </p>
      </motion.div>
      
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-16 md:gap-x-16 px-4 max-w-7xl">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: parseInt(photo.rotate.replace('rotate-', '').replace('-', '-')) }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: photo.delay, duration: 0.8, type: "spring" }}
            className={`polaroid w-56 h-[18rem] md:w-72 md:h-[24rem] flex flex-col cursor-pointer transform ${photo.rotate} ${photo.offset} group relative`}
          >
            <div className="w-full h-[82%] bg-[#faf5f6] overflow-hidden relative border border-pink-100 shadow-inner">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif italic text-pink-200">Foto {photo.id}</span>
              </div>
              <Image 
                src={photo.src} 
                alt={`Kenangan ${photo.id}`}
                fill
                className="object-cover z-10 opacity-0 transition-all duration-1000 group-hover:scale-110 filter sepia-[10%] group-hover:sepia-0"
                onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center pt-4">
              <p className="font-script text-2xl text-pink-400 group-hover:text-pink-600 transition-colors">
                Lidya & Aku 🤍
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
