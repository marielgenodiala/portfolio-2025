"use client";

import Image from "next/image";
import { Heading } from "@/ui";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { GoDownload } from "react-icons/go";
import { CiZoomIn } from "react-icons/ci";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";

interface DesignProject {
  id: number;
  title: string;
  image: string;
}

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("Team Projects");
  const [selectedImage, setSelectedImage] = useState<DesignProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const savedScrollPosition = useRef<number>(0);
  const isScrollLocked = useRef<boolean>(false);
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);

  const tabs = ["Team Projects", "Work", "Design"];

  const projects = [
    {
      title: "Arangkada",
      description:
        "Arangkada is a PUV rental management system for PUV operators and professional licensed drivers. PUV operators can post their vehicles, monitor their drivers, and track their payments online. Drivers can search for and apply to rent available vehicles and pay rental fees.",
      image: "/images/project-section/arangkada-logo.png",
      technologies: [
        "Java",
        "MySQL",
        "Springboot",
        "Typescript",
        "React",
        "HTML/CSS",
      ],
      githubUrl: "https://github.com/marielgenodiala/TeamInnovators-Arangkada",
    },
    {
      title: "DataMate",
      description:
        "A web app designed to clean, organize, and make data more accessible. It helps enterprises transition from basic spreadsheets to advanced database solutions.",
      image: "/images/project-section/datamate-logo (1).png",
      technologies: [
        "Java",
        "PostgreSQL",
        "Springboot",
        "Typescript",
        "React",
        "HTML/CSS",
      ],
      githubUrl: "https://github.com/marielgenodiala/DataMate_Backend",
    },
  ];

  const workProjects = [
    {
      title: "AI Agent Integration",
      role: "Full-Stack Developer",
      description: "Developed an AI-powered chat support agent integrated into a website that handles specific customer queries. The system generates intelligent responses by analyzing data from connected APIs, providing accurate and context-aware support.",
      tools: ["Docker", "Javascript", "OpenAI", "Supabase"],
      image: "/images/project-section/chatbot.png",
    },
    {
      title: "B2B Web Application / Ecommerce Projects",
      role: "Project Lead Developer • Full Stack Developer",
      description: "Led the development of a B2B web application by implementing custom functionalities to streamline new B2B workflows. Ensured seamless integration between product management systems and other e-commerce platforms.",
      tools: ["Nextjs", "React", "Supabase", "Medusa"],
      image: "/images/project-section/ecommerce.png",
    },
    {
      title: "Booking Systems",
      role: "Full Stack Developer",
      description: "Contributed to feature development, bug fixes, quality assurance, and additional integrations for booking functionalities. Improved user experience through UI updates and performance optimization.",
      tools: ["Nextjs", "React", "Supabase"],
      image: "/images/project-section/booking.png",
    },
    {
      title: "Project Migrations / Business Websites",
      role: "Project Lead Developer • Front End Developer",
      description: "Led multiple business website projects, focusing on custom designs and complete site migrations. Managed integrations, SEO implementation, and overall site improvements to ensure performance and visibility.",
      tools: ["Nextjs", "React", "TailwindCss" , "Stackshift"],
      image: "/images/project-section/website.png",
    },
  ];

  const designProjects = [
    {
      id: 1,
      title: "Design Project 1",
      image: "/images/project-section/design1.png",
    },
    {
      id: 2,
      title: "Design Project 2", 
      image: "/images/project-section/design2.png",
    },
    {
      id: 3,
      title: "Design Project 3",
      image: "/images/project-section/design3.png",
    },
  ];

  const handleImageClick = (image: DesignProject) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = selectedImage.image;
      link.download = `${selectedImage.title}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleModalClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Handle touch events for iOS
  const handleModalTouchStart = (e: React.TouchEvent) => {
    // Prevent touch events from propagating to background
    e.stopPropagation();
  };

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll lock effect for modal
  useEffect(() => {
    if (isModalOpen) {
      // Save scroll position when modal opens
      if (!isScrollLocked.current) {
        savedScrollPosition.current = window.scrollY;
      }

      // Apply body lock
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Add modal-open class for CSS fallback
      document.body.classList.add('modal-open');

      // Wheel event handler to prevent background scrolling
      const handleWheel = (e: WheelEvent) => {
        const target = e.target as HTMLElement;
        // Check if we're inside the modal content (allow scrolling there)
        const modalContent = target.closest('[class*="relative max-w"]') as HTMLElement;
        
        if (modalContent && modalContent.style.overflowY === 'auto') {
          // Allow native scrolling in modal content - don't prevent default
          const { scrollTop, scrollHeight, clientHeight } = modalContent;
          const isAtTop = scrollTop === 0;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
          
          // Only prevent if at boundary and trying to scroll further
          if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault();
            e.stopPropagation();
          }
          // Otherwise allow native scrolling
          return;
        }
        
        // If not in modal content, prevent background scrolling
        e.preventDefault();
        e.stopPropagation();
      };

      // Scroll handler - ALWAYS force position back when modal is open
      const preventWindowScroll = () => {
        if (savedScrollPosition.current !== undefined) {
          window.scrollTo(0, savedScrollPosition.current);
        }
      };

      // Remove old handlers
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
      if (wheelHandlerRef.current) {
        document.removeEventListener('wheel', wheelHandlerRef.current, { capture: true } as EventListenerOptions);
      }

      // Add new handlers
      scrollHandlerRef.current = preventWindowScroll;
      wheelHandlerRef.current = handleWheel;
      window.addEventListener('scroll', preventWindowScroll, { passive: false });
      document.addEventListener('wheel', handleWheel, { passive: false, capture: true });

      isScrollLocked.current = true;
    } else {
      // Restore scroll when modal closes
      if (isScrollLocked.current) {
        if (scrollHandlerRef.current) {
          window.removeEventListener('scroll', scrollHandlerRef.current);
          scrollHandlerRef.current = null;
        }
        if (wheelHandlerRef.current) {
          document.removeEventListener('wheel', wheelHandlerRef.current, { capture: true } as EventListenerOptions);
          wheelHandlerRef.current = null;
        }

        const scrollY = savedScrollPosition.current;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        // Remove modal-open class for CSS fallback
        document.body.classList.remove('modal-open');
        window.scrollTo(0, scrollY);

        isScrollLocked.current = false;
        savedScrollPosition.current = 0;
      }
    }

    return () => {
      // Cleanup on unmount
      if (isScrollLocked.current) {
        if (scrollHandlerRef.current) {
          window.removeEventListener('scroll', scrollHandlerRef.current);
          scrollHandlerRef.current = null;
        }
        if (wheelHandlerRef.current) {
          document.removeEventListener('wheel', wheelHandlerRef.current, { capture: true } as EventListenerOptions);
          wheelHandlerRef.current = null;
        }
        // Remove modal-open class on cleanup
        document.body.classList.remove('modal-open');
      }
    };
  }, [isModalOpen]);

  return (
    <section
      id="projects"
      className="min-h-screen flex justify-center items-center px-4 pt-28 md:pt-36 2xl:pt-28 pb-20 2xl:pb-12 snap-section"
      style={{ paddingBottom: 'max(6rem, calc(6rem + env(safe-area-inset-bottom) + 2rem))' }}
    >
      <div className="mx-auto px-12 max-w-[350px] md:max-w-[800px] lg:max-w-6xl xl:max-w-7xl">
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
          <div className="text-center mb-16">
            <Heading type="h2" variant="section" className="text-white mb-6">
              Projects
            </Heading>
            
            {/* Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-20 md:w-36 lg:w-44 py-2 md:py-2.5 lg:py-3 rounded-full font-text text-xs md:text-xs lg:text-sm transition-colors ${
                      activeTab === tab
                        ? "bg-dim-gray text-black"
                        : "bg-white text-black"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        
        {/* Tab Content Container */}
        <div className="flex justify-center min-h-[450px] items-center">
          {/* Conditional Content Based on Active Tab */}
          {activeTab === "Team Projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl xl:max-w-4xl mx-auto w-full ">
              {projects.map((project, index) => (
                <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={index} delay={index * 200}>
                  <div
                    className="rounded-md overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group h-full md:h-[460px] flex flex-col border border-white"
                  >
                    {/* Top section with gunmetal background */}
                    <div className="h-40 bg-transparent  flex items-center justify-center flex-shrink-0 py-4">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={project.title === "DataMate" ? 250 : 100}
                        height={project.title === "DataMate" ? 250 : 100}
                        className="opacity-90 group-hover:opacity-100 transition-opacity object-contain"
                      />
                    </div>
                   
                    <div
                      className="p-6 flex-1 flex flex-col bg-transparent"
                    >
                      <Heading
                        type="h3"
                        variant="card"
                        className="text-white mb-4 text-2xl font-bold"
                      >
                        {project.title}
                      </Heading>
                      <p className="text-white mb-4 font-text text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="mb-4">
                        <p className="text-dim-gray text-xs font-text">
                          {project.technologies.join(" • ")}
                        </p>
                      </div>
                      <button 
                        className="text-white text-sm font-text hover:text-gray-600 transition-colors self-start mt-auto"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        View Project →
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {activeTab === "Work" && (
            <div className="max-w-4xl mx-auto w-full">
              <div className="relative py-8">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-8 top-8 bottom-8 w-0.5 bg-gray-400"></div>
                
                {/* Timeline items */}
                <div className="space-y-10">
                  {workProjects.map((work, index) => (
                    <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={index} delay={index * 200}>
                      <div className="relative flex flex-col items-start">
                        {/* Timeline marker */}
                        <div className="absolute left-2 md:left-6 w-5 h-5 bg-gray-400 rounded-full border-4 border-gray-900"></div>
                        
                        {/* Image */}
                        <div className="ml-16 mb-3">
                          <Image
                            src={work.image}
                            alt={work.title}
                            width={150}
                            height={90}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="ml-16 text-white">
                          <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                          <p className="text-gray-300 mb-2 font-medium">{work.role}</p>
                          <p className="text-gray-300 mb-3 text-sm leading-relaxed">{work.description}</p>
                          <p className="text-gray-400 text-xs">
                            {work.tools.join(" • ")}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Design" && (
            <div className="w-full lg:max-w-[800px] xl:max-w-4xl mx-auto">
              {/* Disclaimer */}
              <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
                <div className="text-center mb-8">
                  <p className="text-gray-400 text-sm italic">
                    * These designs are personal works and do not represent any direct client projects. 
                    Some may be products currently in use.
                  </p>
                </div>
              </Reveal>
              
              {/* Design Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {designProjects.map((design, index) => (
                  <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={design.id} delay={index * 200}>
                    <div
                      className="aspect-square border border-white rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageClick(design)}
                    >
                      <Image
                        src={design.image}
                        alt={design.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce delay={800}>
          <div className="text-center mt-12">
            <a 
              href="#contact"
              className="inline-block rounded-full bg-gunmetal text-white py-3 px-8 font-button hover:bg-dim-gray transition-colors"
            >
              View More Projects
            </a>
          </div>
        </Reveal>
      </div>

      {/* Image Modal - Using Portal for iOS compatibility */}
      {mounted && isModalOpen && selectedImage && createPortal(
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            minHeight: '100dvh',
            zIndex: 2147483647,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: 0,
            margin: 0
          }}
          onClick={handleModalClick}
          onTouchStart={handleModalTouchStart}
        >
          <div
            className="relative w-full mx-4 flex flex-col items-center justify-center"
            style={{
              position: 'relative',
              zIndex: 1,
              maxHeight: 'calc(100dvh - 2rem)',
              maxWidth: 'min(80rem, calc(100vw - 2rem))', // 80rem = max-w-7xl, but respect viewport on mobile
              height: 'auto',
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y pinch-zoom',
              marginTop: 'env(safe-area-inset-top)',
              marginBottom: 'env(safe-area-inset-bottom)',
              overscrollBehavior: 'contain'
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onTouchMove={() => {
              // Don't prevent default - allow native scrolling
            }}
          >
            {/* Action buttons in upper right */}
            <div className="absolute top-4 right-4 flex gap-2 z-[10001]" style={{ zIndex: 10001 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                className="bg-transparent border border-white text-white hover:text-dim-gray p-2 rounded-lg hover:bg-gray-200 transition-colors"
                title="Download"
              >
                <GoDownload size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(selectedImage.image, '_blank');
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                className="bg-transparent border border-white text-white hover:text-dim-gray p-2 rounded-lg hover:bg-gray-200 transition-colors"
                title="Zoom"
              >
                <CiZoomIn size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                }}
                className="bg-transparent border border-white text-white hover:text-dim-gray p-2 rounded-lg hover:bg-gray-200 transition-colors"
                title="Close"
              >
                ×
              </button>
            </div>
            
            {/* Image */}
            <div className="relative flex items-center justify-center w-full" onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
