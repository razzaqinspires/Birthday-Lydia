import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Great_Vibes } from "next/font/google";

// 1. Font Klasik & Elegan untuk Heading
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// 2. Font Modern & Bersih untuk Paragraf
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

// 3. Font Tulisan Tangan untuk Sentuhan Romantis
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday Cici ❤️",
  description: "A Special Gift for March 8, 2027",
  themeColor: "#4c1d95",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="antialiased">
      <body className={`${cormorant.variable} ${montserrat.variable} ${greatVibes.variable} font-sans bg-[#0a0514] text-white overflow-x-hidden`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
