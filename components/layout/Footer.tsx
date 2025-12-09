// FILE: components/layout/Footer.tsx
// Create file: components/layout/Footer.tsx

'use client';

import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Portraits', href: '/portraits' },
    { name: 'Commercial', href: '/commercial' },
    { name: 'Editorial', href: '/editorial' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/pairaart6', 
      icon: Instagram 
    },
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/pairaart6', 
      icon: Facebook 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/pairaart6', 
      icon: Linkedin 
    },
  ];

  return (
    <footer className="bg-charcoal-950 text-white">
      
      {/* Main Footer Content */}
      <div className="container-luxury py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-display text-4xl mb-6 text-white">
              Paira Art.6
            </h2>
            <p className="text-charcoal-300 leading-relaxed mb-6 max-w-md">
              Award-winning Ugandan photographer and cinematographer capturing stories through lens. 
              Specializing in fashion, lifestyle, and visual storytelling.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-charcoal-700 flex items-center justify-center hover:bg-pumpkin-500 hover:border-pumpkin-500 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-charcoal-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="luxury-text text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-charcoal-300 hover:text-pumpkin-500 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="luxury-text text-white mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pumpkin-500 flex-shrink-0 mt-1" />
                <span className="text-charcoal-300 text-sm">
                  Kampala, Uganda
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-pumpkin-500 flex-shrink-0 mt-1" />
                <a
                  href="mailto:pairaart6@gmail.com"
                  className="text-charcoal-300 hover:text-pumpkin-500 transition-colors duration-300 text-sm"
                >
                  pairaart6@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-pumpkin-500 flex-shrink-0 mt-1" />
                <a
                  href="tel:+256700000000"
                  className="text-charcoal-300 hover:text-pumpkin-500 transition-colors duration-300 text-sm"
                >
                  +256 700 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-charcoal-400 text-sm">
              © {currentYear} Paira Art.6. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-charcoal-400 hover:text-pumpkin-500 transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-charcoal-400 hover:text-pumpkin-500 transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}