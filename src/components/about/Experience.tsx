"use client";
import React from "react";
import Image from "next/image";

type ExperienceItem = {
  role: string;
  company: string;
  logo: string;
  period: string;
  description: string[];
};

const experiences: ExperienceItem[] = [
  {
    role: "Junior Software Engineer",
    company: "Jaypee Brothers Medical Publishers Pvt. Ltd.",
    logo: "/images/experience/Jaypee-Logo.png",
    period: "May 2025 – Present",
    description: [
      "Developed content ingestion and sync pipelines for medical and educational apps, ensuring data consistency across environments.",
      "Built and maintained interactive web applications using Next.js, React, and TypeScript, integrating backend APIs and dynamic content.",
      "Implemented automated workflows for internal tools, reducing manual effort and improving reliability.",
    ],
  },
];

export const Experience: React.FC = () => {
  return (
    <div className="mt-32">
      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-12">
        Experience
      </h2>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="group flex flex-col md:flex-row gap-6 md:gap-8"
          >
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 relative bg-white rounded-xl p-3 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  fill
                  sizes="(max-width: 768px) 80px, 96px"
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              {/* Role and Company */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {exp.role}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                  <span className="text-base md:text-lg font-medium">
                    {exp.company}
                  </span>
                  <span className="hidden sm:block text-white/30">•</span>
                  <span className="text-sm md:text-base">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Description */}
              <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-blue-400 flex-shrink-0">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
