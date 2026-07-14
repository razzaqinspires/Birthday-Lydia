import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import Gallery from "../components/Gallery";
import Letter from "../components/Letter";
import MusicPlayer from "../components/MusicPlayer";
import ConfettiEffect from "../components/ConfettiEffect";
import Particles from "../components/Particles";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-pink-500/30 selection:text-pink-100">
      {/* Sistem Latar Belakang Ganda (Dual Background System) */}
      <ConfettiEffect />
      <Particles />
      
      {/* Container utama konten. 
        Masing-masing section memiliki index z-10 agar selalu berada di atas efek background.
      */}
      <div className="relative z-10 flex flex-col w-full pb-20">
        <Hero />
        <Countdown />
        <Gallery />
        <Letter />
      </div>

      {/* Floating UI */}
      <MusicPlayer />
    </main>
  );
}
