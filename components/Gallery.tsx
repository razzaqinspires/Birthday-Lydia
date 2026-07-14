"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  const photos = [
    { id: 1, src: "/img/foto1.jpg", rotate: "-rotate-6", yOffset: "md:translate-y-8", delay: 0.1 },
    { id: 2, src: "/img/foto2.jpg", rotate: "rotate-3", yOffset: "md:-translate-y-4", delay: 0.3 },
    { id: 3, src: "/img/foto3.jpg", rotate: "-rotate-12", yOffset: "md:translate-y-12", delay: 0.5 },
    { id: 4, src: "/img/foto4.jpg", rotate: "rotate-6", yOffset: "md:-translate-y-2", delay: 0.2 },
  ];

  return (
    <section className="py-32 z-10 relative flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1 }}
        className="text-center mb-20 relative"
      >
        <h2 className="font-serif text-5xl md:text-6xl text-pink-800 mb-4 tracking-tight relative z-10 font-bold">
          Album <span className="font-script text-pink-500 font-normal">Cinta</span> Kita
        </h2>
        <p className="font-sans font-medium tracking-[0.2em] text-pink-400 uppercase text-xs relative z-10">
          Bingkai waktu yang tak terlupakan
        </p>
      </motion.div>
      
      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 px-4 max-w-7xl">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: parseInt(photo.rotate.replace('rotate-', '').replace('-', '-')) }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: photo.delay, duration: 0.8, type: "spring" }}
            className={`polaroid w-60 h-[20rem] md:w-72 md:h-[24rem] flex flex-col cursor-pointer transform ${photo.rotate} ${photo.yOffset} group relative`}
          >
            <div className="w-full h-[82%] bg-pink-50 overflow-hidden relative border border-pink-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif italic text-pink-200">Foto {photo.id}</span>
              </div>
              <Image 
                src={photo.src} 
                alt={`Kenangan ${photo.id}`}
                fill
                className="object-cover z-10 opacity-0 transition-transform duration-700 group-hover:scale-105"
                onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center pt-4">
              <p className="font-script text-2xl text-pink-400 group-hover:text-pink-600 transition-colors">
                I love you 🎀
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
