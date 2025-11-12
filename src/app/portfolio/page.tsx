'use client';

import Link from "next/link";
import { Navigation } from "@/views/components/Navigation";
import { PDFExport } from "@/components/PDFExport";
import { useRef } from "react";

export default function Portfolio() {
  const contentRef = useRef<HTMLElement>(null);
  const skills = [
    { name: "Next.js", level: 90, category: "Frontend" },
    { name: "React", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Language" },
    { name: "Tailwind CSS", level: 90, category: "Styling" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Supabase", level: 75, category: "Database" },
    { name: "PostgreSQL", level: 70, category: "Database" },
    { name: "Git", level: 85, category: "Tools" },
  ];

  const projects = [
    {
      title: "MVC Architecture Demo",
      description: "A comprehensive Model-View-Controller implementation with Next.js, TypeScript, and Tailwind CSS",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      link: "/",
      github: "#",
      image: "🚀",
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with user authentication, product management, and payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#",
      github: "#",
      image: "🛒",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team collaboration features",
      technologies: ["Next.js", "TypeScript", "WebSockets", "PostgreSQL"],
      link: "#",
      github: "#",
      image: "✅",
    },
  ];

  const experiences = [
    {
      role: "Full Stack Developer",
      company: "Tech Company",
      period: "2023 - Present",
      description: "Developed and maintained web applications using modern technologies. Led team of 3 developers.",
      achievements: [
        "Built scalable web applications serving 10K+ users",
        "Improved application performance by 40%",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Startup Inc",
      period: "2021 - 2023",
      description: "Created responsive and interactive user interfaces for web applications.",
      achievements: [
        "Developed 15+ responsive web applications",
        "Reduced page load time by 35%",
        "Collaborated with design team to implement pixel-perfect UIs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <main ref={contentRef} className="container mx-auto px-4 py-12 pt-28">
        {/* PDF Export Button - Fixed Position */}
        <div className="fixed top-20 right-4 z-50">
          <PDFExport contentRef={contentRef} filename="CV.pdf" />
        </div>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-5xl shadow-lg">
              👨‍💻
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Hi, I'm Hien Pham
            </h1>
            <p className="text-2xl text-gray-600 mb-6">
              Full Stack Developer & Software Engineer
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Passionate about building scalable web applications and creating
              exceptional user experiences. I love turning complex problems into
              simple, beautiful, and intuitive solutions.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <a
                href="#contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-md border border-blue-200"
              >
                View Projects
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                I'm a dedicated full-stack developer with a passion for creating
                innovative web solutions. With expertise in modern JavaScript
                frameworks and cloud technologies, I build applications that are
                both performant and user-friendly.
              </p>
              <p>
                My approach to development focuses on clean code, best practices,
                and continuous learning. I enjoy working with teams to solve
                complex problems and deliver high-quality software that makes a
                difference.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills & Technologies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.category}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-center">
                  <div className="text-6xl mb-4">{project.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Project →
                    </a>
                    <a
                      href={project.github}
                      className="text-gray-600 hover:text-gray-700 font-medium text-sm"
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.role}
                      </h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 text-sm mt-1 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg mb-8 text-blue-100">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Feel free to reach out!
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">📧</div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a
                  href="mailto:your.email@example.com"
                  className="text-blue-100 hover:text-white"
                >
                  your.email@example.com
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">💼</div>
                <h3 className="font-semibold mb-1">LinkedIn</h3>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white"
                >
                  Connect with me
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">🐙</div>
                <h3 className="font-semibold mb-1">GitHub</h3>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white"
                >
                  View my work
                </a>
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

