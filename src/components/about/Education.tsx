"use client";
import React from "react";
import Image from "next/image";

type EducationItem = {
  degree: string;
  institution: string;
  logo: string;
  period: string;
};

const education: EducationItem[] = [
  {
    degree: "Bachelor of Technology (B.Tech) in Computer Science",
    institution: "ABES Engineering College",
    logo: "/images/education/abesLogo.png",
    period: "2021 – 2025",
  },
];

export const Education: React.FC = () => {
  return (
    <div className="mt-32">
      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-12">
        Education
      </h2>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <div
            key={index}
            className="group flex flex-col md:flex-row gap-6 md:gap-8"
          >
            {/* Institution Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 relative bg-black rounded-xl p-3 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={edu.logo}
                  alt={`${edu.institution} logo`}
                  fill
                  sizes="(max-width: 768px) 80px, 96px"
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              {/* Degree and Institution */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {edu.degree}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                  <span className="text-base md:text-lg font-medium">
                    {edu.institution}
                  </span>
                  <span className="hidden sm:block text-white/30">•</span>
                  <span className="text-sm md:text-base">
                    {edu.period}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
