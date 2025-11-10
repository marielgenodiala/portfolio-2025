"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { Heading } from "@/ui";
import { Reveal } from "react-awesome-reveal";
import { fadeInUp } from "@/components/common/animations";

export default function ContactSection() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init("4B002ZSsgYRjE2aiJ");

      const formData = new FormData(e.currentTarget);

      // Send email using EmailJS
      await emailjs.send("service_0nge279", "template_cg7641d", {
        from_name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        from_email: formData.get("email"),
        reply_to: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        to_email: "marielgenodiala.work@gmail.com",
      });

      // Redirect to thank you page on success
      router.push("/thank-you");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex justify-center items-center px-4 py-20 snap-section pt-28 pb-12 md:pb-20"
    >
      <div className="mx-auto md:px-12 max-w-7xl w-full">
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce>
          <div className="text-center mb-8 md:mb-16 px-4 md:px-0">
            <Heading
              type="h2"
              variant="section"
              className="text-white 2xl:!text-[130px] tracking-wider"
            >
              Contact Me
            </Heading>
            
          </div>
          
        </Reveal>

        {/* Contact Form */}
        <Reveal keyframes={fadeInUp} duration={2000} triggerOnce delay={200}>
          <form className="space-y-4 px-12 md:px-0 max-w-xl mx-auto" onSubmit={handleSubmit}>
          <p className="text-gray-700 italic text-left text-sm ">Enter your details below:</p>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 !font-text">
              <div>
                <label htmlFor="firstName" className="block text-white text-sm mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full bg-transparent border-0 border-b border-white text-white placeholder-white/50 focus:outline-none focus:border-white text-base py-2"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full bg-transparent border-0 border-b border-white text-white placeholder-white/50 focus:outline-none focus:border-white text-base py-2"
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-white text-sm mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-transparent border-0 border-b border-white text-white placeholder-white/50 focus:outline-none focus:border-white py-2 text-base"
              />
            </div>

            {/* Subject field */}
            <div>
              <label htmlFor="subject" className="block text-white text-sm mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full bg-transparent border-0 border-b border-white text-white placeholder-white/50 focus:outline-none focus:border-white py-2 text-base"
              />
            </div>

            {/* Message field */}
            <div>
              <label htmlFor="message" className="block text-white text-sm mb-2">Message</label>
              <textarea
                id="message"
                rows={4}
                name="message"
                required
                className="w-full bg-transparent border-0 border-b border-white text-white placeholder-white/50 focus:outline-none focus:border-white py-2 text-base resize-none"
              />
            </div>

            {/* Send button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-gunmetal text-white py-3 px-8 font-button hover:bg-dim-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
