import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon' | 'badge' | 'cup' | 'mark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Official Chai Avenue Cup Mark (exact geometry matching the user's uploaded icon)
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

// Decorative Golden Flourish
const GoldFlourish = () => (
  <svg
    viewBox="0 0 180 34"
    className="w-36 h-7 mx-auto text-[#F4B62F]"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="90" cy="12" r="3.5" />
    <circle cx="90" cy="24" r="2" />
    <path
      d="M 90 6 L 90 28 M 80 18 C 70 12, 60 10, 45 18 C 30 26, 20 16, 28 8 C 35 0, 50 12, 62 18 C 72 23, 85 20, 90 18 C 95 20, 108 23, 118 18 C 130 12, 145 0, 152 8 C 160 16, 150 26, 135 18 C 120 10, 110 12, 100 18"
      stroke="#F4B62F"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="28" cy="8" r="2" fill="#F4B62F" />
    <circle cx="152" cy="8" r="2" fill="#F4B62F" />
  </svg>
);

export const ChaiAvenueLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'compact',
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);
  const badgeSrc = '/images/chai_avenue_badge.svg';

  // Standalone Cup Icon (Image 2)
  if (variant === 'cup' || variant === 'icon' || variant === 'mark-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <ChaiCupMark className="w-full h-full text-[#F4B62F]" />
      </div>
    );
  }

  // Circular Logo Badge (Image 1)
  if (variant === 'badge') {
    const badgeSizes = {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32',
      xl: 'w-40 h-40',
    };
    return (
      <div className={`relative rounded-full overflow-hidden shadow-2xl ${badgeSizes[size]} ${className}`}>
        <img
          src={badgeSrc}
          alt="Chai Avenue Circular Emblem"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Navbar Compact Brand Header
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Cup icon housed in warm dark circular frame with gold ring */}
        <div className="relative w-11 h-11 rounded-full border border-[#F4B62F]/60 group-hover:border-[#F4B62F] shadow-lg shrink-0 bg-[#161616] p-1.5 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
          <ChaiCupMark className="w-8 h-8 text-[#F4B62F]" />
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

  // Full Brand Logo (Image 1 layout: Cup Icon + CHAI AVENUE + Tagline + Flourish)
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Cup icon at top */}
      <div className="mb-2">
        <ChaiCupMark
          className={
            size === 'xl'
              ? 'w-24 h-16'
              : size === 'lg'
              ? 'w-20 h-14'
              : 'w-16 h-11'
          }
        />
      </div>

      {/* Main serif wordmark */}
      <h2 className="font-serif tracking-[0.22em] text-[#F6F0D8] uppercase font-bold leading-[1.05] transition-colors">
        <span className="block text-3xl md:text-4xl tracking-[0.3em]">CHAI</span>
        <span className="block text-2xl md:text-3xl tracking-[0.24em] mt-0.5">AVENUE</span>
      </h2>

      {/* Tagline */}
      <p className="text-xs md:text-sm font-sans tracking-[0.18em] text-[#E8DFC7] mt-3 font-normal italic">
        It only tastes expensive
      </p>

      {/* Decorative Gold Flourish */}
      <div className="mt-2.5">
        <GoldFlourish />
      </div>
    </div>
  );
};
