import React from 'react';
import { Coffee, Sparkles, Heart, Award, ArrowRight } from 'lucide-react';
import { ChaiAvenueLogo } from '../components/ChaiAvenueLogo';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const offerings = [
    {
      title: 'Traditional Chai',
      description: 'Karak Chai, Masala Chai, Zafrani Chai, Chocolate Chai and Special Doodh Patti simmered with whole dairy and aromatic spices.',
      image: '/images/karak_chai.jpg',
      target: 'chai-coffee',
    },
    {
      title: 'Coffee',
      description: 'Hot and cold coffee choices for classic café lovers, from velvety Cappuccinos and Caffe Mochas to chilled Hazelnut cold brews.',
      image: '/images/caffe_mocha.jpg',
      target: 'chai-coffee',
    },
    {
      title: 'Shakes',
      description: 'Rich milkshakes including Oreo and Nutella-inspired favorites, blended thick with churned gelato and decadent toppings.',
      image: '/images/oreo_shake.jpg',
      target: 'shakes-desserts',
    },
    {
      title: 'Smoothies',
      description: 'Fruity blends made for something lighter and refreshing — fresh strawberry banana and wild berry passionfruit infusions.',
      image: '/images/smoothie_strawberry.jpg',
      target: 'shakes-desserts',
    },
    {
      title: 'Pastry Lab',
      description: 'A dessert-focused selection featuring cheesecakes, warm molten chocolate lava cakes and multi-layered signature creations.',
      image: '/images/lava_cake.jpg',
      target: 'shakes-desserts',
    },
    {
      title: 'Signature Drinks',
      description: 'Refreshing mocktails designed to stand out visually and tastefully, like our Asian Pear Mojito and sparkling citrus botanicals.',
      image: '/images/mojito.jpg',
      target: 'menu',
    },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F0D8] pt-24">
      {/* 1. Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden border-b border-[#222222]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cafe_interior.jpg"
            alt="Chai Avenue Café Interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-[#F4B62F] font-semibold block">
            Our Story & Craft
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-[#F6F0D8] leading-tight">
            Welcome to Chai Avenue
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#E8DFC7] font-normal max-w-2xl mx-auto">
            Where classic flavors meet a modern café experience.
          </p>
        </div>
      </section>

      {/* 2. Our Story: The Chai Avenue Experience */}
      <section className="py-24 bg-[#141414]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
                The Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8] leading-tight">
                The Chai Avenue Experience
              </h2>
              <div className="w-16 h-0.5 bg-[#F4B62F]" />

              <p className="text-sm sm:text-base text-[#D4CCA7] leading-relaxed font-light">
                Chai Avenue brings together the comfort of traditional chai with the atmosphere of a modern café. Our menu is designed for every kind of craving — from a simple Karak Chai to rich coffees, creamy shakes, refreshing smoothies, indulgent cakes and colorful signature mocktails.
              </p>

              <p className="text-sm sm:text-base text-[#B0A78F] leading-relaxed font-light">
                We believe good food should be enjoyed slowly, shared with good company and remembered long after the last sip. In an era of rushed takeaways, Chai Avenue stands as an invitation to pause, unwind, and savor the craftsmanship in every porcelain cup.
              </p>

              <div className="pt-2">
                <blockquote className="border-l-2 border-[#F4B62F] pl-4 italic text-sm text-[#F4B62F] font-serif">
                  “Good food should be enjoyed slowly, shared with good company and remembered long after the last sip.”
                </blockquote>
              </div>
            </div>

            <div className="md:col-span-5 relative">
              <div className="rounded-sm overflow-hidden border border-[#2D2D2D] shadow-2xl">
                <img
                  src="/images/intro_chai.jpg"
                  alt="Slow brewing tea"
                  referrerPolicy="no-referrer"
                  className="w-full h-96 object-cover object-center filter contrast-[1.05]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#1A1A1A] border border-[#333333] p-4 rounded-sm shadow-xl hidden sm:block max-w-[200px]">
                <span className="text-[10px] uppercase tracking-wider text-[#D99A20] font-semibold block">
                  Location
                </span>
                <p className="text-xs text-[#E8DFC7] mt-0.5 font-medium">
                  Plaza #15, Sector L, DHA Phase 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Serve: Six Elegant Sections */}
      <section className="py-24 bg-[#111111] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold">
              The Menu Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              What We Serve
            </h2>
            <p className="text-sm text-[#B0A78F] font-light">
              Six curated culinary pillars crafted with authentic physical ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering, idx) => (
              <div
                key={idx}
                className="bg-[#171717] border border-[#262626] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#F4B62F]/50 transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden bg-[#111111]">
                  <img
                    src={offering.image}
                    alt={offering.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#F4B62F] font-semibold block mb-1">
                      Pillar 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                      {offering.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B0A78F] mt-2.5 leading-relaxed font-light">
                      {offering.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#262626]">
                    <button
                      onClick={() => onNavigate(offering.target)}
                      className="text-xs uppercase tracking-wider font-semibold text-[#F4B62F] hover:text-[#FFCF56] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Atmosphere: Come for the Chai. Stay for the Experience. */}
      <section className="py-24 bg-[#141414] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold">
              The Ambience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              Come for the Chai. Stay for the Experience.
            </h2>
            <p className="text-sm text-[#B0A78F] font-light">
              Real café moments, comfortable seating, warm lighting, and genuine hospitality in DHA Phase 1.
            </p>
          </div>

          {/* Genuine photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-sm border border-[#2D2D2D]">
                <img
                  src="/images/cafe_interior.jpg"
                  alt="Café interior seating"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-sm border border-[#2D2D2D]">
                <img
                  src="/images/chai_table.jpg"
                  alt="Chai cups on table"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="overflow-hidden rounded-sm border border-[#2D2D2D]">
                <img
                  src="/images/lava_cake.jpg"
                  alt="Warm chocolate dessert"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-sm border border-[#2D2D2D]">
                <img
                  src="/images/friends_chai.jpg"
                  alt="Customers enjoying tea"
                  referrerPolicy="no-referrer"
                  className="w-full h-60 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-sm border border-[#2D2D2D]">
                <img
                  src="/images/barista_action.jpg"
                  alt="Barista brewing coffee"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-sm border border-[#2D2D2D]">
                <img
                  src="/images/caffe_latte.jpg"
                  alt="Latte art close-up"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="overflow-hidden rounded-sm border border-[#2D2D2D]">
                <img
                  src="/images/cafe_patio.jpg"
                  alt="Outdoor patio in DHA"
                  referrerPolicy="no-referrer"
                  className="w-full h-48 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-sm border border-[#2D2D2D]">
                <img
                  src="/images/zafrani_chai.jpg"
                  alt="Close-up saffron tea"
                  referrerPolicy="no-referrer"
                  className="w-full h-60 object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brand Statement */}
      <section className="py-28 bg-[#111111] text-center border-t border-[#222222] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ChaiAvenueLogo variant="full" size="md" className="mx-auto mb-6" />

          {/* Large centered brand statement */}
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#F6F0D8] font-bold tracking-tight">
            “It only tastes expensive.”
          </h2>

          <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#F4B62F] font-light max-w-xl mx-auto tracking-wide">
            Because great flavor should feel special.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('menu')}
              className="px-8 py-3.5 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-all"
            >
              Explore Full Menu
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 border border-[#333333] hover:border-[#F4B62F] text-[#E8DFC7] hover:text-[#F4B62F] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all"
            >
              Plan Your Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
