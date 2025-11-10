"use client";

import { useState, useEffect, useRef } from 'react';

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
    const snapContainer = document.querySelector('.snap-container') as HTMLElement;
    if (!snapContainer) return;

    // Handle horizontal scroll to detect current section
    const handleHorizontalScroll = () => {
      const scrollLeft = snapContainer.scrollLeft;
      const sectionWidth = window.innerWidth;
      
      // Calculate which section is currently visible
      const sectionIndex = Math.round(scrollLeft / sectionWidth);
      const newSection = Math.max(1, Math.min(sections.length, sectionIndex + 1));

      setCurrentSection((prevSection) => {
        if (prevSection !== newSection) {
          return newSection;
        }
        return prevSection;
      });
    };

    // Listen to scroll events for updates
    snapContainer.addEventListener('scroll', handleHorizontalScroll, { passive: true });
    
    // Also use a periodic check to ensure we catch any missed updates
    const checkInterval = setInterval(() => {
      handleHorizontalScroll();
    }, 100);

    // Initial check
    const initialTimeout = setTimeout(() => {
      handleHorizontalScroll();
    }, 100);

    // Handle window resize to recalculate
    const handleResize = () => {
      handleHorizontalScroll();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      snapContainer.removeEventListener('scroll', handleHorizontalScroll);
      window.removeEventListener('resize', handleResize);
      clearInterval(checkInterval);
      clearTimeout(initialTimeout);
    };
  }, []); // Remove currentSection from dependencies to avoid re-renders

  return {
    currentSection,
    totalSections: sections.length
  };
}
