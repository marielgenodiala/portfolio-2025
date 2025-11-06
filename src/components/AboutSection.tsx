"use client";

import Image from "next/image";
import { Heading } from "@/ui";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";
import { useState } from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { scrollToSection } from "@/utils/scrollUtils";


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

  const workExperience: WorkExperience[] = [
    {
      title: "Freelance Web Developer",
      company: "Various Clients",
      period: "Jan 2025 - Present",
      description: [
        "Develop web applications using React and Java for diverse client needs",
        // "Provide online tutoring and programming training sessions",
        "Offer IT consulting services for various technology projects",
        "Create and maintain WordPress websites and custom solutions"
      ]
    },
    {
      title: "Web Developer",
      company: "WebriQ",
      period: "Jun 2023 - Present · 2 yrs 5 mos",
      description: [
        "Developed and led website and application projects using JavaScript, TypeScript, React, and modern frameworks",
        "Led B2B web application development and contributed to eCommerce platforms and booking systems, delivering end-to-end solutions",
        "Integrated APIs and third-party services (including Ecwid and Medusa) to enhance platform functionality",
        "Worked with PostgreSQL for reliable data management and full-stack development",
        "Applied UI/UX principles to create user-friendly solutions aligned with business needs",
        "Implemented SEO best practices to improve visibility, search ranking, and site performance",
        "Created and maintained documentation to support smooth development and team collaboration"
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

  return (
    <>
      <section
        id="about-me"
        className="min-h-screen flex justify-center items-center px-4 xl:py-20 snap-section pt-44 pb-12 md:pt-40 md:pb-20"
      >
        <div className="mx-auto px-4 md:px-12  max-w-[330px] md:max-w-7xl grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
            <div className="flex justify-center  ">
              <div className="relative w-[250px] h-[300px] md:w-[300px] md:h-[375px] lg:w-[350px] lg:h-[437px] xl:w-[400px] xl:h-[500px]">
              
                <div className="absolute top-3 right-3 md:top-4 md:right-4 xl:top-5 xl:right-5 w-full h-full border-[2px] md:border-[3px] border-van-dyke rounded-sm pointer-events-none z-0"></div>

                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 xl:bottom-5 xl:left-5 w-full h-full border-[2px] md:border-[3px] border-dim-gray rounded-sm pointer-events-none z-0"></div>

   
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
                  className="text-white hover:text-dim-gray transition-colors"
                >
                  <IoLogoFacebook size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/sup_itsmariel/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-dim-gray transition-colors"
                >
                  <AiFillInstagram size={24} />
                </a>
              </div>

              <div className="max-w-sm md:max-w-md lg:max-w-xl mx-auto md:mx-0">
                <p className="text-sm md:text-md  xl:text-lg text-white mb-4 md:mb-6 font-text text-left">
                  I'm a full-stack web developer with almost 3 years of experience crafting
                  websites and web apps using Next.js, React, JavaScript, Java,
                  WordPress, and modern design tools. I handle both design and
                  development — turning ideas into polished digital experiences.
                </p>
                <p className="text-sm md:text-md  xl:text-lg text-white mb-6 md:mb-8 font-text text-left">
                  I'm also part of the public organization JavascriptCebu and actively
                  volunteer at tech events. When I'm not coding, you'll find me exploring
                  new adventures, playing badminton, or capturing moments through photography.
                </p>
                <p className="text-sm md:text-md  xl:text-lg text-white mb-6 md:mb-8 font-bold text-left">
                  Build. Have Fun. Repeat.
                </p>
              </div>

              <div className="flex justify-start">
                <button 
                  onClick={openModal}
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
          <div className="relative max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-lg">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4  text-white hover:text-dim-gray p-2 rounded-lg  transition-colors z-10"
              title="Close"
            >
              ×
            </button>

            <div className="p-8">
              <Heading type="h2" variant="section" className="text-white mb-8 text-center">
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
                              {visibleImages.map((image, imgIndex) => (
                                <div key={imgIndex} className="aspect-square rounded-lg overflow-hidden">
                                  <Image
                                    src={image}
                                    alt={`${activity.title} ${imgIndex + 1}`}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                  />
                                </div>
                              ))}
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
    </>
  );
}
