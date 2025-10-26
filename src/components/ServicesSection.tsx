"use client";

import { Heading } from "@/ui";
import { CgWebsite } from "react-icons/cg";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";

export default function ServicesSection() {
  const services = [
    {
      title: "Custom Website Development",
      description:
        "Unique, responsive websites built from scratch to match your brand and goals.",
    },
    {
      title: "Web Application Development",
      description:
        "Scalable and functional web apps tailored for your business needs.",
    },
    {
      title: "UI/UX Design",
      description:
        "Modern, intuitive designs focused on seamless user experiences.",
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Secure and optimized online stores with easy product and order management.",
    },
    {
      title: "SEO & Performance Optimization",
      description:
        "Fast-loading, SEO-friendly websites to boost visibility and rankings.",
    },
    {
      title: "Maintenance & Support",
      description:
        "Ongoing updates, fixes, and improvements to keep your site running smoothly.",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen flex items-center justify-center px-4 py-20 snap-section mt-28"
    >
      <div className="mx-auto px-12 max-w-7xl">
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
          <div className="text-center mb-16">
            <Heading
              type="h2"
              variant="section"
              className="text-white mb-6"
            >
              Services
            </Heading>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={index} delay={index * 200}>
              <div className="group max-w-sm">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <CgWebsite className="text-white text-7xl" />
                  </div>
                  <div className="flex-1">
                    <Heading
                      type="h3"
                      variant="card"
                      className="text-white mb-3 lg:text-3xl !font-light"
                    >
                      {service.title}
                    </Heading>
                    <p className="text-white font-text text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
