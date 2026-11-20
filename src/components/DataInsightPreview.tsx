import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MOTION_TOKENS } from '../styles/designSystem';

interface InsightStage {
  id: string;
  step: string;
  label: string;
  description: string;
  chartFocusLabel: string;
  tooltipCue: string;
  tooltipDetail: string;
}

const INSIGHT_STAGES: readonly InsightStage[] = [
  {
    id: 'finding',
    step: '01',
    label: 'Finding',
    description: 'Identify a meaningful pattern in business data.',
    chartFocusLabel: 'Signal cluster identified across observations',
    tooltipCue: 'Pattern Detection',
    tooltipDetail:
      'Separate meaningful shifts from everyday noise to spot where performance changes.',
  },
  {
    id: 'analysis',
    step: '02',
    label: 'Analysis',
    description: 'Investigate trends and validate the evidence.',
    chartFocusLabel: 'Trend trajectory checked against baseline variance',
    tooltipCue: 'Evidence Validation',
    tooltipDetail:
      'Test hypotheses against baseline context to verify what is driving the pattern.',
  },
  {
    id: 'visualization',
    step: '03',
    label: 'Visualization',
    description: 'Present the findings through clear charts and visuals.',
    chartFocusLabel: 'Underlying movement distilled into a clear visual arc',
    tooltipCue: 'Visual Clarity',
    tooltipDetail:
      'Strip away clutter so stakeholders immediately see the trajectory and key inflection.',
  },
  {
    id: 'business-meaning',
    step: '04',
    label: 'Business Meaning',
    description: 'Explain why the findings matter for business decisions.',
    chartFocusLabel: 'Key inflection translated into decision direction',
    tooltipCue: 'Decision Framing',
    tooltipDetail:
      'Connect the validated visual evidence to clear operational priorities and next steps.',
  },
] as const;

const OBSERVATION_POINTS = [
  { cx: 46, cy: 112 },
  { cx: 88, cy: 100 },
  { cx: 132, cy: 108 },
  { cx: 176, cy: 84 },
  { cx: 220, cy: 70 },
  { cx: 266, cy: 50 },
  { cx: 314, cy: 36 },
] as const;

const TREND_PATH =
  'M 46 112 C 74 104, 104 106, 132 104 C 160 102, 186 80, 220 70 C 252 60, 282 44, 314 36';

const CONFIDENCE_BAND_PATH =
  'M 46 98 C 74 90, 104 92, 132 88 C 160 84, 186 64, 220 55 C 252 46, 282 32, 314 24 L 314 50 C 282 58, 252 74, 220 84 C 186 96, 160 116, 132 118 C 104 120, 74 118, 46 124 Z';

const AREA_UNDER_PATH =
  'M 46 112 C 74 104, 104 106, 132 104 C 160 102, 186 80, 220 70 C 252 60, 282 44, 314 36 L 314 134 L 46 134 Z';

