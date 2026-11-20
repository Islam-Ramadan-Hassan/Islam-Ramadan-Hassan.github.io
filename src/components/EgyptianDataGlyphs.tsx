import React from 'react';

interface GlyphProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Abstract Egyptian Glyph: DATA
 * Inspired by ancient Egyptian scribal record tablets & tiered tally columns.
 */
export function DataGlyphIcon({ className = 'w-4 h-4', ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Stepped scribal tablet silhouette */}
      <path d="M5.5 6.5L8 4H16L18.5 6.5V19.5H5.5V6.5Z" />
      {/* Structured record rows */}
      <path d="M8.75 9.5H15.25" />
      <path d="M8.75 13H12.75" />
      <path d="M8.75 16.5H15.25" />
      {/* Verified record diamond marker */}
      <polygon points="15.1,12.1 16,13 15.1,13.9 14.2,13" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Abstract Egyptian Glyph: ANALYSIS
 * Inspired by the Scales of Ma'at — precision balance, verification, and weighing evidence.
 */
export function AnalysisGlyphIcon({ className = 'w-4 h-4', ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Apex diamond */}
      <polygon points="12,3 13.4,4.4 12,5.8 10.6,4.4" fill="currentColor" stroke="none" />
      {/* Central plumb pillar & architectural base */}
      <path d="M12 5.8V19.5" />
      <path d="M8.25 19.5H15.75" />
      {/* Precision balance beam */}
      <path d="M4.75 8.75H19.25" />
      {/* Left & right geometric scale pans */}
      <path d="M6 8.75L4 13.5H8L6 8.75Z" />
      <path d="M18 8.75L16 13.5H20L18 8.75Z" />
    </svg>
  );
}

/**
 * Abstract Egyptian Glyph: INSIGHT
 * Inspired by the Akhet (horizon) glyph — the rising sun emerging between twin architectural peaks.
 */
export function InsightGlyphIcon({ className = 'w-4 h-4', ...props }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Solar disc of clarity */}
      <circle cx="12" cy="9.25" r="2.75" />
      {/* Minimalist cardinal illumination ticks */}
      <path d="M12 3.5V4.6" />
      <path d="M7.35 5.4L8.15 6.2" />
      <path d="M16.65 5.4L15.85 6.2" />
      {/* Twin horizon peaks */}
      <path d="M3.5 17.75L8.25 12.25L12 16L15.75 12.25L20.5 17.75" />
      {/* Grounded horizon line */}
      <path d="M3.5 20H20.5" />
    </svg>
  );
}
