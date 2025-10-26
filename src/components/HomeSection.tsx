"use client";

import Image from "next/image";
import { Heading } from "@/ui";
import { scrollToSection } from "@/utils/scrollUtils";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="snap-section flex items-center px-8 relative overflow-visible"
    >
      <div className="mx-auto px-5 w-full h-full grid lg:grid-cols-2 gap-0">
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-center h-full">
          <Heading
            type="h1"
            variant="hero"
            className="mb-8 !text-5xl lg:!text-[120px] md:text-7xl "
          >
            <span className="text-dim-gray ">Hi!</span>
            <span className="text-paynes-gray"> I'm Mariel</span>
          </Heading>
          <Heading
            type="h2"
            variant="section"
            className="text-dim-gray mb-12 !text-5xl lg:!text-[110px] md:text-7xl"
          >
            Web Developer
          </Heading>
          <button
            className="rounded-full bg-gunmetal text-white py-4 px-10 text-xl font-button hover:bg-dim-gray transition-colors w-fit"
            onClick={() => scrollToSection("contact")}
          >
            Get Connected
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="relative w-full h-full flex items-end justify-end">
          <div className="relative w-full h-[89%]">
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
