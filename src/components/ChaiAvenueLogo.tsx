import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon' | 'mark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ChaiAvenueLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'compact',
  size = 'md',
}) => {
  // Pure SVG icon mark (Cup with star & steam)
  const CupIcon = ({ iconClass = "w-9 h-9" }: { iconClass?: string }) => (
    <svg
      viewBox="0 0 160 140"
      className={`${iconClass} shrink-0`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Chai Avenue Cup Emblem"
    >
      {/* 3 Steam bars */}
      <rect x="68" y="2" width="7" height="24" rx="3.5" fill="#F4B62F" />
      <rect x="80" y="0" width="7" height="28" rx="3.5" fill="#F4B62F" />
      <rect x="92" y="5" width="7" height="21" rx="3.5" fill="#F4B62F" />

      {/* Teacup shape */}
      <path
        d="M20 38 C 20 38, 138 38, 138 38 C 132 86, 114 96, 79 96 C 44 96, 26 86, 20 38 Z"
        fill="#F4B62F"
      />

      {/* Cup handle */}
      <path
        d="M134 50 C 148 50, 154 62, 154 75 C 154 90, 142 98, 126 98 L 123 91 C 134 91, 143 85, 143 75 C 143 67, 138 60, 131 60 Z"
        fill="#F4B62F"
      />

      {/* 5-pointed Star inside the cup */}
      <polygon
        points="79,50 83,63 96,63 85,71 89,84 79,76 69,84 73,71 62,63 75,63"
        fill="#111111"
      />
    </svg>
  );

  // Decorative Golden Flourish (scroll ornament under logo)
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

  if (variant === 'icon' || variant === 'mark-only') {
    return <CupIcon iconClass={className || 'w-10 h-10'} />;
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <CupIcon iconClass="w-9 h-9" />
        <div className="flex flex-col text-left">
          <div className="font-serif tracking-[0.2em] font-semibold text-lg leading-none text-[#F6F0D8] group-hover:text-[#F4B62F] transition-colors">
            CHAI AVENUE
          </div>
          <span className="text-[9px] tracking-[0.25em] text-[#D99A20] uppercase font-medium mt-1">
            It only tastes expensive
          </span>
        </div>
      </div>
    );
  }

  // Full Brand Logo (as in the supplied logo photo: Emblem + CHAI AVENUE + Tagline + Flourish)
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      {/* Cup emblem */}
      <div className="mb-2">
        <CupIcon iconClass={size === 'xl' ? 'w-24 h-24' : size === 'lg' ? 'w-20 h-20' : 'w-16 h-16'} />
      </div>

      {/* Main serif wordmark */}
      <h1 className="font-serif tracking-[0.22em] text-[#F6F0D8] uppercase font-bold leading-[1.05] transition-colors">
        <span className="block text-3xl md:text-4xl tracking-[0.3em]">CHAI</span>
        <span className="block text-2xl md:text-3xl tracking-[0.24em] mt-0.5">AVENUE</span>
      </h1>

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
