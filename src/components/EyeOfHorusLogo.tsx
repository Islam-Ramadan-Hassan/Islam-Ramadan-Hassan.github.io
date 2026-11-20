import React from 'react';

export interface EyeOfHorusLogoProps {
  /** 'primary' pairs the Eye of Horus emblem with the personal wordmark; 'symbol' renders the standalone mark. */
  variant?: 'primary' | 'symbol';
  /** 'dark' renders Antique Gold (#C49A52) geometry on Midnight Navy (#142B40); 'light' renders Midnight Navy geometry with Antique Gold focal accent on Ivory/White. */
  theme?: 'dark' | 'light';
  /** Size preset calibrated for navigation headers and secondary placements. */
  size?: 'sm' | 'md' | 'lg';
  /** Optional brand tagline below the wordmark in primary lockup mode. */
  showTagline?: boolean;
  /** Optional accessible label for the Eye of Horus SVG mark; when omitted, the mark is treated as decorative. */
  ariaLabel?: string;
  className?: string;
}

const SYMBOL_SIZES = {
  sm: 'w-8 h-8',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
} as const;

/**
 * Minimalist geometric Eye of Horus (Wedjat) brand mark in Antique Gold (#C49A52)
 * and Midnight Navy (#142B40). Matches the exported optimized asset at /assets/eye-of-horus-logo.svg.
 */
export function EyeOfHorusMark({
  theme = 'dark',
  ariaLabel,
  className = 'w-8 h-8',
}: {
  theme?: 'dark' | 'light';
  ariaLabel?: string;
  className?: string;
}) {
  const isDark = theme === 'dark';

  const primaryStroke = isDark ? '#C49A52' : '#142B40';
  const accentStroke = '#C49A52';
  const innerFill = isDark ? '#142B40' : '#F6F1E8';

  return (
    <svg
      viewBox="4 8 40 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      focusable="false"
      className={`transition-[opacity,filter] duration-[var(--duration-micro)] group-hover/brand:brightness-115 ${className}`}
    >
      {ariaLabel && <title>{ariaLabel}</title>}

      {/* Minimalist Stepped Horus Brow */}
      <path
        d="M8 16.5L19.5 12H33L40 15.5"
        stroke={accentStroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Geometric Eye Aperture */}
      <path
        d="M7.5 24C12.8 18.2 19.8 16.4 26.8 17.4C32.2 18.2 36.4 20.8 39.5 24C35.5 28.2 30 30 23.8 30C17.4 30 11.8 27.9 7.5 24Z"
        fill={innerFill}
        stroke={primaryStroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Concentric Analytical Iris & Diamond Focal Core */}
      <circle
        cx="23.8"
        cy="23.7"
        r="4.8"
        fill={innerFill}
        stroke={primaryStroke}
        strokeWidth="1.8"
      />
      <path
        d="M23.8 21.1L26.4 23.7L23.8 26.3L21.2 23.7Z"
        fill={accentStroke}
      />

      {/* Vertical Wedjat Plumb Line & Sweeping Falcon Spiral */}
      <path
        d="M23.8 30V39.5"
        stroke={primaryStroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M28.4 29.6C31.2 32.8 34.4 35.6 38.4 35.8C40.6 35.9 41.6 34.2 40.3 32.8"
        stroke={accentStroke}
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EyeOfHorusLogo({
  variant = 'primary',
  theme = 'dark',
  size = 'md',
  showTagline = false,
  ariaLabel,
  className = '',
}: EyeOfHorusLogoProps) {
  const isDark = theme === 'dark';

  if (variant === 'symbol') {
    return (
      <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <EyeOfHorusMark theme={theme} ariaLabel={ariaLabel} className={SYMBOL_SIZES[size]} />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}>
      <EyeOfHorusMark
        theme={theme}
        ariaLabel={ariaLabel}
        className={SYMBOL_SIZES[size]}
      />

      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-[13px] min-[375px]:text-[14px] sm:text-[17px] font-bold tracking-[-0.02em] whitespace-nowrap transition-colors duration-[var(--duration-micro)] ${
            isDark
              ? 'text-[#F6F1E8] group-hover/brand:text-[#D9C4A0]'
              : 'text-[#142B40] group-hover/brand:text-[#7D5B22]'
          }`}
        >
          Islam Ramadan Hassan
        </span>
        {showTagline && (
          <span
            className={`font-body text-[10.5px] font-medium tracking-[0.08em] uppercase mt-1 ${
              isDark ? 'text-[#C49A52]' : 'text-[#4D5C6B]'
            }`}
          >
            From Data to Decisions
          </span>
        )}
      </span>
    </span>
  );
}
