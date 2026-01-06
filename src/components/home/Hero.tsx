"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import DitherShader from "@/components/ui/dither-shader";
import { gsap } from "gsap";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

export function Hero() {
  const nameRef = useRef<HTMLSpanElement>(null);
  const projectBtnRef = useRef<HTMLAnchorElement>(null);
  const contactBtnRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  // Add magnetic effect to buttons
  useMagneticEffect(projectBtnRef, { strength: 0.3, speed: 0.3 });
  useMagneticEffect(contactBtnRef, { strength: 0.3, speed: 0.3 });

  useEffect(() => {
    const nameEl = nameRef.current;
    const projectBtnEl = projectBtnRef.current;
    const contactBtnEl = contactBtnRef.current;

    // Name animation: gradient shift + scale
    if (nameEl) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      
      tl.to(nameEl, {
        backgroundPosition: "100% 50%",
        duration: 2.5,
        ease: "power1.inOut",
      });
      
      gsap.to(nameEl, {
        scale: 1.03,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Project button pulse glow animation
    if (projectBtnEl) {
      gsap.to(projectBtnEl, {
        boxShadow: "0 0 20px 4px rgba(255, 255, 255, 0.25)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Contact button border pulse animation
    if (contactBtnEl) {
      gsap.to(contactBtnEl, {
        boxShadow: "0 0 15px 3px rgba(191, 219, 254, 0.3), inset 0 0 0 1px rgba(191, 219, 254, 0.4)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    return () => {
      gsap.killTweensOf([nameEl, projectBtnEl, contactBtnEl]);
    };
  }, []);

  // Hover handlers for buttons
  const handleProjectBtnHover = (isHovering: boolean) => {
    if (projectBtnRef.current) {
      gsap.to(projectBtnRef.current, {
        scale: isHovering ? 1.05 : 1,
        boxShadow: isHovering 
          ? "0 0 25px 5px rgba(255, 255, 255, 0.3)" 
          : "0 0 0px 0px rgba(255, 255, 255, 0)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: isHovering ? 4 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleContactBtnHover = (isHovering: boolean) => {
    if (contactBtnRef.current) {
      gsap.to(contactBtnRef.current, {
        scale: isHovering ? 1.05 : 1,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
        boxShadow: isHovering
          ? "0 0 20px 4px rgba(191, 219, 254, 0.4), inset 0 0 0 1px rgba(191, 219, 254, 0.6)"
          : "0 0 0px 0px rgba(191, 219, 254, 0), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-28 pb-16 sm:px-8 sm:pt-24 sm:pb-20 md:py-0 relative"
    >
      <style jsx global>{`
        .animated-name {
          display: inline-block;
          background: linear-gradient(90deg, #ffffff, #bfdbfe, #d8b4fe, #ffffff);
          background-size: 200% 200%;
          background-position: 0% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          will-change: background-position, transform;
        }
        
        .animated-button,
        .contact-button {
          position: relative;
          will-change: transform, box-shadow;
          transition: background-color 0.3s ease;
        }
        
        .contact-button {
          box-shadow: 0 0 0 0 rgba(191, 219, 254, 0),
                      inset 0 0 0 1px rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left side - Text */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
              Hi, I&apos;m{" "}
              <span ref={nameRef} className="animated-name">
                Harshit
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed font-light">
              Welcome to my little corner of the internet.
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 leading-relaxed">
              I build things for the web.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 leading-relaxed italic font-light">
              Production ready… usually.
            </p>
          </div>

          {/* Right side - Dither Shader Image */}
          <div className="flex items-center justify-center lg:justify-end">
            <DitherShader
              src="/images/hero/h3.jpeg"
              gridSize={1}
              ditherMode="bayer"
              colorMode="duotone"
              primaryColor="#131316"
              secondaryColor="#bfdbfe"
              threshold={0.45}
              className="h-56 w-full max-w-[340px] sm:h-72 sm:max-w-[400px] md:h-80 md:max-w-[450px] lg:h-96 lg:w-[500px] lg:max-w-none xl:h-[500px] xl:w-[600px]"
            />
          </div>
        </div>

        {/* Buttons - Bottom */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center mt-8 sm:mt-10 md:mt-12">
          <Link
            href="/projects"
            ref={projectBtnRef}
            onMouseEnter={() => handleProjectBtnHover(true)}
            onMouseLeave={() => handleProjectBtnHover(false)}
            className="group animated-button px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            View Projects <ArrowRight ref={arrowRef} className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            ref={contactBtnRef}
            onMouseEnter={() => handleContactBtnHover(true)}
            onMouseLeave={() => handleContactBtnHover(false)}
            className="contact-button px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-white/20 text-center text-sm sm:text-base"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
      
      <ShootingStars />
      <StarsBackground />
    </section>
  );
}
