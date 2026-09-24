import React from 'react';
import { ChaiAvenueLogo } from './ChaiAvenueLogo';
import { Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] border-t border-[#242424] text-[#E8DFC7] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Logo & Tagline */}
        <div className="flex flex-col items-center justify-center text-center pb-12 border-b border-[#242424]">
          <ChaiAvenueLogo variant="full" size="lg" />
        </div>

        {/* 3-Column Footer Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-b border-[#242424]">
          {/* Col 1: Navigation Links */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-lg font-semibold text-[#F6F0D8] mb-4 tracking-wider flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4B62F]" />
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase font-medium">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#F4B62F] transition-colors focus:outline-none"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#F4B62F] transition-colors focus:outline-none"
                >
                  About Chai Avenue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-[#F4B62F] transition-colors focus:outline-none"
                >
                  Interactive Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('chai-coffee')}
                  className="hover:text-[#F4B62F] transition-colors focus:outline-none"
                >
                  Chai & Coffee
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shakes-desserts')}
                  className="hover:text-[#F4B62F] transition-colors focus:outline-none"
                >
                  Shakes, Smoothies & Pastry Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#F4B62F] transition-colors focus:outline-none"
                >
                  Gallery & Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#F4B62F] transition-colors focus:outline-none"
                >
                  Contact & Visit Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Location & Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-lg font-semibold text-[#F6F0D8] mb-4 tracking-wider flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4B62F]" />
              Visit Chai Avenue
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start justify-center md:justify-start gap-3">
                <MapPin className="w-4 h-4 text-[#F4B62F] shrink-0 mt-1" />
                <address className="not-italic text-[#C7BEA5] text-xs leading-relaxed">
                  Plaza #15, Sector L, DHA Phase 1,<br />
                  54810, Lahore, Pakistan
                </address>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="w-4 h-4 text-[#F4B62F] shrink-0" />
                <a
                  href="tel:03228800128"
                  className="text-xs text-[#C7BEA5] hover:text-[#F4B62F] transition-colors font-mono tabular-nums"
                >
                  0322 8800128
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="w-4 h-4 text-[#F4B62F] shrink-0" />
                <a
                  href="mailto:chaiavenue@gmail.com"
                  className="text-xs text-[#C7BEA5] hover:text-[#F4B62F] transition-colors"
                >
                  chaiavenue@gmail.com
                </a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Clock className="w-4 h-4 text-[#F4B62F] shrink-0" />
                <span className="text-xs text-[#C7BEA5]">
                  Daily: 11:00 AM – 2:00 AM
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Social & Vibe */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h4 className="font-serif text-lg font-semibold text-[#F6F0D8] mb-4 tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4B62F]" />
              Connect With Us
            </h4>
            <p className="text-xs text-[#A89E88] leading-relaxed max-w-xs mb-4">
              Fresh cups, sweet moments and everything happening in the heart of DHA Phase 1.
            </p>
            <a
              href="https://www.instagram.com/chaiavenue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#333333] hover:border-[#F4B62F] text-[#F6F0D8] hover:text-[#F4B62F] rounded-sm text-xs font-semibold tracking-wider uppercase transition-all"
            >
              <Instagram className="w-4 h-4 text-[#F4B62F]" />
              @chaiavenue
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7465] gap-4">
          <p>© 2026 Chai Avenue. All Rights Reserved.</p>
          <p className="italic font-serif text-[#9A917F]">
            “It only tastes expensive.”
          </p>
        </div>
      </div>
    </footer>
  );
};
