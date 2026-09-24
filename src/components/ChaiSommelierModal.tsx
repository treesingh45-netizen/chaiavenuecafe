import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Coffee,
  Check,
  ArrowRight,
  ArrowLeft,
  Loader2,
  MessageCircle,
  Phone,
  Copy,
  Plus,
  Minus,
  MapPin,
  UtensilsCrossed,
  Receipt,
  CheckCircle2,
} from 'lucide-react';
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
  totalPrice?: string;
  budgetStatus?: string;
}

interface OrderItem {
  name: string;
  category: string;
  unitPrice: number;
  quantity: number;
  reason?: string;
}

const CHAI_AVENUE_WHATSAPP = '923228800128';

export const ChaiSommelierModal: React.FC<ChaiSommelierModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialItem = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [customBudget, setCustomBudget] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SommelierResult | null>(null);

  // Order workflow states
  const [activeView, setActiveView] = useState<'sommelier' | 'order_form' | 'order_sent'>('sommelier');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [diningMode, setDiningMode] = useState<'dine_in' | 'takeaway' | 'delivery'>('dine_in');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const budgetOptions = [
    { label: 'Flexible', value: '' },
    { label: 'Under Rs 500', value: 'Under Rs 500' },
    { label: 'Under Rs 1,000', value: 'Under Rs 1,000' },
    { label: 'Under Rs 1,500', value: 'Under Rs 1,500' },
    { label: 'Custom', value: 'custom' },
  ];

  const quickMoods = [
    { label: 'Evening Comfort', prompt: 'I want a comforting traditional chai after a long day' },
    { label: 'Serious Sweet Craving', prompt: 'I have intense chocolate cravings, what dessert and drink pairing should I get?' },
    { label: 'Late Night Catchup', prompt: 'Meeting friends late at night in DHA, what is great to share?' },
    { label: 'Light & Refreshing', prompt: 'Something fruity, cold and refreshing' },
    { label: 'Coffee & Productivity', prompt: 'Need an energizing coffee for a work session' },
  ];

  const parsePriceToNumber = (priceStr: string): number => {
    const parsed = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const getEffectiveBudget = (): string => {
    if (selectedBudget === 'custom') {
      return customBudget ? `Rs ${customBudget}` : '';
    }
    return selectedBudget;
  };

  const handleAsk = async (userPrompt?: string) => {
    const textToSend = userPrompt || query;
    if (!textToSend.trim()) return;

    setIsLoading(true);
    setActiveView('sommelier');
    const effectiveBudget = getEffectiveBudget();

    try {
      const res = await fetch('/api/sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          selectedItem: initialItem,
          budget: effectiveBudget,
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
      const fallbackTotal = effectiveBudget.includes('500') ? 'Rs 420' : 'Rs 650';
      setResult({
        recommendation: "Our signature Zafrani Chai paired with the warm Chocolate Lava Cake is the quintessential Chai Avenue indulgence.",
        pairings: [
          { name: "Zafrani Chai", category: "Chai", price: "Rs 200", reason: "Royal saffron notes that elevate warm conversations." },
          { name: "Chocolate Lava Cake", category: "Pastry Lab", price: "Rs 450", reason: "Flowing Belgian chocolate center baked to order." }
        ],
        totalPrice: fallbackTotal,
        budgetStatus: effectiveBudget ? `Within your ${effectiveBudget} budget` : "Balanced Pairing",
        sommelierTip: "Ask for an extra hot pour during cool evenings on the Avenue."
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Switch to Order Form with curated items
  const handleProceedToOrder = () => {
    if (!result || !result.pairings) return;
    const initialItems: OrderItem[] = result.pairings.map((p) => ({
      name: p.name,
      category: p.category,
      unitPrice: parsePriceToNumber(p.price) || 200,
      quantity: 1,
      reason: p.reason,
    }));
    setOrderItems(initialItems);
    setOrderId(`CA-${Math.floor(1000 + Math.random() * 9000)}`);
    setActiveView('order_form');
  };

  const updateItemQuantity = (index: number, delta: number) => {
    setOrderItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index] = { ...updated[index], quantity: newQty };
      return updated;
    });
  };

  const calculateOrderTotal = (): number => {
    return orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  };

  const formatCleanPhone = (phone: string): string => {
    let clean = phone.replace(/[\s\-\(\)\+]/g, '');
    if (clean.startsWith('0')) {
      clean = '92' + clean.slice(1);
    }
    return clean;
  };

  const generateReceiptText = (): string => {
    const total = calculateOrderTotal();
    const effectiveBudget = getEffectiveBudget();
    const modeLabel =
      diningMode === 'dine_in'
        ? `☕ Dine-In (${tableOrAddress ? `Table: ${tableOrAddress}` : 'Table to be assigned'})`
        : diningMode === 'delivery'
        ? `🛵 Delivery (${tableOrAddress ? `Address: ${tableOrAddress}` : 'DHA Phase 1, Lahore'})`
        : `🥡 Takeaway / Counter Pickup`;

    const itemsSummary = orderItems
      .map(
        (it) =>
          `• ${it.quantity}x ${it.name} [${it.category}] — Rs ${it.unitPrice} each = Rs ${
            it.unitPrice * it.quantity
          }`
      )
      .join('\n');

    return `☕ *CHAI AVENUE DHA PHASE 1 — ORDER*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *Order ID:* #${orderId || 'CA-8800'}
📅 *Date:* ${new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}

👤 *CUSTOMER DETAILS:*
• *Name:* ${customerName.trim() || 'Valued Guest'}
• *WhatsApp Number:* ${customerPhone.trim() || 'Not specified'}
• *Order Service:* ${modeLabel}

🍽️ *ITEMS ORDERED:*
${itemsSummary}

━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL AMOUNT:* Rs ${total}
${effectiveBudget ? `🎯 *Budget Target:* ${effectiveBudget}` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ *AI Sommelier Pairing Note:*
"${result?.sommelierTip || 'Specially paired for flavor harmony and authentic comfort.'}"

${specialNotes.trim() ? `📝 *Special Instructions:*\n${specialNotes.trim()}\n\n` : ''}📍 *Chai Avenue:* Plaza #15, Sector L, DHA Phase 1, Lahore
📞 *Direct Phone / WhatsApp:* 0322 8800128
_Thank you for ordering with Chai Avenue!_`;
  };

  const handleSendToChaiAvenue = () => {
    const text = generateReceiptText();
    const url = `https://wa.me/${CHAI_AVENUE_WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setActiveView('order_sent');
  };

  const handleSendToMyWhatsApp = () => {
    if (!customerPhone.trim()) {
      alert('Please enter your WhatsApp number first to receive your order receipt.');
      return;
    }
    const cleanNumber = formatCleanPhone(customerPhone);
    const text = generateReceiptText();
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setActiveView('order_sent');
  };

  const handleCopyReceipt = () => {
    const text = generateReceiptText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#181818] border border-[#2D2D2D] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#282828] flex items-center justify-between bg-[#151515]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F4B62F]/10 border border-[#F4B62F]/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#F4B62F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#F6F0D8] tracking-wide">
                  Chai Avenue Sommelier
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4B62F]/10 text-[#F4B62F] font-mono font-semibold border border-[#F4B62F]/20">
                  Budget & WhatsApp
                </span>
              </div>
              <p className="text-[11px] text-[#A89E88] tracking-wider uppercase font-medium">
                {activeView === 'sommelier'
                  ? 'Gemini Powered · Flavor & Pairing Concierge'
                  : 'Place Order · Instant Professional WhatsApp Receipt'}
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
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {activeView === 'sommelier' && (
            <>
              {/* Budget Selector */}
              <div className="p-3.5 bg-[#141414] border border-[#292929] rounded-sm space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase tracking-widest text-[#D99A20] font-semibold flex items-center gap-1.5">
                    <span>1. Set Your Budget</span>
                    <span className="text-[10px] text-[#777777] font-normal normal-case">
                      (Sommelier will tailor pairings to fit)
                    </span>
                  </label>
                  {selectedBudget && (
                    <span className="text-[11px] font-mono text-[#F4B62F] bg-[#F4B62F]/10 px-2 py-0.5 rounded border border-[#F4B62F]/20">
                      Target: {getEffectiveBudget()}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {budgetOptions.map((b) => {
                    const isSelected = selectedBudget === b.value;
                    return (
                      <button
                        key={b.label}
                        type="button"
                        onClick={() => setSelectedBudget(b.value)}
                        className={`text-xs px-3 py-1.5 rounded-sm border transition-all ${
                          isSelected
                            ? 'bg-[#F4B62F] text-[#111111] font-bold border-[#F4B62F] shadow-sm'
                            : 'bg-[#1E1E1E] text-[#D8CFB8] border-[#333333] hover:border-[#F4B62F]/50 hover:text-[#F4B62F]'
                        }`}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>

                {selectedBudget === 'custom' && (
                  <div className="pt-2 flex items-center gap-2 animate-fade-in">
                    <span className="text-xs text-[#A89E88] font-mono">Rs</span>
                    <input
                      type="number"
                      placeholder="e.g. 750"
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      className="w-32 px-2.5 py-1.5 bg-[#0D0D0D] border border-[#444444] rounded text-xs text-[#F6F0D8] focus:outline-none focus:border-[#F4B62F]"
                    />
                    <span className="text-[11px] text-[#777777]">
                      Enter your maximum desired PKR spend
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Prompts */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#D99A20] font-semibold mb-2">
                  2. Choose your mood or craving:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickMoods.map((m, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(m.prompt);
                        handleAsk(m.prompt);
                      }}
                      className="text-xs px-3 py-1.5 bg-[#202020] hover:bg-[#2A2A2A] border border-[#333333] hover:border-[#F4B62F]/60 text-[#E8DFC7] hover:text-[#F4B62F] rounded-sm transition-all text-left"
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
                    placeholder="Ask about flavours, pairings, or cravings (e.g. Best chai with Lava Cake under Rs 800?)"
                    className="w-full px-4 py-3 bg-[#111111] border border-[#333333] rounded-sm text-sm text-[#F6F0D8] placeholder-[#777777] focus:outline-none focus:border-[#F4B62F] transition-colors"
                  />
                  <button
                    onClick={() => handleAsk()}
                    disabled={isLoading || !query.trim()}
                    className="px-4 py-3 bg-[#F4B62F] text-[#111111] font-semibold rounded-sm hover:bg-[#D99A20] disabled:opacity-50 transition-all flex items-center justify-center shrink-0"
                    title="Get Pairings"
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
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F4B62F]">
                      <Coffee className="w-4 h-4 text-[#F4B62F]" />
                      Sommelier Recommendation
                    </div>
                    {result.budgetStatus && (
                      <span className="text-[11px] font-medium text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-0.5 rounded-full">
                        {result.budgetStatus}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#F6F0D8] leading-relaxed">
                    {result.recommendation}
                  </p>

                  {/* Pairings */}
                  {result.pairings && result.pairings.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-[#262626]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#A89E88]">
                          Curated Pairings:
                        </span>
                        {result.totalPrice && (
                          <span className="text-xs font-mono font-bold text-[#F4B62F]">
                            Pairing Total: {result.totalPrice}
                          </span>
                        )}
                      </div>

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

                  {/* PROMINENT ORDER VIA WHATSAPP CTA */}
                  <div className="pt-2">
                    <button
                      onClick={handleProceedToOrder}
                      className="w-full py-3 px-4 bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20BA5A] hover:to-[#18A850] text-white font-bold rounded-sm shadow-lg flex items-center justify-center gap-2.5 transition-all text-xs sm:text-sm uppercase tracking-wider focus:outline-none"
                    >
                      <MessageCircle className="w-5 h-5 shrink-0" />
                      <span>Place Order via WhatsApp & Receive Receipt</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                    <p className="text-[11px] text-center text-[#888888] mt-1.5">
                      Receive an itemized digital receipt directly on your WhatsApp number
                    </p>
                  </div>
                </div>
              )}

              {!result && !isLoading && (
                <div className="text-center py-6 text-[#777777] text-xs leading-relaxed">
                  <ChaiAvenueLogo variant="icon" className="w-10 h-10 mx-auto opacity-40 mb-2" />
                  Select a budget or craving above. The Sommelier will recommend authentic pairing items and generate a formatted WhatsApp order receipt for you.
                </div>
              )}
            </>
          )}

          {/* VIEW: ORDER FORM */}
          {activeView === 'order_form' && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#282828]">
                <button
                  onClick={() => setActiveView('sommelier')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#A89E88] hover:text-[#F4B62F] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sommelier
                </button>
                <span className="text-xs font-mono text-[#F4B62F]">
                  Order ID: #{orderId}
                </span>
              </div>

              {/* Order Items List */}
              <div className="p-4 bg-[#141414] border border-[#282828] rounded-sm space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#D99A20] block">
                  Items from Your Pairing:
                </span>
                <div className="space-y-2">
                  {orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 bg-[#1B1B1B] border border-[#2B2B2B] rounded text-xs"
                    >
                      <div>
                        <div className="font-semibold text-[#F6F0D8]">{item.name}</div>
                        <div className="text-[11px] text-[#888888]">
                          Rs {item.unitPrice} each
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-[#333333] rounded bg-[#111111]">
                          <button
                            onClick={() => updateItemQuantity(idx, -1)}
                            className="p-1 hover:text-[#F4B62F] text-[#888888]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono font-bold text-[#F6F0D8]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateItemQuantity(idx, 1)}
                            className="p-1 hover:text-[#F4B62F] text-[#888888]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="w-16 text-right font-mono font-semibold text-[#F4B62F]">
                          Rs {item.unitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#E8DFC7]">Grand Total:</span>
                  <span className="font-mono font-bold text-base text-[#F4B62F]">
                    Rs {calculateOrderTotal()}
                  </span>
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-3.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#D99A20] block">
                  Your Details (For Order Receipt):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#A89E88] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shoaib"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#111111] border border-[#333333] rounded text-xs text-[#F6F0D8] placeholder-[#666666] focus:outline-none focus:border-[#F4B62F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#A89E88] uppercase tracking-wider mb-1">
                      Your WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0322 8800128 or 0300..."
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#111111] border border-[#333333] rounded text-xs text-[#F6F0D8] placeholder-[#666666] focus:outline-none focus:border-[#F4B62F]"
                    />
                  </div>
                </div>

                {/* Dining Mode Selector */}
                <div>
                  <label className="block text-[11px] text-[#A89E88] uppercase tracking-wider mb-1.5">
                    Order Type:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dine_in', label: '☕ Dine-In' },
                      { id: 'takeaway', label: '🥡 Takeaway' },
                      { id: 'delivery', label: '🛵 Delivery' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setDiningMode(mode.id as any)}
                        className={`py-2 text-xs font-semibold rounded border transition-all ${
                          diningMode === mode.id
                            ? 'bg-[#F4B62F]/15 border-[#F4B62F] text-[#F4B62F]'
                            : 'bg-[#151515] border-[#2E2E2E] text-[#AAAAAA] hover:text-[#F6F0D8]'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table or Address depending on mode */}
                <div>
                  <label className="block text-[11px] text-[#A89E88] uppercase tracking-wider mb-1">
                    {diningMode === 'dine_in'
                      ? 'Table Number (Optional)'
                      : diningMode === 'delivery'
                      ? 'Delivery Address (DHA Phase 1 & surrounding) *'
                      : 'Pickup Time / Contact Preference'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      diningMode === 'dine_in'
                        ? 'e.g. Table 4 (or leave blank if entering now)'
                        : diningMode === 'delivery'
                        ? 'e.g. House 45, Street 8, Sector L, DHA Phase 1'
                        : 'e.g. Ready in 20 minutes'
                    }
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-[#111111] border border-[#333333] rounded text-xs text-[#F6F0D8] placeholder-[#666666] focus:outline-none focus:border-[#F4B62F]"
                  />
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-[11px] text-[#A89E88] uppercase tracking-wider mb-1">
                    Special Instructions (Sweetness, Temperature, Dietary):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra hot chai, low sugar in Zafrani, napkins included"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[#111111] border border-[#333333] rounded text-xs text-[#F6F0D8] placeholder-[#666666] focus:outline-none focus:border-[#F4B62F]"
                  />
                </div>
              </div>

              {/* WhatsApp Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Option 1: Send to Chai Avenue */}
                  <button
                    type="button"
                    onClick={handleSendToChaiAvenue}
                    disabled={orderItems.length === 0}
                    className="w-full py-3 px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-sm shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all focus:outline-none disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send to Chai Avenue</span>
                  </button>

                  {/* Option 2: Receive on My WhatsApp */}
                  <button
                    type="button"
                    onClick={handleSendToMyWhatsApp}
                    disabled={orderItems.length === 0}
                    className="w-full py-3 px-3 bg-[#1F2937] hover:bg-[#374151] border border-[#4B5563] text-[#F6F0D8] font-bold rounded-sm shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all focus:outline-none disabled:opacity-50"
                  >
                    <Phone className="w-4 h-4 text-[#25D366]" />
                    <span>Receive on My WhatsApp</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="w-full py-2 px-3 bg-[#161616] hover:bg-[#222222] border border-[#333333] text-[#CCCCCC] hover:text-[#F4B62F] font-medium rounded-sm flex items-center justify-center gap-2 text-xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#22C55E]" />
                      <span className="text-[#22C55E] font-semibold">
                        Receipt Copied to Clipboard!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Formatted WhatsApp Receipt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Formatted WhatsApp Receipt Preview */}
              <div className="p-3.5 bg-[#0D0D0D] border border-[#222222] rounded text-[11px] font-mono text-[#A89E88] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#F4B62F] block mb-1">
                  Live WhatsApp Message Preview:
                </span>
                {generateReceiptText()}
              </div>
            </div>
          )}

          {/* VIEW: ORDER SENT CONFIRMATION */}
          {activeView === 'order_sent' && (
            <div className="py-6 px-4 text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-lg font-bold text-[#F6F0D8]">
                  WhatsApp Order Dispatched!
                </h4>
                <p className="text-xs text-[#A89E88] max-w-md mx-auto">
                  Your order receipt <span className="text-[#F4B62F] font-mono font-bold">#{orderId}</span> has been structured for WhatsApp.
                </p>
              </div>

              <div className="p-4 bg-[#141414] border border-[#282828] rounded max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#888888]">Customer:</span>
                  <span className="text-[#F6F0D8] font-medium">{customerName || 'Valued Guest'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">WhatsApp:</span>
                  <span className="text-[#F6F0D8] font-mono">{customerPhone || '0322 8800128'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Total Amount:</span>
                  <span className="text-[#F4B62F] font-mono font-bold">Rs {calculateOrderTotal()}</span>
                </div>
                <div className="flex justify-between border-t border-[#222222] pt-2">
                  <span className="text-[#888888]">Chai Avenue Branch:</span>
                  <span className="text-[#E8DFC7]">DHA Phase 1, Lahore</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="px-4 py-2 bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-semibold text-[#E8DFC7] rounded transition-all flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy Receipt'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('sommelier')}
                  className="px-4 py-2 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold rounded transition-all"
                >
                  Order Something Else
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#242424] bg-[#141414] flex justify-between items-center">
          <div className="text-[11px] text-[#888888] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#F4B62F]" />
            <span>Chai Avenue Hotline: 0322 8800128</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#E8DFC7] hover:text-[#F4B62F] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
