"use client";
import React from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

export const WhoIAm: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left side - Text */}
      <div className="space-y-6">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
          Who I Am
        </h2>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Hey, I&apos;m <span className="text-blue-300">Harshit Singh Mahara</span>.
        </h1>
        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            I build stuff for the web, break things on purpose and figure out why they misbehave.
          </p>
          <p>
            Off the screen, I&apos;m all about meeting people, sharing ideas and soaking up new perspectives. Every conversation, every new philosophy, every fresh idea helps me grow a little more.
          </p>
        </div>
      </div>

      {/* Right side - Pixelated Canvas */}
      <div className="flex items-center justify-center lg:justify-end">
        <PixelatedCanvas
          src="/images/hero/h2.jpeg"
          width={400}
          height={400}
          cellSize={3}
          dotScale={0.9}
          shape="square"
          backgroundColor="#131316"
          dropoutStrength={0.05}
          interactive
          distortionStrength={1.5}
          distortionRadius={60}
          distortionMode="swirl"
          followSpeed={0.15}
          jitterStrength={2}
          jitterSpeed={3}
          sampleAverage
          tintColor="#bfdbfe"
          tintStrength={0.2}
          className="rounded-2xl border border-white/10 shadow-lg w-full max-w-md"
        />
      </div>
    </div>
  );
};
