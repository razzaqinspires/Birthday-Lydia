import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import type { Metadata } from "next";

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
    <html lang="id" className="antialiased">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
