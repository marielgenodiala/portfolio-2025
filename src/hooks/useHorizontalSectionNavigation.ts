"use client";

import { useEffect, useRef } from 'react';

/**
 * Hook to handle horizontal section navigation with vertical scrolling within sections
 * - Horizontal navigation between sections (swiper left/right)
 * - Vertical scrolling within each section's content
 * - Only allows horizontal navigation when vertical scroll is at boundaries
 */
export function useHorizontalSectionNavigation() {
  const containerRef = useRef<HTMLElement | null>(null);
  const currentSectionIndexRef = useRef(0);
  const isScrollingVerticallyRef = useRef(false);
  const verticalScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wheelDeltaRef = useRef(0);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const container = document.querySelector('.snap-container') as HTMLElement;
    if (!container) return;

    containerRef.current = container;

    const sections = ['home', 'about-me', 'projects', 'skills', 'services', 'testimonials', 'contact'];
    const sectionWrappers = Array.from(document.querySelectorAll('.snap-section-wrapper')) as HTMLElement[];

    // Get current section index based on scroll position
    const getCurrentSectionIndex = (): number => {
      const scrollLeft = container.scrollLeft;
      const sectionWidth = window.innerWidth;
      const index = Math.round(scrollLeft / sectionWidth);
      return Math.max(0, Math.min(sections.length - 1, index));
    };

    // Navigate to section horizontally
    const navigateToSection = (index: number, direction: 'left' | 'right' = 'right') => {
      if (isNavigatingRef.current) return;
      
      const targetIndex = Math.max(0, Math.min(sections.length - 1, index));
      const sectionWidth = window.innerWidth;
      const targetScrollLeft = targetIndex * sectionWidth;

      isNavigatingRef.current = true;
      
      // Use smooth scroll behavior (CSS handles the animation)
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });

      currentSectionIndexRef.current = targetIndex;

      // Reset navigation flag after scroll completes
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 600);
    };

    // Check if vertical scroll is at boundary (top or bottom)
    const isVerticalScrollAtBoundary = (sectionWrapper: HTMLElement): { atTop: boolean; atBottom: boolean } => {
      const scrollTop = sectionWrapper.scrollTop;
      const scrollHeight = sectionWrapper.scrollHeight;
      const clientHeight = sectionWrapper.clientHeight;
      const threshold = 10; // 10px threshold

      const atTop = scrollTop <= threshold;
      const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;

      return { atTop, atBottom };
    };

    // Handle wheel events for horizontal/vertical navigation
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const currentSectionWrapper = sectionWrappers[currentSectionIndexRef.current];
      if (!currentSectionWrapper) return;

      // Check vertical scroll boundaries
      const { atTop, atBottom } = isVerticalScrollAtBoundary(currentSectionWrapper);
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // Accumulate wheel delta for smoother navigation
      wheelDeltaRef.current += Math.abs(e.deltaY);

      // If we're scrolling vertically and not at boundaries, handle vertical scroll
      if ((isScrollingDown && !atBottom) || (isScrollingUp && !atTop)) {
        isScrollingVerticallyRef.current = true;
        wheelDeltaRef.current = 0;

        // Clear any pending horizontal navigation
        if (verticalScrollTimeoutRef.current) {
          clearTimeout(verticalScrollTimeoutRef.current);
        }

        // Allow vertical scrolling
        currentSectionWrapper.scrollBy({
          top: e.deltaY,
          behavior: 'auto'
        });

        // Reset vertical scrolling flag after a delay
        verticalScrollTimeoutRef.current = setTimeout(() => {
          isScrollingVerticallyRef.current = false;
        }, 150);

        return;
      }

      // If at vertical boundary, handle horizontal navigation
      if ((atBottom && isScrollingDown) || (atTop && isScrollingUp)) {
        // Only navigate horizontally if we've accumulated enough scroll delta
        if (wheelDeltaRef.current > 50) {
          wheelDeltaRef.current = 0;

          if (isScrollingDown && currentSectionIndexRef.current < sections.length - 1) {
            // Navigate to next section (swipe right)
            navigateToSection(currentSectionIndexRef.current + 1, 'right');
          } else if (isScrollingUp && currentSectionIndexRef.current > 0) {
            // Navigate to previous section (swipe left)
            navigateToSection(currentSectionIndexRef.current - 1, 'left');
          }
        }
      }
    };

    // Update current section index and URL on horizontal scroll
    const handleHorizontalScroll = () => {
      const newIndex = getCurrentSectionIndex();
      if (newIndex !== currentSectionIndexRef.current) {
        currentSectionIndexRef.current = newIndex;

        // Update URL based on current section
        const currentSection = sections[newIndex];
        if (currentSection === 'home') {
          // Remove hash for home section
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        } else {
          // Add hash for other sections
          const newHash = `#${currentSection}`;
          if (window.location.hash !== newHash) {
            window.history.replaceState(null, '', newHash);
          }
        }
      }
    };

    // Initialize current section index
    currentSectionIndexRef.current = getCurrentSectionIndex();

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleHorizontalScroll, { passive: true });

    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const sectionIndex = sections.indexOf(hash);
        if (sectionIndex !== -1 && sectionIndex !== currentSectionIndexRef.current) {
          navigateToSection(sectionIndex);
        }
      }
    };

    // Initial hash check
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleHorizontalScroll);
      window.removeEventListener('hashchange', handleHashChange);
      if (verticalScrollTimeoutRef.current) {
        clearTimeout(verticalScrollTimeoutRef.current);
      }
    };
  }, []);
}

