import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon' | 'badge' | 'cup' | 'mark-only' | 'official' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const OFFICIAL_LOGO_SRC = '/images/chai_avenue_official_logo.jpg';

// Official Chai Avenue Cup Mark (exact geometry matching the brand icon)
export const ChaiCupMark: React.FC<{ className?: string; color?: string }> = ({
  className = "w-10 h-10",
  color = "#F4B62F",
}) => (
  <svg
    viewBox="0 0 320 200"
    className={`${className} shrink-0`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Chai Avenue Cup Icon"
  >
    {/* Steam bar 1 (Left: shortest) */}
    <rect x="122" y="55" width="13" height="38" rx="6.5" fill={color} />
    {/* Steam bar 2 (Middle: tallest) */}
    <rect x="142" y="15" width="13" height="78" rx="6.5" fill={color} />
    {/* Steam bar 3 (Right: medium) */}
    <rect x="162" y="36" width="13" height="57" rx="6.5" fill={color} />

    {/* Cup body with cut-out 5-pointed star */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M 32 102
         C 32 99, 34 97, 37 97
         L 260 97
         C 263 97, 265 99, 265 102
         L 255 168
         C 255 171, 253 173, 250 173
         C 200 166, 97 166, 47 173
         C 44 173, 42 171, 42 168
         Z
         M 148.5 116
         L 153.2 129.8
         L 167.7 130.1
         L 156.1 138.8
         L 160.4 152.8
         L 148.5 144.5
         L 136.6 152.8
         L 140.9 138.8
         L 129.3 130.1
         L 143.8 129.8
         Z"
      fill={color}
    />

    {/* Cup handle (lower-right downward curve) */}
    <path
      d="M 256 142
         C 268 143, 282 153, 282 172
         C 282 184, 275 194, 266 195"
      stroke={color}
      strokeWidth="12"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const ChaiAvenueLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'compact',
  size = 'md',
}) => {
  // Standalone Cup Icon
  if (variant === 'cup' || variant === 'icon' || variant === 'mark-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <ChaiCupMark className="w-full h-full text-[#F4B62F]" />
      </div>
    );
  }

  // Circular or Rounded Logo Badge
  if (variant === 'badge') {
    const badgeSizes = {
      sm: 'w-14 h-14',
      md: 'w-20 h-20',
      lg: 'w-28 h-28',
      xl: 'w-36 h-36',
      '2xl': 'w-48 h-48',
    };
    return (
      <div className={`relative rounded-xl overflow-hidden shadow-2xl border border-[#F4B62F]/40 bg-[#111111] p-1.5 ${badgeSizes[size] || badgeSizes.md} ${className}`}>
        <img
          src={OFFICIAL_LOGO_SRC}
          alt="Chai Avenue Official Emblem"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    );
  }

  // Navbar Compact Brand Header
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Only the official cup icon housed in dark frame with gold border */}
        <div className="relative w-11 h-11 rounded-lg border border-[#F4B62F]/70 group-hover:border-[#F4B62F] shadow-md shrink-0 bg-[#141414] p-1.5 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <ChaiCupMark className="w-7 h-7 text-[#F4B62F]" />
        </div>
        <div className="flex flex-col text-left">
          <div className="font-serif tracking-[0.2em] font-bold text-lg leading-none text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
            CHAI AVENUE
          </div>
          <span className="text-[9px] tracking-[0.25em] text-[#D99A20] uppercase font-semibold mt-1">
            It only tastes expensive
          </span>
        </div>
      </div>
    );
  }

  // Official Full Image Logo (Exact requested image)
  const sizeClasses = {
    sm: 'max-w-[200px]',
    md: 'max-w-[280px]',
    lg: 'max-w-[360px]',
    xl: 'max-w-[480px]',
    '2xl': 'max-w-[560px]',
  };

  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <div className={`w-full ${sizeClasses[size] || sizeClasses.md} mx-auto rounded-2xl overflow-hidden border border-[#F4B62F]/30 bg-[#111111] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(244,182,47,0.15)] p-2.5 sm:p-3 transition-transform duration-300 hover:scale-[1.02]`}>
        <img
          src={OFFICIAL_LOGO_SRC}
          alt="Chai Avenue - It only tastes expensive"
          className="w-full h-auto object-contain rounded-xl"
        />
      </div>
    </div>
  );
};
