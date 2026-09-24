import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/menuData';
import { Instagram, Eye, X, Coffee, Users, Moon, Sun, ArrowUpRight } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const categories = ['All', 'The Café', 'The Table', 'The Details', 'The Moments'];

  const filteredGallery = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const moments = [
    {
      title: 'Coffee Break',
      subtitle: 'For a quick recharge during the day.',
      image: '/images/caffe_latte.jpg',
      icon: Sun,
      description: 'Step into quiet air conditioning, order a double-shot flat white or cold brew, and recharge away from the Lahore heat.',
    },
    {
      title: 'Friends & Conversations',
      subtitle: 'A relaxed place to catch up.',
      image: '/images/friends_chai.jpg',
      icon: Users,
      description: 'Generous booth and lounge tables designed for group laughter, storytelling, and memories that last long after midnight.',
    },
    {
      title: 'Dessert Time',
      subtitle: 'A destination for chocolate, cakes and sweet cravings.',
      image: '/images/lava_cake.jpg',
      icon: Coffee,
      description: 'Molten Belgian lava cakes, triple chocolate ganache, and New York cheesecakes baked fresh to satisfy midnight cravings.',
    },
    {
      title: 'Evening Chai',
      subtitle: 'A warm cup and good conversation to end the day.',
      image: '/images/karak_chai.jpg',
      icon: Moon,
      description: 'Piping hot Karak Chai and Special Doodh Patti simmered with whole milk to soothe the soul after a busy day in DHA.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-[#F6F0D8] pt-24 pb-24">
      {/* 1. Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden border-b border-[#222222]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cafe_interior.jpg"
            alt="Inside Chai Avenue café interior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-[#F4B62F] font-semibold block">
            Visual Experience
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-[#F6F0D8] leading-tight">
            Inside Chai Avenue
          </h1>
          <p className="font-serif italic text-xl sm:text-2xl text-[#E8DFC7] font-normal max-w-2xl mx-auto">
            Good food. Good conversations. Good atmosphere.
          </p>
        </div>
      </section>

      {/* 2. Gallery Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all focus:outline-none ${
                activeCategory === cat
                  ? 'bg-[#F4B62F] text-[#111111] shadow-md'
                  : 'bg-[#181818] text-[#C7BEA5] hover:text-[#F4B62F] hover:bg-[#222222] border border-[#2B2B2B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-80 rounded-sm overflow-hidden bg-[#181818] border border-[#282828] cursor-pointer hover:border-[#F4B62F]/60 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 filter brightness-[0.88] group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#F4B62F] font-semibold mb-1 block">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#C7BEA5] mt-1.5 line-clamp-2 leading-relaxed font-light">
                  {item.caption}
                </p>
                <div className="pt-3 flex items-center gap-1 text-[11px] text-[#F4B62F] font-medium uppercase tracking-wider">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Experience Section: Made for Every Kind of Moment */}
      <section className="py-24 bg-[#141414] border-t border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold">
              Moments That Matter
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F0D8]">
              Made for Every Kind of Moment
            </h2>
            <p className="text-sm text-[#B0A78F] font-light">
              Four distinct atmospheres woven into every corner of Chai Avenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {moments.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#181818] border border-[#282828] rounded-sm overflow-hidden flex flex-col justify-between group hover:border-[#F4B62F]/50 transition-all duration-300"
                >
                  <div className="relative h-52 bg-[#111111] overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-xs flex items-center justify-center border border-[#333333]">
                      <Icon className="w-4 h-4 text-[#F4B62F]" />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-xs text-[#F4B62F] font-medium mt-1">
                        {m.subtitle}
                      </p>
                      <p className="text-xs text-[#A89E88] mt-3 leading-relaxed font-light">
                        {m.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-4 border-t border-[#262626]">
                      <span className="text-[10px] uppercase tracking-wider text-[#777777]">
                        Sector L · DHA Phase 1
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Instagram Feed Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F4B62F] font-semibold block">
              Official Instagram
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F0D8]">
              More From Chai Avenue
            </h2>
            <p className="text-sm text-[#A89E88] font-light max-w-md mx-auto">
              Follow along for daily specials, new pastry lab drops, and customer stories.
            </p>
          </div>

          <div>
            <a
              href="https://www.instagram.com/chaiavenue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1B1B1B] hover:bg-[#262626] border border-[#333333] hover:border-[#F4B62F] text-[#F6F0D8] hover:text-[#F4B62F] rounded-sm text-xs font-bold tracking-wider uppercase transition-all shadow-md"
            >
              <Instagram className="w-4 h-4 text-[#F4B62F]" />
              <span>Follow Us on Instagram (@chaiavenue)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#181818] border border-[#2D2D2D] rounded-sm overflow-hidden shadow-2xl cursor-default"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-[#E8DFC7] hover:text-[#F4B62F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>
            <div className="p-6 bg-[#161616] border-t border-[#262626]">
              <span className="text-[10px] uppercase tracking-wider text-[#F4B62F] font-semibold block">
                {selectedPhoto.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F6F0D8] mt-1">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-[#C7BEA5] mt-2 font-light">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
