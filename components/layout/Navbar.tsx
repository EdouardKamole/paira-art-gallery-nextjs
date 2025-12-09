// FILE: components/layout/Navbar.tsx
// Create folder: components/layout/
// Create file: components/layout/Navbar.tsx

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portraits', href: '/portraits' },
    { name: 'Commercial', href: '/commercial' },
    { name: 'Still Life', href: '/still-life' },
    { name: 'Editorial', href: '/editorial' },
    { name: 'Runway', href: '/runway' },
    { name: 'Film', href: '/film' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="group">
              <h1
                className={`font-display text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-charcoal-900' : 'text-white'
                } group-hover:text-pumpkin-500`}
              >
                Paira Art.6
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-light tracking-wide uppercase transition-all duration-300 relative group ${
                    isScrolled ? 'text-charcoal-700' : 'text-white'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-pumpkin-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${
                isScrolled ? 'text-charcoal-900' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-charcoal-900/95 backdrop-blur-lg z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl font-light tracking-wide uppercase opacity-0 animate-slide-down hover:text-pumpkin-500 transition-colors duration-300"
              style={{
                animation: isMobileMenuOpen
                  ? `slide-down 0.5s ease-out ${index * 0.1}s forwards`
                  : 'none',
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}