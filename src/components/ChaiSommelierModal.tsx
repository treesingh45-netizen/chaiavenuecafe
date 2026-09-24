import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Coffee,
  Bike,
  Check,
  CheckCircle2,
  Copy,
  Plus,
  Minus,
  MapPin,
  Phone,
  User,
  FileText,
  MessageCircle,
  Receipt,
  UtensilsCrossed,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

export interface ChaiSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialItem?: string;
  onSelectMenuItem?: (itemId: string) => void;
}

export interface OrderBagItem {
  name: string;
  category: string;
  unitPrice: number;
  quantity: number;
}

const CHAI_AVENUE_WHATSAPP = '923228800128';

// Curated quick-add favorites
const QUICK_FAVORITES = [
  { name: 'Karak Chai', category: 'Traditional Chai', price: 140 },
  { name: 'Zafrani Chai', category: 'Traditional Chai', price: 200 },
  { name: 'Special Doodh Patti', category: 'Traditional Chai', price: 200 },
  { name: 'Caffe Latte', category: 'Espresso Bar', price: 340 },
  { name: 'Caffe Mocha', category: 'Espresso Bar', price: 350 },
  { name: 'Chocolate Lava Cake', category: 'Pastry Lab', price: 450 },
  { name: 'Banana Walnut Loaf', category: 'Pastry Lab', price: 280 },
  { name: 'Nutellicious Pancake', category: 'Pastry Lab', price: 420 },
  { name: 'Chicken Crispy Tenders', category: 'Savory & Bites', price: 380 },
  { name: 'Tex Mex Fries', category: 'Savory & Bites', price: 250 },
  { name: 'Oreo Chocolate Shake', category: 'Indulgent Shakes', price: 320 },
  { name: 'Strawberry Banana Smoothie', category: 'Fresh Smoothies', price: 320 },
];

// Quick Budget Combos
const BUDGET_COMBOS = [
  {
    title: 'Comfort Under Rs 500',
    description: 'Karak Chai + Banana Walnut Loaf',
    totalPrice: 420,
    items: [
      { name: 'Karak Chai', category: 'Chai', unitPrice: 140, quantity: 1 },
      { name: 'Banana Walnut Loaf', category: 'Pastry Lab', unitPrice: 280, quantity: 1 },
    ],
  },
  {
    title: 'Indulgence Under Rs 700',
    description: 'Zafrani Chai + Chocolate Lava Cake',
    totalPrice: 650,
    items: [
      { name: 'Zafrani Chai', category: 'Chai', unitPrice: 200, quantity: 1 },
      { name: 'Chocolate Lava Cake', category: 'Pastry Lab', unitPrice: 450, quantity: 1 },
    ],
  },
  {
    title: 'Espresso & Savory Under Rs 650',
    description: 'Caffe Latte + Tex Mex Fries',
    totalPrice: 590,
    items: [
      { name: 'Caffe Latte', category: 'Coffee', unitPrice: 340, quantity: 1 },
      { name: 'Tex Mex Fries', category: 'Savory', unitPrice: 250, quantity: 1 },
    ],
  },
];

