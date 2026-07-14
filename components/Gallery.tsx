"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  // Arsitektur Masonry Asimetris: Ukuran, posisi, dan rotasi yang acak agar terlihat artistik
  const photos = [
    { id: 1, src: "/img/foto1.jpg", rotate: "-rotate-6", yOffset: "md:translate-y-12", delay: 0.1 },
    { id: 2, src: "/img/foto2.jpg", rotate: "rotate-3", yOffset: "md:-translate-y-8", delay: 0.3 },
    { id: 3, src: "/img/foto3.jpg", rotate: "-rotate-12", yOffset: "md:translate-y-20", delay: 0.5 },
    { id: 4, src: "/img/foto4.jpg", rotate: "rotate-6", yOffset: "md:-translate-y-4", delay: 0.2 },
  ];

  return (
    <section className="py-40 z-10 relative flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center mb-24"
      >
        <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">
          Kepingan <span className="italic text-pink-300">Kenangan</span>
        </h2>
        <p className="font-sans font-light tracking-widest text-white/60 uppercase text-sm">
          Momen yang tak akan pernah tergantikan
        </p>
      </motion.div>
      
      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 px-4 max-w-7xl">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 100, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: parseInt(photo.rotate.replace('rotate-', '').replace('-', '-')) }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: photo.delay, duration: 1.2, type: "spring", bounce: 0.3 }}
            className={`polaroid w-64 h-[22rem] md:w-80 md:h-[28rem] flex flex-col cursor-pointer transform ${photo.rotate} ${photo.yOffset} group`}
          >
            <div className="w-full h-[82%] bg-[#eae6df] overflow-hidden relative border border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif italic text-gray-400">Foto {photo.id}</span>
              </div>
              <Image 
                src={photo.src} 
                alt={`Kenangan ${photo.id}`}
                fill
                className="object-cover z-10 opacity-0 transition-all duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center pt-4">
              <p className="font-script text-2xl text-gray-700 opacity-80 group-hover:opacity-100 transition-opacity group-hover:text-pink-600">
                Forever yours
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
