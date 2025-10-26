export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    if (sectionId === "home") {
      // Home section doesn't need offset - it's positioned naturally
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    } else {
      // Other sections need offset to account for fixed header
      const headerHeight = 112; // h-28 = 112px
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  }
};
