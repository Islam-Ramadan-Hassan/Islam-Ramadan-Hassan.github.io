import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

/**
 * Minimal, thin Antique Gold horizontal reading progress bar anchored
 * to the top edge of the viewport across the entire portfolio.
 * Hidden on mobile (< md) to keep compact navigation uncluttered.
 */
export function ReadingProgressBar() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="hidden md:block fixed top-0 inset-x-0 z-[60] h-[2px] bg-[#C49A52]/12 pointer-events-none"
    >
      <motion.div
        style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
        className="h-full w-full origin-left bg-gradient-to-r from-[#C49A52]/85 via-[#C49A52] to-[#D9C4A0] shadow-[0_0_8px_rgba(196,154,82,0.35)]"
      />
    </div>
  );
}
