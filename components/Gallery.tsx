"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePerformance } from "../contexts/PerformanceContext";

export default function Gallery() {
  const { quality } = usePerformance();
  const animationProps = quality === "low" ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : undefined;

  // Variasi caption agar tidak monoton
  const dynamicCaptions = [
    "Cantiknya aku 🤍", 
    "Kesayanganku 🎀", 
    "Bidadari Arifi ✨", 
    "Manis banget 🥺", 
    "Lidya-ku 🤍", 
    "Senyummu itu lho 🌸"
  ];

  const photos = [
    { id: 1, src: "/img/foto1.jpg", rotate: "-rotate-6", offset: "md:translate-y-8 md:-translate-x-2", delay: 0.1 },
    { id: 2, src: "/img/foto2.jpg", rotate: "rotate-3", offset: "md:-translate-y-4", delay: 0.2 },
    { id: 3, src: "/img/foto3.jpg", rotate: "-rotate-12", offset: "md:translate-y-16 md:translate-x-4", delay: 0.3 },
    { id: 4, src: "/img/foto4.jpg", rotate: "rotate-6", offset: "md:-translate-y-2 md:translate-x-2", delay: 0.2 },
    { id: 5, src: "/img/foto5.jpg", rotate: "-rotate-3", offset: "md:translate-y-12 md:-translate-x-6", delay: 0.4 },
    { id: 6, src: "/img/foto6.jpg", rotate: "rotate-12", offset: "md:-translate-y-8 md:translate-x-8", delay: 0.5 },
  ];

  return (
    <article className="py-20 md:py-32 z-10 relative flex flex-col items-center px-2 md:px-6 w-full overflow-hidden">
      <motion.header
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={animationProps || { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-12 md:mb-24 relative"
      >
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-pink-900 mb-3 font-bold relative z-10">
          Koleksi <span className="font-script text-pink-500 font-normal">Senyummu</span>
        </h2>
        <p className="font-sans font-medium tracking-[0.2em] text-pink-700/60 uppercase text-[10px] md:text-xs relative z-10">
          Kumpulan PAP favoritku yang selalu aku simpan rapi
        </p>
      </motion.header>
      
      {/* Mobile: Grid gap-2 agar 2 kolom muat sempurna. Desktop: Gap besar berserakan */}
      <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-8 md:gap-x-12 md:gap-y-16 px-2 max-w-7xl">
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
              /* Ukuran HP sangat disesuaikan agar muat 2 berdampingan (w-36 / max-w-[150px]) */
              className={`polaroid w-[42vw] max-w-[160px] h-[13rem] sm:w-48 sm:h-[16rem] md:w-64 md:h-[22rem] flex flex-col transform ${quality === "low" ? photo.rotate : photo.offset} group focus-within:z-50`}
              tabIndex={0}
              aria-label={`Foto Lidya ke ${photo.id}`}
            >
              <div className="w-full h-[78%] md:h-[82%] bg-[#faf5f6] overflow-hidden relative border border-pink-50 shadow-inner">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <span className="font-serif italic text-pink-200 text-xs md:text-base">Lidya {photo.id}</span>
                </div>
                <Image 
                  src={photo.src} 
                  alt={`Potret Cantik Lidya - ${photo.id}`}
                  fill
                  sizes="(max-width: 768px) 150px, (max-width: 1200px) 256px, 256px"
                  className="object-cover z-10 opacity-0 transition-all duration-700 md:group-hover:scale-105 filter sepia-[5%] md:group-hover:sepia-0"
                  onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  loading="lazy"
                />
              </div>
              <figcaption className="flex-1 flex flex-col items-center justify-center pt-2 md:pt-4">
                <span className="font-script text-[1.1rem] sm:text-xl md:text-2xl text-pink-500 md:group-hover:text-pink-600 transition-colors leading-tight text-center">
                  {caption}
                </span>
              </figcaption>
            </motion.figure>
          )
        })}
      </div>
    </article>
  );
}
