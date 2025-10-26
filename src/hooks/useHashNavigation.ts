"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useHashNavigation() {
  const router = useRouter();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Small delay to ensure page is fully loaded
          setTimeout(() => {
            if (hash === "home") {
              // Home section doesn't need offset - it's positioned naturally
              element.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
              });
            } else {
              // Other sections need offset to account for fixed header
              const headerHeight = 112; // h-28 = 112px
              const elementPosition = element.offsetTop - headerHeight;
              
              window.scrollTo({
                top: elementPosition,
                behavior: "smooth"
              });
            }
          }, 100);
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
