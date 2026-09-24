import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { Search, ShoppingBag, MapPin, Coffee, Info, Check } from 'lucide-react';

interface MenuPageProps {
  onSelectItem: (item: MenuItem) => void;
  onOpenSommelier: () => void;
  onNavigateToContact: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  onSelectItem,
  onOpenSommelier,
  onNavigateToContact,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [chaiSizeView, setChaiSizeView] = useState<'regular' | 'large'>('regular');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'chai', label: 'Chai' },
    { id: 'coffee', label: 'Coffee' },
    { id: 'shakes', label: 'Shakes' },
    { id: 'smoothies', label: 'Smoothies' },
    { id: 'pastry_lab', label: 'Pastry Lab' },
    { id: 'signature_drinks', label: 'Signature Drinks' },
    { id: 'savory', label: 'Starters & Savory' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F0D8] pt-24 pb-24">
      {/* Page Header */}
      <section className="py-16 md:py-20 bg-[#141414] border-b border-[#222222] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
            Handcrafted Menu
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-[#F6F0D8]">
            The Chai Avenue Menu
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#D4CCA7] font-normal max-w-xl mx-auto">
            Traditional chai brews, artisan roasts, rich milkshakes, and fresh laboratory pastries.
          </p>

          {/* Order Bag Banner */}
          <div className="pt-4">
            <button
              onClick={onOpenSommelier}
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#1A1A1A] hover:bg-[#242424] border border-[#F4B62F]/40 hover:border-[#F4B62F] rounded-sm text-xs font-semibold text-[#F4B62F] transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#F4B62F]" />
              <span>Ready to order? Open Quick Order Bag</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-8 border-b border-[#242424]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap focus:outline-none ${
                  activeCategory === cat.id
                    ? 'bg-[#F4B62F] text-[#111111] shadow-md'
                    : 'bg-[#181818] text-[#C7BEA5] hover:text-[#F4B62F] hover:bg-[#222222] border border-[#2B2B2B]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[260px] lg:w-72">
            <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chai, latte, cake..."
              className="w-full pl-10 pr-4 py-2 bg-[#181818] border border-[#333333] rounded-sm text-xs text-[#F6F0D8] placeholder-[#777777] focus:outline-none focus:border-[#F4B62F] transition-colors"
            />
          </div>
        </div>

        {/* Chai Size Selector Banner (Visible when Chai is active or all) */}
        {(activeCategory === 'chai' || activeCategory === 'all') && (
          <div className="py-4 my-4 px-4 bg-[#161616] border border-[#262626] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#A89E88]">
              <Coffee className="w-4 h-4 text-[#F4B62F]" />
              <span>Chai Size Selection: All traditional chais are available in two sizes.</span>
            </div>
            <div className="flex items-center gap-1 bg-[#111111] p-1 border border-[#333333] rounded-xs">
              <button
                onClick={() => setChaiSizeView('regular')}
                className={`px-3 py-1 rounded-xs font-semibold text-xs transition-all ${
                  chaiSizeView === 'regular'
                    ? 'bg-[#F4B62F] text-[#111111]'
                    : 'text-[#A89E88] hover:text-[#F6F0D8]'
                }`}
              >
                Regular
              </button>
              <button
                onClick={() => setChaiSizeView('large')}
                className={`px-3 py-1 rounded-xs font-semibold text-xs transition-all ${
                  chaiSizeView === 'large'
                    ? 'bg-[#F4B62F] text-[#111111]'
                    : 'text-[#A89E88] hover:text-[#F6F0D8]'
                }`}
              >
                Large
              </button>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredItems.map((item) => {
            // Price calculation depending on chai size view
            let displayPrice = item.price;
            let sizeNote = '';
            if (item.category === 'chai') {
              displayPrice =
                chaiSizeView === 'large' && item.largePrice
                  ? item.largePrice
                  : item.regularPrice || item.price;
              sizeNote = chaiSizeView === 'large' ? 'Large' : 'Regular';
            }

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group bg-[#161616] border border-[#262626] rounded-sm overflow-hidden hover:border-[#F4B62F]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative h-52 bg-[#111111] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 filter brightness-[0.9] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent opacity-80" />

                  {/* Price Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-mono font-bold text-[#111111] bg-[#F4B62F] px-2.5 py-1 rounded-xs shadow-md">
                      Rs {displayPrice}
                    </span>
                  </div>

                  {/* Category kicker */}
                  <div className="absolute bottom-2 left-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#F4B62F] font-semibold bg-black/70 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-xl font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      {sizeNote && (
                        <span className="text-[11px] text-[#A89E88] font-mono shrink-0">
                          {sizeNote}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#A89E88] mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer of Card */}
                  <div className="pt-4 mt-3 border-t border-[#242424] flex items-center justify-between text-xs">
                    {item.sizes && item.sizes.length > 1 ? (
                      <span className="text-[11px] text-[#888888]">
                        {item.sizes.map((s) => `${s.label}: Rs ${s.price}`).join(' · ')}
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#888888] italic">
                        Served Fresh
                      </span>
                    )}

                    <span className="font-medium text-[#F4B62F] uppercase text-[11px] tracking-wider group-hover:underline">
                      View Tasting Profile →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-[#161616] border border-[#262626] rounded-sm my-8">
            <p className="font-serif text-xl text-[#F6F0D8]">
              No menu items found matching "{searchQuery}".
            </p>
            <p className="text-xs text-[#A89E88] mt-2">
              Try searching for Karak Chai, New York Cheese Cake, or Mocha.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#F4B62F] text-[#111111] text-xs font-bold uppercase rounded-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Synchronized Menu Notice */}
        <div className="mt-16 p-4 bg-[#141414] border border-[#282828] rounded-sm text-center">
          <p className="text-xs text-[#8A8270] leading-relaxed flex items-center justify-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#F4B62F] shrink-0" />
            <span>
              Prices shown on the website should be kept synchronized with the latest in-store menu at Plaza #15, Sector L, DHA Phase 1, Lahore.
            </span>
          </p>
        </div>

        {/* Prominent CTA: Plan Your Visit */}
        <div className="mt-12 text-center bg-gradient-to-r from-[#171717] via-[#222222] to-[#171717] border border-[#2E2E2E] p-8 md:p-12 rounded-sm shadow-xl space-y-4">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F6F0D8]">
            Ready to Experience Chai Avenue?
          </h3>
          <p className="text-sm text-[#C7BEA5] max-w-lg mx-auto font-light">
            We are open daily until 2:00 AM in DHA Phase 1. Walk in or contact our team for table inquiries.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToContact}
              className="px-8 py-3.5 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-all shadow-lg hover:shadow-[#F4B62F]/20 flex items-center gap-2 mx-auto"
            >
              <MapPin className="w-4 h-4" />
              Plan Your Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
