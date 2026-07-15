import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Alex_Brush } from "next/font/google";

// 1. Tipografi Mewah & Elegan untuk Heading
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// 2. Tipografi Modern & Bersih untuk Paragraf
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

// 3. Tipografi Tulisan Tangan yang Sangat Mewah
const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday Lidya 🤍",
  description: "A Special Gift for March 8, 2027",
  themeColor: "#fce7f3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="antialiased">
      <body className={`${playfair.variable} ${montserrat.variable} ${alexBrush.variable} font-sans overflow-x-hidden selection:bg-rose-300 selection:text-white bg-[#fef5f7]`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
