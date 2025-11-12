'use client';

import Link from "next/link";
import { Navigation } from "@/views/components/Navigation";
import { BlogSection } from "@/components/BlogSection";
import { useEffect, useState } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 50%)`,
        }}
      />
      
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section - Full Width Creative Layout */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0,0,0) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Animated Avatar */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                  <div className="relative w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-6xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    👨‍💻
                  </div>
                </div>
              </div>

              {/* Main Heading with Animation */}
              <div className="text-center mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-tight">
                  <span className="block">Hi, I'm</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                    Hien Pham
                  </span>
                </h1>
                <div className="inline-block">
                  <p className="text-2xl md:text-3xl text-gray-700 font-medium mb-4">
                    Full Stack Developer
                  </p>
                  <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
                Crafting digital experiences with code, creativity, and passion.
                <br />
                <span className="text-gray-500">Building the web, one pixel at a time.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <Link
                  href="/contact"
                  className="group relative px-8 py-4 bg-black text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <a
                  href="#blog"
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Explore My Work →
                </a>
              </div>

              {/* Stats or Quick Links */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                {[
                  { label: 'Articles', value: '460+', link: '/posts' },
                  { label: 'Projects', value: '50+', link: '/portfolio' },
                  { label: 'Experience', value: '5+', link: '/portfolio' },
                ].map((stat, index) => (
                  <Link
                    key={index}
                    href={stat.link}
                    className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </div>
          </div>
        </section>

        {/* About Section - Creative Split Layout */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Image/Visual */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl transform rotate-6"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
                    <div className="space-y-6">
                      <div className="text-5xl">💡</div>
                      <h3 className="text-2xl font-bold">Innovation First</h3>
                      <p className="text-blue-100">
                        Always exploring new technologies and pushing boundaries
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    About Me
                  </h2>
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      I'm a dedicated <strong className="text-gray-900">full-stack developer</strong> with a passion for creating
                      innovative web solutions. With expertise in modern JavaScript
                      frameworks and cloud technologies, I build applications that are
                      both performant and user-friendly.
                    </p>
                    <p>
                      My approach to development focuses on <strong className="text-gray-900">clean code</strong>, best practices,
                      and continuous learning. I enjoy working with teams to solve
                      complex problems and deliver high-quality software that makes a
                      difference.
                    </p>
                    <div className="pt-4">
                      <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                      >
                        Learn more about my journey
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 bg-white scroll-mt-28">
          <div className="pt-8">
            <BlogSection limit={6} />
          </div>
        </section>

        {/* Contact CTA Section - Modern Design */}
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(255,255,255) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: '📧', label: 'Email', value: 'your.email@example.com', href: 'mailto:your.email@example.com' },
                  { icon: '💼', label: 'LinkedIn', value: 'Connect with me', href: 'https://linkedin.com/in/yourprofile' },
                  { icon: '🐙', label: 'GitHub', value: 'View my work', href: 'https://github.com/yourusername' },
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {contact.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{contact.label}</h3>
                    <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                      {contact.value}
                    </p>
                  </a>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Start a Conversation →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Hien Pham. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </a>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
