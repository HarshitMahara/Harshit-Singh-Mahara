"use client";
import React from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const frontendTech = [
  { title: "React", image: "/images/tech/react.svg", color: "from-cyan-400 to-blue-500" },
  { title: "Next.js", image: "/images/tech/nextjs.svg", color: "from-gray-700 to-gray-900" },
  { title: "TypeScript", image: "/images/tech/typescript.svg", color: "from-blue-500 to-blue-700" },
  { title: "Tailwind CSS", image: "/images/tech/tailwind.svg", color: "from-cyan-400 to-blue-600" },
  { title: "GSAP", image: "/images/tech/gsap.svg", color: "from-green-400 to-emerald-600" },
];

const backendTech = [
  { title: "Node.js", image: "/images/tech/nodejs.svg", color: "from-green-500 to-green-700" },
  { title: "Express", image: "/images/tech/express.svg", color: "from-gray-600 to-gray-800" },
  { title: "MongoDB", image: "/images/tech/mongodb.svg", color: "from-green-400 to-green-600" },
  { title: "PostgreSQL", image: "/images/tech/postgresql.svg", color: "from-blue-400 to-blue-600" },
  { title: "Supabase", image: "/images/tech/supabase.svg", color: "from-green-400 to-teal-600" },
];

const otherTools = [
  { title: "Git", image: "/images/tech/git.svg", color: "from-orange-500 to-red-600" },
  { title: "Vercel", image: "/images/tech/vercel.svg", color: "from-gray-700 to-black" },
  { title: "Render", image: "/images/tech/render.svg", color: "from-purple-500 to-purple-700" },
  { title: "Postman", image: "/images/tech/postman.svg", color: "from-orange-400 to-orange-600" },
  { title: "N8N", image: "/images/tech/n8n.svg", color: "from-pink-500 to-rose-600" },
  { title: "Docker", image: "/images/tech/docker.svg", color: "from-blue-500 to-blue-700" },
];

export const TechStack: React.FC = () => {
  return (
    <div className="mt-32">
      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-12 text-center">
        Tech I Work With
      </h2>

      {/* Frontend */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl md:text-3xl font-bold">Frontend</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
        </div>
        <p className="text-muted-foreground mb-4 text-base md:text-lg">
          I craft interfaces that feel smooth, fast and mostly bug free.
        </p>
        <HoverEffect items={frontendTech} className="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5" />
      </div>

      {/* Backend */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl md:text-3xl font-bold">Backend</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-green-500/50 to-transparent"></div>
        </div>
        <p className="text-muted-foreground mb-4 text-base md:text-lg">
          I make sure everything behind the scenes works reliably, securely and scales.
        </p>
        <HoverEffect items={backendTech} className="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5" />
      </div>

      {/* Other Tools */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-2xl md:text-3xl font-bold">Other Tools</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        <HoverEffect items={otherTools} className="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6" />
      </div>
    </div>
  );
};
