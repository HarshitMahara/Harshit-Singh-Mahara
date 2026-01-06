"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const greetings = [
  "Hello",
  "नमस्ते",
  "Hola",
  "Bonjour",
  "Hallo",
  "Ciao",
  "Olá",
  "Здравствуйте",
  "你好",
  "こんにちは",
  "안녕하세요",
  "مرحبا",
  "Merhaba",
  "নমস্কার",
  "سلام",
  "Hujambo",
];

// Local loader images - will loop if needed
const loaderImages = [
  "/images/loader/l1.jpeg",
  "/images/loader/l2.jpeg",
  "/images/loader/l3.jpeg",
  "/images/loader/l4.jpeg",
  "/images/loader/l5.jpeg",
  "/images/loader/l6.jpeg",
];

// Function to get image for current greeting (loops if there aren't enough images)
const getImageForGreeting = (index: number) => {
  return loaderImages[index % loaderImages.length];
};

interface PageLoaderProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

export function PageLoader({ onLoadingComplete, duration = 4000 }: PageLoaderProps) {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cycle through greetings sequentially
    const greetingInterval = setInterval(() => {
      setCurrentGreeting((prev) => {
        const next = prev + 1;
        // Loop back to start after showing all greetings
        return next >= greetings.length ? 0 : next;
      });
    }, 650); // Show each greeting for 650ms (slightly faster)

    // Hide loader after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 500);
    }, duration);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(hideTimer);
    };
  }, [duration, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - changes with each greeting */}
      <AnimatePresence>
        <motion.div
          key={currentGreeting}
          initial={{ opacity: currentGreeting === 0 ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={getImageForGreeting(currentGreeting)}
            alt="Background"
            fill
            className="object-contain sm:object-cover"
            style={{ filter: "grayscale(100%)" }}
            priority
            quality={100}
            sizes="100vw"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Centered Greeting Text */}
      <div className="relative z-10 flex items-center justify-center w-full h-32">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentGreeting}
            initial={{ 
              opacity: currentGreeting === 0 ? 1 : 0, 
              y: currentGreeting === 0 ? 0 : 20, 
              scale: currentGreeting === 0 ? 1 : 0.8 
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-noto-sans), var(--font-noto-sans-devanagari), var(--font-noto-sans-arabic), var(--font-noto-sans-sc), var(--font-noto-sans-jp), var(--font-noto-sans-kr), var(--font-noto-sans-bengali), system-ui, -apple-system, sans-serif',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            }}
          >
            {greetings[currentGreeting]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Loading Progress Bar */}
      <motion.div
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden"
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className="h-full bg-white rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}
