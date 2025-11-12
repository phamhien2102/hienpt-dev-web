// Navigation component
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollYRef = useRef(0);
  const userInteractingRef = useRef(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollYRef.current;
        const scrollDelta = Math.abs(currentScrollY - previousScrollY);

        const doc = document.documentElement;
        const body = document.body;
        const maxScrollable =
          Math.max(doc.scrollHeight, body.scrollHeight) - window.innerHeight;
        const canScroll = maxScrollable > 32;

        setScrollY(currentScrollY);
        setScrolled(currentScrollY > 20);

        if (!canScroll) {
          lastScrollYRef.current = currentScrollY;
          ticking = false;
          return;
        }

        if (currentScrollY < 10) {
          setIsVisible(true);
        } else if ((userInteractingRef.current || scrollDelta > 25) && scrollDelta > 3) {
          if (currentScrollY > previousScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else if (currentScrollY < previousScrollY) {
            setIsVisible(true);
          }
        }

        if (scrollDelta > 1) {
          lastScrollYRef.current = currentScrollY;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const markInteracting = () => {
      userInteractingRef.current = true;
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      interactionTimeoutRef.current = setTimeout(() => {
        userInteractingRef.current = false;
      }, 250);
    };

    window.addEventListener("wheel", markInteracting, { passive: true });
    window.addEventListener("touchstart", markInteracting, { passive: true });
    window.addEventListener("touchmove", markInteracting, { passive: true });
    window.addEventListener("keydown", markInteracting);

    return () => {
      window.removeEventListener("wheel", markInteracting);
      window.removeEventListener("touchstart", markInteracting);
      window.removeEventListener("touchmove", markInteracting);
      window.removeEventListener("keydown", markInteracting);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/posts", label: "Blog", icon: "📝" },
    { href: "/portfolio", label: "Portfolio", icon: "💼" },
    { href: "/contact", label: "Contact", icon: "📧" },
  ];

  // Add admin link if user is admin
  if (user?.role === "admin") {
    navItems.push({ href: "/admin", label: "Admin", icon: "⚙️" });
  }

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    router.push("/");
  };

  // Parallax effects
  const headerBlur = Math.min(16, scrollY / 8);
  const headerBackgroundOpacity = Math.min(0.95, 0.7 + scrollY / 200);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${headerBackgroundOpacity})`,
        backdropFilter: `blur(${headerBlur}px)`,
        boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none",
        borderBottom: scrolled ? "1px solid rgba(229, 231, 235, 0.5)" : "none",
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div 
          className="flex justify-between items-center transition-all duration-300"
          style={{
            height: scrolled ? "4rem" : "5rem",
          }}
        >
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div 
                className="relative font-black text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"
                style={{
                  fontSize: scrolled ? "1.25rem" : "1.5rem",
                }}
              >
                Blog Spot.
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full font-medium transition-all duration-300 group ${
                    isActive
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  style={{
                    padding: scrolled ? "0.5rem 1rem" : "0.625rem 1rem",
                    fontSize: scrolled ? "0.875rem" : "0.9375rem",
                  }}
                >
                  {isActive && (
                    <span 
                      className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                      style={{
                        animation: "slideInFromLeft 0.3s ease-out",
                      }}
                    ></span>
                  )}
                  <span className="flex items-center gap-2 relative z-10">
                    <span 
                      style={{ 
                        fontSize: scrolled ? "0.875rem" : "1rem",
                        animation: isActive ? "slideInFromLeft 0.3s ease-out" : "none",
                      }}
                    >
                      {item.icon}
                    </span>
                    <span 
                      className={isActive ? "font-semibold" : ""}
                      style={{
                        animation: isActive ? "slideInFromRight 0.3s ease-out" : "none",
                      }}
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Search Icon */}
            <button
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
              aria-label="Search"
            >
              <svg 
                className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User Menu or Sign In */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <span className="hidden lg:block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    {user?.role}
                  </span>
                </button>

                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 z-50 border border-gray-100 overflow-hidden">
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-md"
              >
                Sign in
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${showMobileMenu ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${showMobileMenu ? "opacity-0" : ""}`}></span>
                <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${showMobileMenu ? "-rotate-45 -translate-y-2" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 bg-white py-4 animate-in slide-in-from-top">
            <div className="flex flex-col gap-2 px-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 bg-gray-100 rounded-xl -z-10"
                        style={{ animation: "slideInFromLeft 0.3s ease-out" }}
                      ></span>
                    )}
                    <span
                      className="text-lg"
                      style={{ animation: isActive ? "slideInFromLeft 0.3s ease-out" : "none" }}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={isActive ? "font-semibold" : ""}
                      style={{ animation: isActive ? "slideInFromRight 0.3s ease-out" : "none" }}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
