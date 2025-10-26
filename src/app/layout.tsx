import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import FloatingElements from "@/components/FloatingElements";
import { Poppins, Inter, Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "Portfolio 2025",
  description: "A modern portfolio website built with Next.js and Tailwind CSS",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} `}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <FloatingElements />
      </body>
    </html>
  );
}
