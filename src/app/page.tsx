"use client";

import { useHashNavigation } from "@/hooks/useHashNavigation";
import { useHorizontalSectionNavigation } from "@/hooks/useHorizontalSectionNavigation";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  useHashNavigation();
  useHorizontalSectionNavigation();
  
  const sections = [
    { id: 'home', component: <HomeSection /> },
    { id: 'about-me', component: <AboutSection /> },
    { id: 'projects', component: <ProjectsSection /> },
    { id: 'skills', component: <SkillsSection /> },
    { id: 'services', component: <ServicesSection /> },
    { id: 'testimonials', component: <TestimonialsSection /> },
    { id: 'contact', component: <ContactSection /> },
  ];

  return (
    <div className="bg-rich-black snap-container">
      {sections.map((section) => (
        <div key={section.id} className="snap-section-wrapper">
          {section.component}
        </div>
      ))}
    </div>
  );
}
