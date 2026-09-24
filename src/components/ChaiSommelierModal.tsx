import React, { useState } from 'react';
import { X, Sparkles, Send, Coffee, Check, ArrowRight, Loader2 } from 'lucide-react';
import { ChaiAvenueLogo } from './ChaiAvenueLogo';

interface ChaiSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialItem?: string;
  onSelectMenuItem?: (itemId: string) => void;
}

interface PairingItem {
  name: string;
  category: string;
  price: string;
  reason: string;
}

interface SommelierResult {
  recommendation: string;
  pairings: PairingItem[];
  sommelierTip: string;
}

export const ChaiSommelierModal: React.FC<ChaiSommelierModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialItem = '',
  onSelectMenuItem,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SommelierResult | null>(null);

  if (!isOpen) return null;

  const quickMoods = [
    { label: 'Evening Comfort', prompt: 'I want a comforting traditional chai after a long day' },
    { label: 'Serious Sweet Craving', prompt: 'I have intense chocolate cravings, what dessert and drink pairing should I get?' },
    { label: 'Late Night Catchup', prompt: 'Meeting friends late at night in DHA, what is great to share?' },
    { label: 'Light & Refreshing', prompt: 'Something fruity, cold and refreshing' },
    { label: 'Coffee & Productivity', prompt: 'Need an energizing coffee for a work session' },
  ];

  const handleAsk = async (userPrompt?: string) => {
    const textToSend = userPrompt || query;
    if (!textToSend.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          selectedItem: initialItem,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        throw new Error('Failed to get recommendation');
      }
    } catch {
      // Fallback response
      setResult({
        recommendation: "Our signature Zafrani Chai paired with the warm Chocolate Lava Cake is the quintessential Chai Avenue indulgence.",
        pairings: [
          { name: "Zafrani Chai", category: "Chai", price: "Rs 200", reason: "Royal saffron notes that elevate warm conversations." },
          { name: "Chocolate Lava Cake", category: "Pastry Lab", price: "Rs 450", reason: "Flowing Belgian chocolate center baked to order." }
        ],
        sommelierTip: "Ask for an extra hot pour during cool evenings on the Avenue."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#181818] border border-[#2D2D2D] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#282828] flex items-center justify-between bg-[#151515]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F4B62F]/10 border border-[#F4B62F]/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#F4B62F]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#F6F0D8] tracking-wide">
                Chai Avenue Sommelier
              </h3>
              <p className="text-[11px] text-[#A89E88] tracking-wider uppercase font-medium">
                Gemini Powered · Flavor & Pairing Concierge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-[#F6F0D8] rounded-md transition-colors"
            aria-label="Close Sommelier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Prompts */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#D99A20] font-semibold mb-2.5">
              Choose your mood or craving:
            </label>
            <div className="flex flex-wrap gap-2">
              {quickMoods.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(m.prompt);
                    handleAsk(m.prompt);
                  }}
                  className="text-xs px-3 py-1.5 bg-[#222222] hover:bg-[#2C2C2C] border border-[#333333] hover:border-[#F4B62F]/60 text-[#E8DFC7] hover:text-[#F4B62F] rounded-sm transition-all text-left"
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search / Ask Input */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                placeholder="Ask about flavours, pairings, or cravings (e.g. Best chai with Chocolate Lava Cake?)"
                className="w-full px-4 py-3 bg-[#111111] border border-[#333333] rounded-sm text-sm text-[#F6F0D8] placeholder-[#777777] focus:outline-none focus:border-[#F4B62F] transition-colors"
              />
              <button
                onClick={() => handleAsk()}
                disabled={isLoading || !query.trim()}
                className="px-4 py-3 bg-[#F4B62F] text-[#111111] font-semibold rounded-sm hover:bg-[#D99A20] disabled:opacity-50 transition-all flex items-center justify-center shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <div className="p-5 bg-[#141414] border border-[#2D2D2D] rounded-sm space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F4B62F]">
                <Coffee className="w-4 h-4 text-[#F4B62F]" />
                Sommelier Recommendation
              </div>

              <p className="text-sm text-[#F6F0D8] leading-relaxed">
                {result.recommendation}
              </p>

              {/* Pairings */}
              {result.pairings && result.pairings.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#262626]">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#A89E88] block">
                    Curated Pairings:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.pairings.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#1B1B1B] border border-[#2B2B2B] rounded-sm flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-serif font-bold text-[#F4B62F]">
                              {p.name}
                            </span>
                            <span className="text-xs font-mono font-medium text-[#E8DFC7]">
                              {p.price}
                            </span>
                          </div>
                          <span className="text-[10px] uppercase tracking-wider text-[#888888]">
                            {p.category}
                          </span>
                          <p className="text-xs text-[#C5BBA2] mt-1.5 leading-normal">
                            {p.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Insider Tip */}
              {result.sommelierTip && (
                <div className="p-3 bg-[#1C1810] border-l-2 border-[#F4B62F] text-xs text-[#E8DFC7] italic">
                  <span className="font-semibold not-italic text-[#F4B62F] mr-1.5">
                    Sommelier Note:
                  </span>
                  {result.sommelierTip}
                </div>
              )}
            </div>
          )}

          {!result && !isLoading && (
            <div className="text-center py-6 text-[#777777] text-xs leading-relaxed">
              <ChaiAvenueLogo variant="icon" className="w-10 h-10 mx-auto opacity-40 mb-2" />
              Ask anything about our authentic Karak Chai, Saffron blends, Pastry Lab desserts, or DHA Phase 1 specialties.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#242424] bg-[#141414] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#E8DFC7] hover:text-[#F4B62F] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
