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
  const navLockUntilRef = useRef(0);
  const lastWheelTimeRef = useRef(0);
  const gestureCanNavigateRef = useRef(false);

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

      // Always open a section at its top so the title is visible
      const targetWrapper = sectionWrappers[targetIndex];
      if (targetWrapper) {
        targetWrapper.scrollTo({ top: 0, behavior: 'instant' });
      }

      // Reset navigation flag after scroll completes
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 600);
    };

    // Overflow that only eats into the section's bottom padding hides no content,
    // so the section counts as fitting the viewport (with a small visual margin kept)
    const BOTTOM_PADDING_MARGIN_PX = 16;
    // Wheel events closer together than this belong to the same gesture (includes trackpad inertia)
    const GESTURE_GAP_MS = 120;
    // Ignore all wheel input after a section change so inertia can't scroll the new section
    const NAV_LOCK_MS = 800;
    const NAV_DELTA_THRESHOLD = 40;

    // Check if vertical scroll is at boundary (top or bottom)
    const getScrollState = (sectionWrapper: HTMLElement): { scrollable: boolean; atTop: boolean; atBottom: boolean } => {
      const { scrollTop, scrollHeight, clientHeight } = sectionWrapper;
      const threshold = 10;
      const section = sectionWrapper.firstElementChild as HTMLElement | null;
      const paddingBottom = section ? parseFloat(getComputedStyle(section).paddingBottom) || 0 : 0;
      const hiddenTolerance = Math.max(4, paddingBottom - BOTTOM_PADDING_MARGIN_PX);
      const scrollable = scrollHeight - clientHeight > hiddenTolerance;

      return {
        scrollable,
        atTop: !scrollable || scrollTop <= threshold,
        atBottom: !scrollable || scrollTop + clientHeight >= scrollHeight - threshold,
      };
    };

    // Handle wheel events for horizontal/vertical navigation
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = performance.now();
      const isNewGesture = now - lastWheelTimeRef.current > GESTURE_GAP_MS;
      const gap = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;

      // Swallow everything (including inertia) right after a section change
      if (now < navLockUntilRef.current) return;

      const currentSectionWrapper = sectionWrappers[currentSectionIndexRef.current];
      if (!currentSectionWrapper || e.deltaY === 0) return;

      const isScrollingDown = e.deltaY > 0;
      const { scrollable, atTop, atBottom } = getScrollState(currentSectionWrapper);
      const atBoundary = isScrollingDown ? atBottom : atTop;

      // A gesture may only change section if it STARTED at the boundary.
      // Scrolling down to the bottom and carrying on never flips the page.
      if (isNewGesture) {
        gestureCanNavigateRef.current = atBoundary;
        if (gap > 700) wheelDeltaRef.current = 0;
      }

      if (scrollable && !atBoundary) {
        wheelDeltaRef.current = 0;
        currentSectionWrapper.scrollBy({ top: e.deltaY, behavior: 'auto' });
        return;
      }

      if (!gestureCanNavigateRef.current) return;

      wheelDeltaRef.current += Math.abs(e.deltaY);
      if (wheelDeltaRef.current < NAV_DELTA_THRESHOLD) return;

      wheelDeltaRef.current = 0;
      gestureCanNavigateRef.current = false;
      const nextIndex = currentSectionIndexRef.current + (isScrollingDown ? 1 : -1);
      if (nextIndex >= 0 && nextIndex < sections.length) {
        navLockUntilRef.current = now + NAV_LOCK_MS;
        navigateToSection(nextIndex, isScrollingDown ? 'right' : 'left');
      }
    };

    // Update current section index and URL on horizontal scroll
    const handleHorizontalScroll = () => {
      const newIndex = getCurrentSectionIndex();
      if (newIndex !== currentSectionIndexRef.current) {
        currentSectionIndexRef.current = newIndex;

        // Always arrive at the top of a section so its title is visible
        sectionWrappers[newIndex]?.scrollTo({ top: 0, behavior: 'instant' });

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

