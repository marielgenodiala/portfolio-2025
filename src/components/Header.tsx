"use client";

import { useState, useEffect, useRef } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current) {
        const target = event.target as Node;
        const menuPanel = menuRef.current.querySelector(".menu-panel");

        // Close if clicking outside the menu panel (but allow clicking on the dark background)
        if (menuPanel && !menuPanel.contains(target)) {
          setIsMenuOpen(false);
        }
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const sections = ['home', 'about-me', 'projects', 'skills', 'services', 'testimonials', 'contact'];
    const sectionIndex = sections.indexOf(sectionId);

    // Determine the URL to use - no hash for home, hash for other sections
    const targetUrl = sectionId === 'home' ? '/' : `/#${sectionId}`;

    // If on thank-you page, navigate to root first, then scroll
    if (pathname === '/thank-you') {
      router.push(targetUrl);
      // Wait for navigation, then scroll
      setTimeout(() => {
        if (sectionIndex !== -1) {
          const snapContainer = document.querySelector('.snap-container') as HTMLElement;
          if (snapContainer) {
            const sectionWidth = window.innerWidth;
            const targetScrollLeft = sectionIndex * sectionWidth;

            // Use instant scroll (no animation) for menu navigation
            snapContainer.scrollTo({
              left: targetScrollLeft,
              behavior: 'auto'
            });
          }
        }
      }, 100);
    } else {
      // Update URL - use replaceState for home to remove hash, push for others
      if (sectionId === 'home') {
        window.history.replaceState(null, '', '/');
      } else {
        window.history.pushState(null, '', `#${sectionId}`);
      }

      // Navigate horizontally to section with instant scroll (no animation)
      if (sectionIndex !== -1) {
        const snapContainer = document.querySelector('.snap-container') as HTMLElement;
        if (snapContainer) {
          const sectionWidth = window.innerWidth;
          const targetScrollLeft = sectionIndex * sectionWidth;

          // Use instant scroll (no animation) for menu navigation
          snapContainer.scrollTo({
            left: targetScrollLeft,
            behavior: 'auto'
          });
        }
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    // Navigate to root and scroll to home section (no hash for home)
    if (pathname === '/thank-you') {
      router.push('/');
      setTimeout(() => {
        const snapContainer = document.querySelector('.snap-container') as HTMLElement;
        if (snapContainer) {
          snapContainer.scrollTo({
            left: 0,
            behavior: 'auto'
          });
        }
      }, 100);
    } else {
      // Remove any hash and go to clean root URL
      window.history.replaceState(null, '', '/');
      const snapContainer = document.querySelector('.snap-container') as HTMLElement;
      if (snapContainer) {
        snapContainer.scrollTo({
          left: 0,
          behavior: 'auto'
        });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-rich-black/90 backdrop-blur-md">
        <div className="mx-auto px-4 lg:px-12">
          <div className="flex items-center justify-between h-28">
            {/* Logo - Left Side */}
            <button
              onClick={handleLogoClick}
              className="flex items-center py-4 cursor-pointer"
              aria-label="Go to Home section"
            >
              <Image
                src="/images/mg-logo.png"
                alt="MG Logo"
                width={110}
                height={110}
                priority
              />
            </button>
            {/* Hamburger Menu Button - Right Side */}
            <button
              className="text-white py-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
            >
              <CgMenuRightAlt className="w-8 h-8" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex" ref={menuRef}>
          {/* Left Side - Dark Background */}
          <div className="flex-1 bg-rich-black/80"></div>

          {/* Right Side - Menu Panel */}
          <div className="w-80 xl:w-96 bg-gunmetal relative menu-panel">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <IoClose className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Menu Items */}
            <nav className="pt-20 px-8">
              <div className="space-y-6">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block w-full text-left text-white font-heading text-lg uppercase border-b border-paynes-gray pb-2 hover:text-dim-gray transition-colors"
                  aria-label="Navigate to Home section"
                >
                  HOME
                </button>
                <button
                  onClick={() => scrollToSection("about-me")}
                  className="block w-full text-left text-white font-heading text-lg uppercase border-b border-paynes-gray pb-2 hover:text-dim-gray transition-colors"
                  aria-label="Navigate to About Me section"
                >
                  ABOUT ME
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="block w-full text-left text-white font-heading text-lg uppercase border-b border-paynes-gray pb-2 hover:text-dim-gray transition-colors"
                  aria-label="Navigate to Projects section"
                >
                  PROJECTS
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="block w-full text-left text-white font-heading text-lg uppercase border-b border-paynes-gray pb-2 hover:text-dim-gray transition-colors"
                  aria-label="Navigate to Skills section"
                >
                  SKILLS
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block w-full text-left text-white font-heading text-lg uppercase border-b border-paynes-gray pb-2 hover:text-dim-gray transition-colors"
                  aria-label="Navigate to Services section"
                >
                  SERVICES
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="block w-full text-left text-white font-heading text-lg uppercase border-b border-paynes-gray pb-2 hover:text-dim-gray transition-colors"
                  aria-label="Navigate to Testimonials section"
                >
                  TESTIMONIALS
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block w-full text-left text-white font-heading text-lg uppercase border-b border-paynes-gray pb-2 hover:text-dim-gray transition-colors"
                  aria-label="Navigate to Contact section"
                >
                  CONTACT
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
