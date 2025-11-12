"use client";

import { useState } from "react";
import { Navigation } from "@/views/components/Navigation";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the data to your API
      console.log("Form submitted:", formData);
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="relative pt-28">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Be part of our <span className="italic">Broadcast</span>
            </h1>
          </div>

          {/* Circular Elements */}
          <div className="flex justify-center items-center gap-6 md:gap-8 mb-16">
            {[
              { icon: "↑", bg: "from-blue-500 to-purple-600" },
              { icon: "[ ]", bg: "from-pink-500 to-rose-600" },
              { icon: "↗", bg: "from-cyan-400 to-blue-500" },
              { icon: "*", bg: "from-yellow-400 to-orange-500" },
            ].map((item, index) => (
              <div
                key={index}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${item.bg} flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer`}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </section>

        {/* Join Now Section with Background Overlay */}
        <section className="relative mt-16 md:mt-24">
          {/* Background Image/Overlay */}
          <div className="relative w-full min-h-[600px] md:min-h-[700px] rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden">
            {/* Background Image with Blur */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80)",
                filter: "blur(2px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-16">
              {/* Top Left - Radio Info */}
              <div className="mb-8 md:mb-12">
                <p className="text-gray-300 text-sm md:text-base font-medium mb-1">43.95 spot</p>
                <p className="text-white text-2xl md:text-3xl font-bold">Radio</p>
              </div>

              {/* Join Now Form */}
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 md:mb-12">
                  Join now
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="flex-1 px-6 py-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      required
                      className="flex-1 px-6 py-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-black text-white rounded-2xl font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>

                  {/* Success/Error Messages */}
                  {submitStatus === "success" && (
                    <div className="text-center text-green-400 font-medium">
                      {"Thank you! We'll be in touch soon."}
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="text-center text-red-400 font-medium">
                      Something went wrong. Please try again.
                    </div>
                  )}
                </form>

                {/* Bottom Section */}
                <div className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  {/* Left - Message */}
                  <p className="text-white/90 text-sm md:text-base font-medium">
                    We Wish to make you a Good Experience!
                  </p>

                  {/* Right - Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-3 bg-gray-700/80 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-gray-600/80 transition-colors text-sm">
                      Got Any Questions?
                    </button>
                    <Link
                      href="#contact"
                      className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-900 transition-colors text-sm text-center"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Hien Pham. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

