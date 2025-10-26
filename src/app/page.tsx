"use client";

import { useHashNavigation } from "@/hooks/useHashNavigation";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  useHashNavigation();
  return (
    <div className="bg-rich-black snap-container">
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
