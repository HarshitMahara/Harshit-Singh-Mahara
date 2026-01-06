import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Noto_Sans_Devanagari, Noto_Sans_Arabic, Noto_Sans_SC, Noto_Sans_JP, Noto_Sans_KR, Noto_Sans_Bengali, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['400', '700'],
  subsets: ["devanagari"],
  variable: "--font-noto-sans-devanagari",
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  weight: ['400', '700'],
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: 'swap',
});

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: 'swap',
});

const notoSansBengali = Noto_Sans_Bengali({
  weight: ['400', '700'],
  subsets: ["bengali"],
  variable: "--font-noto-sans-bengali",
  display: 'swap',
});

// Main project fonts
const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Harshit Singh Mahara",
  description: "Harshit Singh Mahara",
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NavigationTracker } from "@/components/NavigationTracker";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSans.variable} ${notoSansDevanagari.variable} ${notoSansArabic.variable} ${notoSansSC.variable} ${notoSansJP.variable} ${notoSansKR.variable} ${notoSansBengali.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground font-sans`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <NavigationTracker />
          <Header />
          <PageTransition>
            <main className="flex-grow">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
