"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const techStack = [
  { name: "React", icon: "/images/tech/react.svg", color: "#61DAFB" },
  { name: "Next.js", icon: "/images/tech/nextjs.svg", color: "#000000" },
  { name: "TypeScript", icon: "/images/tech/typescript.svg", color: "#3178C6" },
  { name: "Node.js", icon: "/images/tech/nodejs.svg", color: "#339933" },
  { name: "MongoDB", icon: "/images/tech/mongodb.svg", color: "#47A248" },
  { name: "PostgreSQL", icon: "/images/tech/postgresql.svg", color: "#336791" },
  { name: "Docker", icon: "/images/tech/docker.svg", color: "#2496ED" },
  { name: "Git", icon: "/images/tech/git.svg", color: "#F05032" },
  { name: "Tailwind", icon: "/images/tech/tailwind.svg", color: "#06B6D4" },
  { name: "GSAP", icon: "/images/tech/gsap.svg", color: "#88CE02" },
];

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const icons = iconsRef.current;
    const particles = particlesRef.current;
    const text = textRef.current;

    if (!container || !particles || !text) return;

    // Set up canvas for particles
    const ctx = particles.getContext('2d');
    if (!ctx) return;

    particles.width = window.innerWidth;
    particles.height = window.innerHeight;

    // GSAP Timeline for initial animations
    const tl = gsap.timeline();

    // Position icons with physics-based movement
    const eventHandlers: Array<{ 
      element: HTMLDivElement; 
      enter: () => void; 
      leave: () => void;
    }> = [];

    // Physics properties for each icon
    const iconPhysics: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      mass: number;
      radius: number;
      element: HTMLDivElement;
      isHovered: boolean;
    }> = [];
    
    icons.forEach((icon, index) => {
      if (!icon) return;

      // Random starting position
      const x = (Math.random() - 0.5) * (window.innerWidth * 0.6);
      const y = (Math.random() - 0.5) * (window.innerHeight * 0.6);

      // Initial setup
      gsap.set(icon, {
        x,
        y,
        opacity: 1,
        scale: 1,
        rotation: 0
      });

      // Add physics properties
      iconPhysics.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.5, // Increased for faster movement
        vy: (Math.random() - 0.5) * 2.5,
        mass: 1 + Math.random() * 0.5, // Slightly different masses
        radius: window.innerWidth < 480 ? 30 : window.innerWidth < 768 ? 35 : 50, // Smaller collision radius for mobile
        element: icon,
        isHovered: false
      });

      // Hover effects
      const onMouseEnter = () => {
        iconPhysics[index].isHovered = true;
        gsap.to(icon, {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const onMouseLeave = () => {
        iconPhysics[index].isHovered = false;
        gsap.to(icon, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      icon.addEventListener('mouseenter', onMouseEnter);
      icon.addEventListener('mouseleave', onMouseLeave);
      
      eventHandlers.push({ 
        element: icon, 
        enter: onMouseEnter, 
        leave: onMouseLeave
      });
    });

    // Physics simulation
    function updatePhysics() {
      const bounds = {
        width: window.innerWidth < 480 ? window.innerWidth * 0.9 : window.innerWidth * 0.8,
        height: window.innerHeight < 667 ? window.innerHeight * 0.9 : window.innerHeight * 0.8,
        centerX: 0,
        centerY: 0
      };

      iconPhysics.forEach((iconA, i) => {
        if (iconA.isHovered) {
          // Slow down when hovered
          iconA.vx *= 0.95;
          iconA.vy *= 0.95;
          return;
        }

        // Check collisions with other icons
        iconPhysics.forEach((iconB, j) => {
          if (i !== j) {
            const dx = iconB.x - iconA.x;
            const dy = iconB.y - iconA.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = iconA.radius + iconB.radius;

            if (distance < minDistance && distance > 0) {
              // Collision detected - smooth, gentle repulsion
              const overlap = minDistance - distance;
              const separationForce = overlap * 0.8; // Much gentler separation
              
              const normalX = dx / distance;
              const normalY = dy / distance;

              // Gentle separation to prevent overlap
              iconA.x -= normalX * separationForce * 0.4;
              iconA.y -= normalY * separationForce * 0.4;
              iconB.x += normalX * separationForce * 0.4;
              iconB.y += normalY * separationForce * 0.4;

              // Smooth elastic collision
              const relativeVx = iconB.vx - iconA.vx;
              const relativeVy = iconB.vy - iconA.vy;
              const speed = relativeVx * normalX + relativeVy * normalY;

              if (speed < 0) return; // Objects separating

              const impulse = (2 * speed) / (iconA.mass + iconB.mass);
              
              // Gentle collision impulse for smooth interaction
              const collisionPower = 0.9;
              iconA.vx += impulse * iconB.mass * normalX * collisionPower;
              iconA.vy += impulse * iconB.mass * normalY * collisionPower;
              iconB.vx -= impulse * iconA.mass * normalX * collisionPower;
              iconB.vy -= impulse * iconA.mass * normalY * collisionPower;

              // Small energy boost for natural movement
              const energyBoost = 0.1;
              const randomAngleA = Math.random() * Math.PI * 2;
              const randomAngleB = Math.random() * Math.PI * 2;
              
              iconA.vx += Math.cos(randomAngleA) * energyBoost;
              iconA.vy += Math.sin(randomAngleA) * energyBoost;
              iconB.vx += Math.cos(randomAngleB) * energyBoost;
              iconB.vy += Math.sin(randomAngleB) * energyBoost;
            }

            // Attraction when far apart (very weak)
            if (distance > 200 && distance < 400) {
              const attractionForce = 0.00001;
              const attractionX = (dx / distance) * attractionForce;
              const attractionY = (dy / distance) * attractionForce;
              
              iconA.vx += attractionX;
              iconA.vy += attractionY;
            }
          }
        });

        // Apply very light friction to maintain some movement
        iconA.vx *= 0.998;
        iconA.vy *= 0.998;

        // Add random energy boosts to keep icons moving
        if (Math.random() < 0.005) { // Slightly higher chance for more frequent boosts
          iconA.vx += (Math.random() - 0.5) * 0.5; // Increased energy boost
          iconA.vy += (Math.random() - 0.5) * 0.5;
        }

        // Update position
        iconA.x += iconA.vx;
        iconA.y += iconA.vy;

        // Boundary collision with gentle bounce
        if (iconA.x - iconA.radius < -bounds.width / 2) {
          iconA.x = -bounds.width / 2 + iconA.radius;
          iconA.vx = Math.abs(iconA.vx) * 0.8; // Slightly more energetic bounce
          // Small random vertical energy
          iconA.vy += (Math.random() - 0.5) * 0.3;
        }
        if (iconA.x + iconA.radius > bounds.width / 2) {
          iconA.x = bounds.width / 2 - iconA.radius;
          iconA.vx = -Math.abs(iconA.vx) * 0.8; // Slightly more energetic bounce
          // Small random vertical energy
          iconA.vy += (Math.random() - 0.5) * 0.3;
        }
        if (iconA.y - iconA.radius < -bounds.height / 2) {
          iconA.y = -bounds.height / 2 + iconA.radius;
          iconA.vy = Math.abs(iconA.vy) * 0.8; // Slightly more energetic bounce
          // Small random horizontal energy
          iconA.vx += (Math.random() - 0.5) * 0.3;
        }
        if (iconA.y + iconA.radius > bounds.height / 2) {
          iconA.y = bounds.height / 2 - iconA.radius;
          iconA.vy = -Math.abs(iconA.vy) * 0.8; // Slightly more energetic bounce
          // Small random horizontal energy
          iconA.vx += (Math.random() - 0.5) * 0.3;
        }

        // Limit maximum speed for smooth movement
        const maxSpeed = 3.5; // Increased for faster motion
        const minSpeed = 0.4; // Increased minimum speed
        const currentSpeed = Math.sqrt(iconA.vx * iconA.vx + iconA.vy * iconA.vy);
        
        if (currentSpeed > maxSpeed) {
          iconA.vx = (iconA.vx / currentSpeed) * maxSpeed;
          iconA.vy = (iconA.vy / currentSpeed) * maxSpeed;
        } else if (currentSpeed < minSpeed && currentSpeed > 0) {
          // Boost slow-moving icons to maintain movement
          iconA.vx = (iconA.vx / currentSpeed) * minSpeed;
          iconA.vy = (iconA.vy / currentSpeed) * minSpeed;
        } else if (currentSpeed === 0) {
          // Give completely stopped icons a random direction
          const randomAngle = Math.random() * Math.PI * 2;
          iconA.vx = Math.cos(randomAngle) * minSpeed;
          iconA.vy = Math.sin(randomAngle) * minSpeed;
        }

        // Update DOM element position
        gsap.set(iconA.element, {
          x: iconA.x,
          y: iconA.y
        });
      });

      requestAnimationFrame(updatePhysics);
    }

    // Start physics simulation
    updatePhysics();

    // Particle animation
    const particlesArray: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particlesArray.push({
        x: Math.random() * particles.width,
        y: Math.random() * particles.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    function animateParticles() {
      if (!ctx || !particles) return;
      
      ctx.clearRect(0, 0, particles.width, particles.height);
      
      particlesArray.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = particles!.width;
        if (particle.x > particles!.width) particle.x = 0;
        if (particle.y < 0) particle.y = particles!.height;
        if (particle.y > particles!.height) particle.y = 0;

        // Draw particle
        ctx!.beginPath();
        ctx!.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(59, 130, 246, ${particle.alpha})`;
        ctx!.fill();

        // Draw connections
        particlesArray.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx!.beginPath();
              ctx!.moveTo(particle.x, particle.y);
              ctx!.lineTo(otherParticle.x, otherParticle.y);
              ctx!.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
              ctx!.lineWidth = 1;
              ctx!.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Glitch text animation with GSAP
    const glitchTitle = text?.querySelector('h1');
    let glitchInterval: NodeJS.Timeout | null = null;
    
    if (glitchTitle) {
      // Random glitch triggers
      const triggerGlitch = () => {
        const glitchTl = gsap.timeline();
        glitchTl
          .to(glitchTitle, {
            skewX: Math.random() * 20 - 10,
            skewY: Math.random() * 5 - 2.5,
            duration: 0.1,
            ease: "power2.inOut"
          })
          .to(glitchTitle, {
            skewX: 0,
            skewY: 0,
            duration: 0.1,
            ease: "power2.inOut"
          })
          .to(glitchTitle, {
            x: Math.random() * 10 - 5,
            duration: 0.05,
            ease: "power2.inOut"
          })
          .to(glitchTitle, {
            x: 0,
            duration: 0.05,
            ease: "power2.inOut"
          });
      };

      // Trigger glitch effect randomly
      glitchInterval = setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
          triggerGlitch();
        }
      }, 2000);
    }

    // Cleanup
    return () => {
      tl.kill();
      gsap.killTweensOf([text, ...icons]);
      
      // Clear glitch interval
      if (glitchInterval) {
        clearInterval(glitchInterval);
      }
      
      // Remove event listeners
      eventHandlers.forEach(({ element, enter, leave }) => {
        element.removeEventListener('mouseenter', enter);
        element.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center"
    >
      {/* Particles Canvas */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" />

      {/* Tech Stack Icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        {techStack.map((tech, index) => (
          <div
            key={tech.name}
            ref={(el) => { iconsRef.current[index] = el; }}
            className="absolute cursor-pointer group"
          >
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
              <div 
                className="absolute inset-0 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                style={{ backgroundColor: tech.color }}
              />
              <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {tech.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div 
        ref={textRef}
        className="relative z-10 text-center px-4 sm:px-6 flex flex-col items-center justify-center min-h-screen"
      >
        <h1 className="glitch-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 sm:mb-12 whitespace-nowrap"
            data-text="Coming Soon...">
          Coming Soon...
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed mb-12 sm:mb-16">
          Building something amazing.
        </p>
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-pulse" />
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

    </div>
  );
}
