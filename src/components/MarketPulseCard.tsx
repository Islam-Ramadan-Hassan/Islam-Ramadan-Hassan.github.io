import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown, FileText, Maximize2 } from 'lucide-react';
import type { FeaturedProject } from '../data/portfolioData';
import { MARKETPULSE_INFOGRAPHIC_ASSET, PROJECT_PREVIEW_ASSETS } from '../data/projectAssets';
import { MOTION_TOKENS } from '../styles/designSystem';

export interface LightboxAssetPayload {
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  pdfUrl?: string;
}

interface MarketPulseCardProps {
  project: FeaturedProject;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenLightbox: (triggerEl: HTMLButtonElement, asset: LightboxAssetPayload) => void;
}

const OPENING_QUESTION =
  'How can an e-commerce marketplace understand what is happening across sales, customers, sellers, and deliveries when its data is spread across different sources?';

const REVEALED_LEAD = 'The analysis provided a broader view of marketplace performance:';

const REVEALED_HIGHLIGHTS = [
  {
    metric: 'R$13.59M in revenue',
    context: 'across the analyzed Olist dataset, showing the commercial scale of the marketplace.',
  },
  {
    metric: '93.2% on-time delivery rate',
    context: 'offering an indication of delivery reliability.',
  },
  {
    metric: '4.09/5 average review score',
    context: 'adding the customer perspective to the performance picture.',
  },
] as const;

const REVEALED_SYNTHESIS =
  'These findings show why marketplace performance cannot be understood through revenue alone. Delivery experience and customer feedback provide important context for interpreting commercial results.';

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
 * Editorial storytelling showcase card for MarketPulse.
 * Leads with the business question and narrative, presents the actual Power BI
 * Executive Overview screenshot as primary visual evidence and the infographic
 * as a secondary supporting visual, and unfolds the full 3-Act / 7-section story.
 */
