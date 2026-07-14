"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Gallery() {
  // Arsitektur data statis untuk foto, bisa diganti API nantinya.
  // Gunakan gambar dummy berwarna solid jika foto asli belum dimasukkan ke public/img/
  const photos = [
    { id: 1, src: "/img/foto1.jpg", rotate: "-rotate-6", delay: 0.1 },
    { id: 2, src: "/img/foto2.jpg", rotate: "rotate-3", delay: 0.3 },
    { id: 3, src: "/img/foto3.jpg", rotate: "-rotate-12", delay: 0.5 },
    { id: 4, src: "/img/foto4.jpg", rotate: "rotate-6", delay: 0.2 },
  ];

  return (
    <section className="py-32 z-10 relative overflow-hidden flex flex-col items-center bg-black/20 backdrop-blur-sm">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold mb-24 text-white/90 tracking-wide drop-shadow-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Lentera Memori Kita 📸
      </motion.h2>
      
      <div className="flex flex-wrap justify-center gap-12 md:gap-20 px-8 max-w-7xl">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 100, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: parseInt(photo.rotate.replace('rotate-', '').replace('-', '-')) }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: photo.delay, type: "spring", stiffness: 100, damping: 15 }}
            className={`polaroid w-72 h-96 flex flex-col cursor-pointer transform ${photo.rotate} group`}
          >
            <div className="w-full h-[85%] bg-gray-200 rounded-sm overflow-hidden relative shadow-inner">
              <div className="absolute inset-0 bg-pink-100 flex items-center justify-center text-pink-300 font-bold z-0">
                Tempatkan Foto {photo.id}
              </div>
              {/* Gambar asli akan menutupi div background di atas jika tersedia */}
              <Image 
                src={photo.src} 
                alt={`Kenangan ${photo.id}`}
                fill
                className="object-cover z-10 opacity-0 transition-opacity duration-300"
                onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-800 font-medium text-lg italic opacity-80 group-hover:opacity-100 transition-opacity">
                I love you ❤️
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
