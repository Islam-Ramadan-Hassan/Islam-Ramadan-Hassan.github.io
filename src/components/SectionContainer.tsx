import React from 'react';
import { CONTAINER_GEOMETRY, SECTION_PADDING } from '../styles/designSystem';

export { CONTAINER_GEOMETRY };

export type SectionSurface = 'hero' | 'ivory' | 'parchment' | 'midnight' | 'charcoal';
export type SectionPadding = keyof typeof SECTION_PADDING;

interface SectionContainerProps {
  id: string;
  surface: SectionSurface;
  padding?: SectionPadding;
  as?: 'section' | 'footer';
  showConnector?: boolean;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

const SURFACE_STYLES: Record<SectionSurface, string> = {
  hero: 'bg-[#101820] text-[#F6F1E8] border border-[#C49A52]/22 surface-shadow-dark',
  ivory: 'bg-[#F8F4EC] text-[#101820] border border-[#142B40]/10 surface-shadow-light',
  parchment: 'bg-[#EFE8DC] text-[#101820] border border-[#142B40]/12 surface-shadow-sand',
  midnight: 'bg-[#111E2B] text-[#F6F1E8] border border-[#C49A52]/24 surface-shadow-dark',
  charcoal: 'bg-[#101820] text-[#F6F1E8] border border-[#C49A52]/20 surface-shadow-dark',
};

const SURFACE_ATMOSPHERE: Record<SectionSurface, string> = {
  hero: 'bg-[radial-gradient(ellipse_at_74%_36%,rgba(25,52,77,0.88)_0%,rgba(16,24,32,0.97)_62%,#101820_100%)]',
  ivory: 'bg-[radial-gradient(ellipse_at_15%_0%,rgba(255,255,255,0.65)_0%,rgba(248,244,236,0)_58%)]',
  parchment: 'bg-[radial-gradient(ellipse_at_85%_0%,rgba(248,244,236,0.45)_0%,rgba(239,232,220,0)_62%)]',
  midnight: 'bg-[radial-gradient(ellipse_at_20%_0%,rgba(25,52,77,0.68)_0%,rgba(17,30,43,0)_58%)]',
  charcoal: 'bg-[radial-gradient(ellipse_at_82%_18%,rgba(25,52,77,0.72)_0%,rgba(16,24,32,0.96)_60%,#101820_100%)]',
};

const TOP_HAIRLINE_STYLES: Record<SectionSurface, string> = {
  hero: 'via-[#C49A52]/45',
  ivory: 'via-[#C49A52]/32',
  parchment: 'via-[#7D5B22]/36',
  midnight: 'via-[#C49A52]/42',
  charcoal: 'via-[#C49A52]/38',
};

/**
 * Shared architectural chapter container driven directly by designSystem.ts tokens.
 * Enforces consistent outer viewport gutters, 1360px container max-width, 1232px inner rail,
 * standardized internal padding, distinct chapter surfaces, sticky-safe overflow-clip,
 * and a vertical chapter connector bridge.
 */
export function SectionContainer({
  id,
  surface,
  padding = 'standard',
  as = 'section',
  showConnector = false,
  className = '',
  innerClassName = '',
  children,
}: SectionContainerProps) {
  const Tag = as;
  const atmosphere = SURFACE_ATMOSPHERE[surface];

  return (
    <div className={CONTAINER_GEOMETRY.outerGutter}>
      {showConnector && (
        <div
          aria-hidden="true"
          className="flex flex-col items-center justify-center h-8 sm:h-10 lg:h-12 select-none"
        >
          <span className="w-px flex-1 bg-[#142B40]/18" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C49A52]/85 my-1 shrink-0" />
          <span className="w-px flex-1 bg-[#142B40]/18" />
        </div>
      )}

      <Tag
        id={id}
        className={`scroll-mt-24 relative ${CONTAINER_GEOMETRY.maxWidth} ${CONTAINER_GEOMETRY.radius} overflow-clip ${SURFACE_STYLES[surface]} ${className}`}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none ${atmosphere}`}
        />
        <div
          aria-hidden="true"
          className={`absolute top-0 inset-x-10 sm:inset-x-16 h-px bg-gradient-to-r from-transparent ${TOP_HAIRLINE_STYLES[surface]} to-transparent pointer-events-none z-20`}
        />

        <div
          className={`relative z-10 ${CONTAINER_GEOMETRY.horizontalPadding} ${SECTION_PADDING[padding]}`}
        >
          <div className={`${CONTAINER_GEOMETRY.innerRail} ${innerClassName}`}>{children}</div>
        </div>
      </Tag>
    </div>
  );
}
