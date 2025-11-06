/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dim-gray": "#7B6D62",
        "van-dyke": "#423A37",
        "rich-black": "#0E191F",
        gunmetal: "#2B3C43",
        "paynes-gray": "#597276",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        button: ["Montserrat", "sans-serif"],
        text: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
        poppins: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
        body: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      },
    },
  },
  plugins: [],
};
