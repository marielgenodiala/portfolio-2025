"use client";

import Image from "next/image";
import { Heading } from "@/ui";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";

export default function SkillsSection() {
  const skills = [
    "java.png",
    "javacript.png",
    "typescript.png",
    "python.png",
    "php.png",
    "springboot.png",
    "nodejs.png",
    "react.png",
    "jquery.png",
    "tailwindCSS.png",
    "wordpress.png",
    "elementor.png",
    "medusa.png",
    "mysql.png",
    "postgreSQL.png",
    "supabase.png",
    "docker.png",
    "github.png",
    "netlify.png",
    "vercel.png",
    "figma.png",
  ];

  const getSkillName = (logoName: string) => {
    const name = logoName.replace(".png", "");
    
    // Handle specific cases that shouldn't have spaces
    const specialCases: { [key: string]: string } = {
      "postgreSQL": "PostgreSQL",
      "tailwindCSS": "Tailwind CSS",
      "nodejs": "Node.js",
      "javacript": "JavaScript",
      "elementor": "Elementor",
      "springboot": "Spring Boot",
      "netlify": "Netlify",
      "vercel": "Vercel",
      "wordpress": "WordPress",
      "figma": "Figma",
      "github": "GitHub",
      "docker": "Docker",
      "mysql": "MySQL",
      "mongodb": "MongoDB",
      "supabase": "Supabase",
      "medusa": "Medusa",
      "react": "React",
      "java": "Java",
      "python": "Python",
      "php": "PHP",
      "jquery": "jQuery",
      "typescript": "TypeScript"
    };
    
    // Check if it's a special case first
    if (specialCases[name]) {
      return specialCases[name];
    }
    
    // Default behavior for other cases
    return name
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <section
      id="skills"
      className="min-h-screen flex justify-center items-center px-4 pt-28 md:pt-36 pb-20 snap-section"
      style={{ paddingBottom: 'max(6rem, calc(6rem + env(safe-area-inset-bottom) + 2rem))' }}
      >
        <div className="mx-auto px-12 lg:max-w-[900px] xl:max-w-7xl">
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
          <div className="text-center mb-6 md:mb-16">
            <Heading type="h2" variant="section" className="text-white">
              Skills
            </Heading>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 lg:gap-y-5 lg:gap-x-20">
          {skills.map((logo, index) => (
            <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={index} delay={index * 100}>
              <div className="flex flex-col items-center justify-center group cursor-pointer">
                <div className="flex items-center justify-center mb-3 group-hover:scale-105 transform duration-300">
                  <Image
                    src={`/images/skills-section/${logo}`}
                    alt={`${getSkillName(logo)} logo`}
                    width={80}
                    height={80}
                    className="opacity-80 group-hover:opacity-100 transition-opacity object-contain w-20 h-20"
                  />
                </div>
                <span className="text-white text-sm font-text text-center group-hover:text-dim-gray transition-colors h-8 flex items-center">
                  {getSkillName(logo)}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
