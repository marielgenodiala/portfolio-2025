"use client";

import Image from "next/image";
import { Heading } from "@/ui";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";

export default function HomeSection() {
  return (
      <section
        id="home"
        className="snap-section-home flex items-center xl:px-8 relative overflow-visible"
      >
      <div className="mx-auto px-1 md:px-5 lg:px-0 2xl:px-5 w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Side - Text Content */}
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
          <div className="flex flex-col justify-center items-center lg:pl-20 xl:pl-0 lg:items-start text-center lg:text-left h-full pt-0 lg:pt-16">
            <Heading
              type="h1"
              variant="hero"
              className="mb-2 md:mb-3 lg:mb-8 text-[80px] md:text-[100px] lg:text-[65px] xl:!text-[85px] 2xl:!text-[100px] 3xl:!text-[120px] lg:mt-12 xl:mt-0"
            >
              <span className="text-dim-gray">
                {"Hi!".split("").map((char, index) => (
                  <span
                    key={index}
                    className="wave-letter"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="text-paynes-gray"> I&apos;m Mariel</span>
            </Heading>
            <Heading
              type="h2"
              variant="heroH2"
              className="text-dim-gray mb-4 md:mb-5 lg:mb-12 text-[50px] md:!text-[80px] lg:!text-[50px] xl:!text-[58px] 2xl:!text-[80px]  3xl:!text-[110px]  leading-none"
            >
              Web Developer
            </Heading>
            <a
              href="#contact"
              className="rounded-full bg-gunmetal text-white py-4 px-10 text-xl font-button hover:bg-dim-gray transition-colors w-fit mx-auto lg:mx-0 inline-block text-center"
            >
              Get Connected
            </a>
          </div>
        </Reveal>

        {/* Right Side - Image */}
        {/* Hidden on md and smaller screens, visible on lg and above */}
        <div className="hidden lg:flex relative w-full h-full items-end justify-end">
          <div className="relative w-full h-[100%] max-h-full md:h-[100%] lg:h-[80%] lg:max-h-none xl:h-[82%] 2xl:h-[89%]">
            <Image
              src="/images/Hero Image.png"
              alt="Mariel - Web Developer"
              fill
              className="object-cover object-bottom"
              priority
              quality={100}
              sizes="100vw"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>





  );
}
