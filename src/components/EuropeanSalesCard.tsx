import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  ChevronDown,
  Maximize2,
  Play,
  TrendingDown,
} from 'lucide-react';
import type { FeaturedProject } from '../data/portfolioData';
import { EUROPE_SALES_DASHBOARD_ASSET } from '../data/projectAssets';
import { MOTION_TOKENS } from '../styles/designSystem';
import type { LightboxAssetPayload } from './MarketPulseCard';

interface EuropeanSalesCardProps {
  project: FeaturedProject;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenLightbox: (triggerEl: HTMLButtonElement, asset: LightboxAssetPayload) => void;
  onOpenWalkthrough: (triggerEl: HTMLButtonElement, payload: { title: string; url: string }) => void;
}

const OPENING_QUESTION =
  'How can a retail business generate millions in sales while retaining only a small share as profit?';

const LOSS_MAKING_MARKETS = ['Portugal', 'Netherlands', 'Sweden'] as const;

const SECONDARY_FINANCIAL_KPIS = [
  {
    value: '~€283K',
    label: 'Total Profit',
    context: 'Net profit across analyzed orders',
  },
  {
    value: '4,117',
    label: 'Orders',
    context: 'Total retail transactions',
  },
  {
    value: '792',
    label: 'Customers',
    context: 'Distinct customers',
  },
  {
    value: '3.97 Days',
    label: 'Average Shipping Time',
    context: 'Average recorded delivery time',
  },
] as const;

const REVEALED_LEAD =
  'The analysis highlighted a clear gap between sales volume and profit retention:';

const REVEALED_SYNTHESIS =
  'Together, these findings showed why strong revenue figures should not be treated as evidence of strong profitability. Country-level performance and discount patterns provided important context that total sales alone could not show.';