export const ChaiSommelierModal: React.FC<ChaiSommelierModalProps> = ({
  isOpen,
  onClose,
  initialItem = '',
}) => {
  const [orderItems, setOrderItems] = useState<OrderBagItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [diningMode, setDiningMode] = useState<'dine_in' | 'takeaway' | 'delivery'>('dine_in');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Initialize order ID
  useEffect(() => {
    if (isOpen && !orderId) {
      setOrderId(`CA-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  }, [isOpen, orderId]);

  // If opened with initialItem, add it automatically
  useEffect(() => {
    if (initialItem && isOpen) {
      const match = MENU_ITEMS.find(
        (m) => m.name.toLowerCase() === initialItem.toLowerCase()
      );
      if (match) {
        addItemToBag({
          name: match.name,
          category: match.categoryLabel || 'Chai Avenue',
          unitPrice: match.price,
        });
      }
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const addItemToBag = (item: { name: string; category: string; unitPrice: number }) => {
    setOrderItems((prev) => {
      const existingIdx = prev.findIndex((it) => it.name === item.name);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + 1,
        };
        return next;
      }
      return [
        ...prev,
        {
          name: item.name,
          category: item.category,
          unitPrice: item.unitPrice,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setOrderItems((prev) => {
      return prev
        .map((it) => {
          if (it.name === name) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as OrderBagItem[];
    });
  };

  const applyCombo = (combo: typeof BUDGET_COMBOS[0]) => {
    setOrderItems(combo.items);
  };

  const clearBag = () => {
    setOrderItems([]);
  };

  const calculateTotal = (): number => {
    return orderItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
  };

  const formatCleanPhone = (phone: string): string => {
    let clean = phone.replace(/[\s\-\(\)\+]/g, '');
    if (clean.startsWith('0')) {
      clean = '92' + clean.slice(1);
    }
    return clean;
  };

  // Clean, professional receipt text with NO emojis
  const generateReceiptText = (): string => {
    const total = calculateTotal();
    const serviceLabel =
      diningMode === 'dine_in'
        ? `Dine-In (${tableOrAddress ? `Table: ${tableOrAddress}` : 'Table to be assigned'})`
        : diningMode === 'delivery'
        ? `Delivery (${tableOrAddress ? `Address: ${tableOrAddress}` : 'DHA Phase 1, Lahore'})`
        : 'Takeaway / Pickup';

    const itemsSummary = orderItems
      .map(
        (it) =>
          `* ${it.quantity}x ${it.name} [${it.category}] - Rs ${it.unitPrice} each = Rs ${
            it.unitPrice * it.quantity
          }`
      )
      .join('\n');

    return `[CHAI AVENUE DHA PHASE 1 - ORDER]
----------------------------------------
Order ID: #${orderId || 'CA-8800'}
Date: ${new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}

CUSTOMER DETAILS:
* Name: ${customerName.trim() || 'Valued Guest'}
* WhatsApp: ${customerPhone.trim() || 'Not specified'}
* Service: ${serviceLabel}

ITEMS ORDERED:
${itemsSummary || '* No items in bag'}

----------------------------------------
TOTAL AMOUNT: Rs ${total}
----------------------------------------
${specialNotes.trim() ? `Special Instructions:\n${specialNotes.trim()}\n\n` : ''}Chai Avenue: Plaza #15, Sector L, DHA Phase 1, Lahore
Direct Phone / WhatsApp: 0322 8800128
Thank you for ordering with Chai Avenue!`;
  };

  const handleSendToChaiAvenue = () => {
    const text = generateReceiptText();
    const url = `https://wa.me/${CHAI_AVENUE_WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsSent(true);
  };

  const handleSendToMyWhatsApp = () => {
    if (!customerPhone.trim()) {
      return;
    }
    const cleanNum = formatCleanPhone(customerPhone);
    const text = generateReceiptText();
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsSent(true);
  };

  const handleCopyReceipt = () => {
    const text = generateReceiptText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filter items for quick selector
  const filteredQuickItems =
    selectedCategory === 'all'
      ? QUICK_FAVORITES
      : selectedCategory === 'chai'
      ? QUICK_FAVORITES.filter((i) => i.category.includes('Chai'))
      : selectedCategory === 'coffee'
      ? QUICK_FAVORITES.filter((i) => i.category.includes('Espresso') || i.category.includes('Coffee'))
      : selectedCategory === 'desserts'
      ? QUICK_FAVORITES.filter((i) => i.category.includes('Pastry'))
      : QUICK_FAVORITES.filter((i) => i.category.includes('Savory') || i.category.includes('Shake') || i.category.includes('Smoothie'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#141414] border border-[#2B2B2B] rounded-xl shadow-2xl overflow-hidden my-4">
        
        {/* Header: Pure brand with ShoppingBag icon, NO AI/Gemini */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#242424] bg-[#181818]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#222222] border border-[#F4B62F]/50 flex items-center justify-center text-[#F4B62F] shrink-0">
              <ShoppingBag className="w-5 h-5 text-[#F4B62F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F6F0D8] tracking-wide">
                  Chai Avenue Order Bag
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4B62F]/15 text-[#F4B62F] font-mono font-semibold border border-[#F4B62F]/30">
                  #{orderId}
                </span>
              </div>
              <p className="text-xs text-[#A89E88] mt-0.5">
                Plaza #15, Sector L, DHA Phase 1, Lahore · Direct WhatsApp Order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-[#F6F0D8] rounded-md hover:bg-[#252525] transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[76vh] overflow-y-auto">
          
          {isSent ? (
            /* Order Sent Confirmation View */
            <div className="py-8 px-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-[#25D366]" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-[#F6F0D8]">
                  WhatsApp Order Dispatched!
                </h4>
                <p className="text-xs text-[#A89E88] mt-1 max-w-md mx-auto">
                  Your order receipt <span className="text-[#F4B62F] font-mono font-bold">#{orderId}</span> has been transferred to WhatsApp.
                </p>
              </div>

              <div className="p-4 bg-[#181818] border border-[#282828] rounded-lg max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#888888]">Customer:</span>
                  <span className="text-[#F6F0D8] font-medium">{customerName || 'Valued Guest'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">WhatsApp:</span>
                  <span className="text-[#F6F0D8] font-mono">{customerPhone || '0322 8800128'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">Service:</span>
                  <span className="text-[#F6F0D8] capitalize">{diningMode.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between border-t border-[#262626] pt-2">
                  <span className="text-[#888888]">Total Amount:</span>
                  <span className="text-[#F4B62F] font-mono font-bold text-sm">Rs {calculateTotal()}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] border border-[#3A3A3A] text-xs font-semibold text-[#E8DFC7] rounded transition-all flex items-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy Formatted Receipt'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-[#F4B62F] hover:bg-[#D99A20] text-[#111111] text-xs font-bold rounded transition-all"
                >
                  Edit or Add More Items
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* SECTION 1: Active Order Bag */}
              <div className="p-4 bg-[#181818] border border-[#2B2B2B] rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#F4B62F]" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#F6F0D8]">
                      Items in Your Bag ({orderItems.reduce((s, i) => s + i.quantity, 0)})
                    </span>
                  </div>
                  {orderItems.length > 0 && (
                    <button
                      onClick={clearBag}
                      className="text-[11px] text-[#888888] hover:text-[#EF4444] transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Clear Bag
                    </button>
                  )}
                </div>

                {orderItems.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#888888] border border-dashed border-[#2E2E2E] rounded-md">
                    <ShoppingBag className="w-7 h-7 mx-auto text-[#444444] mb-2" />
                    Your bag is empty. Pick items or tap a combo below to start.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {orderItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2.5 bg-[#1F1F1F] border border-[#2D2D2D] rounded-md text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-semibold text-[#F6F0D8] truncate">{item.name}</div>
                          <div className="text-[11px] text-[#888888]">
                            Rs {item.unitPrice} each · {item.category}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center border border-[#333333] rounded bg-[#141414]">
                            <button
                              onClick={() => updateQuantity(item.name, -1)}
                              className="p-1 hover:text-[#F4B62F] text-[#888888]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono font-bold text-[#F6F0D8]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.name, 1)}
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

                    <div className="pt-3 border-t border-[#2B2B2B] flex items-center justify-between text-sm">
                      <span className="font-semibold text-[#E8DFC7]">Grand Total:</span>
                      <span className="font-mono font-bold text-base text-[#F4B62F]">
                        Rs {calculateTotal()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: 1-Click Budget Combos */}
              <div className="space-y-2.5">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#D99A20] block">
                  Quick Combos (1-Tap Selection):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {BUDGET_COMBOS.map((combo) => (
                    <button
                      key={combo.title}
                      onClick={() => applyCombo(combo)}
                      type="button"
                      className="p-3 bg-[#181818] hover:bg-[#202020] border border-[#2B2B2B] hover:border-[#F4B62F]/60 rounded-lg text-left transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
                          {combo.title}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#F4B62F]">
                          Rs {combo.totalPrice}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#888888] leading-tight">
                        {combo.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECTION 3: Quick Add Menu Items */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#D99A20]">
                    Quick Add to Bag:
                  </span>
                  {/* Category filters */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'chai', label: 'Chai' },
                      { id: 'coffee', label: 'Coffee' },
                      { id: 'desserts', label: 'Pastry Lab' },
                      { id: 'more', label: 'Savory & Shakes' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-sm uppercase tracking-wider transition-colors ${
                          selectedCategory === cat.id
                            ? 'bg-[#F4B62F] text-[#111111] font-bold'
                            : 'bg-[#1D1D1D] text-[#888888] hover:text-[#F6F0D8]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredQuickItems.map((item) => {
                    const inBag = orderItems.find((it) => it.name === item.name);
                    return (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2.5 bg-[#181818] border border-[#282828] rounded-md text-xs hover:border-[#383838] transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-medium text-[#F6F0D8] truncate">{item.name}</div>
                          <div className="text-[11px] text-[#F4B62F] font-mono">
                            Rs {item.price}
                          </div>
                        </div>

                        {inBag ? (
                          <div className="flex items-center gap-1 border border-[#F4B62F]/40 rounded bg-[#141414] px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.name, -1)}
                              className="px-1 text-[#F4B62F] hover:text-white"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono px-1 font-bold text-[#F4B62F]">
                              {inBag.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.name, 1)}
                              className="px-1 text-[#F4B62F] hover:text-white"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              addItemToBag({
                                name: item.name,
                                category: item.category,
                                unitPrice: item.price,
                              })
                            }
                            className="px-2.5 py-1 bg-[#252525] hover:bg-[#F4B62F] hover:text-[#111111] text-[#E8DFC7] rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            Add
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: Customer Details & Dining Mode (NO EMOJIS - Only Lucide Icons) */}
              <div className="p-4 bg-[#181818] border border-[#2B2B2B] rounded-lg space-y-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#D99A20] block">
                  Customer & Order Details:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] text-[#A89E88] uppercase tracking-wider mb-1 font-medium">
                      <User className="w-3.5 h-3.5 text-[#F4B62F]" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Shoaib"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#121212] border border-[#333333] rounded text-xs text-[#F6F0D8] placeholder-[#666666] focus:outline-none focus:border-[#F4B62F]"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-[11px] text-[#A89E88] uppercase tracking-wider mb-1 font-medium">
                      <Phone className="w-3.5 h-3.5 text-[#F4B62F]" />
                      Your WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0322 8800128"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#121212] border border-[#333333] rounded text-xs text-[#F6F0D8] placeholder-[#666666] focus:outline-none focus:border-[#F4B62F]"
                    />
                  </div>
                </div>

                {/* Service Mode Selector with SVG Icons (NO EMOJIS) */}
                <div>
                  <label className="block text-[11px] text-[#A89E88] uppercase tracking-wider mb-1.5 font-medium">
                    Service Mode:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDiningMode('dine_in')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md border flex items-center justify-center gap-2 transition-all ${
                        diningMode === 'dine_in'
                          ? 'bg-[#F4B62F]/15 border-[#F4B62F] text-[#F4B62F]'
                          : 'bg-[#151515] border-[#2E2E2E] text-[#AAAAAA] hover:text-[#F6F0D8]'
                      }`}
                    >
                      <Coffee className="w-4 h-4 text-[#F4B62F]" />
                      <span>Dine-In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDiningMode('takeaway')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md border flex items-center justify-center gap-2 transition-all ${
                        diningMode === 'takeaway'
                          ? 'bg-[#F4B62F]/15 border-[#F4B62F] text-[#F4B62F]'
                          : 'bg-[#151515] border-[#2E2E2E] text-[#AAAAAA] hover:text-[#F6F0D8]'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 text-[#F4B62F]" />
                      <span>Takeaway</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDiningMode('delivery')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md border flex items-center justify-center gap-2 transition-all ${
                        diningMode === 'delivery'
                          ? 'bg-[#F4B62F]/15 border-[#F4B62F] text-[#F4B62F]'
                          : 'bg-[#151515] border-[#2E2E2E] text-[#AAAAAA] hover:text-[#F6F0D8]'
                      }`}
                    >
                      <Bike className="w-4 h-4 text-[#F4B62F]" />
                      <span>Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Table or Address depending on mode */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] text-[#A89E88] uppercase tracking-wider mb-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#F4B62F]" />
                    {diningMode === 'dine_in'
                      ? 'Table Number (Optional)'
                      : diningMode === 'delivery'
                      ? 'Delivery Address (DHA Phase 1 & Lahore)'
                      : 'Pickup Note'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      diningMode === 'dine_in'
                        ? 'e.g. Table 4 (or leave blank if ordering at counter)'
                        : diningMode === 'delivery'
                        ? 'e.g. House 45, Street 8, Sector L, DHA Phase 1'
                        : 'e.g. Ready in 15 minutes'
                    }
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#333333] rounded text-xs text-[#F6F0D8] placeholder-[#666666] focus:outline-none focus:border-[#F4B62F]"
                  />
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] text-[#A89E88] uppercase tracking-wider mb-1 font-medium">
                    <FileText className="w-3.5 h-3.5 text-[#F4B62F]" />
                    Special Instructions (Sweetness, Extra Hot, Packaging)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra hot chai, low sugar, extra napkins"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#333333] rounded text-xs text-[#F6F0D8] placeholder-[#666666] focus:outline-none focus:border-[#F4B62F]"
                  />
                </div>
              </div>

              {/* SECTION 5: WhatsApp Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Option 1: Send to Chai Avenue */}
                  <button
                    type="button"
                    onClick={handleSendToChaiAvenue}
                    disabled={orderItems.length === 0}
                    className="w-full py-3 px-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-md shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all focus:outline-none disabled:opacity-40"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order to Chai Avenue</span>
                  </button>

                  {/* Option 2: Receive on My WhatsApp */}
                  <button
                    type="button"
                    onClick={handleSendToMyWhatsApp}
                    disabled={orderItems.length === 0 || !customerPhone.trim()}
                    className="w-full py-3 px-3 bg-[#1F2937] hover:bg-[#374151] border border-[#4B5563] text-[#F6F0D8] font-bold rounded-md shadow-md flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all focus:outline-none disabled:opacity-40"
                  >
                    <Phone className="w-4 h-4 text-[#25D366]" />
                    <span>Receive on My WhatsApp</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleCopyReceipt}
                  className="w-full py-2 px-3 bg-[#181818] hover:bg-[#222222] border border-[#333333] text-[#CCCCCC] hover:text-[#F4B62F] font-medium rounded-md flex items-center justify-center gap-2 text-xs transition-colors"
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

              {/* SECTION 6: WhatsApp Message Preview (NO EMOJIS) */}
              <div className="p-3.5 bg-[#0D0D0D] border border-[#222222] rounded-md text-[11px] font-mono text-[#A89E88] whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#F4B62F] block mb-1">
                  Live Formatted WhatsApp Receipt Preview:
                </span>
                {generateReceiptText()}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#242424] bg-[#161616] flex justify-between items-center">
          <div className="text-[11px] text-[#888888] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#F4B62F]" />
            <span>Chai Avenue Hotline: 0322 8800128</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#E8DFC7] hover:text-[#F4B62F] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
