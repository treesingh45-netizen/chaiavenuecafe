import React from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { ArrowDown, Instagram, ShoppingBag, MapPin, ChevronRight, Clock, Coffee } from 'lucide-react';
import { ChaiAvenueLogo, ChaiCupMark } from '../components/ChaiAvenueLogo';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectItem: (item: MenuItem) => void;
  onOpenSommelier: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectItem,
  onOpenSommelier,
}) => {
  // 6 Featured items specified in the prompt
  const featuredIds = [
    'karak-chai',
    'zafrani-chai',
    'caffe-mocha',
    'oreo-chocolate',
    'strawberry-banana-smoothie',
    'chocolate-lava-cake',
  ];

  const featuredProducts = featuredIds
    .map((id) => MENU_ITEMS.find((item) => item.id === id))
    .filter(Boolean) as MenuItem[];

  const categories = [
    {
      title: 'Chai',
      description: 'Traditional favorites prepared for everyday comfort.',
      image: '/images/karak_chai.jpg',
      page: 'chai-coffee',
    },
    {
      title: 'Coffee',
      description: 'Classic hot and cold coffee selections.',
      image: '/images/caffe_mocha.jpg',
      page: 'chai-coffee',
    },
    {
      title: 'Shakes',
      description: 'Creamy, indulgent and packed with flavor.',
      image: '/images/oreo_shake.jpg',
      page: 'shakes-desserts',
    },
    {
      title: 'Smoothies',
      description: 'Fresh, fruity and refreshing combinations.',
      image: '/images/smoothie_strawberry.jpg',
      page: 'shakes-desserts',
    },
    {
      title: 'Pastry Lab',
      description: 'Desserts and cakes created for serious sweet cravings.',
      image: '/images/lava_cake.jpg',
      page: 'shakes-desserts',
    },
    {
      title: 'Signature Drinks',
      description: 'Colorful handcrafted mocktails.',
      image: '/images/mojito.jpg',
      page: 'menu',
    },
  ];

  const instagramPosts = [
    { image: '/images/karak_chai.jpg', caption: 'Karak simmered to absolute perfection' },
    { image: '/images/lava_cake.jpg', caption: 'Warm Belgian molten core waiting for your spoon' },
    { image: '/images/caffe_latte.jpg', caption: 'Fresh morning espresso pulls at Sector L' },
    { image: '/images/friends_chai.jpg', caption: 'Evenings made of deep conversations and endless cups' },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F0D8]">
      {/* 1. Full-Width Cinematic Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Real physical photograph background */}
        <div className="absolute inset-0">
          <img
            src="/images/hero_cafe.jpg"
            alt="Chai Avenue DHA Phase 1 Café Atmosphere"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.08] transform scale-105 animate-subtle-zoom"
          />
          {/* Subtle gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
          {/* Official Chai Avenue Logo Artwork */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative group max-w-[320px] sm:max-w-[420px] md:max-w-[480px] w-full mx-auto">
              {/* Warm golden ambient glow backplate */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#F4B62F]/20 via-[#F4B62F]/40 to-[#F4B62F]/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-[#F4B62F]/40 bg-[#111111]/90 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(244,182,47,0.2)] p-3 sm:p-4 md:p-5 backdrop-blur-md">
                <img
                  src="/images/chai_avenue_official_logo.jpg"
                  alt="Chai Avenue - It only tastes expensive"
                  className="w-full h-auto object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
            
            <div className="inline-flex items-center justify-center gap-3 opacity-95 mt-5">
              <span className="h-px w-10 sm:w-16 bg-[#F4B62F]/60" />
              <span className="text-[11px] sm:text-xs font-sans tracking-[0.3em] uppercase text-[#F4B62F] font-semibold">
                DHA Phase 1 · Lahore
              </span>
              <span className="h-px w-10 sm:w-16 bg-[#F4B62F]/60" />
            </div>
          </div>

          <h1 className="sr-only">Chai Avenue - It only tastes expensive - DHA Phase 1 Lahore</h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#E8DFC7] mt-3 leading-relaxed font-light font-sans">
            Premium chai, coffee, shakes, smoothies, desserts and handcrafted signature drinks in the heart of DHA Phase 1.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold uppercase tracking-[0.2em] rounded-sm transition-all shadow-lg hover:shadow-[#F4B62F]/20 active:scale-95"
            >
              View Menu
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-white/5 border border-[#E8DFC7]/40 hover:border-[#F4B62F] text-[#F6F0D8] hover:text-[#F4B62F] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all"
            >
              Visit Chai Avenue
            </button>
          </div>

          {/* Order Bag prompt pill */}
          <div className="mt-8">
            <button
              onClick={onOpenSommelier}
              className="inline-flex items-center gap-2 text-xs text-[#C7BEA5] hover:text-[#F4B62F] transition-colors py-1.5 px-3 rounded-full bg-black/40 border border-[#333333] backdrop-blur-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F4B62F]" />
              <span>Quick Order Bag: Dine-In, Takeaway & DHA Delivery</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A89E88]">
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#F4B62F]" />
        </div>
      </section>

      {/* 2. Intro Section: More Than Just Chai */}
      <section className="py-24 bg-[#141414] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
                  The Avenue Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8] leading-tight">
                  More Than Just Chai
                </h2>
                {/* Decorative gold line */}
                <div className="w-16 h-0.5 bg-[#F4B62F] mt-3" />
              </div>

              <p className="text-sm sm:text-base text-[#D4CCA7] leading-relaxed font-light">
                Welcome to Chai Avenue — a place where traditional chai meets modern café culture. From comforting Karak Chai and Special Doodh Patti to premium coffees, indulgent shakes, refreshing smoothies and handcrafted desserts, every visit is designed around great taste and a memorable experience.
              </p>

              <p className="text-sm sm:text-base text-[#B0A78F] leading-relaxed font-light">
                Nestled in Sector L, DHA Phase 1, our space is shaped for slow sips, lively conversations, and late-night cravings. We believe in unhurried moments served in genuine porcelain and glass.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#E8DFC7] font-medium tracking-wider uppercase">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4B62F]" />
                  <span>Fresh Whole Dairy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4B62F]" />
                  <span>Handcrafted Pastry Lab</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4B62F]" />
                  <span>Open Till 2:00 AM</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#F4B62F] hover:text-[#FFCF56] group transition-colors"
                >
                  <span>Our Story & Experience</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: Large Real Physical Photograph */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-sm border border-[#2D2D2D] shadow-2xl">
                <img
                  src="/images/intro_chai.jpg"
                  alt="Authentic slow-simmered Chai at Chai Avenue"
                  referrerPolicy="no-referrer"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-serif italic text-lg text-[#F6F0D8]">
                    “Traditional kettle warmth, poured with modern precision.”
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#F4B62F] mt-1 block">
                    Fresh Karak Brewing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Signature Categories (Large photographic cards with hover zoom) */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold">
              The Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              Signature Categories
            </h2>
            <p className="text-sm text-[#B0A78F] font-light">
              Carefully curated selections for every mood, time of day, and craving.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(cat.page)}
                className="group relative h-80 sm:h-96 rounded-sm overflow-hidden border border-[#282828] cursor-pointer shadow-lg hover:border-[#F4B62F]/60 transition-all duration-300"
              >
                {/* Real photo */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 filter brightness-[0.7] group-hover:brightness-[0.85]"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#F4B62F] font-semibold mb-1 block">
                      Category
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-[#D4CCA7] mt-1.5 leading-relaxed font-light max-w-xs">
                      {cat.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#F4B62F] font-medium tracking-wider uppercase">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Menu: What Are You Having Today? (6 Items) */}
      <section className="py-24 bg-[#141414] border-t border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
                Daily Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
                What Are You Having Today?
              </h2>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="text-xs font-bold uppercase tracking-[0.18em] text-[#F4B62F] hover:text-[#FFCF56] flex items-center gap-2 group self-start md:self-auto"
            >
              <span>View Full Digital Menu</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((item) => (
              <div
                key={item.id}
                className="group bg-[#181818] border border-[#262626] rounded-sm overflow-hidden hover:border-[#F4B62F]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Real Product Photo */}
                <div
                  className="relative h-60 overflow-hidden cursor-pointer bg-[#111111]"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-mono tracking-wider font-semibold text-[#111111] bg-[#F4B62F] px-2 py-0.5 rounded-xs uppercase">
                      Rs {item.price}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#E8DFC7] bg-black/60 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3
                      onClick={() => onSelectItem(item)}
                      className="font-serif text-xl font-bold text-[#F6F0D8] hover:text-[#F4B62F] cursor-pointer transition-colors"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#A89E88] mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#262626] flex items-center justify-between">
                    <span className="font-serif font-bold text-lg text-[#F4B62F]">
                      Rs {item.price}
                      {item.largePrice && (
                        <span className="text-xs font-sans text-[#888888] font-normal ml-1">
                          / Rs {item.largePrice}
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#E8DFC7] hover:text-[#F4B62F] transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Experience Section: Your Table. Your Chai. Your Avenue. */}
      <section className="py-24 bg-[#111111] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Real Interior Photography */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-sm overflow-hidden border border-[#2D2D2D] shadow-xl">
                  <img
                    src="/images/cafe_interior.jpg"
                    alt="Chai Avenue interior seating"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-80 object-cover object-center filter contrast-[1.05]"
                  />
                </div>
                <div className="rounded-sm overflow-hidden border border-[#2D2D2D] shadow-xl">
                  <img
                    src="/images/barista_action.jpg"
                    alt="Barista brewing tea and coffee"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 sm:h-52 object-cover object-center"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-sm overflow-hidden border border-[#2D2D2D] shadow-xl">
                  <img
                    src="/images/friends_chai.jpg"
                    alt="Friends gathering for evening chai"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 sm:h-52 object-cover object-center"
                  />
                </div>
                <div className="rounded-sm overflow-hidden border border-[#2D2D2D] shadow-xl">
                  <img
                    src="/images/cafe_patio.jpg"
                    alt="Chai Avenue outdoor patio in DHA Phase 1"
                    referrerPolicy="no-referrer"
                    className="w-full h-64 sm:h-80 object-cover object-center filter contrast-[1.05]"
                  />
                </div>
              </div>
            </div>

            {/* Content text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
                The Café Atmosphere
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8] leading-tight">
                Your Table.<br />Your Chai.<br />Your Avenue.
              </h2>
              <p className="text-sm sm:text-base text-[#D4CCA7] leading-relaxed font-light">
                Whether you're catching up with friends, taking a coffee break, enjoying dessert or simply looking for your favorite cup of chai, Chai Avenue is made for relaxed conversations and memorable moments.
              </p>
              <p className="text-sm sm:text-base text-[#B0A78F] leading-relaxed font-light">
                From the gentle hum of our espresso machine to the steam rising from freshly boiled Karak Chai, every detail at Plaza #15 is calibrated for warmth and understated elegance.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold uppercase tracking-[0.18em] rounded-sm transition-all"
                >
                  Visit Chai Avenue
                </button>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="px-6 py-3 bg-transparent border border-[#333333] hover:border-[#F4B62F] text-[#F6F0D8] hover:text-[#F4B62F] text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all"
                >
                  View Full Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Instagram Section: Follow Chai Avenue */}
      <section className="py-24 bg-[#141414] border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold">
              Live from DHA Phase 1
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F0D8]">
              Follow Chai Avenue
            </h2>
            <p className="text-sm text-[#B0A78F] font-light">
              Fresh cups, sweet moments and everything happening at Chai Avenue.
            </p>
            <div className="pt-2">
              <a
                href="https://www.instagram.com/chaiavenue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#333333] hover:border-[#F4B62F] text-[#F6F0D8] hover:text-[#F4B62F] rounded-sm text-xs font-semibold tracking-wider uppercase transition-all"
              >
                <Instagram className="w-4 h-4 text-[#F4B62F]" />
                @chaiavenue
              </a>
            </div>
          </div>

          {/* Clean 4-Column Instagram Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instagramPosts.map((post, idx) => (
              <a
                key={idx}
                href="https://www.instagram.com/chaiavenue"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-sm border border-[#262626] bg-[#111111]"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-500 filter brightness-[0.8] group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <Instagram className="w-5 h-5 text-[#F4B62F] mb-2" />
                  <p className="text-xs text-[#F6F0D8] font-light line-clamp-2">
                    {post.caption}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
