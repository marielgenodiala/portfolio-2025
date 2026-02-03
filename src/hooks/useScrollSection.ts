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
  const lastUrlUpdateRef = useRef<string>('');

  useEffect(() => {
    const snapContainer = document.querySelector('.snap-container') as HTMLElement;
    if (!snapContainer) return;

    // Update URL based on current section
    const updateUrl = (sectionIndex: number) => {
      const sectionName = sections[sectionIndex];
      const newUrl = sectionName === 'home' ? '/' : `/#${sectionName}`;

      // Only update if URL actually changed
      if (lastUrlUpdateRef.current !== newUrl) {
        lastUrlUpdateRef.current = newUrl;
        if (sectionName === 'home') {
          // Remove hash for home
          if (window.location.hash) {
            window.history.replaceState(null, '', '/');
          }
        } else {
          // Add hash for other sections
          if (window.location.hash !== `#${sectionName}`) {
            window.history.replaceState(null, '', `#${sectionName}`);
          }
        }
      }
    };

    // Handle horizontal scroll to detect current section
    const handleHorizontalScroll = () => {
      const scrollLeft = snapContainer.scrollLeft;
      const sectionWidth = window.innerWidth;

      // Calculate which section is currently visible
      const sectionIndex = Math.round(scrollLeft / sectionWidth);
      const newSection = Math.max(1, Math.min(sections.length, sectionIndex + 1));

      // Update URL when section changes
      const clampedIndex = Math.max(0, Math.min(sections.length - 1, sectionIndex));
      updateUrl(clampedIndex);

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
