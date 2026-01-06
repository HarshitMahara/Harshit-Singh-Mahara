"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const container = containerRef.current;
    const progress = progressRef.current;
    const overlay = overlayRef.current;

    if (!container || !progress || !overlay) return;

    // Reset animating flag when new page loads
    isAnimating.current = false;

    // Animation timeline
    const tl = gsap.timeline();

    // Fade out overlay first
    tl.to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: "power1.out",
    });

    // Smooth fade in for new page (overlaps with overlay fadeout)
    tl.fromTo(
      container,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power1.out",
      },
      "-=0.3"
    );

    // Show and animate progress bar
    tl.fromTo(
      progress,
      { scaleX: 0.3, opacity: 1 },
      {
        scaleX: 1,
        duration: 0.4,
        ease: "power1.inOut",
      },
      0
    );

    // Hide progress bar
    tl.to(progress, {
      scaleX: 1,
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
    });

    // Reset scroll position
    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  // Intercept all link clicks for smooth transition out
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (!link || isAnimating.current) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;

      // Check if we're already on the target page - if so, do nothing
      if (href === pathname) {
        e.preventDefault();
        return;
      }

      // Internal navigation - animate out first
      e.preventDefault();
      isAnimating.current = true;

      const overlay = overlayRef.current;
      const progress = progressRef.current;

      if (!overlay || !progress) {
        router.push(href);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
        },
      });

      // Quick fade to overlay
      tl.to(overlay, {
        opacity: 1,
        duration: 0.25,
        ease: "power1.in",
      });

      // Show progress starting
      tl.to(
        progress,
        {
          scaleX: 0.3,
          opacity: 1,
          duration: 0.2,
          ease: "power1.in",
        },
        "-=0.1"
      );
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router, pathname]);

  return (
    <>
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 origin-left z-[9999]"
        style={{ transform: "scaleX(0)", opacity: 0 }}
      />

      {/* Overlay for seamless transition */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-background pointer-events-none z-[9998]"
        style={{ opacity: 0 }}
      />

      {/* Page content */}
      <div ref={containerRef}>{children}</div>
    </>
  );
}
