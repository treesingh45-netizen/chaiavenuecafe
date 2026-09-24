import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { Coffee, Sparkles, Flame, Snowflake, ChevronRight } from 'lucide-react';

interface ChaiCoffeePageProps {
  onSelectItem: (item: MenuItem) => void;
  onOpenSommelier: () => void;
}

export const ChaiCoffeePage: React.FC<ChaiCoffeePageProps> = ({
  onSelectItem,
  onOpenSommelier,
}) => {
  const [coffeeSubFilter, setCoffeeSubFilter] = useState<'all' | 'hot' | 'cold'>('all');

  const chaiItems = MENU_ITEMS.filter((item) => item.category === 'chai');
  const coffeeItems = MENU_ITEMS.filter((item) => {
    if (item.category !== 'coffee') return false;
    if (coffeeSubFilter === 'hot') return item.temperature === 'Hot';
    if (coffeeSubFilter === 'cold') return item.temperature === 'Cold';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F0D8] pt-24 pb-24">
      {/* 1. Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-[#222222]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/intro_chai.jpg"
            alt="Fresh chai brewing and pouring"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/75 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-[#F4B62F] font-semibold block">
            The Beverage Lounge
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-[#F6F0D8] leading-tight">
            Brewed for Comfort
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#E8DFC7] font-normal max-w-2xl mx-auto">
            Traditional chai. Classic coffee. Your perfect break.
          </p>

          <div className="pt-4">
            <button
              onClick={onOpenSommelier}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#252525] border border-[#F4B62F]/40 hover:border-[#F4B62F] rounded-sm text-xs font-semibold text-[#F4B62F] transition-all shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F4B62F]" />
              <span>Which brew fits your mood today? Ask Sommelier</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. The Chai Collection */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F4B62F]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold">
                Authentic Pakistani Tea Culture
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              The Chai Collection
            </h2>
            <p className="text-sm text-[#A89E88] font-light">
              Slow-simmered in copper kettles using whole farm milk, fine Ceylon teas, and hand-ground spices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chaiItems.map((chai) => (
              <div
                key={chai.id}
                onClick={() => onSelectItem(chai)}
                className="group bg-[#181818] border border-[#282828] rounded-sm overflow-hidden hover:border-[#F4B62F]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-64 bg-[#111111] overflow-hidden">
                  <img
                    src={chai.image}
                    alt={chai.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-[#333333]">
                    <Flame className="w-3.5 h-3.5 text-[#F4B62F]" />
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-[#F4B62F]">
                      Slow Simmered
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                      {chai.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B0A78F] mt-2.5 leading-relaxed font-light">
                      {chai.description}
                    </p>

                    {chai.tastingNotes && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {chai.tastingNotes.map((note, i) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase tracking-wider text-[#A89E88] bg-[#222222] px-2 py-0.5 rounded-xs"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#262626] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#888888] block">
                          Regular
                        </span>
                        <span className="font-serif font-bold text-sm text-[#F6F0D8]">
                          Rs {chai.regularPrice}
                        </span>
                      </div>
                      <span className="text-[#444444]">|</span>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#888888] block">
                          Large
                        </span>
                        <span className="font-serif font-bold text-sm text-[#F4B62F]">
                          Rs {chai.largePrice}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(chai);
                      }}
                      className="text-xs uppercase tracking-wider font-semibold text-[#E8DFC7] hover:text-[#F4B62F] transition-colors"
                    >
                      Tasting Profile →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Coffee Collection */}
      <section className="py-20 bg-[#111111] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
                Artisan Espresso & Cold Brews
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
                Coffee, Your Way
              </h2>
            </div>

            {/* Sub filter buttons */}
            <div className="flex items-center gap-2 bg-[#1A1A1A] p-1 border border-[#2D2D2D] rounded-sm self-start md:self-auto">
              <button
                onClick={() => setCoffeeSubFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase rounded-xs transition-all ${
                  coffeeSubFilter === 'all'
                    ? 'bg-[#F4B62F] text-[#111111]'
                    : 'text-[#A89E88] hover:text-[#F6F0D8]'
                }`}
              >
                All Coffees
              </button>
              <button
                onClick={() => setCoffeeSubFilter('hot')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase rounded-xs transition-all flex items-center gap-1 ${
                  coffeeSubFilter === 'hot'
                    ? 'bg-[#F4B62F] text-[#111111]'
                    : 'text-[#A89E88] hover:text-[#F6F0D8]'
                }`}
              >
                <Flame className="w-3 h-3" />
                Hot
              </button>
              <button
                onClick={() => setCoffeeSubFilter('cold')}
                className={`px-3 py-1.5 text-xs font-semibold uppercase rounded-xs transition-all flex items-center gap-1 ${
                  coffeeSubFilter === 'cold'
                    ? 'bg-[#F4B62F] text-[#111111]'
                    : 'text-[#A89E88] hover:text-[#F6F0D8]'
                }`}
              >
                <Snowflake className="w-3 h-3" />
                Cold
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coffeeItems.map((coffee) => (
              <div
                key={coffee.id}
                onClick={() => onSelectItem(coffee)}
                className="group bg-[#161616] border border-[#262626] rounded-sm overflow-hidden hover:border-[#F4B62F]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-48 bg-[#111111] overflow-hidden">
                  <img
                    src={coffee.image}
                    alt={coffee.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-xs font-mono font-bold text-[#111111] bg-[#F4B62F] px-2 py-0.5 rounded-xs">
                      Rs {coffee.price}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#A89E88] mb-1">
                      {coffee.temperature === 'Hot' ? (
                        <>
                          <Flame className="w-3 h-3 text-[#F4B62F]" />
                          <span>Hot Espresso Selection</span>
                        </>
                      ) : (
                        <>
                          <Snowflake className="w-3 h-3 text-sky-400" />
                          <span>Chilled Over Ice</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                      {coffee.name}
                    </h3>
                    <p className="text-xs text-[#A89E88] mt-2 line-clamp-2 leading-relaxed">
                      {coffee.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#242424] flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-sm text-[#F4B62F]">
                      Rs {coffee.price}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-[#C7BEA5] group-hover:text-[#F4B62F]">
                      Order Info →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Visual Story Section: Slow down. Take a sip. Stay awhile. */}
      <section className="py-24 bg-[#141414] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold">
              The Ritual
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              “Slow down. Take a sip. Stay awhile.”
            </h2>
            <p className="text-sm text-[#B0A78F] font-light">
              From bean grind and kettle boil to porcelain presentation — the craft behind every serving.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="h-64 rounded-sm overflow-hidden border border-[#2D2D2D]">
                <img
                  src="/images/intro_chai.jpg"
                  alt="Chai pouring"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.05]"
                />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#F4B62F] block">
                01. The Boiling Kettle
              </span>
              <p className="text-xs text-[#8A8270] leading-relaxed">
                Slowly reduced whole milk infused with dark, high-grown tea leaves.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-64 rounded-sm overflow-hidden border border-[#2D2D2D]">
                <img
                  src="/images/caffe_latte.jpg"
                  alt="Coffee cup close-up"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.05]"
                />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#F4B62F] block">
                02. Espresso Extraction
              </span>
              <p className="text-xs text-[#8A8270] leading-relaxed">
                Golden crema and dense microfoam drawn with barista precision.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-64 rounded-sm overflow-hidden border border-[#2D2D2D]">
                <img
                  src="/images/chai_table.jpg"
                  alt="Table setting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.05]"
                />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#F4B62F] block">
                03. Table Setting
              </span>
              <p className="text-xs text-[#8A8270] leading-relaxed">
                Deep charcoal surfaces and warm amber glow for unhurried conversations.
              </p>
            </div>

            <div className="space-y-3">
              <div className="h-64 rounded-sm overflow-hidden border border-[#2D2D2D]">
                <img
                  src="/images/barista_action.jpg"
                  alt="Barista preparation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.05]"
                />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#F4B62F] block">
                04. Barista Mastery
              </span>
              <p className="text-xs text-[#8A8270] leading-relaxed">
                Every cup handcrafted to taste expensive without the pretense.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
