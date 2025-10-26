"use client";

import { useState } from "react";
import { Heading } from "@/ui";
import { BiSolidQuoteRight } from "react-icons/bi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Lyndee Crisanto",
      role: "Mechanical Engineer",
      content: "I have worked with mariel and she has been extra ordinary.",
    },
    {
      name: "John Doe",
      role: "Software Developer",
      content:
        "Working with Mariel was an amazing experience. Highly professional!",
    },
    {
      name: "Jane Smith",
      role: "Product Manager",
      content: "Mariel delivered exceptional results beyond our expectations.",
    },
    {
      name: "Mike Johnson",
      role: "Business Owner",
      content: "Outstanding work! Mariel brought our vision to life perfectly.",
    },
    {
      name: "Sarah Williams",
      role: "Marketing Director",
      content:
        "Professional, creative, and reliable. Would definitely work with Mariel again.",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section
      id="testimonials"
      className="min-h-screen flex items-center justify-center px-4 py-20 snap-section mt-28"
    >
      <div className="mx-auto px-12 max-w-7xl">
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
          <div className="text-center mb-16">
            <Heading type="h2" variant="section" className="text-white mb-6">
              Feedback & Experiences
            </Heading>
          </div>
        </Reveal>

        {/* Three testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-7xl mx-auto">
          {visibleTestimonials.map((testimonial, index) => (
            <Reveal keyframes={fadeInUp} duration={2000} triggerOnce key={index} delay={index * 200}>
              <div className="text-center">
                {/* Quote icon */}
                <div className="mb-6 flex justify-center">
                  <BiSolidQuoteRight className="text-dim-gray text-5xl" />
                </div>

                {/* Testimonial text */}
                <p className="text-white font-text text-base mb-8 leading-relaxed">
                  {testimonial.content}
                </p>

                {/* Name */}
                <Heading
                  type="h4"
                  variant="card"
                  className="text-white font-bold text-lg mb-1"
                >
                  {testimonial.name}
                </Heading>

                {/* Role */}
                <p className="text-dim-gray font-text text-sm">
                  {testimonial.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pagination and Navigation */}
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce delay={600}>
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Empty space for alignment */}
            <div className="w-24"></div>

            {/* Pagination indicator - single line (centered) */}
            <div className="relative w-32 h-1 bg-white/50">
              <div
                className="absolute top-0 h-full bg-white transition-all duration-300"
                style={{
                  left: 0,
                  width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
                }}
              />
            </div>

            {/* Navigation arrows (right side) */}
            <div className="flex items-center ">
              <button
                onClick={handlePrev}
                className="text-white hover:text-dim-gray transition-colors"
              >
                <MdNavigateBefore className="text-3xl" />
              </button>
              <button
                onClick={handleNext}
                className="text-white hover:text-dim-gray transition-colors"
              >
                <MdNavigateNext className="text-3xl" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
