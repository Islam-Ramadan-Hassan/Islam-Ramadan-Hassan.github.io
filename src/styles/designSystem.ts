/**
 * Centralized Design System Tokens — "From Data to Decisions"
 * Modern Data Intelligence × Refined Egyptian Heritage
 *
 * Single source of truth for container geometry, surfaces, WCAG 2.2 AA text tokens,
 * interaction transitions, and non-blocking motion parameters.
 */

export const CONTAINER_GEOMETRY = {
  outerGutter: 'px-3 sm:px-5 lg:px-8',
  maxWidth: 'max-w-[1360px] mx-auto',
  horizontalPadding: 'px-5 sm:px-10 lg:px-14 xl:px-16',
  innerRail: 'max-w-[1232px] mx-auto',
  radius: 'rounded-[24px] sm:rounded-[32px]',
} as const;

export const SECTION_PADDING = {
  hero: 'pt-10 sm:pt-12 lg:pt-14 xl:pt-16 pb-10 sm:pb-12 lg:pb-14 xl:pb-16',
  standard: 'py-14 sm:py-16 lg:py-20',
  footer: 'pt-14 sm:pt-16 lg:pt-20 pb-10 sm:pb-12',
} as const;

export const MOTION_TOKENS = {
  ease: [0.16, 1, 0.3, 1] as const,
  duration: {
    micro: 0.18,
    standard: 0.28,
    reveal: 0.34,
  },
  viewport: {
    once: true,
    amount: 'some' as const,
  },
  /**
   * Non-blocking reveal offset: keeps content immediately readable even before
   * scroll intersection settles, while providing a crisp settling lift.
   */
  revealInitial: { opacity: 0.86, y: 10 },
  revealAnimate: { opacity: 1, y: 0 },
} as const;

export const INTERACTION_CLASSES = {
  touchTarget: 'min-h-[44px]',
  iconTouchTarget: 'w-11 h-11',
  primaryButton:
    'inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[48px] bg-[#C49A52] text-[#101820] hover:bg-[#D4AE6A] active:scale-[0.985] font-semibold text-sm tracking-wide rounded-xl transition-[background-color,transform,color] duration-200 hover:-translate-y-0.5 whitespace-nowrap',
  secondaryDarkButton:
    'inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[48px] border border-[#D9C4A0]/35 bg-[#142B40]/55 text-[#F6F1E8] hover:border-[#C49A52] hover:bg-[#142B40] hover:text-[#C49A52] active:scale-[0.985] font-medium text-sm tracking-wide rounded-xl transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 whitespace-nowrap',
  cardHoverDark: 'card-hover-lift-dark',
  cardHoverIvory: 'card-hover-lift-ivory',
  cardHoverSkill: 'card-hover-lift-skill',
} as const;
