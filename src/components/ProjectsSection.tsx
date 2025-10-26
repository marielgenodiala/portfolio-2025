"use client";

import Image from "next/image";
import { Heading } from "@/ui";
import { useState } from "react";
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
      description: "Integrated an AI-powered tool that analyzes data from specific APIs to enhance site functionality. This tool connects the product API to a chatbot, enabling it to provide accurate responses to customer product inquiries based on API-integrated data.",
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

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-4 py-20 snap-section mt-28"
    >
      <div className="mx-auto px-12 max-w-7xl">
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
                    className={`w-44 py-3 rounded-full font-text text-sm transition-colors ${
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
        
        {/* Tab Content Container with Fixed Height */}
        <div className="h-[450px] flex items-center justify-center">
          {/* Conditional Content Based on Active Tab */}
          {activeTab === "Team Projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
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
            <div className="max-w-4xl mx-auto w-full h-full overflow-y-auto">
              <div className="relative py-8">
                {/* Timeline line */}
                <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gray-400"></div>
                
                {/* Timeline items */}
                <div className="space-y-10">
                  {workProjects.map((work, index) => (
                    <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={index} delay={index * 200}>
                      <div className="relative flex flex-col items-start">
                        {/* Timeline marker */}
                        <div className="absolute left-6 w-5 h-5 bg-gray-400 rounded-full border-4 border-gray-900"></div>
                        
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
            <div className="w-full max-w-4xl mx-auto">
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

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-7xl max-h-full">
            {/* Action buttons in upper right */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={handleDownload}
                className="bg-transparent border border-white text-white hover:text-dim-gray p-2 rounded-lg hover:bg-gray-200 transition-colors"
                title="Download"
              >
                <GoDownload size={20} />
              </button>
              <button
                onClick={() => window.open(selectedImage.image, '_blank')}
                className="bg-transparent border border-white text-white hover:text-dim-gray p-2 rounded-lg hover:bg-gray-200 transition-colors"
                title="Zoom"
              >
                <CiZoomIn size={20} />
              </button>
              <button
                onClick={closeModal}
                className="bg-transparent border border-white text-white hover:text-dim-gray p-2 rounded-lg hover:bg-gray-200 transition-colors"
                title="Close"
              >
                ×
              </button>
            </div>
            
            {/* Image */}
            <div className="relative">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