function NarrativeParagraphs({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const paragraphs = text.split('\n\n').filter(Boolean);
  return (
    <div className="space-y-3.5">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className={className}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * Editorial financial-report showcase card for European Sales Analytics.
 * Warm Parchment (#EFE8DC) & Paper (#FFFFFF) identity with Midnight Navy (#142B40)
 * diagnostic contrast and Antique Gold (#7D5B22 / #C49A52) emphasis.
 * Keeps the collapsed card focused on the central insight, actual Excel dashboard,
 * and verified links—unfolding the 3-Act story, Financial Performance Summary,
 * and Profitability Diagnostic cleanly inside the expanded case study.
 */
export function EuropeanSalesCard({
  project,
  isExpanded,
  onToggleExpand,
  onOpenLightbox,
  onOpenWalkthrough,
}: EuropeanSalesCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  const dashboardLightboxPayload: LightboxAssetPayload = {
    title: EUROPE_SALES_DASHBOARD_ASSET.title,
    caption: EUROPE_SALES_DASHBOARD_ASSET.caption,
    src: EUROPE_SALES_DASHBOARD_ASSET.src,
    alt: EUROPE_SALES_DASHBOARD_ASSET.alt,
    width: EUROPE_SALES_DASHBOARD_ASSET.width,
    height: EUROPE_SALES_DASHBOARD_ASSET.height,
  };

  return (
    <div className="relative rounded-2xl border border-[#C49A52]/45 hover:border-[#C49A52] bg-[#EFE8DC] text-[#101820] shadow-[0_20px_44px_-26px_rgba(0,0,0,0.45)] transition-colors duration-200 overflow-hidden font-body">
      {/* Subtle Top Antique-Gold Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-[#7D5B22]/45 to-transparent"
      />

      {/* 1. Editorial Project Identity & Story Behind the Analysis */}
      <div className="px-4 sm:px-7 lg:px-10 pt-6 sm:pt-8 pb-6 sm:pb-7 space-y-6 border-b border-[#142B40]/12">
        {/* Top Metadata Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#142B40]/12">
          <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] leading-[1.4] text-[#7D5B22]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
            <span className="tabular-nums">{project.index}</span>
            <span aria-hidden="true" className="text-[#142B40]/35">
              ·
            </span>
            <span>{project.categoryLabel}</span>
          </div>

          <p className="inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF]/80 border border-[#142B40]/12 font-body text-xs text-[#142B40]/90 self-start sm:self-auto">
            <span className="text-[#7D5B22] font-semibold">Role:</span>
            <span>{project.role}</span>
          </p>
        </div>

        {/* Title, Main Statement, Introduction & Opening Business Question */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-7 space-y-4 min-w-0">
            <h3 className="font-heading text-[clamp(1.75rem,3vw,2.35rem)] font-bold tracking-[-0.025em] leading-[1.12] text-[#142B40]">
              {project.title}
            </h3>

            {/* Main Business Statement */}
            <p className="font-display italic text-[clamp(1.25rem,2.1vw,1.6rem)] font-semibold text-[#7D5B22] leading-[1.3] max-w-[36ch]">
              {project.headline}
            </p>

            {/* The Story Behind the Analysis — Introduction */}
            <p className="font-body text-sm sm:text-[15.5px] text-[#101820]/84 leading-[1.78] max-w-[62ch]">
              {project.description}
            </p>
          </div>

          {/* Opening Question — Calm Paper Editorial Callout */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div className="rounded-xl bg-[#FFFFFF] border border-[#142B40]/14 border-l-2 border-l-[#7D5B22] p-5 sm:p-6 space-y-2.5 shadow-[0_12px_28px_-22px_rgba(20,43,64,0.28)]">
              <p className="font-heading text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#7D5B22]">
                The Story Behind the Analysis
              </p>
              <blockquote className="font-display italic text-[18px] sm:text-[20px] font-semibold text-[#142B40] leading-[1.48]">
                “{OPENING_QUESTION}”
              </blockquote>
            </div>

            {/* Compact Technology Line */}
            <div className="px-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-[#4D5C6B]">
              <span className="font-heading text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#7D5B22]">
                Technology:
              </span>
              <span className="font-mono text-[11.5px] leading-relaxed">
                {project.technologies.join(' · ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Visual Evidence — Actual Excel Dashboard Screenshot */}
      <div className="bg-[#142B40]/[0.06] border-b border-[#142B40]/12 px-3 sm:px-6 lg:px-10 pt-5 sm:pt-7 pb-4 sm:pb-6">
        <div className="max-w-[1024px] mx-auto">
          {!imgFailed ? (
            <button
              type="button"
              onClick={(e) => onOpenLightbox(e.currentTarget, dashboardLightboxPayload)}
              aria-label="Enlarge European Sales Analytics actual Excel dashboard screenshot"
              className="block w-full p-1 sm:p-1.5 border border-[#142B40]/20 hover:border-[#C49A52] rounded-xl bg-[#FFFFFF]/80 shadow-[0_18px_40px_-24px_rgba(20,43,64,0.42)] cursor-zoom-in transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
            >
              <span className="block w-full aspect-[1024/430] rounded-lg overflow-hidden bg-[#0D213F]">
                <img
                  src={EUROPE_SALES_DASHBOARD_ASSET.src}
                  alt={EUROPE_SALES_DASHBOARD_ASSET.alt}
                  width={EUROPE_SALES_DASHBOARD_ASSET.width}
                  height={EUROPE_SALES_DASHBOARD_ASSET.height}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgFailed(true)}
                  className="block w-full h-full object-contain"
                />
              </span>
            </button>
          ) : (
            <div className="w-full aspect-[1024/430] border border-[#142B40]/18 rounded-xl bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center">
              <span className="font-heading text-xs uppercase tracking-[0.14em] text-[#7D5B22] mb-2 tabular-nums">
                {project.index}
              </span>
              <span className="font-heading text-xl font-semibold text-[#142B40]">
                {project.title}
              </span>
            </div>
          )}

          {/* Exact Caption & Expand Dashboard Control Outside Image Bounds */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-body text-xs sm:text-[13px] font-medium text-[#4D5C6B] leading-[1.5]">
              {EUROPE_SALES_DASHBOARD_ASSET.caption}
            </p>

            {!imgFailed && (
              <button
                type="button"
                onClick={(e) => onOpenLightbox(e.currentTarget, dashboardLightboxPayload)}
                aria-label="Expand European Sales Analytics Excel dashboard to full screen"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] text-xs font-semibold text-[#7D5B22] hover:text-[#142B40] bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] border border-[#142B40]/16 hover:border-[#C49A52] rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] whitespace-nowrap"
              >
                <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Expand Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Action Bar — Walkthrough Video, GitHub Repository & Case Study Toggle */}
      <div className="px-4 sm:px-7 lg:px-10 py-5 sm:py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3.5">
          {project.walkthroughUrl && (
            <button
              type="button"
              onClick={(e) =>
                onOpenWalkthrough(e.currentTarget, {
                  title: project.title,
                  url: project.walkthroughUrl!,
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#142B40] text-[#F6F1E8] hover:bg-[#19344D] hover:text-[#C49A52] active:scale-[0.985] rounded-lg transition-[background-color,color,transform] duration-200 min-h-[44px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#C49A52]" aria-hidden="true" />
              <span>{project.walkthroughLabel || 'Watch Dashboard Walkthrough'}</span>
            </button>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 px-2 py-2 min-h-[44px] text-xs font-semibold text-[#142B40] hover:text-[#7D5B22] transition-colors duration-200 whitespace-nowrap rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52]"
            >
              <span>View on GitHub</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleExpand}
          aria-expanded={isExpanded}
          aria-controls={`case-study-${project.id}`}
          className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-xs font-heading font-semibold tracking-[0.04em] rounded-lg border transition-[background-color,border-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap ${
            isExpanded
              ? 'bg-[#142B40] border-[#142B40] text-[#F6F1E8]'
              : 'border-[#142B40]/24 bg-[#FFFFFF] text-[#142B40] hover:border-[#7D5B22] hover:text-[#7D5B22]'
          }`}
        >
          <span>{isExpanded ? 'Hide Case Study' : 'Read Case Study'}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${
              isExpanded ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* 4. Expanded Three-Act Financial Report Case Study */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`case-study-${project.id}`}
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
              ease: MOTION_TOKENS.ease,
            }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-7 lg:px-10 py-8 sm:py-10 border-t border-[#142B40]/12 bg-[#FFFFFF] space-y-10">
              {/* Act I · The Business Question */}
              <section aria-labelledby="es-act-1" className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#142B40]/10">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="es-act-1"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#7D5B22]"
                  >
                    Act I · The Business Question
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">01 ·</span>
                      Business Context
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.context}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84"
                    />
                  </div>

                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">02 ·</span>
                      The Analytical Challenge
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.businessChallenge}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84"
                    />
                  </div>
                </div>
              </section>

              {/* Act II · The Investigation */}
              <section aria-labelledby="es-act-2" className="space-y-7">
                <div className="flex items-center gap-3 pb-3 border-b border-[#142B40]/10">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="es-act-2"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#7D5B22]"
                  >
                    Act II · The Investigation
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">03 ·</span>
                      My Contribution
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.roleAndContribution}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/88"
                    />
                  </div>

                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">04 ·</span>
                      Analytical Approach
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.approachAndTechnologies}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84"
                    />
                  </div>
                </div>

                {/* Financial Performance Summary (Historical Dataset · 2011–2014) */}
                <div className="rounded-2xl bg-[#EFE8DC]/70 border border-[#142B40]/12 p-5 sm:p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h5 className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#7D5B22]">
                      Financial Performance Summary
                    </h5>
                    <span className="font-mono text-[11px] text-[#4D5C6B]">
                      Historical Dataset · 2011–2014
                    </span>
                  </div>

                  {/* Primary Contrast: Total Sales vs. Overall Profit Margin */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#FFFFFF] border border-[#142B40]/14 border-t-[3px] border-t-[#142B40] p-5 flex flex-col justify-between gap-2">
                      <p className="font-heading text-3xl sm:text-[2.25rem] font-bold tracking-[-0.03em] text-[#142B40] tabular-nums leading-none">
                        €10.67M
                      </p>
                      <div>
                        <p className="font-heading text-sm font-bold text-[#142B40]">Total Sales</p>
                        <p className="text-xs text-[#4D5C6B] mt-0.5 leading-relaxed">
                          Total sales across analyzed orders (2011–2014).
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#FFFFFF] border border-[#142B40]/14 border-t-[3px] border-t-[#C49A52] p-5 flex flex-col justify-between gap-2">
                      <p className="font-heading text-3xl sm:text-[2.25rem] font-bold tracking-[-0.03em] text-[#7D5B22] tabular-nums leading-none">
                        2.65%
                      </p>
                      <div>
                        <p className="font-heading text-sm font-bold text-[#142B40]">
                          Overall Profit Margin
                        </p>
                        <p className="text-xs text-[#4D5C6B] mt-0.5 leading-relaxed">
                          Profit retained relative to sales (~€283K net profit).
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Supporting Figures */}
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3">
                    {SECONDARY_FINANCIAL_KPIS.map((kpi) => (
                      <div
                        key={kpi.label}
                        className="rounded-xl bg-[#FFFFFF] border border-[#142B40]/12 p-4 space-y-1"
                      >
                        <p className="font-heading text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#142B40] tabular-nums">
                          {kpi.value}
                        </p>
                        <p className="font-heading text-xs font-bold text-[#7D5B22]">{kpi.label}</p>
                        <p className="text-[11.5px] text-[#4D5C6B] leading-snug">{kpi.context}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 05 · What the Data Revealed */}
                <div className="rounded-2xl p-5 sm:p-7 border border-[#142B40]/12 bg-[#EFE8DC]/45 space-y-4">
                  <div className="space-y-1.5">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">05 ·</span>
                      What the Data Revealed
                    </h5>
                    <p className="font-body text-sm sm:text-[15px] text-[#4D5C6B] leading-[1.7]">
                      {REVEALED_LEAD}
                    </p>
                  </div>

                  <ul className="space-y-2.5">
                    {project.caseStudy.verifiedFindings.map((finding) => (
                      <li
                        key={finding}
                        className="flex items-start gap-3 font-body text-sm sm:text-[15px] leading-[1.7] text-[#101820]/90 max-w-[74ch]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                        />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="pt-2 border-t border-[#142B40]/10 font-body text-sm sm:text-[15px] text-[#101820]/86 leading-[1.75] max-w-[68ch]">
                    {REVEALED_SYNTHESIS}
                  </p>
                </div>

                {/* Profitability Diagnostic · Revenue vs. Margin Retention */}
                <div className="rounded-2xl bg-[#142B40] text-[#F6F1E8] border border-[#C49A52]/35 p-5 sm:p-6 lg:p-7 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#D9C4A0]/16">
                    <div className="inline-flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-[#C49A52] shrink-0" aria-hidden="true" />
                      <h5 className="font-heading text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#F6F1E8]">
                        Profitability Diagnostic · Revenue vs. Margin Retention
                      </h5>
                    </div>
                    <span className="font-mono text-[11px] text-[#C49A52]">
                      Market Losses &amp; Discount Association
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7">
                    {/* A. Market-Level Loss Pattern */}
                    <div className="rounded-xl bg-[#101820]/65 border border-[#D9C4A0]/16 p-4 sm:p-5 space-y-3.5">
                      <div className="space-y-1">
                        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#C49A52]">
                          Market-Level Loss Pattern
                        </p>
                        <p className="font-heading text-base font-bold text-[#F6F1E8]">
                          Loss-Making Markets
                        </p>
                      </div>

                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {LOSS_MAKING_MARKETS.map((market) => (
                          <li
                            key={market}
                            className="rounded-md bg-[#142B40]/90 border border-[#C49A52]/35 px-3 py-2.5 flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#F6F1E8]"
                          >
                            <span
                              aria-hidden="true"
                              className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                            />
                            <span>{market}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="text-xs sm:text-[13px] text-[#D9C4A0]/88 leading-relaxed">
                        Despite €10.67M in European sales, Portugal, the Netherlands, and Sweden
                        recorded overall losses—demonstrating why market-level profitability must be
                        evaluated separately from top-line revenue.
                      </p>
                    </div>

                    {/* B. Discount Pattern & Evidence Boundary */}
                    <div className="rounded-xl bg-[#101820]/65 border border-[#D9C4A0]/16 p-4 sm:p-5 flex flex-col justify-between gap-3.5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#C49A52]">
                            Discount Pattern
                          </p>
                          <span className="font-heading text-lg font-bold text-[#C49A52] tabular-nums">
                            Up to 50% Discounts
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-[#F6F1E8]/90 leading-relaxed">
                          Discounts of up to 50% were associated with profit erosion in the analyzed
                          2011–2014 dataset, highlighting pricing and discounting as an area worth
                          investigating further.
                        </p>
                      </div>

                      <div className="rounded-md bg-[#142B40]/95 border border-[#C49A52]/35 px-3.5 py-2.5 flex items-start gap-2">
                        <AlertCircle
                          className="w-4 h-4 text-[#C49A52] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <p className="text-[11.5px] text-[#D9C4A0]/92 leading-relaxed">
                          The relationship between discounts and profit erosion is an observed
                          association, not proof that discounts alone caused the losses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Act III · Business Meaning & Boundaries */}
              <section aria-labelledby="es-act-3" className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#142B40]/10">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="es-act-3"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#7D5B22]"
                  >
                    Act III · Business Meaning &amp; Boundaries
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">06 ·</span>
                      Why the Findings Matter
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.businessRelevance}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84"
                    />
                  </div>

                  <div className="rounded-xl bg-[#EFE8DC]/60 border border-[#142B40]/12 p-5 sm:p-6 space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">07 ·</span>
                      Limitations &amp; Project Evidence
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.limitationsAndEvidence}
                      className="font-body text-xs sm:text-[14px] leading-[1.76] text-[#4D5C6B]"
                    />
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
