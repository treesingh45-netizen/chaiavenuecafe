import React, { useState, useEffect } from 'react';
import { ChaiAvenueLogo } from './ChaiAvenueLogo';
import { Menu, X, Sparkles, Phone } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenSommelier: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenSommelier,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'chai-coffee', label: 'Chai & Coffee' },
    { id: 'shakes-desserts', label: 'Shakes & Desserts' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#262626] shadow-xl py-3'
            : 'bg-gradient-to-b from-[#111111]/80 via-[#111111]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Wordmark / Logo */}
            <button
              onClick={() => handleLinkClick('home')}
              className="group focus:outline-none flex items-center text-left"
              aria-label="Chai Avenue Home"
            >
              <ChaiAvenueLogo variant="compact" />
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-xs tracking-[0.14em] uppercase font-medium transition-all duration-200 relative py-1 focus:outline-none ${
                      isActive
                        ? 'text-[#F4B62F]'
                        : 'text-[#E8DFC7] hover:text-[#F4B62F]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F4B62F] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {/* AI Sommelier trigger button */}
              <button
                onClick={onOpenSommelier}
                className="flex items-center gap-2 px-3.5 py-2 text-xs tracking-wider uppercase font-medium text-[#F4B62F] border border-[#F4B62F]/40 rounded-sm hover:border-[#F4B62F] hover:bg-[#F4B62F]/10 transition-all focus:outline-none"
                title="Ask Chai Avenue AI Sommelier for flavor recommendations"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F4B62F]" />
                <span className="hidden xl:inline">AI Sommelier</span>
                <span className="xl:hidden">Pairing</span>
              </button>

              {/* View Menu CTA Button */}
              <button
                onClick={() => handleLinkClick('menu')}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] bg-[#F4B62F] text-[#111111] rounded-sm hover:bg-[#D99A20] active:scale-95 transition-all shadow-md hover:shadow-[#F4B62F]/20 whitespace-nowrap focus:outline-none"
              >
                View Menu
              </button>
            </div>

            {/* Mobile menu hamburger toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenSommelier}
                className="p-2 text-[#F4B62F] border border-[#F4B62F]/30 rounded-sm hover:bg-[#F4B62F]/10 focus:outline-none"
                aria-label="Open Chai Sommelier"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#F6F0D8] hover:text-[#F4B62F] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#111111]/98 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6 pb-8 justify-between">
          <div className="space-y-4 text-center mt-4">
            <div className="inline-block pb-4 mb-2 border-b border-[#262626]">
              <span className="text-[10px] tracking-[0.25em] text-[#D99A20] uppercase font-semibold">
                Plaza #15, Sector L DHA Phase 1
              </span>
            </div>

            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <div key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`block w-full py-2.5 text-base tracking-[0.16em] uppercase font-medium transition-colors ${
                      isActive ? 'text-[#F4B62F] font-semibold' : 'text-[#E8DFC7] hover:text-[#F4B62F]'
                    }`}
                  >
                    {link.label}
                  </button>
                </div>
              );
            })}

            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSommelier();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-wider font-semibold border border-[#F4B62F] text-[#F4B62F] rounded-sm hover:bg-[#F4B62F]/10"
              >
                <Sparkles className="w-4 h-4" />
                Ask Chai Sommelier
              </button>

              <button
                onClick={() => handleLinkClick('menu')}
                className="w-full py-3 text-xs uppercase tracking-[0.18em] font-bold bg-[#F4B62F] text-[#111111] rounded-sm shadow-lg hover:bg-[#D99A20]"
              >
                View Full Menu
              </button>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-[#222222]">
            <a
              href="tel:03228800128"
              className="inline-flex items-center gap-2 text-sm text-[#F4B62F] font-medium"
            >
              <Phone className="w-4 h-4" />
              0322 8800128
            </a>
            <p className="text-xs text-[#888888] mt-1">DHA Phase 1, Lahore, Pakistan</p>
          </div>
        </div>
      )}
    </>
  );
};
