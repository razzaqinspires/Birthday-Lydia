import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import Timeline from "../components/Timeline";
import Gallery from "../components/Gallery";
import Letter from "../components/Letter";
import MusicPlayer from "../components/MusicPlayer";
import Particles from "../components/Particles";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* 
        Hanya menggunakan Particles CSS ringan.
        Confetti dihapus dari background global untuk menghindari lag, 
        dipindahkan ke komponen Letter sebagai kejutan klik.
      */}
      <Particles />
      
      <div className="relative z-10 flex flex-col w-full pb-20">
        <Hero />
        <Countdown />
        <Timeline /> {/* EKSPANSI: Komponen baru perjalanan cinta */}
        <Gallery />
        <Letter />
      </div>

      <MusicPlayer />
    </main>
  );
}
