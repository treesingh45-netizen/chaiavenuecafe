import React from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { Sparkles, Eye, IceCream, Utensils, Heart } from 'lucide-react';

interface ShakesDessertsPageProps {
  onSelectItem: (item: MenuItem) => void;
  onOpenSommelier: () => void;
}

export const ShakesDessertsPage: React.FC<ShakesDessertsPageProps> = ({
  onSelectItem,
  onOpenSommelier,
}) => {
  const shakes = MENU_ITEMS.filter((item) => item.category === 'shakes');
  const smoothies = MENU_ITEMS.filter((item) => item.category === 'smoothies');
  const desserts = MENU_ITEMS.filter((item) => item.category === 'pastry_lab');

  const scrollToPastryLab = () => {
    const el = document.getElementById('pastry-lab-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F0D8] pt-24 pb-24">
      {/* 1. Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-[#222222]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/lava_cake.jpg"
            alt="Decadent Chocolate Lava Cake with flowing molten center"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-[#F4B62F] font-semibold block">
            Cold & Indulgent Delights
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-[#F6F0D8] leading-tight">
            Made for Your Sweet Side
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#E8DFC7] font-normal max-w-2xl mx-auto">
            Cold, creamy, fruity and seriously indulgent.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={scrollToPastryLab}
              className="px-6 py-3 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold uppercase tracking-[0.18em] rounded-sm transition-all"
            >
              Explore Pastry Lab
            </button>
            <button
              onClick={onOpenSommelier}
              className="px-6 py-3 bg-[#1B1B1B] hover:bg-[#252525] border border-[#F4B62F]/40 hover:border-[#F4B62F] text-[#F4B62F] text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Dessert & Chai Pairing Advisor
            </button>
          </div>
        </div>
      </section>

      {/* 2. Shakes Section */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
              Creamy Creations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              Artisan Milkshakes
            </h2>
            <p className="text-sm text-[#A89E88] font-light">
              Thick, hand-churned gelato blended with crushed Oreos, Italian Nutella, and French vanilla cream.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shakes.map((shake) => (
              <div
                key={shake.id}
                onClick={() => onSelectItem(shake)}
                className="group bg-[#181818] border border-[#282828] rounded-sm overflow-hidden hover:border-[#F4B62F]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-60 bg-[#111111] overflow-hidden">
                  <img
                    src={shake.image}
                    alt={shake.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-mono font-bold text-[#111111] bg-[#F4B62F] px-2.5 py-1 rounded-xs">
                      Rs {shake.price}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                      {shake.name}
                    </h3>
                    <p className="text-xs text-[#A89E88] mt-2 line-clamp-2 leading-relaxed">
                      {shake.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#262626] flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-sm text-[#F4B62F]">
                      Rs {shake.price}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#C7BEA5] group-hover:text-[#F4B62F]">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Smoothies Section */}
      <section className="py-20 bg-[#111111] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
              Pure Fruit & Refreshment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              Fresh Fruit Smoothies
            </h2>
            <p className="text-sm text-[#A89E88] font-light">
              Made with fresh berries, tropical passionfruit, bananas and natural honey for something lighter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {smoothies.map((smoothie) => (
              <div
                key={smoothie.id}
                onClick={() => onSelectItem(smoothie)}
                className="group bg-[#161616] border border-[#282828] rounded-sm overflow-hidden hover:border-[#F4B62F]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-64 bg-[#111111] overflow-hidden">
                  <img
                    src={smoothie.image}
                    alt={smoothie.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-mono font-bold text-[#111111] bg-[#F4B62F] px-2.5 py-1 rounded-xs">
                      Rs {smoothie.price}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                      {smoothie.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A89E88] mt-2.5 leading-relaxed font-light">
                      {smoothie.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#262626] flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-sm text-[#F4B62F]">
                      Rs {smoothie.price}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#C7BEA5] group-hover:text-[#F4B62F]">
                      Order Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pastry Lab by Chai Avenue */}
      <section id="pastry-lab-section" className="py-24 bg-[#141414] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold">
              The Dessert Boutique
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              Pastry Lab by Chai Avenue
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#F4B62F]">
              “A little sweetness goes a long way.”
            </p>
            <p className="text-sm text-[#A89E88] font-light max-w-md mx-auto">
              Cheesecakes, molten lava cakes, multi-layered ganache, and signature chocolate domes baked fresh for serious cravings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {desserts.map((dessert) => (
              <div
                key={dessert.id}
                onClick={() => onSelectItem(dessert)}
                className="group bg-[#181818] border border-[#282828] rounded-sm overflow-hidden hover:border-[#F4B62F]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Photo with hover interaction */}
                <div className="relative h-56 bg-[#111111] overflow-hidden">
                  <img
                    src={dessert.image}
                    alt={dessert.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#F4B62F] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-sm shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      View Dessert
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-xs font-mono font-bold text-[#111111] bg-[#F4B62F] px-2.5 py-1 rounded-xs">
                      Rs {dessert.price}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors leading-snug">
                      {dessert.name}
                    </h3>
                    <p className="text-xs text-[#A89E88] mt-2 line-clamp-2 leading-relaxed">
                      {dessert.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#262626] flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-sm text-[#F4B62F]">
                      Rs {dessert.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(dessert);
                      }}
                      className="text-[11px] uppercase tracking-wider font-semibold text-[#E8DFC7] hover:text-[#F4B62F] flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View Dessert</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Chocolate Feature (Full-Width Image Section) */}
      <section className="relative py-28 md:py-36 overflow-hidden border-t border-[#222222]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/lava_cake.jpg"
            alt="Warm Molten Chocolate Lava Cake"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#F4B62F] font-semibold block">
            Signature Creation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold uppercase text-[#F6F0D8] leading-tight">
            Made for serious chocolate cravings.
          </h2>
          <p className="text-sm sm:text-base text-[#D4CCA7] max-w-xl mx-auto font-light leading-relaxed">
            Baked to order in our Pastry Lab with flowing Belgian dark chocolate and paired with fresh whole dairy Special Doodh Patti.
          </p>

          <div className="pt-4">
            <button
              onClick={scrollToPastryLab}
              className="px-8 py-3.5 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-all shadow-xl hover:shadow-[#F4B62F]/30"
            >
              Explore the Pastry Lab
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
