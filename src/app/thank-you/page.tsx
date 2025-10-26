"use client";

import { Heading } from "@/ui";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="bg-rich-black min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Main Content */}
      <div className="text-center max-w-3xl mx-auto">
        {/* Thank You Title */}
        <Heading
          type="h1"
          variant="section"
          className="text-white mb-8 lg:!text-[120px] tracking-wide"
        >
          Thank You!
        </Heading>

        {/* Message */}
        <div className="mb-12 font-text">
          <p className="text-white font-text text-lg lg:text-xl leading-relaxed mb-4">
            I've received your message and will get back to you as soon as
            possible.
          </p>
          <p className="text-white font-text text-lg lg:text-xl leading-relaxed">
            Please check your email, or feel free to reach out directly at{" "}
            <span className="font-bold">marielgenodiala.work@gmail.com</span>.
          </p>
        </div>

        {/* Go back to Homepage Button */}
        <Link
          href="/"
          className="rounded-full bg-gunmetal text-white py-3 px-8 font-button hover:bg-dim-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
}
