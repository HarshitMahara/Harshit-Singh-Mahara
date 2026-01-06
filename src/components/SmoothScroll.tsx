"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Add lenis class to html element
    document.documentElement.classList.add("lenis");

    // Integrate with requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const target = document.querySelector(targetId);
          if (target) {
            lenis.scrollTo(target as HTMLElement, {
              offset: 0,
              duration: 1.5,
            });
          }
        }
      });
    });

    // Cleanup
    return () => {
      document.documentElement.classList.remove("lenis");
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
