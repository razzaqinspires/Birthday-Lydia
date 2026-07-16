"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePerformance } from "../contexts/PerformanceContext";
import { X } from "lucide-react";

// Tipe data untuk foto yang sedang dipilih
interface SelectedPhoto {
  id: number;
  src: string;
  caption: string;
}

export default function Gallery() {
  const { quality } = usePerformance();
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(null);
  
  const animationProps = quality === "low" ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : undefined;

  // Koreksi Total: Daftar pujian khusus untuk memuji foto (PAP) Lidya
  const dynamicCaptions = [
    "Cantiknya kesayanganku 🤍", 
    "Bidadari Arifi ✨", 
    "Senyum paling manis 🌸", 
    "Selalu bikin jatuh cinta 💖", 
    "Lidya yang sempurna 🎀", 
    "Duniaku 🥺"
  ];

  const photos = [
    { id: 1, src: "/img/foto1.jpg", rotate: "-rotate-6", offset: "md:translate-y-8 md:-translate-x-2", delay: 0.1 },
    { id: 2, src: "/img/foto2.jpg", rotate: "rotate-3", offset: "md:-translate-y-4", delay: 0.2 },
    { id: 3, src: "/img/foto3.jpg", rotate: "-rotate-12", offset: "md:translate-y-16 md:translate-x-4", delay: 0.3 },
    { id: 4, src: "/img/foto4.jpg", rotate: "rotate-6", offset: "md:-translate-y-2 md:translate-x-2", delay: 0.2 },
    { id: 5, src: "/img/foto5.jpg", rotate: "-rotate-3", offset: "md:translate-y-12 md:-translate-x-6", delay: 0.4 },
    { id: 6, src: "/img/foto6.jpg", rotate: "rotate-12", offset: "md:-translate-y-8 md:translate-x-8", delay: 0.5 },
  ];

  // Fungsi untuk mengunci scroll body saat Lightbox terbuka
  const handlePhotoClick = (photo: { id: number; src: string }, caption: string) => {
    setSelectedPhoto({ id: photo.id, src: photo.src, caption });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "auto";
  };

  return (
    <article className="py-24 md:py-32 z-10 relative flex flex-col items-center px-4 md:px-6 w-full overflow-hidden">
      <motion.header
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={animationProps || { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-16 md:mb-24 relative"
      >
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-pink-900 mb-3 font-bold relative z-10">
          Koleksi <span className="font-script text-pink-500 font-normal">Senyummu</span>
        </h2>
        <p className="font-sans font-medium tracking-[0.2em] text-pink-700/60 uppercase text-[10px] md:text-xs relative z-10">
          Kumpulan PAP favoritku yang selalu bikin aku kagum
        </p>
      </motion.header>
      
      {/* Grid Galeri Polaroid */}
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-10 md:gap-x-12 md:gap-y-16 px-2 max-w-7xl">
        {photos.map((photo, index) => {
          const finalRotation = parseInt(photo.rotate.replace('rotate-', '').replace('-', '-'));
          const caption = dynamicCaptions[index % dynamicCaptions.length];

          return (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, y: 30, rotate: quality === "low" ? finalRotation : 0 }}
              whileInView={animationProps || { opacity: 1, y: 0, rotate: finalRotation }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ delay: quality === "low" ? 0 : index * 0.1, duration: 0.6 }}
              className={`polaroid w-[42vw] max-w-[160px] h-[13rem] sm:w-48 sm:h-[16rem] md:w-64 md:h-[22rem] flex flex-col transform ${quality === "low" ? photo.rotate : photo.offset} group focus-within:z-50 cursor-pointer`}
              tabIndex={0}
              aria-label={`Lihat foto ${caption}`}
              onClick={() => handlePhotoClick(photo, caption)}
              onKeyDown={(e) => { if(e.key === 'Enter') handlePhotoClick(photo, caption) }}
            >
              <div className="w-full h-[78%] md:h-[82%] bg-[#faf5f6] overflow-hidden relative border border-pink-50 shadow-inner rounded-sm">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <span className="font-serif italic text-pink-200 text-xs md:text-base">Lidya {photo.id}</span>
                </div>
                <Image 
                  src={photo.src} 
                  alt={caption}
                  fill
                  sizes="(max-width: 768px) 150px, (max-width: 1200px) 256px, 256px"
                  className="object-cover z-10 opacity-0 transition-all duration-700 md:group-hover:scale-105 filter sepia-[5%] md:group-hover:sepia-0"
                  onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  loading="lazy"
                />
              </div>
              <figcaption className="flex-1 flex flex-col items-center justify-center pt-2 md:pt-4">
                {/* Bug Fix: Variabel caption sekarang dipanggil dengan benar */}
                <span className="font-script text-[1.1rem] sm:text-xl md:text-2xl text-pink-500 md:group-hover:text-pink-600 transition-colors leading-tight text-center">
                  {caption}
                </span>
              </figcaption>
            </motion.figure>
          )
        })}
      </div>

      {/* Lightbox / Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
            onClick={closeLightbox}
          >
            {/* Tombol Tutup */}
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-pink-400"
              onClick={closeLightbox}
              aria-label="Tutup pratinjau foto"
            >
              <X size={24} />
            </button>

            {/* Kontainer Foto Membesar */}
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm md:max-w-xl lg:max-w-2xl bg-white p-3 md:p-5 rounded-lg shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam gambar menutup lightbox
            >
              <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-gray-100 rounded-md overflow-hidden">
                <Image 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain md:object-cover"
                  priority
                />
              </div>
              <p className="font-script text-3xl md:text-5xl text-pink-600 text-center mt-4 md:mt-6 mb-2">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
