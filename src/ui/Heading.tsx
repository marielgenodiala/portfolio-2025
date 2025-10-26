import React from "react";

interface HeadingProps {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "default" | "hero" | "section" | "subtitle" | "card";
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
    section: "text-4xl md:text-5xl lg:text-6xl font-poppins",
    subtitle: "text-2xl md:text-3xl lg:text-4xl font-heading",
    card: "text-xl md:text-2xl   font-heading",
  };

  const typeClasses = {
    h1: "text-6xl md:text-7xl lg:text-8xl",
    h2: "text-4xl md:text-5xl lg:text-[60px] ",
    h3: "text-3xl md:text-4xl lg:text-5xl",
    h4: "text-2xl md:text-3xl lg:text-4xl",
    h5: "text-xl md:text-2xl lg:text-3xl",
    h6: "text-lg md:text-xl lg:text-2xl",
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${typeClasses[type]}
    ${className}
  `.trim();

  const Tag = type as keyof JSX.IntrinsicElements;

  return <Tag className={combinedClasses}>{children}</Tag>;
};

export default Heading;
