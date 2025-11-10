"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useHashNavigation() {
  const router = useRouter();

  useEffect(() => {
    const sections = ['home', 'about-me', 'projects', 'skills', 'services', 'testimonials', 'contact'];
    
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash) {
        const sectionIndex = sections.indexOf(hash);
        if (sectionIndex !== -1) {
          const snapContainer = document.querySelector('.snap-container') as HTMLElement;
          if (snapContainer) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
              const sectionWidth = window.innerWidth;
              const targetScrollLeft = sectionIndex * sectionWidth;
              
              // Use instant scroll (no animation) for navigation
              snapContainer.scrollTo({
                left: targetScrollLeft,
                behavior: 'auto'
              });
            }, 100);
          }
        }
      }
    };

    // Handle initial hash on page load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router]);
}
