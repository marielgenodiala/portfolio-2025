"use client";

import { useEffect, useRef } from 'react';

/**
 * Hook to control scroll snap behavior
 * Allows scrolling within sections before snapping to next section
 * Adds breather/pause at section boundaries
 */
export function useScrollSnapControl() {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTopRef = useRef(0);
  const boundaryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAtBoundaryRef = useRef(false);
  const snapDisabledRef = useRef(false);
  const lastSectionRef = useRef<string | null>(null);
  const revealCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const snapContainer = document.querySelector('.snap-container') as HTMLElement;
    if (!snapContainer) return;

    // Threshold for detecting section boundaries (in pixels)
    const BOUNDARY_THRESHOLD = 80; // 80px from top or bottom
    const SCROLL_DEBOUNCE = 150; // ms to wait before re-enabling snap
    const REVEAL_ANIMATION_DELAY = 2500; // ms to wait for Reveal animations
    
    // Get breather delay based on screen size
    // md breakpoint is 768px in Tailwind
    const getBreatherDelay = (): number => {
      const width = window.innerWidth;
      // For md and larger screens (>= 768px), use minimal delay (just wait for animations)
      // For smaller screens, use longer delay for better reading experience
      return width >= 768 ? 100 : 1000; // 100ms for md+, 1000ms for smaller screens
    };

    // Check if Reveal animations are still running
    const checkRevealAnimations = (): boolean => {
      try {
        const revealElements = document.querySelectorAll('[class*="react-awesome-reveal"]');
        let hasActiveAnimations = false;
        
        revealElements.forEach((el) => {
          const element = el as HTMLElement;
          const computedStyle = window.getComputedStyle(element);
          const opacity = parseFloat(computedStyle.opacity);
          const transform = computedStyle.transform;
          
          // Check if element is still animating
          if (opacity < 0.99 || (transform && transform !== 'none' && !transform.includes('matrix(1, 0, 0, 1, 0, 0)'))) {
            hasActiveAnimations = true;
          }
        });
        
        return hasActiveAnimations;
      } catch {
        return false;
      }
    };

    const getCurrentSection = (scrollTop: number, clientHeight: number): string => {
      const sections = ['home', 'about-me', 'projects', 'skills', 'services', 'testimonials', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      
      if (sectionElements.length === 0) {
        const sectionIndex = Math.floor(scrollTop / clientHeight);
        return sections[Math.min(sectionIndex, sections.length - 1)] || sections[0];
      }

      // Find which section is most visible
      let mostVisibleSection = sections[0];
      let maxVisibility = 0;

      sectionElements.forEach((sectionElement) => {
        const rect = sectionElement.getBoundingClientRect();
        const containerRect = snapContainer.getBoundingClientRect();
        
        // Calculate intersection
        const top = Math.max(rect.top, containerRect.top);
        const bottom = Math.min(rect.bottom, containerRect.bottom);
        const height = Math.max(0, bottom - top);
        const visibility = height / containerRect.height;

        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = sectionElement.id;
        }
      });

      return mostVisibleSection;
    };

    const handleScroll = () => {
      const scrollTop = snapContainer.scrollTop;
      const scrollHeight = snapContainer.scrollHeight;
      const clientHeight = snapContainer.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Get current section
      const currentSectionId = getCurrentSection(scrollTop, clientHeight);
      
      // Check if we've changed sections
      const sectionChanged = lastSectionRef.current !== currentSectionId;
      if (sectionChanged) {
        lastSectionRef.current = currentSectionId;
        
        // Clear any existing reveal check
        if (revealCheckIntervalRef.current) {
          clearInterval(revealCheckIntervalRef.current);
        }

        // Wait for Reveal animations when entering a new section
        let revealCheckCount = 0;
        const maxRevealChecks = REVEAL_ANIMATION_DELAY / 100;
        
        revealCheckIntervalRef.current = setInterval(() => {
          revealCheckCount++;
          const hasAnimations = checkRevealAnimations();
          
          if (!hasAnimations || revealCheckCount >= maxRevealChecks) {
            if (revealCheckIntervalRef.current) {
              clearInterval(revealCheckIntervalRef.current);
              revealCheckIntervalRef.current = null;
            }
            // Re-enable mandatory snap after animations complete
            if (snapDisabledRef.current && !isAtBoundaryRef.current) {
              snapDisabledRef.current = false;
              snapContainer.style.scrollSnapType = 'y mandatory';
            }
          }
        }, 100);
      }

      // Determine scroll direction
      lastScrollTopRef.current = scrollTop;

      // Get current section element to check boundaries
      const currentSectionElement = document.getElementById(currentSectionId);
      if (!currentSectionElement) return;

      const sectionRect = currentSectionElement.getBoundingClientRect();
      const containerRect = snapContainer.getBoundingClientRect();
      
      // Calculate distances from section boundaries
      const distanceFromSectionTop = sectionRect.top - containerRect.top;
      const distanceFromSectionBottom = containerRect.bottom - sectionRect.bottom;
      
      // Check if we're at boundaries
      const nearTop = distanceFromSectionTop < BOUNDARY_THRESHOLD && distanceFromSectionTop >= -BOUNDARY_THRESHOLD;
      const nearBottom = distanceFromSectionBottom < BOUNDARY_THRESHOLD && distanceFromSectionBottom >= -BOUNDARY_THRESHOLD;
      const atContainerTop = scrollTop <= BOUNDARY_THRESHOLD;
      const atContainerBottom = scrollTop >= maxScroll - BOUNDARY_THRESHOLD;

      // If we're at a boundary and not already handling it, add breather
      if ((nearTop || nearBottom || atContainerTop || atContainerBottom) && !isAtBoundaryRef.current) {
        isAtBoundaryRef.current = true;
        snapDisabledRef.current = true;
        
        // Temporarily disable scroll snap to allow reading at boundary
        snapContainer.style.scrollSnapType = 'none';
        
        // Clear any existing boundary timeout
        if (boundaryTimeoutRef.current) {
          clearTimeout(boundaryTimeoutRef.current);
        }

        // Re-enable mandatory snap after breather delay (allowing time to read)
        // Use responsive delay based on screen size
        const breatherDelay = getBreatherDelay();
        boundaryTimeoutRef.current = setTimeout(() => {
          // Check if Reveal animations are done before re-enabling
          if (!checkRevealAnimations()) {
            isAtBoundaryRef.current = false;
            snapDisabledRef.current = false;
            // Re-enable mandatory snap for section-to-section navigation
            snapContainer.style.scrollSnapType = 'y mandatory';
          } else {
            // If animations still running, wait a bit more
            setTimeout(() => {
              isAtBoundaryRef.current = false;
              snapDisabledRef.current = false;
              // Re-enable mandatory snap for section-to-section navigation
              snapContainer.style.scrollSnapType = 'y mandatory';
            }, 500);
          }
        }, breatherDelay);
      } else if (!nearTop && !nearBottom && !atContainerTop && !atContainerBottom) {
        // We're in the middle of a section, disable snap to allow scrolling within section
        isAtBoundaryRef.current = false;
        if (!snapDisabledRef.current) {
          snapDisabledRef.current = true;
          snapContainer.style.scrollSnapType = 'none';
        }
      }

      // Clear scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // After scrolling stops, ensure snap is properly configured
      scrollTimeoutRef.current = setTimeout(() => {
        // If we're not at a boundary and snap is disabled, check if we should re-enable
        // Only re-enable if we're actually at a boundary (for mandatory snap)
        if (!isAtBoundaryRef.current && snapDisabledRef.current) {
          // Check current position again
          const currentSectionEl = document.getElementById(currentSectionId);
          if (currentSectionEl) {
            const currentSectionRect = currentSectionEl.getBoundingClientRect();
            const currentContainerRect = snapContainer.getBoundingClientRect();
            const currentDistanceFromTop = currentSectionRect.top - currentContainerRect.top;
            const currentDistanceFromBottom = currentContainerRect.bottom - currentSectionRect.bottom;
            
            const isAtBoundaryNow = 
              (currentDistanceFromTop < BOUNDARY_THRESHOLD && currentDistanceFromTop >= -BOUNDARY_THRESHOLD) ||
              (currentDistanceFromBottom < BOUNDARY_THRESHOLD && currentDistanceFromBottom >= -BOUNDARY_THRESHOLD) ||
              scrollTop <= BOUNDARY_THRESHOLD ||
              scrollTop >= maxScroll - BOUNDARY_THRESHOLD;
            
            if (isAtBoundaryNow && !checkRevealAnimations()) {
              isAtBoundaryRef.current = true;
              snapDisabledRef.current = false;
              snapContainer.style.scrollSnapType = 'y mandatory';
            }
          }
        }
      }, SCROLL_DEBOUNCE);
    };

    // Initial setup - use mandatory for section-to-section snapping
    snapContainer.style.scrollSnapType = 'y mandatory';
    
    // Initial section detection
    const initialScrollTop = snapContainer.scrollTop;
    const initialClientHeight = snapContainer.clientHeight;
    lastSectionRef.current = getCurrentSection(initialScrollTop, initialClientHeight);

    snapContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      snapContainer.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (boundaryTimeoutRef.current) {
        clearTimeout(boundaryTimeoutRef.current);
      }
      if (revealCheckIntervalRef.current) {
        clearInterval(revealCheckIntervalRef.current);
      }
      // Reset on cleanup
      snapContainer.style.scrollSnapType = '';
    };
  }, []);
}

