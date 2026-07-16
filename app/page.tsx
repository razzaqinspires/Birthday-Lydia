import dynamic from "next/dynamic";
import ErrorBoundary from "../components/ErrorBoundary";
import ProgressBar from "../components/ProgressBar";

// Komponen Statis & Ringan (Di-render pertama kali / RSC)
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";

// Komponen Berat diload secara Lazy (Dynamic Import) untuk menjaga TBT < 200ms
// Dihapus 'ssr: false' karena bertentangan dengan aturan RSC Next.js 15.
// Komponen-komponen ini sudah dirancang hydration-safe di iterasi sebelumnya.

const Timeline = dynamic(() => import("../components/Timeline"), { 
  loading: () => <div className="py-32 h-[50vh] flex justify-center items-center"><div className="animate-pulse w-32 h-4 bg-pink-100 rounded-full"></div></div> 
});

const VideoCarousel = dynamic(() => import("../components/VideoCarousel"));

const Gallery = dynamic(() => import("../components/Gallery"));

const MiniGame = dynamic(() => import("../components/MiniGame"), { 
  loading: () => <div className="py-32 h-[50vh] flex justify-center items-center text-pink-300">Menyiapkan memori...</div>
});

const Letter = dynamic(() => import("../components/Letter"));

const MusicPlayer = dynamic(() => import("../components/MusicPlayer"));

const Particles = dynamic(() => import("../components/Particles"));

export default function Home() {
  return (
    <>
      <ProgressBar />
      
      <main className="relative min-h-screen">
        <ErrorBoundary>
          <Particles />
        </ErrorBoundary>
        
        <div className="relative z-10 flex flex-col w-full pb-24 gap-16 md:gap-24">
          <section aria-label="Beranda">
            <Hero />
          </section>
          
          <section aria-label="Hitungan Mundur">
            <Countdown />
          </section>
          
          <ErrorBoundary>
            <Timeline />
            <VideoCarousel />
            <Gallery />
            <MiniGame />
            <Letter />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <MusicPlayer />
        </ErrorBoundary>
      </main>
    </>
  );
}
