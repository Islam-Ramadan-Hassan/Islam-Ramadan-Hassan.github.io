import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ChevronDown,
  Database,
  Maximize2,
} from 'lucide-react';
import type { FeaturedProject } from '../data/portfolioData';
import { HOSPITAL_MANAGEMENT_ASSET } from '../data/projectAssets';
import { MOTION_TOKENS } from '../styles/designSystem';
import type { LightboxAssetPayload } from './MarketPulseCard';

interface HospitalAnalyticsCardProps {
  project: FeaturedProject;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenLightbox: (triggerEl: HTMLButtonElement, asset: LightboxAssetPayload) => void;
}

const OPENING_QUESTION =
  'How can hospital data reveal financial and operational issues when billing, physician workload, and patient records are not easy to examine together?';

const ARCHITECTURE_LAYERS = [
  {
    step: '01',
    title: 'SQL Server Database',
    detail: 'Normalized database with 10 related tables.',
  },
  {
    step: '02',
    title: 'ETL Workflows',
    detail: 'Data preparation and transformation.',
  },
  {
    step: '03',
    title: 'SQL Views',
    detail: 'More than 10 reusable SQL views supporting analytical queries.',
  },
  {
    step: '04',
    title: 'Power BI',
    detail: 'Analytical reporting covering the eight-month billing/payment scope.',
  },
] as const;

const AUDIT_FINDINGS = [
  {
    value: '36%',
    label: 'Uncollected Invoices',
    description: 'Uncollected invoices across the analyzed eight-month billing and payment records.',
    meaning: 'Highlights an area for financial follow-up and receivables review.',
  },
  {
    value: '5×',
    label: 'Physician Workload Difference',
    description: 'Difference between the highest and lowest recorded physician workloads.',
    meaning: 'Provides a reason to review workload distribution and understand the differences.',
  },
  {
    value: '40+',
    label: 'Missing Diagnosis Information',
    description: 'Chronic patient records missing diagnosis information.',
    meaning:
      'Highlights a gap in patient-record completeness that may require documentation checks.',
  },
] as const;

const REVEALED_LEAD = 'The analysis surfaced three findings that deserve attention:';

const REVEALED_BULLETS = [
  {
    lead: '36% of invoices were uncollected',
    rest: 'across the analyzed eight-month billing and payment records, highlighting an area for financial follow-up.',
  },
  {
    lead: 'A 5× difference in recorded physician workload',
    rest: 'between the highest and lowest workloads, pointing to a potential need for further workload review.',
  },
  {
    lead: 'More than 40 chronic patient records were missing diagnosis information,',
    rest: 'revealing a gap in record completeness.',
  },
] as const;

const REVEALED_SYNTHESIS =
  'Together, these findings show how structured data analysis can surface financial, operational, and documentation issues that may otherwise be difficult to spot.';

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
 * Custom SVG/React architecture visualization showing strictly the four verified
 * technical stages: SQL Server -> ETL Workflows -> SQL Views -> Power BI.
 */
