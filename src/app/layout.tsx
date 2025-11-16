import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import FloatingElements from "@/components/FloatingElements";
import { Poppins } from "next/font/google";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.marielgenodiala.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mariel Genodiala - Web Developer",
  description: "Full-stack web developer. Specializing in Next.js, React, JavaScript, Java, and WordPress. Turning ideas into polished digital experiences.",
  keywords: ["web developer", "full-stack developer", "Next.js", "React", "JavaScript", "Java", "WordPress", "portfolio", "Mariel Genodiala"],
  authors: [{ name: "Mariel Genodiala" }],
  creator: "Mariel Genodiala",
  publisher: "Mariel Genodiala",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mariel Genodiala - Web Developer",
    title: "Mariel Genodiala - Web Developer",
    description: "Full-stack web developer. Specializing in Next.js, React, JavaScript, Java, and WordPress. Turning ideas into polished digital experiences.",
    images: [
      {
        url: "/seo_image.png",
        width: 1200,
        height: 630,
        alt: "Mariel Genodiala - Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariel Genodiala - Web Developer",
    description: "Full-stack web developer. Specializing in Next.js, React, JavaScript, Java, and WordPress.",
    images: ["/seo_image.png"],
    creator: "@marielgenodiala",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/mg-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/images/mg-logo.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/images/mg-logo.png",
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "google7cd52fb18a60e719",
  },
  other: {
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/png",
  },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mariel Genodiala",
    jobTitle: "Web Developer",
    description: "Full-stack web developer. Specializing in Next.js, React, JavaScript, Java, and WordPress.",
    url: siteUrl,
    image: `${siteUrl}/seo_image.png`,
    sameAs: [
      "https://www.linkedin.com/in/mariel-genodiala-059237231/",
      "https://github.com/marielgenodiala",
      "https://www.facebook.com/mariel.genodiala.2024/",
      "https://www.instagram.com/sup_itsmariel/",
    ],
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} `}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main>{children}</main>
        <FloatingElements />
      </body>
    </html>
  );
}
