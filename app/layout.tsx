// FILE: app/layout.tsx
// Replace your app/layout.tsx with this

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paira Art.6 | Ugandan Photographer & Cinematographer",
  description: "Award-winning Ugandan photographer and cinematographer Muwulya Peter (Paira Art.6) specializing in fashion, lifestyle, editorial, and visual storytelling based in Kampala.",
  keywords: ["photography", "cinematography", "Uganda photographer", "Kampala photographer", "fashion photography", "lifestyle photography", "Paira Art.6"],
  authors: [{ name: "Paira Art.6 (Muwulya Peter)" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pairaart6.com",
    title: "Paira Art.6 | Ugandan Photographer & Cinematographer",
    description: "Award-winning photography and cinematography capturing stories through lens",
    siteName: "Paira Art.6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts - Premium Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-charcoal-900`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}