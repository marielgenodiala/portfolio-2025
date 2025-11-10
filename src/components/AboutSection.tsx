"use client";

import Image from "next/image";
import { Heading } from "@/ui";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";
import { useState, useEffect, useRef } from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MdFullscreen } from "react-icons/md";


interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string[];
  logo?: string;
}

interface PersonalActivity {
  title: string;
  images: string[];
  description: string;
}

export default function AboutSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<{[key: string]: number}>({});
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const [fullscreenActivityImages, setFullscreenActivityImages] = useState<string[]>([]);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<{[key: string]: number | null}>({});
  const savedScrollPosition = useRef<number>(0);
  const isScrollLocked = useRef<boolean>(false);
  const preventScrollHandler = useRef<((e: WheelEvent | TouchEvent) => void) | null>(null);
  const preventWindowScrollHandler = useRef<(() => void) | null>(null);
  const mouseMoveHandler = useRef<((e: MouseEvent) => void) | null>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const nextSlide = (activityKey: string, totalImages: number) => {
    setCurrentSlide(prev => ({
      ...prev,
      [activityKey]: ((prev[activityKey] || 0) + 1) % totalImages
    }));
  };

  const prevSlide = (activityKey: string, totalImages: number) => {
    setCurrentSlide(prev => ({
      ...prev,
      [activityKey]: (prev[activityKey] || 0) <= 0 ? totalImages - 1 : (prev[activityKey] || 0) - 1
    }));
  };

  // Calculate duration between start date and present (using 19th of each month)
  const calculateDuration = (startMonth: string, startYear: number): string => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // If today is before the 19th, use previous month's 19th
    // If today is on or after the 19th, use current month's 19th
    let endYear = currentYear;
    let endMonth = currentMonth;
    
    if (currentDay < 19) {
      // Use previous month's 19th
      if (currentMonth === 0) {
        endMonth = 11;
        endYear = currentYear - 1;
      } else {
        endMonth = currentMonth - 1;
      }
    }
    
    const endDate = new Date(endYear, endMonth, 19);
    const startDate = new Date(startYear, getMonthIndex(startMonth), 19);
    
    // Calculate years and months
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    
    // Adjust if months are negative
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Format duration string
    const yearsText = years > 0 ? `${years} ${years === 1 ? 'yr' : 'yrs'}` : '';
    const monthsText = months > 0 ? `${months} ${months === 1 ? 'mo' : 'mos'}` : '';
    const duration = [yearsText, monthsText].filter(Boolean).join(' ');
    
    return duration;
  };

  // Get month index from month name
  const getMonthIndex = (monthName: string): number => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
  };

  const workExperience: WorkExperience[] = [
    {
      title: "Freelance",
      company: "Various Clients",
      period: "Jan 2025 - Present",
      description: [
        "Develop web applications using React and Java tailored to client requirements.",
        // "Provide online tutoring and programming training sessions",
        "Provide IT consulting services across diverse technology projects.",
        "Build and maintain WordPress websites and custom web solutions.",
        "Support clients with data entry and digital content management tasks."
      ]
    },
    {
      title: "Web Developer",
      company: "WebriQ",
      period: `Jun 2023 - Present · ${calculateDuration("Jun", 2023)}`,
      description: [
        "Developed AI Agents and led full-stack web projects using JavaScript, TypeScript, and React.",
        "Built and maintained B2B applications, eCommerce, and booking platforms with modern frameworks.",
        "Integrated APIs and third-party services such as Swell and Medusa to extend functionality.",
        "Utilized PostgreSQL for efficient data handling and backend development.",
        "Applied UI/UX and SEO best practices to enhance usability, visibility, and performance.",
        "Prepared documentation to streamline development and collaboration."
      ],
      logo: "/images/project-section/website.png" // Using website image as placeholder for WebriQ logo
    }
  ];

  const personalActivities: PersonalActivity[] = [
    {
      title: "Adventure & Sports",
      description: "I love staying active through various outdoor activities and sports",
      images: [
        "/images/about/funrun-1.jpg",
        "/images/about/funrun2.jpg",
        "/images/about/badminton1.jpg",
        "/images/about/badminton2.jpg"
      ]
    },
    {
      title: "Community Volunteering",
      description: "Actively participate in tech community events and volunteer work",
      images: [
        "/images/about/volunteer1.jpg",
        "/images/about/volunteer2.jpg",
        "/images/about/volunteer3.jpg"
      ]
    },
    {
      title: "Travel & Photography",
      description: "Enjoy exploring new places and capturing moments through photography",
      images: [
        "/images/about/photo1.jpg",
        "/images/about/photo2.jpg",
        "/images/about/photo3.jpg",
        "/images/about/photo4.jpg",
        "/images/about/photo5.jpg",
        "/images/about/photo6.jpg"
      ]
    }
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleGetConnected = () => {
    closeModal();
    // Use hash navigation approach for reliable scrolling
    setTimeout(() => {
      // Update the URL hash
      window.location.hash = "#contact";
      
      // Also try direct scroll as backup
      const contactElement = document.getElementById("contact");
      if (contactElement) {
        const headerHeight = 112; // h-28 = 112px
        const elementPosition = contactElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth"
        });
      }
    }, 200);
  };

  const openFullscreen = (images: string[], startIndex: number) => {
    setFullscreenActivityImages(images);
    setFullscreenImageIndex(startIndex);
    setIsFullscreenOpen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
    setFullscreenActivityImages([]);
    setFullscreenImageIndex(0);
  };

  const nextFullscreenImage = () => {
    setFullscreenImageIndex((prev) => (prev + 1) % fullscreenActivityImages.length);
  };

  const prevFullscreenImage = () => {
    setFullscreenImageIndex((prev) => 
      prev === 0 ? fullscreenActivityImages.length - 1 : prev - 1
    );
  };

  const handleFullscreenClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeFullscreen();
    }
  };

  // Prevent body scrolling when modal or fullscreen is open
  useEffect(() => {
    const isOverlayOpen = isModalOpen || isFullscreenOpen;
    
    // Track mouse position
    const trackMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    // Prevent scroll on background
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      // Allow scrolling within modal content
      const target = e.target as HTMLElement;
      const modalContent = target.closest('.modal-content');
      
      // Get element at mouse position
      const elementAtPoint = document.elementFromPoint(
        e instanceof WheelEvent ? e.clientX : (e as TouchEvent).touches[0]?.clientX || 0,
        e instanceof WheelEvent ? e.clientY : (e as TouchEvent).touches[0]?.clientY || 0
      );
      const elementAtPointModalContent = elementAtPoint?.closest('.modal-content');
      
      // Log scroll event details
      console.log('=== SCROLL EVENT DETECTED ===');
      console.log('Event type:', e.type);
      console.log('Mouse position:', e instanceof WheelEvent ? { x: e.clientX, y: e.clientY } : 'N/A');
      console.log('Target element:', target);
      console.log('Target tag:', target?.tagName);
      console.log('Target class:', target?.className);
      console.log('Element at mouse point:', elementAtPoint);
      console.log('Element at point tag:', elementAtPoint?.tagName);
      console.log('Element at point class:', elementAtPoint?.className);
      console.log('Modal content found (from target):', !!modalContent);
      console.log('Modal content found (from mouse point):', !!elementAtPointModalContent);
      if (modalContent) {
        console.log('Modal content element:', modalContent);
        console.log('Modal content scrollTop:', (modalContent as HTMLElement).scrollTop);
        console.log('Modal content scrollHeight:', (modalContent as HTMLElement).scrollHeight);
        console.log('Modal content clientHeight:', (modalContent as HTMLElement).clientHeight);
        const rect = (modalContent as HTMLElement).getBoundingClientRect();
        console.log('Modal content position:', { top: rect.top, left: rect.left, width: rect.width, height: rect.height });
      }
      if (e instanceof WheelEvent) {
        console.log('Wheel deltaY:', e.deltaY);
        console.log('Wheel deltaX:', e.deltaX);
        console.log('Window scrollY:', window.scrollY);
        console.log('Document body scrollTop:', document.body.scrollTop);
        console.log('Document documentElement scrollTop:', document.documentElement.scrollTop);
      }
      console.log('Current window scroll position:', window.scrollY);
      console.log('Saved scroll position:', savedScrollPosition.current);
      console.log('===========================');
      
      // Always prevent window/body scrolling when modal is open
      // But allow modal content to scroll
      if (modalContent || elementAtPointModalContent) {
        const contentElement = (modalContent || elementAtPointModalContent) as HTMLElement;
        console.log('✅ SCROLL WITHIN MODAL - Handling modal content scroll');
        
        if (e instanceof WheelEvent) {
          // Check if modal content can scroll in this direction
          const { scrollTop, scrollHeight, clientHeight } = contentElement;
          const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;
          const canScrollUp = scrollTop > 0;
          
          console.log('Modal scroll state:', {
            scrollTop,
            scrollHeight,
            clientHeight,
            canScrollDown,
            canScrollUp,
            deltaY: e.deltaY
          });
          
          // If modal content can scroll in this direction, allow it and prevent window scroll
          if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) {
            console.log('✅ Allowing modal content to scroll');
            // Prevent window scroll but allow modal content scroll
            e.preventDefault();
            e.stopPropagation();
            // Manually scroll the modal content with smooth behavior
            const scrollAmount = e.deltaY;
            const newScrollTop = Math.max(0, Math.min(
              scrollHeight - clientHeight,
              scrollTop + scrollAmount
            ));
            contentElement.scrollTo({
              top: newScrollTop,
              behavior: 'auto' // Use 'auto' for immediate response, or 'smooth' for smooth scrolling
            });
          } else {
            console.log('❌ Modal content at boundary - blocking all scroll');
            // At boundary, prevent all scrolling
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          }
        } else {
          // For touch events, prevent default to stop window scroll
          e.preventDefault();
          e.stopPropagation();
        }
      } else {
        console.log('❌ BLOCKING SCROLL - Not within modal content');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };
    
    if (isOverlayOpen && !isScrollLocked.current) {
      // Save current scroll position
      savedScrollPosition.current = window.scrollY;
      
      // Disable body and html scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      
      // Store handler in ref for cleanup
      preventScrollHandler.current = preventScroll;
      
      // Prevent window scroll
      const preventWindowScroll = () => {
        console.log('🚫 WINDOW SCROLL EVENT DETECTED');
        console.log('Current window.scrollY:', window.scrollY);
        console.log('Saved scroll position:', savedScrollPosition.current);
        console.log('Attempting to restore scroll position...');
        
        // Check if scroll position changed
        if (Math.abs(window.scrollY - savedScrollPosition.current) > 1) {
          console.log('⚠️ WARNING: Background scroll detected! Restoring position...');
          window.scrollTo(0, savedScrollPosition.current);
        }
      };
      preventWindowScrollHandler.current = preventWindowScroll;
      
      // Track mouse movements
      mouseMoveHandler.current = trackMouseMove;
      document.addEventListener('mousemove', trackMouseMove);
      
      // Prevent wheel and touch events from scrolling background
      document.addEventListener('wheel', preventScroll, { passive: false, capture: true });
      document.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
      window.addEventListener('scroll', preventWindowScroll, { passive: false });
      
      isScrollLocked.current = true;
    } else if (!isOverlayOpen && isScrollLocked.current) {
      // Remove event listeners using stored handler
      if (preventScrollHandler.current) {
        document.removeEventListener('wheel', preventScrollHandler.current, { capture: true } as EventListenerOptions);
        document.removeEventListener('touchmove', preventScrollHandler.current, { capture: true } as EventListenerOptions);
        preventScrollHandler.current = null;
      }
      if (preventWindowScrollHandler.current) {
        window.removeEventListener('scroll', preventWindowScrollHandler.current);
        preventWindowScrollHandler.current = null;
      }
      if (mouseMoveHandler.current) {
        document.removeEventListener('mousemove', mouseMoveHandler.current);
        mouseMoveHandler.current = null;
      }
      
      // Restore scrolling when both overlays are closed
      const scrollY = savedScrollPosition.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
      
      isScrollLocked.current = false;
      savedScrollPosition.current = 0;
    }
    
    // Cleanup function
    return () => {
      if (preventScrollHandler.current) {
        document.removeEventListener('wheel', preventScrollHandler.current, { capture: true } as EventListenerOptions);
        document.removeEventListener('touchmove', preventScrollHandler.current, { capture: true } as EventListenerOptions);
        preventScrollHandler.current = null;
      }
      if (preventWindowScrollHandler.current) {
        window.removeEventListener('scroll', preventWindowScrollHandler.current);
        preventWindowScrollHandler.current = null;
      }
      if (mouseMoveHandler.current) {
        document.removeEventListener('mousemove', mouseMoveHandler.current);
        mouseMoveHandler.current = null;
      }
    };
  }, [isModalOpen, isFullscreenOpen]);

  return (
    <>
      <section
        id="about-me"
        className="min-h-screen flex justify-center items-center px-4 pt-36 pb-20 snap-section"
      >
        <div className="mx-auto px-10 md:px-12  max-w-[330px] md:max-w-7xl grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
            <div className="flex justify-center  ">
              <div className="relative w-[250px] h-[300px] md:w-[300px] md:h-[375px] lg:w-[350px] lg:h-[437px] xl:w-[400px] xl:h-[500px]">
              
                <div className="absolute top-3 right-2 md:top-4 md:right-4 xl:top-5 xl:right-5 w-full h-full border-[2px] md:border-[3px] border-van-dyke rounded-sm pointer-events-none z-0"></div>

                <div className="absolute bottom-3 left-2 md:bottom-4 md:left-4 xl:bottom-5 xl:left-5 w-full h-full border-[2px] md:border-[3px] border-dim-gray rounded-sm pointer-events-none z-0"></div>

   
                <div className="absolute  inset-1 md:inset-1.5  xl:inset-2 overflow-hidden rounded-sm z-10">
                  <Image
                    src="/images/About Me Image.png"
                    alt="About Me Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal keyframes={fadeInUp} duration={2000} triggerOnce delay={200}>
            <div className="md:ml-20 lg:ml-0">
              <Heading
                type="h2"
                variant="section"
                className="text-white mb-6 text-[32px] md:text-[42px] lg:text-[50px] xl:text-[60px] font-poppins text-left "
              >
                About Me
              </Heading>
              
              {/* Social Media Links */}
              <div className="flex gap-2 mb-6 md:mb-8 justify-start">
                <a 
                  href="https://www.facebook.com/mariel.genodiala.2024/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit Mariel Genodiala's Facebook profile"
                  className="text-white hover:text-dim-gray transition-colors"
                >
                  <IoLogoFacebook size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/sup_itsmariel/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit Mariel Genodiala's Instagram profile"
                  className="text-white hover:text-dim-gray transition-colors"
                >
                  <AiFillInstagram size={24} />
                </a>
              </div>

              <div className="max-w-sm md:max-w-lg lg:max-w-xl mx-auto md:mx-0">
                <p className="text-sm md:text-md  xl:text-lg text-white mb-4 md:mb-6 font-text text-left">
                  I&apos;m a full-stack web developer crafting
                  websites and web apps using Next.js, React, JavaScript, Java,
                  WordPress, and modern design tools. I handle both design and
                  development — turning ideas into polished digital experiences.
                </p>
                <p className="text-sm md:text-md  xl:text-lg text-white mb-6 md:mb-8 font-text text-left">
                  I&apos;m also part of the public organization JavascriptCebu and actively
                  volunteer at tech events. When I&apos;m not coding, you&apos;ll find me exploring
                  new adventures, playing badminton, or capturing moments through photography.
                </p>
                <p className="text-sm md:text-md  xl:text-lg text-white mb-6 md:mb-8 font-bold text-left">
                  Build. Have Fun. Repeat.
                </p>
              </div>

              <div className="flex justify-start">
                <button 
                  onClick={openModal}
                  aria-label="Learn more about Mariel Genodiala"
                  className="rounded-full bg-gunmetal text-white py-2 md:py-3 px-6 md:px-8 text-sm md:text-base font-button hover:bg-dim-gray transition-colors"
                >
                  Learn More About Me
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={handleModalClick}
        >
          <div className="modal-content relative max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-lg">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4  text-white hover:text-dim-gray p-2 rounded-lg  transition-colors z-10"
              title="Close"
            >
              ×
            </button>

            <div className="p-8">
              <Heading type="h2" variant="section" className="text-white mb-8 text-center leading-tight">
                My Journey
              </Heading>

              {/* Work Experience Timeline */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">Work Experience</h3>
                <div className="relative">
                  {/* Timeline items */}
                  <div className="space-y-10 relative">
                    {/* Timeline line - positioned to cover all items */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-400"></div>
                    {workExperience.map((work, index) => (
                      <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={index} delay={index * 200}>
                        <div className="relative flex flex-col items-start">
                          {/* Timeline marker */}
                          <div className="absolute left-6 w-5 h-5 bg-gray-400 rounded-full border-4 border-gray-900"></div>
                          
                        
                          {/* Content */}
                          <div className="ml-16 text-white">
                            <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                            <p className="text-gray-300 mb-2 font-medium">{work.company}</p>
                            <p className="text-gray-400 mb-3 text-sm">{work.period}</p>
                            <ul className="text-gray-300 text-sm leading-relaxed space-y-1">
                              {work.description.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-dim-gray mr-2">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>

              {/* Personal Activities */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Beyond Work</h3>
                <div className="space-y-8">
                  {personalActivities.map((activity, index) => {
                    const activityKey = activity.title.toLowerCase().replace(/\s+/g, '-');
                    const currentImageIndex = currentSlide[activityKey] || 0;
                    
                    // Create a cycling array that always shows 3 images
                    const getVisibleImages = () => {
                      const images = [];
                      for (let i = 0; i < 3; i++) {
                        const imageIndex = (currentImageIndex + i) % activity.images.length;
                        images.push(activity.images[imageIndex]);
                      }
                      return images;
                    };
                    
                    const visibleImages = getVisibleImages();
                    
                    return (
                      <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={index} delay={index * 200}>
                        <div className="bg-gray-800 rounded-lg p-6">
                          <h4 className="text-xl font-bold text-white mb-3">{activity.title}</h4>
                          <p className="text-gray-300 mb-4">{activity.description}</p>
                          <div className="relative">
                            <div className="grid grid-cols-3 gap-4">
                              {visibleImages.map((image, imgIndex) => {
                                const imageKey = `${activityKey}-${imgIndex}`;
                                const isHovered = hoveredImageIndex[imageKey] !== null && hoveredImageIndex[imageKey] !== undefined;
                                // Calculate the actual index in the full images array
                                const actualImageIndex = (currentImageIndex + imgIndex) % activity.images.length;
                                
                                return (
                                  <div 
                                    key={imgIndex} 
                                    className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer"
                                    onMouseEnter={() => setHoveredImageIndex(prev => ({ ...prev, [imageKey]: imgIndex }))}
                                    onMouseLeave={() => setHoveredImageIndex(prev => ({ ...prev, [imageKey]: null }))}
                                    onClick={() => openFullscreen(activity.images, actualImageIndex)}
                                  >
                                    <Image
                                      src={image}
                                      alt={`${activity.title} ${imgIndex + 1}`}
                                      width={200}
                                      height={200}
                                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                                    />
                                    {/* Fullscreen icon - appears on hover */}
                                    {isHovered && (
                                      <div className="absolute bottom-2 right-2 z-20 bg-black/60 hover:bg-black/80 rounded p-2 transition-all">
                                        <MdFullscreen className="text-white" size={20} />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Navigation Buttons */}
                            <button 
                              onClick={() => prevSlide(activityKey, activity.images.length)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                            >
                              <IoChevronBack size={20} />
                            </button>
                            <button 
                              onClick={() => nextSlide(activityKey, activity.images.length)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                            >
                              <IoChevronForward size={20} />
                            </button>
                            
                            {/* Dots indicator */}
                            <div className="flex justify-center mt-4 space-x-2">
                              {activity.images.map((_, dotIndex) => (
                                <button
                                  key={dotIndex}
                                  onClick={() => setCurrentSlide(prev => ({ ...prev, [activityKey]: dotIndex }))}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    dotIndex === currentImageIndex ? 'bg-white' : 'bg-gray-500'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

              {/* Get Connected Button */}
              <div className="text-center">
                <button className="rounded-full bg-gunmetal text-white py-4 px-10 text-xl font-button hover:bg-dim-gray transition-colors w-fit" onClick={handleGetConnected}>
                  Get Connected
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {isFullscreenOpen && fullscreenActivityImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[60]"
          onClick={handleFullscreenClick}
        >
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-dim-gray p-2 rounded-lg transition-colors z-10"
            title="Close"
          >
            ×
          </button>

          {/* Image container */}
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <div className="relative max-w-7xl max-h-full">
              <Image
                src={fullscreenActivityImages[fullscreenImageIndex]}
                alt={`Fullscreen image ${fullscreenImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                priority
              />
            </div>

            {/* Navigation buttons */}
            {fullscreenActivityImages.length > 1 && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    prevFullscreenImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
                  title="Previous"
                >
                  <IoChevronBack size={28} />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    nextFullscreenImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
                  title="Next"
                >
                  <IoChevronForward size={28} />
                </button>
              </>
            )}

            {/* Image counter */}
            {fullscreenActivityImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 text-white px-4 py-2 rounded-lg">
                {fullscreenImageIndex + 1} / {fullscreenActivityImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