function HospitalArchitectureDiagram() {
  return (
    <div className="rounded-xl border border-[#C49A52]/24 bg-[#142B40]/72 backdrop-blur-md p-4 sm:p-5 lg:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#D9C4A0]/14">
        <div className="inline-flex items-center gap-2">
          <Database className="w-4 h-4 text-[#C49A52] shrink-0" aria-hidden="true" />
          <h4 className="font-heading text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#F6F1E8]">
            Data Architecture Flow
          </h4>
        </div>
        <span className="font-mono text-[11px] text-[#D9C4A0]/84">
          SQL Server → ETL Workflows → SQL Views → Power BI
        </span>
      </div>

      {/* Desktop & Wide Tablet Horizontal Pipeline SVG */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 1000 138"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="hospital-arch-title hospital-arch-desc"
          className="block w-full h-auto select-none"
        >
          <title id="hospital-arch-title">
            Hospital Management Analytics System Data Architecture Flow
          </title>
          <desc id="hospital-arch-desc">
            Four-stage analytical pipeline from SQL Server Database with 10 related tables, to ETL
            Workflows for data preparation and transformation, to more than 10 reusable SQL Views,
            to Power BI analytical reporting covering the eight-month billing and payment scope.
          </desc>

          {/* Connecting Arrows */}
          {[226, 482, 738].map((x) => (
            <g key={x} aria-hidden="true">
              <line x1={x} y1="69" x2={x + 24} y2="69" stroke="#C49A52" strokeWidth="1.5" />
              <polygon points={`${x + 28},69 ${x + 20},64 ${x + 20},74`} fill="#C49A52" />
            </g>
          ))}

          {/* 01 · SQL Server Database */}
          <rect
            x="4"
            y="10"
            width="222"
            height="118"
            rx="10"
            fill="#101820"
            stroke="#C49A52"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />
          <rect x="4" y="10" width="222" height="3.5" rx="2" fill="#C49A52" />
          <text
            x="20"
            y="34"
            fill="#C49A52"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            01 · DATA LAYER
          </text>
          <text
            x="20"
            y="58"
            fill="#F6F1E8"
            fontSize="14"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            SQL Server Database
          </text>
          <text x="20" y="81" fill="#D9C4A0" fontSize="11.5" fontFamily="Inter, sans-serif">
            Normalized database with
          </text>
          <text
            x="20"
            y="99"
            fill="#F6F1E8"
            fontSize="11.5"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            10 related tables.
          </text>

          {/* 02 · ETL Workflows */}
          <rect
            x="260"
            y="10"
            width="222"
            height="118"
            rx="10"
            fill="#101820"
            stroke="#D9C4A0"
            strokeOpacity="0.28"
            strokeWidth="1.2"
          />
          <rect x="260" y="10" width="222" height="3.5" rx="2" fill="#D9C4A0" fillOpacity="0.65" />
          <text
            x="276"
            y="34"
            fill="#C49A52"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            02 · PREPARATION
          </text>
          <text
            x="276"
            y="58"
            fill="#F6F1E8"
            fontSize="14"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            ETL Workflows
          </text>
          <text x="276" y="81" fill="#D9C4A0" fontSize="11.5" fontFamily="Inter, sans-serif">
            Data preparation and
          </text>
          <text x="276" y="99" fill="#D9C4A0" fontSize="11.5" fontFamily="Inter, sans-serif">
            transformation.
          </text>

          {/* 03 · SQL Views */}
          <rect
            x="516"
            y="10"
            width="222"
            height="118"
            rx="10"
            fill="#101820"
            stroke="#D9C4A0"
            strokeOpacity="0.28"
            strokeWidth="1.2"
          />
          <rect x="516" y="10" width="222" height="3.5" rx="2" fill="#D9C4A0" fillOpacity="0.65" />
          <text
            x="532"
            y="34"
            fill="#C49A52"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            03 · REUSABLE QUERIES
          </text>
          <text
            x="532"
            y="58"
            fill="#F6F1E8"
            fontSize="14"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            SQL Views
          </text>
          <text
            x="532"
            y="81"
            fill="#F6F1E8"
            fontSize="11.5"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            More than 10 reusable SQL
          </text>
          <text x="532" y="99" fill="#D9C4A0" fontSize="11.5" fontFamily="Inter, sans-serif">
            views supporting queries.
          </text>

          {/* 04 · Power BI */}
          <rect
            x="772"
            y="10"
            width="224"
            height="118"
            rx="10"
            fill="#F8F4EC"
            stroke="#C49A52"
            strokeWidth="1.4"
          />
          <rect x="772" y="10" width="224" height="3.5" rx="2" fill="#C49A52" />
          <text
            x="788"
            y="34"
            fill="#7D5B22"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            04 · REPORTING LAYER
          </text>
          <text
            x="788"
            y="58"
            fill="#142B40"
            fontSize="14"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            Power BI
          </text>
          <text x="788" y="81" fill="#101820" fontSize="11.5" fontFamily="Inter, sans-serif">
            Analytical reporting over the
          </text>
          <text
            x="788"
            y="99"
            fill="#7D5B22"
            fontSize="11.5"
            fontWeight="600"
            fontFamily="Inter, sans-serif"
          >
            eight-month billing scope.
          </text>
        </svg>
      </div>

      {/* Mobile & Compact Tablet Stacked Pipeline */}
      <ol className="md:hidden space-y-2.5">
        {ARCHITECTURE_LAYERS.map((layer, idx) => (
          <li
            key={layer.step}
            className={`rounded-lg p-3.5 border ${
              idx === ARCHITECTURE_LAYERS.length - 1
                ? 'bg-[#F8F4EC] text-[#101820] border-[#C49A52]'
                : 'bg-[#101820] text-[#F6F1E8] border-[#D9C4A0]/20'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span
                className={`font-heading text-sm font-bold ${
                  idx === ARCHITECTURE_LAYERS.length - 1 ? 'text-[#142B40]' : 'text-[#F6F1E8]'
                }`}
              >
                {layer.title}
              </span>
              <span
                className={`font-mono text-[11px] font-semibold ${
                  idx === ARCHITECTURE_LAYERS.length - 1 ? 'text-[#7D5B22]' : 'text-[#C49A52]'
                }`}
              >
                {layer.step}
              </span>
            </div>
            <p
              className={`text-xs leading-relaxed ${
                idx === ARCHITECTURE_LAYERS.length - 1 ? 'text-[#4D5C6B]' : 'text-[#D9C4A0]/88'
              }`}
            >
              {layer.detail}
            </p>
          </li>
        ))}
      </ol>

      <p className="pt-1 font-body text-xs text-[#D9C4A0]/80 leading-relaxed">
        Normalized 10-table SQL Server schema, ETL workflows, and 10+ reusable SQL views supporting
        billing, workload, and record-quality analysis.
      </p>

      <ol className="sr-only">
        {ARCHITECTURE_LAYERS.map((layer) => (
          <li key={layer.step}>
            {layer.step} {layer.title}: {layer.detail}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Editorial storytelling showcase card for Hospital Management Analytics System.
 * Deep Charcoal (#101820) & Midnight Navy (#142B40) clinical data-ledger identity
 * with Soft Ivory (#F8F4EC) verified finding cards and restrained Antique Gold accents.
 */
export function HospitalAnalyticsCard({
  project,
  isExpanded,
  onToggleExpand,
  onOpenLightbox,
}: HospitalAnalyticsCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  const primaryLightboxPayload: LightboxAssetPayload = {
    title: project.title,
    caption: project.previewCaption,
    src: HOSPITAL_MANAGEMENT_ASSET.src,
    alt: HOSPITAL_MANAGEMENT_ASSET.alt,
    width: HOSPITAL_MANAGEMENT_ASSET.width,
    height: HOSPITAL_MANAGEMENT_ASSET.height,
  };

  return (
    <div className="relative rounded-2xl border border-[#C49A52]/28 hover:border-[#C49A52]/55 bg-[#101820] text-[#F6F1E8] shadow-[0_24px_54px_-28px_rgba(0,0,0,0.75)] transition-colors duration-200 overflow-hidden font-body">
      {/* Restrained Atmospheric Wash & Top Antique-Gold Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_22%_0%,rgba(25,52,77,0.55)_0%,rgba(196,154,82,0.08)_46%,transparent_76%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-[#C49A52]/60 to-transparent"
      />

      {/* 1. Editorial Project Identity & Story Opening */}
      <div className="relative z-10 px-4 sm:px-7 lg:px-10 pt-6 sm:pt-8 pb-6 sm:pb-7 space-y-6 bg-[#142B40]/38 border-b border-[#D9C4A0]/14">
        {/* Top Metadata Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-[#D9C4A0]/14">
          <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] leading-[1.4] text-[#C49A52]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
            <span className="tabular-nums">{project.index}</span>
            <span aria-hidden="true" className="text-[#D9C4A0]/45">
              ·
            </span>
            <span>{project.categoryLabel}</span>
          </div>

          <span className="font-mono text-[11px] text-[#D9C4A0]/82">
            Eight-month billing &amp; payment scope
          </span>
        </div>

        {/* Title, Story Headline, Introduction & Opening Business Question */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-7 space-y-4 min-w-0">
            <h3 className="font-heading text-[clamp(1.7rem,3vw,2.3rem)] font-bold tracking-[-0.025em] leading-[1.14] text-[#F6F1E8]">
              {project.title}
            </h3>

            {/* Main Story Headline */}
            <p className="font-heading text-[clamp(1.18rem,2.05vw,1.55rem)] font-semibold tracking-[-0.02em] leading-[1.28] hero-headline-gradient max-w-[34ch]">
              {project.headline}
            </p>

            {/* Introduction */}
            <p className="font-body text-sm sm:text-[15.5px] text-[#F6F1E8]/86 leading-[1.78] max-w-[62ch]">
              {project.description}
            </p>
          </div>

          {/* Opening Business Question — Glassmorphic Callout */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div className="rounded-xl bg-[#101820]/65 backdrop-blur-md border border-[#C49A52]/28 border-l-2 border-l-[#C49A52] p-5 sm:p-6 space-y-2.5 shadow-[0_14px_32px_-20px_rgba(0,0,0,0.7)]">
              <p className="font-heading text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#C49A52]">
                Opening Business Question
              </p>
              <blockquote className="font-display italic text-[18px] sm:text-[20px] font-medium text-[#F6F1E8] leading-[1.48]">
                “{OPENING_QUESTION}”
              </blockquote>
            </div>

            {/* Restrained Technology Strip */}
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

      {/* 2. Primary Visual Evidence — Hospital Management Project Overview Visual */}
      <div className="bg-[#0B1219] border-b border-[#D9C4A0]/14 px-3 sm:px-6 lg:px-10 pt-5 sm:pt-7 pb-4 sm:pb-6">
        <div className="max-w-[1024px] mx-auto">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="inline-flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
              <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
              <span>Project Overview Visual</span>
            </p>
            <span className="font-body text-xs text-[#D9C4A0]/75">
              Click to inspect full-resolution overview
            </span>
          </div>

          {!imgFailed ? (
            <button
              type="button"
              onClick={(e) => onOpenLightbox(e.currentTarget, primaryLightboxPayload)}
              aria-label="Enlarge Hospital Management Analytics System overview visual"
              className="block w-full p-1 sm:p-1.5 border border-[#D9C4A0]/22 hover:border-[#C49A52]/75 rounded-xl bg-[#142B40]/45 backdrop-blur-sm shadow-[0_20px_44px_-24px_rgba(0,0,0,0.75)] cursor-zoom-in transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
            >
              <span className="block w-full aspect-[1024/682] rounded-lg overflow-hidden bg-[#FFFFFF]">
                <img
                  src={HOSPITAL_MANAGEMENT_ASSET.src}
                  alt={HOSPITAL_MANAGEMENT_ASSET.alt}
                  width={HOSPITAL_MANAGEMENT_ASSET.width}
                  height={HOSPITAL_MANAGEMENT_ASSET.height}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgFailed(true)}
                  className="block w-full h-full object-contain"
                />
              </span>
            </button>
          ) : (
            <div className="w-full aspect-[1024/682] border border-[#D9C4A0]/20 rounded-xl bg-[#142B40] flex flex-col items-center justify-center p-6 text-center">
              <span className="font-heading text-xs uppercase tracking-[0.14em] text-[#C49A52] mb-2 tabular-nums">
                {project.index}
              </span>
              <span className="font-heading text-xl font-semibold text-[#F6F1E8]">
                {project.title}
              </span>
            </div>
          )}

          {/* Caption & Expand Control Strictly Outside Image Bounds */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-body text-xs sm:text-[13px] font-medium text-[#D9C4A0]/84 leading-[1.5]">
              {project.previewCaption}
            </p>

            {!imgFailed && (
              <button
                type="button"
                onClick={(e) => onOpenLightbox(e.currentTarget, primaryLightboxPayload)}
                aria-label="Expand Hospital Management Analytics System visual to full screen"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] text-xs font-semibold text-[#C49A52] hover:text-[#F6F1E8] bg-[#142B40]/55 hover:bg-[#19344D] border border-[#C49A52]/30 hover:border-[#C49A52]/70 rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] whitespace-nowrap"
              >
                <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Expand Preview</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Data Architecture Flow + Verified Analytical Findings + Case Study Trigger */}
      <div className="px-4 sm:px-7 lg:px-10 py-6 sm:py-8 space-y-7">
        {/* Data Architecture Flow (How the Solution Was Structured) */}
        <HospitalArchitectureDiagram />

        {/* Verified Analytical Findings (What the Records Revealed) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-[#C49A52]">
              Verified Analytical Findings
            </p>
            <span className="font-body text-xs text-[#D9C4A0]/82">
              Scope: Eight months of billing/payment data, with related records used for workload
              and record-quality analysis.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AUDIT_FINDINGS.map((finding) => (
              <div
                key={finding.label}
                className="rounded-xl bg-[#F8F4EC] text-[#101820] border border-[#C49A52]/40 p-5 flex flex-col justify-between gap-3.5"
              >
                <div className="space-y-2">
                  <p className="font-heading text-3xl sm:text-[2.1rem] font-bold tracking-[-0.03em] text-[#142B40] tabular-nums leading-none">
                    {finding.value}
                  </p>
                  <h4 className="font-heading text-sm font-bold text-[#7D5B22] leading-snug">
                    {finding.label}
                  </h4>
                  <p className="font-body text-xs sm:text-[13px] text-[#101820]/84 leading-[1.6]">
                    {finding.description}
                  </p>
                </div>

                <p className="pt-3 border-t border-[#142B40]/10 font-body text-xs text-[#4D5C6B] leading-[1.6]">
                  {finding.meaning}
                </p>
              </div>
            ))}
          </div>

          {/* Evidence Boundary Statement */}
          <div className="rounded-lg bg-[#142B40]/75 border border-[#D9C4A0]/18 px-4 py-3 flex items-start gap-2.5">
            <AlertCircle
              className="w-4 h-4 text-[#C49A52] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-xs sm:text-[13px] text-[#D9C4A0]/92 leading-relaxed">
              <span className="font-semibold text-[#F6F1E8]">Evidence Boundary:</span> These
              findings describe patterns observed in the analyzed records. They do not
              independently establish the underlying causes.
            </p>
          </div>
        </div>

        {/* Action Row Leading Into the Three-Act Story */}
        <div className="pt-2 border-t border-[#D9C4A0]/14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-body text-xs sm:text-[13.5px] text-[#D9C4A0]/84 max-w-[58ch] leading-[1.6]">
            Read the full three-act story—from the hospital reporting challenge and database design
            to review priorities and project boundaries.
          </p>

          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            aria-controls={`case-study-${project.id}`}
            className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-xs font-heading font-semibold tracking-[0.04em] rounded-lg border transition-[background-color,border-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap self-start sm:self-auto ${
              isExpanded
                ? 'bg-[#C49A52] border-[#C49A52] text-[#101820]'
                : 'bg-[#142B40]/55 border-[#C49A52]/45 text-[#F6F1E8] hover:border-[#C49A52] hover:bg-[#19344D] hover:text-[#C49A52]'
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
            <div className="px-4 sm:px-7 lg:px-10 py-8 sm:py-10 border-t border-[#C49A52]/25 bg-[#142B40]/58 space-y-10">
              {/* Act I · Understanding the Problem */}
              <section aria-labelledby="hm-act-1" className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#D9C4A0]/14">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="hm-act-1"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#C49A52]"
                  >
                    Act I · Understanding the Problem
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
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/88"
                    />
                  </div>

                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">02 ·</span>
                      The Challenge
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.businessChallenge}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/88"
                    />
                  </div>
                </div>
              </section>

              {/* Act II · Organizing the Data */}
              <section aria-labelledby="hm-act-2" className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#D9C4A0]/14">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="hm-act-2"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#C49A52]"
                  >
                    Act II · Organizing the Data
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
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/92"
                    />
                  </div>

                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">04 ·</span>
                      The Analytical Approach
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.approachAndTechnologies}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/88"
                    />
                  </div>
                </div>
              </section>

              {/* Act III · From Findings to Review Priorities */}
              <section aria-labelledby="hm-act-3" className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-[#D9C4A0]/14">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="hm-act-3"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#C49A52]"
                  >
                    Act III · From Findings to Review Priorities
                  </h4>
                </div>

                {/* 05 · What the Records Revealed */}
                <div className="rounded-2xl p-5 sm:p-7 border border-[#C49A52]/28 bg-[#101820]/80 backdrop-blur-md space-y-4">
                  <div className="space-y-1.5">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">05 ·</span>
                      What the Records Revealed
                    </h5>
                    <p className="font-body text-sm sm:text-[15px] text-[#D9C4A0]/90 leading-[1.7]">
                      {REVEALED_LEAD}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {REVEALED_BULLETS.map((item) => (
                      <li
                        key={item.lead}
                        className="flex items-start gap-3 font-body text-sm sm:text-[15px] leading-[1.72] text-[#F6F1E8]/92 max-w-[74ch]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                        />
                        <span>
                          <strong className="font-semibold text-[#C49A52]">{item.lead}</strong>{' '}
                          {item.rest}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="pt-2 border-t border-[#D9C4A0]/14 font-body text-sm sm:text-[15px] text-[#F6F1E8]/90 leading-[1.75] max-w-[68ch]">
                    {REVEALED_SYNTHESIS}
                  </p>
                </div>

                {/* 06 · Why It Matters & 07 · Project Boundaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#F6F1E8]">
                      <span className="text-[#C49A52] font-mono text-xs mr-2">06 ·</span>
                      Why It Matters
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.businessRelevance}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#F6F1E8]/88"
                    />
                  </div>

                  <div className="rounded-xl bg-[#101820]/65 border border-[#D9C4A0]/16 p-5 sm:p-6 space-y-2.5 max-w-[60ch]">
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
