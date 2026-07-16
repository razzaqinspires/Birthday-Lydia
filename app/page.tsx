import dynamic from "next/dynamic";
import ErrorBoundary from "../components/ErrorBoundary";
import ProgressBar from "../components/ProgressBar";

// Komponen Statis & Ringan (Di-render pertama kali / RSC)
import Hero from "../components/Hero";
import Countdown from "../components/Countdown";

// Komponen Berat diload secara Lazy (Dynamic Import) untuk menjaga TBT < 200ms
const Timeline = dynamic(() => import("../components/Timeline"), { 
  ssr: true,
  loading: () => <div className="py-32 h-[50vh] flex justify-center items-center"><div className="animate-pulse w-32 h-4 bg-pink-100 rounded-full"></div></div> 
});

const VideoCarousel = dynamic(() => import("../components/VideoCarousel"), { 
  ssr: false, // Menghindari hydration mismatch pada video tag
});

const Gallery = dynamic(() => import("../components/Gallery"), { 
  ssr: true 
});

const MiniGame = dynamic(() => import("../components/MiniGame"), { 
  ssr: false, // Membutuhkan akses penuh ke window & Web Audio API
  loading: () => <div className="py-32 h-[50vh] flex justify-center items-center text-pink-300">Menyiapkan memori...</div>
});

const Letter = dynamic(() => import("../components/Letter"), { 
  ssr: false 
});

const MusicPlayer = dynamic(() => import("../components/MusicPlayer"), { 
  ssr: false 
});

const Particles = dynamic(() => import("../components/Particles"), { 
  ssr: false 
});

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
