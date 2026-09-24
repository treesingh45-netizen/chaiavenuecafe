import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Send, CheckCircle2, Navigation } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    inquiryType: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F0D8] pt-24 pb-24">
      {/* 1. Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-[#222222]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cafe_patio.jpg"
            alt="Chai Avenue Patio in DHA Phase 1"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-[#F4B62F] font-semibold block">
            Plaza #15, Sector L, DHA Phase 1
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-[#F6F0D8] leading-tight">
            Visit Chai Avenue
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#E8DFC7] font-normal max-w-2xl mx-auto">
            We’re waiting to pour your next cup.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
                Find Us In Lahore
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#F6F0D8]">
                Come On Over
              </h2>
              <p className="text-sm text-[#A89E88] font-light leading-relaxed">
                Located conveniently in Sector L commercial area of DHA Phase 1. Whether arriving for morning espresso or 1:00 AM Karak chai, our doors are open.
              </p>
            </div>

            {/* Information Cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="p-5 bg-[#161616] border border-[#282828] rounded-sm flex items-start gap-4">
                <div className="p-2.5 rounded-sm bg-[#222222] text-[#F4B62F] shrink-0 border border-[#333333]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D99A20]">
                    Address
                  </h4>
                  <p className="text-sm text-[#F6F0D8] mt-1 font-medium leading-snug">
                    Plaza #15, Sector L, DHA Phase 1,<br />
                    54810, Lahore, Pakistan
                  </p>
                  <a
                    href="https://maps.google.com/?q=Chai+Avenue+DHA+Phase+1+Lahore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#F4B62F] hover:underline mt-2 font-semibold uppercase tracking-wider"
                  >
                    <span>Open in Google Maps</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="p-5 bg-[#161616] border border-[#282828] rounded-sm flex items-start gap-4">
                <div className="p-2.5 rounded-sm bg-[#222222] text-[#F4B62F] shrink-0 border border-[#333333]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D99A20]">
                    Phone & WhatsApp
                  </h4>
                  <a
                    href="tel:03228800128"
                    className="text-base text-[#F6F0D8] hover:text-[#F4B62F] transition-colors mt-1 block font-mono font-medium"
                  >
                    0322 8800128
                  </a>
                  <p className="text-xs text-[#888888] mt-0.5">
                    Call for direct inquiries, takeaways & large group tables.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 bg-[#161616] border border-[#282828] rounded-sm flex items-start gap-4">
                <div className="p-2.5 rounded-sm bg-[#222222] text-[#F4B62F] shrink-0 border border-[#333333]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D99A20]">
                    Email
                  </h4>
                  <a
                    href="mailto:chaiavenue@gmail.com"
                    className="text-sm text-[#F6F0D8] hover:text-[#F4B62F] transition-colors mt-1 block"
                  >
                    chaiavenue@gmail.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="p-5 bg-[#161616] border border-[#282828] rounded-sm flex items-start gap-4">
                <div className="p-2.5 rounded-sm bg-[#222222] text-[#F4B62F] shrink-0 border border-[#333333]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D99A20]">
                    Opening Hours
                  </h4>
                  <p className="text-sm text-[#F6F0D8] mt-1 font-medium">
                    Monday – Sunday: 11:00 AM – 2:00 AM
                  </p>
                  <p className="text-xs text-[#888888] mt-0.5">
                    Late night chai & dessert service every day of the week.
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="p-5 bg-[#161616] border border-[#282828] rounded-sm flex items-start gap-4">
                <div className="p-2.5 rounded-sm bg-[#222222] text-[#F4B62F] shrink-0 border border-[#333333]">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#D99A20]">
                    Social Media
                  </h4>
                  <a
                    href="https://www.instagram.com/chaiavenue"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#F6F0D8] hover:text-[#F4B62F] transition-colors mt-1 block"
                  >
                    @chaiavenue on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Map */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Form */}
            <div className="bg-[#161616] border border-[#282828] p-8 rounded-sm shadow-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block mb-1">
                Direct Message
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F6F0D8] mb-6">
                Send an Inquiry or Reserve a Table
              </h3>

              {formSubmitted ? (
                <div className="p-8 text-center bg-[#1B1B1B] border border-[#F4B62F]/40 rounded-sm space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#F4B62F] mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#F6F0D8]">
                    Thank You, {formData.name}!
                  </h4>
                  <p className="text-xs text-[#C7BEA5] leading-relaxed max-w-sm mx-auto">
                    Your inquiry has been received. Our team at Chai Avenue will connect with you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        contact: '',
                        inquiryType: 'General Inquiry',
                        message: '',
                      });
                    }}
                    className="mt-4 px-4 py-2 bg-[#F4B62F] text-[#111111] text-xs font-bold uppercase rounded-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A89E88] font-medium mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Bilal Ahmed"
                        className="w-full px-4 py-2.5 bg-[#111111] border border-[#333333] rounded-sm text-xs text-[#F6F0D8] focus:outline-none focus:border-[#F4B62F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A89E88] font-medium mb-1.5">
                        Phone / Email *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="e.g. 0300 1234567"
                        className="w-full px-4 py-2.5 bg-[#111111] border border-[#333333] rounded-sm text-xs text-[#F6F0D8] focus:outline-none focus:border-[#F4B62F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A89E88] font-medium mb-1.5">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#111111] border border-[#333333] rounded-sm text-xs text-[#F6F0D8] focus:outline-none focus:border-[#F4B62F]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Table Reservation">Table Reservation</option>
                      <option value="Group / Event Gathering">Group / Event Gathering</option>
                      <option value="Pastry Lab Custom Cakes">Pastry Lab Custom Cakes</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A89E88] font-medium mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Let us know how many guests, timing, or questions about our menu..."
                      className="w-full px-4 py-2.5 bg-[#111111] border border-[#333333] rounded-sm text-xs text-[#F6F0D8] focus:outline-none focus:border-[#F4B62F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Map Preview Card */}
            <div className="bg-[#161616] border border-[#282828] p-6 rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#F6F0D8]">
                    DHA Phase 1 Location
                  </h4>
                  <p className="text-xs text-[#A89E88]">
                    Sector L Commercial Area, Lahore
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Plaza+15+Sector+L+DHA+Phase+1+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#222222] hover:bg-[#2C2C2C] border border-[#333333] hover:border-[#F4B62F] text-[#F4B62F] text-xs font-semibold rounded-sm uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Get Directions
                </a>
              </div>

              {/* Styled interactive map placeholder with actual coordinates display */}
              <div className="relative h-60 bg-[#121212] rounded-sm border border-[#2B2B2B] overflow-hidden flex items-center justify-center text-center p-6 group">
                {/* Visual map texture backdrop */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F4B62F_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#F4B62F] text-[#111111] flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h5 className="font-serif font-bold text-base text-[#F6F0D8]">
                    Chai Avenue — DHA Phase 1
                  </h5>
                  <p className="text-xs text-[#A89E88] max-w-xs mx-auto">
                    Plaza #15, Sector L, 54810, Lahore
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://maps.google.com/?q=Chai+Avenue+Plaza+15+Sector+L+DHA+Phase+1+Lahore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-bold uppercase tracking-wider text-[#F4B62F] underline"
                    >
                      Click to open in Google Maps App
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
