import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { X, Sparkles, MapPin, Coffee, Check } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onOpenSommelierWithItem: (itemName: string) => void;
  onNavigateToContact: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onOpenSommelierWithItem,
  onNavigateToContact,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  if (!item) return null;

  const currentPrice = item.sizes
    ? item.sizes[selectedSizeIndex].price
    : item.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#161616] border border-[#2D2D2D] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-[#E8DFC7] hover:text-[#F4B62F] hover:bg-black/90 transition-all focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Real Product Image */}
        <div className="w-full md:w-1/2 relative bg-[#111111] min-h-[260px] md:min-h-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-3 left-4 hidden md:block">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#F4B62F] bg-black/70 px-2.5 py-1 rounded-sm border border-[#F4B62F]/30 backdrop-blur-sm">
              Real Physical Photo
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D99A20] font-semibold">
                {item.categoryLabel}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F6F0D8] mt-1 leading-tight">
                {item.name}
              </h3>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold text-[#F4B62F]">
                Rs {currentPrice}
              </span>
              {item.sizes && (
                <span className="text-xs text-[#888888]">
                  ({item.sizes[selectedSizeIndex].label})
                </span>
              )}
            </div>

            {/* Size selector if available */}
            {item.sizes && item.sizes.length > 0 && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A89E88] font-medium mb-1.5">
                  Select Size:
                </label>
                <div className="flex gap-2">
                  {item.sizes.map((s, idx) => (
                    <button
                      key={s.label}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-sm border transition-all ${
                        selectedSizeIndex === idx
                          ? 'border-[#F4B62F] bg-[#F4B62F] text-[#111111]'
                          : 'border-[#333333] text-[#E8DFC7] hover:border-[#F4B62F]/50 bg-[#1F1F1F]'
                      }`}
                    >
                      {s.label} - Rs {s.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-[#C7BEA5] leading-relaxed">
              {item.description}
            </p>

            {/* Tasting Notes */}
            {item.tastingNotes && item.tastingNotes.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#A89E88] font-semibold block mb-2">
                  Tasting Profile:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-[#202020] border border-[#2D2D2D] text-[#E8DFC7] rounded-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-[11px] text-[#7A7465] italic border-t border-[#242424] pt-3">
              Served fresh daily at Chai Avenue, Plaza #15, Sector L, DHA Phase 1.
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-6 mt-4 border-t border-[#242424]">
            <button
              onClick={() => {
                onClose();
                onOpenSommelierWithItem(item.name);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-wider font-semibold border border-[#F4B62F] text-[#F4B62F] hover:bg-[#F4B62F]/10 rounded-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#F4B62F]" />
              Find Best Pairings with AI Sommelier
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateToContact();
              }}
              className="w-full py-2.5 text-xs uppercase tracking-[0.16em] font-bold bg-[#F4B62F] text-[#111111] hover:bg-[#D99A20] rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Plan Your Visit to Chai Avenue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