export function MarketPulseCard({
  project,
  isExpanded,
  onToggleExpand,
  onOpenLightbox,
}: MarketPulseCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);
  const [infographicFailed, setInfographicFailed] = useState(false);
  const asset = PROJECT_PREVIEW_ASSETS[project.id];
  const hasVerifiedDemo = Boolean(project.demoUrl && project.demoUrl.trim().length > 0);

  const dashboardLightboxPayload: LightboxAssetPayload | null = asset
    ? {
        title: `${project.title} — Olist Marketplace Dashboard`,
        caption: project.previewCaption,
        src: asset.src,
        alt: asset.alt,
        width: 1415,
        height: 791,
      }
    : null;

  const infographicLightboxPayload: LightboxAssetPayload = {
    title: MARKETPULSE_INFOGRAPHIC_ASSET.title,
    caption: MARKETPULSE_INFOGRAPHIC_ASSET.caption,
    src: MARKETPULSE_INFOGRAPHIC_ASSET.src,
    alt: MARKETPULSE_INFOGRAPHIC_ASSET.alt,
    width: MARKETPULSE_INFOGRAPHIC_ASSET.width,
    height: MARKETPULSE_INFOGRAPHIC_ASSET.height,
    pdfUrl: MARKETPULSE_INFOGRAPHIC_ASSET.pdfSrc,
  };

  return (
    <div className="relative rounded-2xl border border-[#C49A52]/28 hover:border-[#C49A52]/50 bg-[#142B40] text-[#F6F1E8] shadow-[0_24px_54px_-28px_rgba(0,0,0,0.72)] transition-colors duration-200 overflow-hidden font-body">
      {/* Restrained Atmospheric Accent & Antique-Gold Top Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_82%_0%,rgba(196,154,82,0.13)_0%,rgba(25,52,77,0.22)_46%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-[#C49A52]/65 to-transparent"
      />

      {/* 1. Editorial Project Header & Opening Business Story */}
      <div className="relative z-10 px-4 sm:px-7 lg:px-10 pt-6 sm:pt-8 pb-6 sm:pb-7 space-y-6">
        {/* Top Metadata Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#D9C4A0]/14">
          <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] leading-[1.4] text-[#C49A52]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
            <span className="tabular-nums">{project.index}</span>
            <span aria-hidden="true" className="text-[#D9C4A0]/45">
              ·
            </span>
            <span>{project.categoryLabel}</span>
          </div>

          <p className="inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101820]/45 backdrop-blur-md border border-[#D9C4A0]/16 font-body text-xs text-[#F6F1E8]/88 self-start lg:self-auto">
            <span className="text-[#C49A52] font-semibold">Role:</span>
            <span>{project.role}</span>
          </p>
        </div>

        {/* Title, Subtitle & Story-First Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-7 space-y-4 min-w-0">
            <div className="space-y-1.5">
              <h3 className="font-heading text-[clamp(1.75rem,3vw,2.35rem)] font-bold tracking-[-0.025em] leading-[1.12] text-[#F6F1E8]">
                {project.title}
              </h3>
              <p className="font-heading text-sm sm:text-[15.5px] font-medium tracking-[-0.005em] text-[#D9C4A0]/88">
                {project.subtitle}
              </p>
            </div>

            {/* Main Story Headline */}
            <p className="font-heading text-[clamp(1.2rem,2.1vw,1.6rem)] font-semibold tracking-[-0.02em] leading-[1.28] hero-headline-gradient max-w-[34ch]">
              {project.headline}
            </p>

            {/* Introduction */}
            <p className="font-body text-sm sm:text-[15.5px] text-[#F6F1E8]/86 leading-[1.78] max-w-[62ch]">
              {project.description}
            </p>
          </div>

          {/* Opening Business Question — Elevated Glassmorphic Callout */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div className="rounded-xl bg-[#101820]/52 backdrop-blur-md border border-[#C49A52]/28 border-l-2 border-l-[#C49A52] p-5 sm:p-6 space-y-2.5 shadow-[0_14px_32px_-20px_rgba(0,0,0,0.65)]">
              <p className="font-heading text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#C49A52]">
                Opening Question
              </p>
              <blockquote className="font-display italic text-[18px] sm:text-[20px] font-medium text-[#F6F1E8] leading-[1.48]">
                “{OPENING_QUESTION}”
              </blockquote>
            </div>

            {/* Restrained Technology Metadata */}
            <div className="px-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-[#D9C4A0]/78">
              <span className="font-heading text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]/90">
                Technology:
              </span>
              <span className="font-mono text-[11.5px] leading-relaxed">
                {project.technologies.join(' · ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Project Evidence Stage — Primary Power BI Dashboard + Secondary Infographic */}
      <div className="bg-[#101820]/90 border-y border-[#D9C4A0]/14 px-3 sm:px-6 lg:px-10 pt-5 sm:pt-7 pb-5 sm:pb-7">
        <div className="max-w-[1060px] mx-auto space-y-7">
          {/* Primary Visual Evidence: Actual Power BI Dashboard */}
          <div>
            {!imgFailed && asset && dashboardLightboxPayload ? (
              <button
                type="button"
                onClick={(e) => onOpenLightbox(e.currentTarget, dashboardLightboxPayload)}
                aria-label="Enlarge original MarketPulse Olist Marketplace Dashboard screenshot (Page 1: Executive Overview)"
                className="group/dash block w-full p-1 sm:p-1.5 border border-[#D9C4A0]/20 hover:border-[#C49A52]/70 rounded-xl bg-[#142B40]/45 backdrop-blur-sm cursor-zoom-in transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-24px_rgba(0,0,0,0.85)] motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
              >
                <span className="block w-full aspect-[1415/791] rounded-lg overflow-hidden bg-[#070E1A]">
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    width={1415}
                    height={791}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImgFailed(true)}
                    className="block w-full h-full object-contain"
                  />
                </span>
              </button>
            ) : (
              <div className="w-full aspect-[1415/791] border border-[#D9C4A0]/20 rounded-xl bg-[#142B40] flex flex-col items-center justify-center p-6 text-center">
                <span className="font-heading text-xs uppercase tracking-[0.14em] text-[#C49A52] mb-2 tabular-nums">
                  {project.index}
                </span>
                <span className="font-heading text-xl font-semibold text-[#F6F1E8]">
                  {project.title}
                </span>
              </div>
            )}

            {/* Caption & Expand Dashboard Control Strictly Outside Screenshot Bounds */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <p className="font-body text-xs sm:text-[13px] font-medium text-[#D9C4A0]/88 leading-[1.5]">
                {project.previewCaption}
              </p>

              {!imgFailed && asset && dashboardLightboxPayload && (
                <button
                  type="button"
                  onClick={(e) => onOpenLightbox(e.currentTarget, dashboardLightboxPayload)}
                  aria-label="Expand Olist Marketplace Dashboard screenshot to full screen"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] text-xs font-semibold text-[#C49A52] hover:text-[#F6F1E8] bg-[#142B40]/55 hover:bg-[#19344D] border border-[#C49A52]/30 hover:border-[#C49A52]/70 rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] whitespace-nowrap"
                >
                  <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Expand Dashboard</span>
                </button>
              )}
            </div>
          </div>

          {/* Secondary Supporting Visual: Project Overview Infographic */}
          <div className="rounded-xl bg-[#142B40]/38 backdrop-blur-md border border-[#D9C4A0]/14 p-4 sm:p-5 lg:p-6">
            <div className="mb-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
              <p className="inline-flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
                <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                <span>Project Overview Infographic</span>
              </p>
              <span className="font-body text-xs text-[#D9C4A0]/75">
                Click to inspect the full-resolution project summary.
              </span>
            </div>

            {!infographicFailed ? (
              <button
                type="button"
                onClick={(e) => onOpenLightbox(e.currentTarget, infographicLightboxPayload)}
                aria-label="Enlarge MarketPulse Project Overview Infographic"
                className="block w-full p-0 border border-[#D9C4A0]/20 hover:border-[#C49A52]/65 rounded-lg bg-[#F6F8FB] cursor-zoom-in transition-[border-color,transform] duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] overflow-hidden"
              >
                <span className="block w-full aspect-[16/9]">
                  <img
                    src={MARKETPULSE_INFOGRAPHIC_ASSET.src}
                    alt={MARKETPULSE_INFOGRAPHIC_ASSET.alt}
                    width={MARKETPULSE_INFOGRAPHIC_ASSET.width}
                    height={MARKETPULSE_INFOGRAPHIC_ASSET.height}
                    loading="lazy"
                    decoding="async"
                    onError={() => setInfographicFailed(true)}
                    className="block w-full h-full object-contain"
                  />
                </span>
              </button>
            ) : (
              <div className="w-full aspect-[16/9] border border-[#D9C4A0]/20 rounded-lg bg-[#142B40] flex flex-col items-center justify-center p-6 text-center">
                <span className="font-heading text-xs uppercase tracking-[0.14em] text-[#C49A52] mb-2">
                  Project Overview Infographic
                </span>
                <a
                  href={MARKETPULSE_INFOGRAPHIC_ASSET.pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F6F1E8] hover:text-[#C49A52] transition-colors"
                >
                  <span>Original PDF</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}

            {/* Caption & Controls Strictly Outside Infographic Bounds */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <p className="font-body text-xs text-[#D9C4A0]/80 leading-[1.5]">
                {MARKETPULSE_INFOGRAPHIC_ASSET.caption}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={MARKETPULSE_INFOGRAPHIC_ASSET.pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open original MarketPulse infographic PDF in a new tab"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] text-xs font-medium text-[#D9C4A0]/92 hover:text-[#F6F1E8] bg-[#101820]/45 hover:bg-[#19344D] border border-[#D9C4A0]/18 hover:border-[#C49A52]/60 rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0 text-[#C49A52]" aria-hidden="true" />
                  <span>Original PDF</span>
                  <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                </a>

                {!infographicFailed && (
                  <button
                    type="button"
                    onClick={(e) => onOpenLightbox(e.currentTarget, infographicLightboxPayload)}
                    aria-label="Expand MarketPulse Project Overview Infographic to full screen"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] text-xs font-semibold text-[#C49A52] hover:text-[#F6F1E8] bg-[#101820]/45 hover:bg-[#19344D] border border-[#C49A52]/30 hover:border-[#C49A52]/70 rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] whitespace-nowrap"
                  >
                    <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Expand Infographic</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Action Row Leading Into the Three-Act Analytical Story */}
      <div className="px-4 sm:px-7 lg:px-10 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="font-body text-xs sm:text-[13.5px] text-[#D9C4A0]/86 leading-[1.6] max-w-[56ch]">
          Explore the full three-act story—from business context and dimensional modeling to
          findings, practical value, and project boundaries.
        </p>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {hasVerifiedDemo && project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/demo inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] hero-cta-primary-gradient text-[#101820] font-heading text-xs font-semibold tracking-[0.02em] rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap"
            >
              <span>{project.demoLabel || 'Open Interactive Demo'}</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-150 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 motion-reduce:group-hover/demo:translate-x-0 motion-reduce:group-hover/demo:translate-y-0"
                aria-hidden="true"
              />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 px-2 py-2 min-h-[44px] text-xs font-semibold text-[#D9C4A0] hover:text-[#C49A52] rounded-md transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] whitespace-nowrap"
            >
              <span>View on GitHub</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-hover/link:translate-y-0"
                aria-hidden="true"
              />
            </a>
          )}

          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            aria-controls={`case-study-${project.id}`}
            className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-xs font-heading font-semibold tracking-[0.04em] rounded-lg border transition-[background-color,border-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap ${
              isExpanded
                ? 'bg-[#C49A52] border-[#C49A52] text-[#101820]'
                : 'bg-[#101820]/50 border-[#C49A52]/45 text-[#F6F1E8] hover:border-[#C49A52] hover:bg-[#19344D] hover:text-[#C49A52]'
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
      </div>

      {/* 4. Three-Act Editorial Case Study Dossier (7 Approved Sections) */}
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
            <div className="px-4 sm:px-7 lg:px-10 py-8 sm:py-10 border-t border-[#C49A52]/25 bg-[#101820]/82 space-y-10">
              {/* Act I · Understanding the Business */}
              <section aria-labelledby="mp-act-1" className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#D9C4A0]/14">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="mp-act-1"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#C49A52]"
                  >
                    Act I · Understanding the Business
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">01 ·</span>
                      The Context
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.context}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/86"
                    />
                  </div>

                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">02 ·</span>
                      The Challenge
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.businessChallenge}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/86"
                    />
                  </div>
                </div>
              </section>

              {/* Act II · Turning Data into Evidence */}
              <section aria-labelledby="mp-act-2" className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-[#D9C4A0]/14">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="mp-act-2"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#C49A52]"
                  >
                    Act II · Turning Data into Evidence
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">03 ·</span>
                      My Contribution
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.roleAndContribution}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/90"
                    />
                  </div>

                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">04 ·</span>
                      The Analytical Approach
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.approachAndTechnologies}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/86"
                    />
                  </div>
                </div>

                {/* 05 · What the Data Revealed — Glassmorphic Evidence Band */}
                <div className="rounded-2xl p-5 sm:p-7 border border-[#C49A52]/28 bg-[#142B40]/72 backdrop-blur-md space-y-5">
                  <div className="space-y-1.5">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">05 ·</span>
                      What the Data Revealed
                    </h5>
                    <p className="font-body text-sm sm:text-[15px] text-[#D9C4A0]/90 leading-[1.7]">
                      {REVEALED_LEAD}
                    </p>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {REVEALED_HIGHLIGHTS.map((item) => (
                      <li
                        key={item.metric}
                        className="rounded-xl bg-[#101820]/58 border border-[#D9C4A0]/16 p-4 sm:p-5 space-y-1.5"
                      >
                        <p className="font-heading text-base sm:text-[17px] font-bold text-[#C49A52] leading-snug tabular-nums">
                          {item.metric}
                        </p>
                        <p className="font-body text-xs sm:text-[13.5px] text-[#F6F1E8]/88 leading-[1.65]">
                          {item.context}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <p className="pt-2 border-t border-[#D9C4A0]/14 font-body text-sm sm:text-[15px] text-[#F6F1E8]/90 leading-[1.75] max-w-[68ch]">
                    {REVEALED_SYNTHESIS}
                  </p>
                </div>
              </section>

              {/* Act III · Business Meaning & Boundaries */}
              <section aria-labelledby="mp-act-3" className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#D9C4A0]/14">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="mp-act-3"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#C49A52]"
                  >
                    Act III · Business Meaning &amp; Boundaries
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">06 ·</span>
                      Why It Matters
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.businessRelevance}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/86"
                    />
                  </div>

                  <div className="rounded-xl bg-[#142B40]/45 border border-[#D9C4A0]/16 p-5 sm:p-6 space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#D9C4A0]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">07 ·</span>
                      Project Boundaries
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.limitationsAndEvidence}
                      className="font-body text-xs sm:text-[14px] leading-[1.76] text-[#D9C4A0]/88"
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
