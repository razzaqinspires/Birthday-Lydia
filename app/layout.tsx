import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import { PerformanceProvider } from "../contexts/PerformanceContext";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, Alex_Brush } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday Lidya 🤍",
  description: "A Special Gift for March 8, 2027",
  authors: [{ name: "Your Loving Partner" }],
  robots: "noindex, nofollow", // Privasi untuk halaman personal
};

export const viewport: Viewport = {
  themeColor: "#fce7f3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Mencegah zoom berlebih pada mobile yang merusak layout
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="antialiased scroll-smooth">
      <body className={`${playfair.variable} ${montserrat.variable} ${alexBrush.variable} font-sans overflow-x-hidden selection:bg-rose-300 selection:text-white bg-[#fef5f7]`}>
        <PerformanceProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </PerformanceProvider>
      </body>
    </html>
  );
}
