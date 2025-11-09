import React from "react";

interface HeadingProps {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "default" | "hero" | "section" | "subtitle" | "card" | "heroH2";
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  type,
  variant = "default",
  className = "",
  children,
}) => {
  const baseClasses = "font-bold";

  const variantClasses = {
    default: "font-heading",
    hero: "text-8xl md:text-9xl lg:text-[12rem] leading-none font-heading",
    section: "font-poppins",
    heroH2: "text-[40px] md:!text-[80px] lg:!text-[45x] xl:!text-[58px] 2xl:!text-[110px]  leading-none",
    subtitle: "text-2xl md:text-3xl lg:text-4xl font-heading",
    card: "text-xl md:text-2xl   font-heading",
  };

  const typeClasses = {
    h1: "text-6xl md:text-7xl lg:text-8xl",
    h2: "text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px]",
    h3: "text-xl md:text-2xl lg:text-3xl",
    h4: "text-2xl md:text-3xl lg:text-4xl",
    h5: "text-xl md:text-2xl lg:text-3xl",
    h6: "text-lg md:text-xl lg:text-2xl",
  };

  // Merge classes properly - order matters for overrides
  // 1. Base classes (font-bold)
  // 2. Type classes (responsive text sizes from h1-h6)
  // 3. Variant classes (additional styles like font families)
  // 4. Custom className (allows overrides at any breakpoint)
  const combinedClasses = [
    baseClasses,
    typeClasses[type],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const Tag = type as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return <Tag className={combinedClasses}>{children}</Tag>;
};

export default Heading;
