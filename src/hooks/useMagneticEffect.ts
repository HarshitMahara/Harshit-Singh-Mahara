"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

interface MagneticOptions {
  strength?: number;
  speed?: number;
}

export function useMagneticEffect(
  ref: RefObject<HTMLElement | null>,
  options: MagneticOptions = {}
) {
  const { strength = 0.3, speed = 0.3 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Store the element position
    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: speed,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: speed * 1.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength, speed]);
}
