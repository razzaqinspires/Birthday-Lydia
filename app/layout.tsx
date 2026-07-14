import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";

// Injeksi Font Premium
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

const greatVibes = Great_Vibes({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-vibes" 
});

export const metadata: Metadata = {
  title: "Happy Birthday Sayang ❤️",
  description: "A Special Gift for March 8, 2027",
  themeColor: "#9d174d",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Happy B-Day",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable} antialiased`}>
      <body className="font-montserrat">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
