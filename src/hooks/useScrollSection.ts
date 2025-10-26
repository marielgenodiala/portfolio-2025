"use client";

import { useState, useEffect } from 'react';

const sections = [
  'home',
  'about-me',
  'projects',
  'skills',
  'services',
  'testimonials',
  'contact'
];

export function useScrollSection() {
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const snapContainer = document.querySelector('.snap-container');
      if (!snapContainer) return;

      const scrollTop = snapContainer.scrollTop;
      const viewportHeight = window.innerHeight;

      // Calculate which section index based on scroll position
      const sectionIndex = Math.round(scrollTop / viewportHeight);
      const newSection = Math.max(1, Math.min(sections.length, sectionIndex + 1));

      if (newSection !== currentSection) {
        setCurrentSection(newSection);
      }
    };

    // Initial check
    setTimeout(() => {
      handleScroll();
    }, 100);

    const snapContainer = document.querySelector('.snap-container');

    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll);

      return () => {
        snapContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [currentSection]);

  return {
    currentSection,
    totalSections: sections.length
  };
}
