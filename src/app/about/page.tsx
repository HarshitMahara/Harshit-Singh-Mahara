"use client";
import React from "react";
import { WhoIAm } from "@/components/about/WhoIAm";
import { TechStack } from "@/components/about/TechStack";
import { Experience } from "@/components/about/Experience";
import { Education } from "@/components/about/Education";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <section className="container mx-auto px-6 sm:px-8 max-w-7xl pt-32 sm:pt-40 pb-20">
        {/* Who I Am Section */}
        <WhoIAm />

        {/* Tech Stack Section */}
        <TechStack />

        {/* Experience Section */}
        <Experience />

        {/* Education Section */}
        <Education />
      </section>
    </div>
  );
}