export function DataInsightPreview() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeStage = INSIGHT_STAGES[activeIndex];
  const overlayStage = tooltipIndex !== null ? INSIGHT_STAGES[tooltipIndex] : null;

  useEffect(() => {
    if (tooltipIndex === null) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTooltipIndex(null);
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [tooltipIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'Escape') {
      setTooltipIndex(null);
      return;
    }

    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % INSIGHT_STAGES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + INSIGHT_STAGES.length) % INSIGHT_STAGES.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = INSIGHT_STAGES.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      setActiveIndex(nextIndex);
      setTooltipIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const isFinding = activeIndex === 0;
  const isAnalysis = activeIndex === 1;
  const isVisualization = activeIndex === 2;
  const isBusinessMeaning = activeIndex === 3;

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.reveal,
        delay: prefersReducedMotion ? 0 : 0.16,
        ease: MOTION_TOKENS.ease,
      }}
      className="relative rounded-2xl border border-[#C49A52]/20 bg-[#101820]/78 font-body"
      aria-label="From Finding to Insight interactive conceptual process"
    >
      {/* Top Quiet Editorial Header */}
      <div className="px-5 sm:px-7 lg:px-9 py-4 border-b border-[#D9C4A0]/14 flex flex-wrap items-center justify-between gap-3 rounded-t-2xl">
        <div className="flex items-center gap-2.5 min-w-0">
          <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
          <h2 className="font-heading text-xs sm:text-[13px] font-semibold tracking-[0.04em] text-[#C49A52]">
            From Finding to Insight
          </h2>
        </div>
        <p className="text-xs font-medium text-[#D9C4A0]/85 tabular-nums shrink-0">
          Stage {activeStage.step} of 04
        </p>
      </div>

      {/* Connected 4-Stage Interactive Selector (Compact 2x2 on Mobile — Zero Horizontal Scroll, 4-Col Flow on Desktop) */}
      <div
        className="px-5 sm:px-7 lg:px-9 pt-5 pb-4 border-b border-[#D9C4A0]/12"
        onMouseLeave={() => setTooltipIndex(null)}
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className="hidden lg:block pointer-events-none absolute top-1/2 inset-x-12 h-px -translate-y-1/2 bg-gradient-to-r from-[#C49A52]/20 via-[#C49A52]/45 to-[#C49A52]/20"
          />
          <div
            role="tablist"
            aria-label="Analytical storytelling stages"
            className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3"
          >
            {INSIGHT_STAGES.map((stage, idx) => {
              const isActive = idx === activeIndex;
              const isCompleted = idx < activeIndex;
              const isTooltipOpen = tooltipIndex === idx;
              const alignRightOnDesktop = idx >= 2;

              return (
                <div key={stage.id} className="relative min-w-0">
                  <button
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    id={`insight-tab-${stage.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`insight-panel-${stage.id}`}
                    aria-describedby={isTooltipOpen ? `insight-tooltip-${stage.id}` : undefined}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => {
                      setActiveIndex(idx);
                      setTooltipIndex((prev) => (prev === idx ? null : idx));
                    }}
                    onMouseEnter={() => {
                      setActiveIndex(idx);
                      setTooltipIndex(idx);
                    }}
                    onFocus={() => {
                      setActiveIndex(idx);
                      setTooltipIndex(idx);
                    }}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                        setTooltipIndex((prev) => (prev === idx ? null : prev));
                      }
                    }}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`group/stage relative w-full min-w-0 text-left px-3 sm:px-4 py-3 rounded-xl border min-h-[56px] transition-[background-color,border-color,transform,box-shadow] duration-[var(--duration-micro)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:border-[#C49A52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] ${
                      isActive
                        ? 'bg-[#142B40] border-[#C49A52]/75 shadow-[0_12px_26px_-16px_rgba(196,154,82,0.5)]'
                        : 'bg-[#142B40]/38 border-[#D9C4A0]/14 hover:bg-[#142B40]/68 hover:border-[#C49A52]/48'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`font-heading text-[11px] font-semibold tabular-nums transition-colors duration-[var(--duration-micro)] ${
                          isActive || isCompleted ? 'text-[#C49A52]' : 'text-[#D9C4A0]/82'
                        }`}
                      >
                        {stage.step}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-1 rounded-full transition-[width,background-color] duration-[var(--duration-standard)] ${
                          isActive
                            ? 'w-7 bg-[#C49A52]'
                            : isCompleted
                              ? 'w-3.5 bg-[#C49A52]/55'
                              : 'w-2 bg-[#D9C4A0]/25 group-hover/stage:w-4 group-hover/stage:bg-[#C49A52]/65'
                        }`}
                      />
                    </div>
                    <p
                      className={`font-heading text-[13px] sm:text-sm font-semibold tracking-[-0.01em] leading-snug transition-colors duration-[var(--duration-micro)] ${
                        isActive
                          ? 'text-[#F6F1E8]'
                          : 'text-[#D9C4A0]/88 group-hover/stage:text-[#F6F1E8]'
                      }`}
                    >
                      {stage.label}
                    </p>
                  </button>

                  {/* WCAG 1.4.13 Hoverable & Escape-Dismissible Editorial Tooltip on Desktop */}
                  <AnimatePresence>
                    {isTooltipOpen && (
                      <motion.div
                        id={`insight-tooltip-${stage.id}`}
                        role="tooltip"
                        onMouseEnter={() => setTooltipIndex(idx)}
                        onMouseLeave={() => setTooltipIndex((prev) => (prev === idx ? null : prev))}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4, scale: 0.98 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 0.16,
                          ease: MOTION_TOKENS.ease,
                        }}
                        className={`hidden lg:block absolute bottom-full pb-2.5 z-30 w-64 ${
                          alignRightOnDesktop ? 'right-0' : 'left-0'
                        }`}
                      >
                        <div className="relative rounded-xl border border-[#C49A52]/45 bg-[#0D1A27]/96 backdrop-blur-md px-3.5 py-3 shadow-[0_18px_36px_-16px_rgba(0,0,0,0.78)]">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-heading text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#C49A52]">
                              {stage.tooltipCue}
                            </span>
                            <span className="font-heading text-[10.5px] font-semibold text-[#D9C4A0]/80 tabular-nums">
                              {stage.step} / 04
                            </span>
                          </div>
                          <p className="text-[12.5px] leading-[1.55] text-[#F6F1E8]/90">
                            {stage.tooltipDetail}
                          </p>
                          {/* Subtle Directional Pointer */}
                          <span
                            aria-hidden="true"
                            className={`absolute -bottom-1.5 w-2.5 h-2.5 rotate-45 bg-[#0D1A27] border-r border-b border-[#C49A52]/45 ${
                              alignRightOnDesktop ? 'right-6' : 'left-6'
                            }`}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Centerpiece Miniature Conceptual Visualization & Active Stage Narrative */}
      <div
        id={`insight-panel-${activeStage.id}`}
        role="tabpanel"
        aria-labelledby={`insight-tab-${activeStage.id}`}
        className="px-5 sm:px-7 lg:px-9 py-5 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center rounded-b-2xl"
      >
        {/* Left: Qualitative Explanation of Active Stage */}
        <motion.div
          key={activeStage.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.22,
            ease: MOTION_TOKENS.ease,
          }}
          className="lg:col-span-5 space-y-3 min-w-0"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-heading text-xs font-semibold text-[#C49A52] tabular-nums">
              {activeStage.step}
            </span>
            <span aria-hidden="true" className="w-5 h-px bg-[#C49A52]/65" />
            <h3 className="font-heading text-lg sm:text-xl font-bold tracking-[-0.02em] text-[#F6F1E8]">
              {activeStage.label}
            </h3>
          </div>

          <p className="text-sm sm:text-[15px] text-[#F6F1E8]/88 leading-[1.68] max-w-[44ch]">
            {activeStage.description}
          </p>

          <p className="pt-1 text-xs font-medium text-[#D9C4A0]/85 flex items-center gap-2">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#C49A52] shrink-0" />
            <span>{activeStage.chartFocusLabel}</span>
          </p>
        </motion.div>

        {/* Right: Clean Conceptual Miniature Chart Centerpiece + Subtle Contextual Detail Overlay */}
        <div className="lg:col-span-7">
          <div className="relative rounded-xl border border-[#D9C4A0]/14 bg-gradient-to-br from-[#142B40]/70 via-[#112233]/80 to-[#101820]/90 px-4 sm:px-5 pt-4 pb-3 overflow-hidden">
            {/* Compact Contextual Detail Overlay (Responds Smoothly to Stage Hover/Focus/Tap Across All Viewports) */}
            <AnimatePresence mode="wait">
              {overlayStage && (
                <motion.div
                  key={`overlay-${overlayStage.id}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.18,
                    ease: MOTION_TOKENS.ease,
                  }}
                  aria-live="polite"
                  className="lg:hidden mb-2.5 z-20 rounded-lg border border-[#C49A52]/38 bg-[#0E1A26]/92 px-3 py-2 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.75)]"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                    <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.11em] text-[#C49A52]">
                      {overlayStage.tooltipCue}
                    </span>
                  </div>
                  <p className="text-[11.5px] leading-[1.48] text-[#F6F1E8]/88">
                    {overlayStage.tooltipDetail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <svg
              viewBox="0 0 360 154"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label={`Conceptual chart illustrating stage ${activeStage.step}: ${activeStage.label} — ${activeStage.chartFocusLabel}`}
              className="w-full h-auto max-h-[154px] select-none"
            >
              <defs>
                <linearGradient id="insight-curve-grad" x1="46" y1="112" x2="314" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D9C4A0" stopOpacity="0.65" />
                  <stop offset="55%" stopColor="#C49A52" />
                  <stop offset="100%" stopColor="#F6F1E8" />
                </linearGradient>
                <linearGradient id="insight-area-grad" x1="180" y1="36" x2="180" y2="134" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C49A52" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#142B40" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Subtle Minimal Horizon Reference Lines */}
              <line x1="28" y1="42" x2="334" y2="42" stroke="#D9C4A0" strokeOpacity="0.08" strokeWidth="1" />
              <line x1="28" y1="88" x2="334" y2="88" stroke="#D9C4A0" strokeOpacity="0.08" strokeWidth="1" />
              <line x1="28" y1="134" x2="334" y2="134" stroke="#D9C4A0" strokeOpacity="0.18" strokeWidth="1" />

              {/* Stage 02 (Analysis): Validation Corridor Band */}
              <motion.path
                d={CONFIDENCE_BAND_PATH}
                fill="#C49A52"
                initial={false}
                animate={{ fillOpacity: isAnalysis ? 0.16 : isVisualization || isBusinessMeaning ? 0.06 : 0.03 }}
                transition={{ duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard }}
              />

              {/* Stage 03 & 04: Soft Area Fill Under Distilled Visual Arc */}
              <motion.path
                d={AREA_UNDER_PATH}
                fill="url(#insight-area-grad)"
                initial={false}
                animate={{ opacity: isVisualization || isBusinessMeaning ? 1 : 0.2 }}
                transition={{ duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard }}
              />

              {/* Stage 02 (Analysis): Subtle Baseline Comparison Line */}
              <motion.line
                x1="46"
                y1="108"
                x2="314"
                y2="62"
                stroke="#D9C4A0"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                initial={false}
                animate={{ strokeOpacity: isAnalysis ? 0.72 : 0.16 }}
                transition={{ duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard }}
              />

              {/* Primary Conceptual Trend Curve */}
              <motion.path
                d={TREND_PATH}
                stroke="url(#insight-curve-grad)"
                strokeWidth={isVisualization || isBusinessMeaning ? 2.6 : 1.9}
                strokeLinecap="round"
                initial={prefersReducedMotion ? false : { pathLength: 0.35, opacity: 0.45 }}
                animate={{
                  pathLength: 1,
                  opacity: isFinding ? 0.52 : 1,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  ease: MOTION_TOKENS.ease,
                }}
              />

              {/* Observation Nodes Across Sequence */}
              {OBSERVATION_POINTS.map((pt, idx) => {
                const isPatternNode = idx === 3 || idx === 4;
                const isDecisionNode = idx === 6;
                const isHighlighted =
                  (isFinding && isPatternNode) ||
                  (isAnalysis && idx >= 2 && idx <= 5) ||
                  isVisualization ||
                  (isBusinessMeaning && isDecisionNode);

                return (
                  <g key={`${pt.cx}-${pt.cy}`}>
                    {isFinding && isPatternNode && (
                      <motion.circle
                        cx={pt.cx}
                        cy={pt.cy}
                        r="10"
                        stroke="#C49A52"
                        strokeOpacity="0.45"
                        strokeWidth="1.2"
                        fill="#C49A52"
                        fillOpacity="0.1"
                        initial={prefersReducedMotion ? false : { scale: 0.85, opacity: 0.4 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: MOTION_TOKENS.ease }}
                      />
                    )}
                    <circle
                      cx={pt.cx}
                      cy={pt.cy}
                      r={isDecisionNode && isBusinessMeaning ? 5.2 : isHighlighted ? 3.8 : 2.8}
                      fill={isDecisionNode && isBusinessMeaning ? '#F6F1E8' : isHighlighted ? '#C49A52' : '#142B40'}
                      stroke={isHighlighted ? '#F6F1E8' : '#D9C4A0'}
                      strokeOpacity={isHighlighted ? 0.95 : 0.48}
                      strokeWidth="1.4"
                    />
                  </g>
                );
              })}

              {/* Stage 04 (Business Meaning): Inflection Guide & Decision Beacon */}
              <motion.g
                initial={false}
                animate={{ opacity: isBusinessMeaning ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard }}
              >
                <line
                  x1="314"
                  y1="44"
                  x2="314"
                  y2="134"
                  stroke="#C49A52"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx="314"
                  cy="36"
                  r="12"
                  stroke="#C49A52"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                  fill="#C49A52"
                  fillOpacity="0.12"
                />
              </motion.g>

              {/* Conceptual Axis Labels (Non-Numerical) */}
              <text
                x="46"
                y="148"
                fill="#D9C4A0"
                fillOpacity="0.72"
                fontSize="9.5"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.06em"
              >
                OBSERVATION
              </text>
              <text
                x="180"
                y="148"
                textAnchor="middle"
                fill="#D9C4A0"
                fillOpacity="0.72"
                fontSize="9.5"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.06em"
              >
                PATTERN
              </text>
              <text
                x="314"
                y="148"
                textAnchor="end"
                fill="#C49A52"
                fontSize="9.5"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.06em"
              >
                INSIGHT
              </text>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
