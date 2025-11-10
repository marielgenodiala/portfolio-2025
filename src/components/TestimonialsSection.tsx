"use client";

import { useState, useEffect } from "react";
import { Heading } from "@/ui";
import { BiSolidQuoteRight } from "react-icons/bi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3); // Default to 3 for lg+

  // Handle responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg and above: 3 items
        setItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        // md: 2 items
        setItemsToShow(2);
      } else {
        // mobile: 1 item
        setItemsToShow(1);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      name: "Kenet M.",
      role: "Web Developer",
      content:
        "She's reliable, skilled, and always professional. Mariel's contributions consistently elevate our work.",
    },
    {
      name: "Renato D.",
      role: "Web Developer",
      content:
        "Working with Mariel makes every project seamless and efficient. She's professional, easy to collaborate with, and highly attentive to detail.",
    },
    {
      name: "Ericka D.",
      role: "Web Developer",
      content:
        "Working with Mariel has been such a great experience. She's not only professional but also very friendly and easy to communicate with.",
    },
    {
      name: "Angelo C.",
      role: "Client",
      content:
        "Mariel did an outstanding job in helping us organize and polish our project materials. Highly recommended for her professionalism and quick turnaround.",
    },
    {
      name: "Emmanuel C. Jr.",
      role: "Client",
      content:
        "Her insights helped us refine our work and approach challenges with a more professional mindset. We truly appreciate her patience, encouragement, and dedication in supporting our group. Working under her guidance has been both a valuable and inspiring experience for all of us.",
    },
    {
      name: "Anonymous",
      role: "Client",
      content:
        "She has been very reliable, attentive to detail, and always delivers what is expected.",
    },
    {
      name: "Fiona T.",
      role: "Client",
      content:
        "As a beginner in this field, I can say this person does not disappoint. She's well-organized and really knows her craft.",
    },
   
    {
      name: "Cara Carmel E.",
      role: "Web Developer",
      content:
        "She brings a positive attitude and clear communication to every project.",
    },
    {
      name: "John Vergil A.",
      role: "Software Engineer",
      content:
        "Mariel is a reliable collaborator. She puts a lot of effort on her projects and delivers what is necessary to accomplish her tasks.",
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

  // Get visible testimonials based on itemsToShow
  const visibleTestimonials = Array.from({ length: itemsToShow }, (_, i) => 
    testimonials[(currentIndex + i) % testimonials.length]
  );

  return (
    <section
      id="testimonials"
      className="min-h-screen flex justify-center items-center px-4 pt-28 md:pt-36 pb-20 snap-section"
    >
      <div className="mx-auto md:px-12 max-w-7xl">
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
          <div className="text-center px-4 md:px-0 mb-6 md:mb-16">
            <Heading type="h2" variant="section" className="text-white ">
              Feedback & Experiences
            </Heading>
          </div>
        </Reveal>

        {/* Responsive testimonial cards: 1 mobile, 2 md, 3 lg+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-8 md:mb-16 px-8 md:px-4 2xl:px-0 max-w-7xl mx-auto">
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.name} className="text-center flex flex-col h-full">
              {/* Quote icon */}
              <div className="mb-6 flex justify-center">
                <BiSolidQuoteRight className="text-dim-gray text-5xl" />
              </div>

              {/* Testimonial text */}
              <p className="text-white font-text text-base mb-8 leading-relaxed flex-grow">
                {testimonial.content}
              </p>

              {/* Name and Role - pushed to bottom on md and above */}
              <div className="md:mt-auto">
                <Heading
                  type="h3"
                  variant="card"
                  className="text-white font-bold text-lg mb-1 "
                >
                  {testimonial.name}
                </Heading>

                {/* Role */}
                <p className="text-dim-gray font-text text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination and Navigation */}
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce delay={600}>
          {/* Mobile: Centered below testimonials */}
          <div className="md:hidden flex flex-col items-center justify-center space-y-3">
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

            {/* Navigation arrows (centered) */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="text-white hover:text-dim-gray transition-colors"
                aria-label="Previous testimonial"
              >
                <MdNavigateBefore className="text-3xl" />
              </button>
              <button
                onClick={handleNext}
                className="text-white hover:text-dim-gray transition-colors"
                aria-label="Next testimonial"
              >
                <MdNavigateNext className="text-3xl" />
              </button>
            </div>
          </div>

          {/* MD and above: Original layout with pagination in center and buttons on right */}
          <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto">
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
            <div className="flex items-center">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="text-white hover:text-dim-gray transition-colors"
              >
                <MdNavigateBefore className="text-3xl" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
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
