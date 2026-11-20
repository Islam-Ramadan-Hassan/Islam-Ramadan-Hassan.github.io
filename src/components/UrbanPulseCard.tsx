import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronDown,
  Layers,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';
import type { FeaturedProject } from '../data/portfolioData';
import { URBANPULSE_OVERVIEW_ASSET } from '../data/projectAssets';
import { MOTION_TOKENS } from '../styles/designSystem';
import type { LightboxAssetPayload } from './MarketPulseCard';

interface UrbanPulseCardProps {
  project: FeaturedProject;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenLightbox: (triggerEl: HTMLButtonElement, asset: LightboxAssetPayload) => void;
}

const OPENING_QUESTION =
  'How can urban decision-makers explore different operational datasets without combining information that does not belong together or drawing conclusions the data cannot support?';

const OWNERSHIP_GROUPS = [
  {
    label: 'Team Leadership & Platform Design',
    badge: 'Four-Member Team',
    isDirect: false,
    items: [
      'Team Leader coordinating milestones and project scope.',
      'End-to-end ownership of platform UI/UX design.',
    ],
  },
  {
    label: 'Direct Analytical Ownership',
    badge: 'My Analysis',
    isDirect: true,
    items: [
      'NYC 311 Operations analysis — 6.68M historical records.',
      'Smart City LightGBM forecasting — synthetic sandbox.',
    ],
  },
  {
    label: 'Team-Owned Analytical Domains',
    badge: 'Leadership, Follow-up & Review',
    isDirect: false,
    items: [
      'Buildings Performance.',
      'Energy Intelligence.',
      'Buildings & Energy integration.',
    ],
  },
] as const;

const GOVERNANCE_SAFEGUARDS = [
  {
    index: '01',
    title: 'Independent Analytical Domains',
    summary: 'Buildings, Energy, and NYC 311 remain separate analytical domains.',
    detail: 'No unsupported cross-domain joins or cross-domain filtering.',
  },
  {
    index: '02',
    title: 'Governed Buildings & Energy Integration',
    summary: 'Targets property_id plus report_year—conditional on validation.',
    detail:
      'Requires annual aggregation, key validity checks, and cardinality validation. A technical relationship alone does not establish a valid analytical relationship or causation.',
  },
  {
    index: '03',
    title: 'Isolated Synthetic Forecasting',
    summary: 'Smart City uses a synthetic Kaggle digital twin dataset.',
    detail:
      'Not live city data and never combined with NYC 311, Buildings, or Energy metrics.',
  },
] as const;

const NYC311_FINDINGS = [
  {
    metric: '6.68 million service requests analyzed',
    detail: 'providing a substantial historical view of reported city service demand.',
  },
  {
    metric: '65.28% combined NYPD and HPD share',
    detail: 'showing the concentration of requests across these two agencies.',
  },
  {
    metric: '3.06× seasonal heating peak',
    detail: 'heating complaints reached 3.06 times their 24-month average in December 2024.',
  },
] as const;

const SMART_CITY_FINDINGS = [
  {
    metric: '7.78 MWh MAE',
    detail: 'on the 2025 test split.',
  },
  {
    metric: '0.9964 R²',
    detail: 'on the synthetic dataset.',
  },
  {
    metric: 'Approximately 19% lower error',
    detail: 'compared with the baseline.',
  },
] as const;

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
 * Custom architectural SVG/React diagram visualizing UrbanPulse's multi-workspace
 * governance boundaries: 3 independent domains, 1 governed Buildings & Energy
 * integration workspace (explicitly excluding NYC 311), and 1 isolated synthetic
 * Smart City Digital Twin Sandbox.
 */
function UrbanPulseArchitectureDiagram() {
  return (
    <div className="rounded-xl border border-[#142B40]/14 bg-[#FFFFFF]/90 backdrop-blur-sm p-4 sm:p-6 shadow-[0_12px_28px_-22px_rgba(20,43,64,0.25)]">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#142B40]/10">
        <div className="inline-flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#7D5B22] shrink-0" aria-hidden="true" />
          <h4 className="font-heading text-xs sm:text-[13px] font-bold uppercase tracking-[0.12em] text-[#142B40]">
            Multi-Workspace Architecture &amp; Governance Boundaries
          </h4>
        </div>
        <span className="font-mono text-[11px] text-[#4D5C6B]">
          Independent domains · Governed integration · Isolated sandbox
        </span>
      </div>

      {/* Desktop & Wide Tablet Architectural SVG Diagram */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 1000 326"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="urbanpulse-arch-title urbanpulse-arch-desc"
          className="block w-full h-auto select-none"
        >
          <title id="urbanpulse-arch-title">
            UrbanPulse Multi-Workspace Architecture and Governance Boundaries
          </title>
          <desc id="urbanpulse-arch-desc">
            Diagram showing three independent analytical domains (Buildings Performance, Energy
            Intelligence, and NYC 311 Operations), a governed Buildings and Energy integration
            workspace connected only to Buildings and Energy at the property_id and report_year
            grain, and a strictly isolated Smart City Digital Twin Sandbox based on a synthetic
            Kaggle dataset.
          </desc>

          {/* Left Zone Container: Historical Urban Domains */}
          <rect
            x="6"
            y="8"
            width="672"
            height="310"
            rx="14"
            fill="#F8F4EC"
            stroke="#142B40"
            strokeOpacity="0.16"
            strokeWidth="1.2"
          />
          <text
            x="24"
            y="32"
            fill="#7D5B22"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
            letterSpacing="0.12em"
          >
            INDEPENDENT ANALYTICAL DOMAINS (NO CROSS-DOMAIN MERGE)
          </text>

          {/* 1. Buildings Performance */}
          <rect
            x="24"
            y="48"
            width="200"
            height="86"
            rx="10"
            fill="#FFFFFF"
            stroke="#142B40"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
          <rect x="24" y="48" width="200" height="4" rx="2" fill="#142B40" fillOpacity="0.78" />
          <text
            x="38"
            y="72"
            fill="#142B40"
            fontSize="13.5"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            Buildings Performance
          </text>
          <text x="38" y="92" fill="#4D5C6B" fontSize="11" fontFamily="Inter, sans-serif">
            Independent analytical domain
          </text>
          <text
            x="38"
            y="116"
            fill="#7D5B22"
            fontSize="10"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            TEAM-OWNED · REVIEW ONLY
          </text>

          {/* 2. Energy Intelligence */}
          <rect
            x="242"
            y="48"
            width="200"
            height="86"
            rx="10"
            fill="#FFFFFF"
            stroke="#142B40"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
          <rect x="242" y="48" width="200" height="4" rx="2" fill="#142B40" fillOpacity="0.78" />
          <text
            x="256"
            y="72"
            fill="#142B40"
            fontSize="13.5"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            Energy Intelligence
          </text>
          <text x="256" y="92" fill="#4D5C6B" fontSize="11" fontFamily="Inter, sans-serif">
            Independent analytical domain
          </text>
          <text
            x="256"
            y="116"
            fill="#7D5B22"
            fontSize="10"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            TEAM-OWNED · REVIEW ONLY
          </text>

          {/* 3. NYC 311 Operations (Strictly Separated — No Connector to Buildings & Energy) */}
          <rect
            x="462"
            y="48"
            width="200"
            height="252"
            rx="10"
            fill="#FFFFFF"
            stroke="#C49A52"
            strokeWidth="1.5"
          />
          <rect x="462" y="48" width="200" height="4" rx="2" fill="#C49A52" />
          <text
            x="476"
            y="72"
            fill="#142B40"
            fontSize="13.5"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            NYC 311 Operations
          </text>
          <text x="476" y="92" fill="#4D5C6B" fontSize="11" fontFamily="Inter, sans-serif">
            Independent historical domain
          </text>
          <line x1="476" y1="106" x2="648" y2="106" stroke="#142B40" strokeOpacity="0.1" />
          <text
            x="476"
            y="128"
            fill="#142B40"
            fontSize="11.5"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            6.68M service records
          </text>
          <text x="476" y="148" fill="#4D5C6B" fontSize="11" fontFamily="Inter, sans-serif">
            NYPD &amp; HPD: 65.28% share
          </text>
          <text x="476" y="166" fill="#4D5C6B" fontSize="11" fontFamily="Inter, sans-serif">
            Heating peak: 3.06× (Dec 2024)
          </text>
          <rect
            x="476"
            y="186"
            width="172"
            height="64"
            rx="7"
            fill="#EFE8DC"
            stroke="#C49A52"
            strokeOpacity="0.45"
          />
          <text
            x="486"
            y="204"
            fill="#7D5B22"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            DATA QUALITY BOUNDARY
          </text>
          <text x="486" y="220" fill="#142B40" fontSize="10" fontFamily="Inter, sans-serif">
            SLA &amp; resolution times limited
          </text>
          <text x="486" y="235" fill="#4D5C6B" fontSize="10" fontFamily="Inter, sans-serif">
            by missing closure timestamps.
          </text>
          <text
            x="476"
            y="282"
            fill="#7D5B22"
            fontSize="10"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            DIRECT OWNERSHIP · ISOLATED
          </text>

          {/* Governed Connectors from Buildings & Energy ONLY into Integrated Workspace */}
          <path
            d="M124 134 V156 H233 V178"
            stroke="#7D5B22"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d="M342 134 V156 H233"
            stroke="#7D5B22"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <polygon points="233,182 228,174 238,174" fill="#7D5B22" />

          {/* 4. Buildings & Energy Integrated Analytical Workspace */}
          <rect
            x="24"
            y="184"
            width="418"
            height="116"
            rx="10"
            fill="#FFFFFF"
            stroke="#7D5B22"
            strokeWidth="1.4"
            strokeDasharray="5 3"
          />
          <text
            x="38"
            y="207"
            fill="#7D5B22"
            fontSize="10"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
            letterSpacing="0.1em"
          >
            GOVERNED INTEGRATED WORKSPACE
          </text>
          <text
            x="38"
            y="227"
            fill="#142B40"
            fontSize="14"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            Buildings &amp; Energy
          </text>
          <text
            x="38"
            y="246"
            fill="#142B40"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
          >
            Targets: property_id + report_year
          </text>
          <text x="38" y="264" fill="#4D5C6B" fontSize="10.5" fontFamily="Inter, sans-serif">
            Annual aggregation, key validity &amp; cardinality checks required · No causal claims.
          </text>
          <text
            x="38"
            y="285"
            fill="#7D5B22"
            fontSize="10"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            TEAM-OWNED INTEGRATION · VALIDATION-GATED
          </text>

          {/* Explicit Vertical Isolation Divider */}
          <line
            x1="696"
            y1="18"
            x2="696"
            y2="308"
            stroke="#C49A52"
            strokeWidth="1.6"
            strokeDasharray="6 5"
          />

          {/* Right Zone Container: Isolated Synthetic Smart City Sandbox */}
          <rect
            x="714"
            y="8"
            width="280"
            height="310"
            rx="14"
            fill="#142B40"
            stroke="#C49A52"
            strokeOpacity="0.65"
            strokeWidth="1.4"
          />
          <text
            x="732"
            y="32"
            fill="#C49A52"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
            letterSpacing="0.12em"
          >
            SEPARATE SYNTHETIC DOMAIN
          </text>

          <rect
            x="732"
            y="48"
            width="244"
            height="252"
            rx="10"
            fill="#101820"
            fillOpacity="0.72"
            stroke="#C49A52"
            strokeOpacity="0.38"
            strokeWidth="1.2"
          />
          <text
            x="748"
            y="74"
            fill="#F6F1E8"
            fontSize="14"
            fontWeight="700"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            Smart City Digital Twin
          </text>
          <text
            x="748"
            y="92"
            fill="#C49A52"
            fontSize="11.5"
            fontWeight="600"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
            Sandbox Environment
          </text>
          <line x1="748" y1="106" x2="960" y2="106" stroke="#D9C4A0" strokeOpacity="0.16" />

          <text x="748" y="128" fill="#D9C4A0" fontSize="11" fontFamily="Inter, sans-serif">
            Source: Synthetic Kaggle Dataset
          </text>
          <text
            x="748"
            y="148"
            fill="#F6F1E8"
            fontSize="11.5"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
          >
            LightGBM · 2025 Test Split
          </text>
          <text x="748" y="167" fill="#D9C4A0" fontSize="11" fontFamily="JetBrains Mono, monospace">
            MAE: 7.78 MWh · R²: 0.9964
          </text>
          <text x="748" y="185" fill="#D9C4A0" fontSize="11" fontFamily="Inter, sans-serif">
            ~19% lower error vs. baseline
          </text>

          <rect
            x="748"
            y="202"
            width="212"
            height="54"
            rx="7"
            fill="#142B40"
            stroke="#C49A52"
            strokeOpacity="0.4"
          />
          <text
            x="758"
            y="220"
            fill="#C49A52"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            STRICT ISOLATION RULE
          </text>
          <text x="758" y="236" fill="#F6F1E8" fontSize="10" fontFamily="Inter, sans-serif">
            Not live city data · Never joined
          </text>
          <text x="758" y="249" fill="#D9C4A0" fontSize="10" fontFamily="Inter, sans-serif">
            with NYC 311, Buildings, or Energy.
          </text>

          <text
            x="748"
            y="282"
            fill="#C49A52"
            fontSize="10"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
          >
            DIRECT OWNERSHIP · SYNTHETIC
          </text>
        </svg>
      </div>

      {/* Mobile & Compact Tablet Stacked Architecture Diagram (Preserves 100% Readability) */}
      <div className="md:hidden space-y-3.5">
        <div className="rounded-xl bg-[#F8F4EC] border border-[#142B40]/14 p-3.5 space-y-3">
          <p className="font-heading text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#7D5B22]">
            Independent Analytical Domains
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="rounded-lg bg-[#FFFFFF] border border-[#142B40]/16 p-3 space-y-1">
              <p className="font-heading text-sm font-bold text-[#142B40]">Buildings Performance</p>
              <p className="text-xs text-[#4D5C6B]">Independent domain</p>
              <p className="font-mono text-[10.5px] font-semibold text-[#7D5B22]">
                TEAM-OWNED · REVIEW ONLY
              </p>
            </div>

            <div className="rounded-lg bg-[#FFFFFF] border border-[#142B40]/16 p-3 space-y-1">
              <p className="font-heading text-sm font-bold text-[#142B40]">Energy Intelligence</p>
              <p className="text-xs text-[#4D5C6B]">Independent domain</p>
              <p className="font-mono text-[10.5px] font-semibold text-[#7D5B22]">
                TEAM-OWNED · REVIEW ONLY
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-[#FFFFFF] border border-dashed border-[#7D5B22] p-3 space-y-1">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-[#7D5B22]">
              Governed Integrated Workspace (Buildings + Energy Only)
            </p>
            <p className="font-heading text-sm font-bold text-[#142B40]">Buildings &amp; Energy</p>
            <p className="font-mono text-[11px] text-[#142B40]">
              Targets: property_id + report_year
            </p>
            <p className="text-xs text-[#4D5C6B] leading-relaxed">
              Annual aggregation, key validity &amp; cardinality checks required · Team-owned.
            </p>
          </div>

          <div className="rounded-lg bg-[#FFFFFF] border border-[#C49A52] p-3 space-y-1">
            <p className="font-heading text-sm font-bold text-[#142B40]">NYC 311 Operations</p>
            <p className="text-xs text-[#4D5C6B]">
              Independent historical domain · 6.68M records · Not merged with Buildings or Energy.
            </p>
            <p className="font-mono text-[10.5px] font-semibold text-[#7D5B22]">
              DIRECT OWNERSHIP · SLA TIMESTAMP-LIMITED
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#7D5B22] px-1">
          <span className="h-px flex-1 border-t border-dashed border-[#C49A52]" aria-hidden="true" />
          <span>ISOLATED ENVIRONMENT</span>
          <span className="h-px flex-1 border-t border-dashed border-[#C49A52]" aria-hidden="true" />
        </div>

        <div className="rounded-xl bg-[#142B40] text-[#F6F1E8] border border-[#C49A52]/60 p-3.5 space-y-1.5">
          <p className="font-heading text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#C49A52]">
            Separate Synthetic Domain
          </p>
          <p className="font-heading text-sm font-bold text-[#F6F1E8]">
            Smart City Digital Twin Sandbox
          </p>
          <p className="text-xs text-[#D9C4A0]/90 leading-relaxed">
            Synthetic Kaggle dataset · LightGBM (2025 test: MAE 7.78 MWh, R² 0.9964) · Never live
            city data or merged with other domains.
          </p>
          <p className="font-mono text-[10.5px] font-semibold text-[#C49A52]">
            DIRECT OWNERSHIP · SYNTHETIC SANDBOX
          </p>
        </div>
      </div>

      {/* Screen-reader semantic outline */}
      <ul className="sr-only">
        <li>Buildings Performance: Independent analytical domain, team-owned analysis.</li>
        <li>Energy Intelligence: Independent analytical domain, team-owned analysis.</li>
        <li>NYC 311 Operations: Independent historical analytical domain, direct analytical ownership.</li>
        <li>
          Buildings and Energy: Team-owned integration workspace targeting property_id plus
          report_year, requiring annual aggregation, key validity, and cardinality checks.
        </li>
        <li>
          Smart City Digital Twin Sandbox: Separate synthetic Kaggle domain, direct analytical
          ownership of LightGBM forecasting, isolated from all other domains.
        </li>
      </ul>
    </div>
  );
}

/**
 * Editorial storytelling showcase card for UrbanPulse.
 * Communicates governed multi-workspace urban analytics through a Soft Ivory &
 * Midnight Navy identity: story lead + opening question, actual Executive Overview
 * screenshot, multi-workspace architecture, compact ownership strip, restrained
 * governance safeguards, and the full 3-Act / 7-section narrative.
 */
export function UrbanPulseCard({
  project,
  isExpanded,
  onToggleExpand,
  onOpenLightbox,
}: UrbanPulseCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  const overviewLightboxPayload: LightboxAssetPayload = {
    title: 'UrbanPulse Executive Overview',
    caption: project.previewCaption,
    src: URBANPULSE_OVERVIEW_ASSET.src,
    alt: URBANPULSE_OVERVIEW_ASSET.alt,
    width: URBANPULSE_OVERVIEW_ASSET.width,
    height: URBANPULSE_OVERVIEW_ASSET.height,
  };

  return (
    <div className="relative rounded-2xl border border-[#D9C4A0]/60 hover:border-[#C49A52] bg-[#F8F4EC] text-[#101820] shadow-[0_22px_48px_-28px_rgba(0,0,0,0.45)] transition-colors duration-200 overflow-hidden font-body">
      {/* Subtle Top Urban-Grid Atmospheric Wash & Antique-Gold Hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(ellipse_at_18%_0%,rgba(255,255,255,0.85)_0%,rgba(196,154,82,0.08)_48%,transparent_76%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-[#7D5B22]/45 to-transparent"
      />

      {/* 1. Editorial Project Identity & Story Opening */}
      <div className="relative z-10 px-4 sm:px-7 lg:px-10 pt-6 sm:pt-8 pb-6 sm:pb-7 space-y-6">
        {/* Top Metadata Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-[#142B40]/12">
          <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] leading-[1.4] text-[#7D5B22]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
            <span className="tabular-nums">{project.index}</span>
            <span aria-hidden="true" className="text-[#142B40]/35">
              ·
            </span>
            <span>{project.categoryLabel}</span>
            {project.projectContextLabel && (
              <>
                <span aria-hidden="true" className="text-[#142B40]/35">
                  ·
                </span>
                <span className="text-[#4D5C6B] normal-case tracking-[0.015em] font-medium">
                  {project.projectContextLabel}
                </span>
              </>
            )}
          </div>

          <p className="inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF]/75 backdrop-blur-md border border-[#142B40]/12 font-body text-xs text-[#142B40]/90 self-start lg:self-auto">
            <span className="text-[#7D5B22] font-semibold">Role:</span>
            <span>{project.role}</span>
          </p>
        </div>

        {/* Title, Main Story Headline, Introduction & Opening Business Question */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-7 space-y-4 min-w-0">
            <div className="space-y-1.5">
              <h3 className="font-heading text-[clamp(1.75rem,3vw,2.35rem)] font-bold tracking-[-0.025em] leading-[1.12] text-[#142B40]">
                {project.title}
              </h3>
              <p className="font-heading text-sm sm:text-[15.5px] font-medium tracking-[-0.005em] text-[#7D5B22]">
                {project.subtitle}
              </p>
            </div>

            {/* Main Story Headline */}
            <p className="font-heading text-[clamp(1.2rem,2.1vw,1.6rem)] font-semibold tracking-[-0.02em] leading-[1.28] text-[#142B40] max-w-[34ch]">
              {project.headline}
            </p>

            {/* Introduction (3 concise narrative paragraphs) */}
            <NarrativeParagraphs
              text={project.description}
              className="font-body text-sm sm:text-[15px] text-[#101820]/84 leading-[1.76] max-w-[62ch]"
            />
          </div>

          {/* Opening Business Question — Restrained Glassmorphic Callout */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div className="rounded-xl bg-[#FFFFFF]/82 backdrop-blur-md border border-[#142B40]/14 border-l-2 border-l-[#7D5B22] p-5 sm:p-6 space-y-2.5 shadow-[0_14px_30px_-22px_rgba(20,43,64,0.28)]">
              <p className="font-heading text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#7D5B22]">
                Opening Business Question
              </p>
              <blockquote className="font-display italic text-[18px] sm:text-[20px] font-semibold text-[#142B40] leading-[1.48]">
                “{OPENING_QUESTION}”
              </blockquote>
            </div>

            {/* Restrained Technology Strip */}
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

      {/* 2. Primary Visual Evidence — Actual Executive Overview Interface */}
      <div className="bg-[#EFE8DC]/78 border-y border-[#142B40]/12 px-3 sm:px-6 lg:px-10 pt-5 sm:pt-7 pb-4 sm:pb-6">
        <div className="max-w-[1024px] mx-auto">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="inline-flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7D5B22]">
              <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
              <span>UrbanPulse Executive Overview</span>
            </p>
            <span className="font-body text-xs text-[#4D5C6B]">
              Actual application interface · Click to inspect full screen
            </span>
          </div>

          {!imgFailed ? (
            <button
              type="button"
              onClick={(e) => onOpenLightbox(e.currentTarget, overviewLightboxPayload)}
              aria-label="Enlarge UrbanPulse Executive Overview Dashboard screenshot"
              className="block w-full p-1 sm:p-1.5 border border-[#142B40]/16 hover:border-[#C49A52] rounded-xl bg-[#FFFFFF]/90 backdrop-blur-sm shadow-[0_18px_38px_-24px_rgba(20,43,64,0.3)] cursor-zoom-in transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
            >
              <span className="block w-full aspect-[1024/503] rounded-lg overflow-hidden bg-[#FFFFFF]">
                <img
                  src={URBANPULSE_OVERVIEW_ASSET.src}
                  alt={URBANPULSE_OVERVIEW_ASSET.alt}
                  width={URBANPULSE_OVERVIEW_ASSET.width}
                  height={URBANPULSE_OVERVIEW_ASSET.height}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgFailed(true)}
                  className="block w-full h-full object-contain"
                />
              </span>
            </button>
          ) : (
            <div className="w-full aspect-[1024/503] border border-[#142B40]/16 rounded-xl bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center">
              <span className="font-heading text-xs uppercase tracking-[0.14em] text-[#7D5B22] mb-2 tabular-nums">
                {project.index}
              </span>
              <span className="font-heading text-xl font-semibold text-[#142B40]">
                UrbanPulse Executive Overview
              </span>
            </div>
          )}

          {/* Caption & Expand Control Strictly Outside Screenshot Bounds */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-body text-xs sm:text-[13px] font-medium text-[#4D5C6B] leading-[1.5]">
              {project.previewCaption}
            </p>

            {!imgFailed && (
              <button
                type="button"
                onClick={(e) => onOpenLightbox(e.currentTarget, overviewLightboxPayload)}
                aria-label="Expand UrbanPulse Executive Overview Dashboard to full screen"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] text-xs font-semibold text-[#7D5B22] hover:text-[#142B40] bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] border border-[#142B40]/16 hover:border-[#C49A52] rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] whitespace-nowrap"
              >
                <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Expand Overview</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Architecture, Compact Ownership & Restrained Governance Safeguards */}
      <div className="px-4 sm:px-7 lg:px-10 py-6 sm:py-8 space-y-6">
        {/* Multi-Workspace Architecture Diagram */}
        <UrbanPulseArchitectureDiagram />

        {/* Compact Ownership Overview (Direct vs. Team-Owned) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {OWNERSHIP_GROUPS.map((group) => (
            <div
              key={group.label}
              className={`rounded-xl p-4 sm:p-5 space-y-2.5 border ${
                group.isDirect
                  ? 'bg-[#FFFFFF] border-[#C49A52]/55 border-l-2 border-l-[#C49A52] shadow-[0_12px_26px_-22px_rgba(20,43,64,0.28)]'
                  : 'bg-[#FFFFFF]/80 border-[#142B40]/12'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-heading text-xs font-bold uppercase tracking-[0.1em] text-[#142B40]">
                  {group.label}
                </h4>
                <span
                  className={`font-mono text-[10.5px] font-semibold shrink-0 ${
                    group.isDirect ? 'text-[#7D5B22]' : 'text-[#4D5C6B]'
                  }`}
                >
                  {group.badge}
                </span>
              </div>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs sm:text-[13px] text-[#4D5C6B] leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data Governance & Safeguards Visual (Deliberate Analytical Safeguards) */}
        <div className="rounded-xl border border-[#142B40]/14 bg-[#EFE8DC]/75 p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#142B40]/10">
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7D5B22] shrink-0" aria-hidden="true" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#142B40]">
                Data Governance &amp; Analytical Safeguards
              </h4>
            </div>
            <span className="font-mono text-[11px] text-[#4D5C6B]">
              Deliberate design boundaries protecting credibility
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GOVERNANCE_SAFEGUARDS.map((item) => (
              <div
                key={item.index}
                className="rounded-lg bg-[#FFFFFF]/88 border border-[#142B40]/10 p-4 space-y-1.5"
              >
                <p className="font-mono text-[10.5px] font-semibold text-[#7D5B22]">
                  {item.index} · Safeguard
                </p>
                <p className="font-heading text-[13.5px] font-bold text-[#142B40] leading-snug">
                  {item.title}
                </p>
                <p className="text-xs font-medium text-[#142B40]/88 leading-relaxed">
                  {item.summary}
                </p>
                <p className="text-xs text-[#4D5C6B] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="pt-1 text-xs text-[#4D5C6B] leading-relaxed">
            <span className="font-semibold text-[#142B40]">Additional Analytical Limitation:</span>{' '}
            NYC 311 SLA and resolution-time KPIs remain limited because closure timestamps are
            missing or inconsistent.
          </p>
        </div>

        {/* Action Row Leading Into the Three-Act Story */}
        <div className="pt-2 border-t border-[#142B40]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-body text-xs sm:text-[13.5px] text-[#4D5C6B] leading-[1.6] max-w-[56ch]">
            Read the full three-act story—covering the multi-workspace approach, separated NYC 311
            and Smart City findings, business meaning, and project boundaries.
          </p>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold py-2 min-h-[44px] text-[#142B40] hover:text-[#7D5B22] transition-colors duration-200 whitespace-nowrap"
              >
                <span>View on GitHub</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
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
                  ? 'bg-[#142B40] border-[#142B40] text-[#F6F1E8]'
                  : 'bg-[#FFFFFF] border-[#142B40]/24 text-[#142B40] hover:border-[#7D5B22] hover:text-[#7D5B22]'
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
            <div className="px-4 sm:px-7 lg:px-10 py-8 sm:py-10 border-t border-[#142B40]/12 bg-[#FFFFFF] space-y-10">
              {/* Act I · Understanding the Challenge */}
              <section aria-labelledby="up-act-1" className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#142B40]/10">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="up-act-1"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#7D5B22]"
                  >
                    Act I · Understanding the Challenge
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">01 ·</span>
                      The Urban Analytics Context
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.context}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84"
                    />
                  </div>

                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">02 ·</span>
                      The Challenge
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.businessChallenge}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84"
                    />
                  </div>
                </div>
              </section>

              {/* Act II · Building a Governed Analytical Experience */}
              <section aria-labelledby="up-act-2" className="space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-[#142B40]/10">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="up-act-2"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#7D5B22]"
                  >
                    Act II · Building a Governed Analytical Experience
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-3 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">03 ·</span>
                      My Contribution
                    </h5>
                    <p className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/88">
                      I led a four-member team and took end-to-end ownership of the platform&apos;s
                      UI/UX design, including how users navigate between workspaces and understand
                      the available analytical views.
                    </p>
                    <div className="space-y-2">
                      <p className="font-body text-sm sm:text-[15px] font-medium text-[#142B40]">
                        My direct analytical responsibilities covered two areas:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2.5 text-sm sm:text-[14.5px] leading-[1.7] text-[#101820]/86">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                          />
                          <span>
                            <strong className="font-semibold text-[#142B40]">
                              NYC 311 Operations
                            </strong>
                            , where I analyzed historical service request records and examined
                            agency distribution and seasonal patterns.
                          </span>
                        </li>
                        <li className="flex items-start gap-2.5 text-sm sm:text-[14.5px] leading-[1.7] text-[#101820]/86">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                          />
                          <span>
                            <strong className="font-semibold text-[#142B40]">
                              Smart City Forecasting
                            </strong>
                            , where I developed and evaluated a LightGBM forecasting model using a
                            synthetic Kaggle digital twin dataset.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <p className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84">
                      Buildings Performance and Energy Intelligence were analyzed by teammates. The
                      Buildings &amp; Energy integration workspace was also team-owned, with my
                      involvement limited to leadership, follow-up, and review.
                    </p>
                  </div>

                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">04 ·</span>
                      The Analytical Approach
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.approachAndTechnologies}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84"
                    />
                  </div>
                </div>
              </section>

              {/* Act III · What the Analysis Revealed */}
              <section aria-labelledby="up-act-3" className="space-y-7">
                <div className="flex items-center gap-3 pb-3 border-b border-[#142B40]/10">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                  <h4
                    id="up-act-3"
                    className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-[#7D5B22]"
                  >
                    Act III · What the Analysis Revealed
                  </h4>
                </div>

                {/* 05 · Findings from Two Different Data Environments (Strictly Visually Separated) */}
                <div className="space-y-4">
                  <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                    <span className="text-[#7D5B22] font-mono text-xs mr-2">05 ·</span>
                    Findings from Two Different Data Environments
                  </h5>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Environment 1: NYC 311 — Historical Service Records */}
                    <div className="rounded-xl border border-[#142B40]/16 bg-[#F8F4EC] p-5 sm:p-6 flex flex-col justify-between gap-4">
                      <div className="space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#142B40]/12">
                          <p className="font-heading text-sm sm:text-[15px] font-bold text-[#142B40]">
                            NYC 311 — Historical Service Records
                          </p>
                          <span className="font-mono text-[10.5px] font-semibold px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#142B40]/14 text-[#7D5B22]">
                            Historical Dataset
                          </span>
                        </div>

                        <p className="text-xs sm:text-[13.5px] text-[#4D5C6B]">
                          The analysis highlighted two important patterns:
                        </p>

                        <ul className="space-y-2.5">
                          {NYC311_FINDINGS.map((item) => (
                            <li
                              key={item.metric}
                              className="flex items-start gap-2.5 text-sm leading-[1.68] text-[#101820]/88"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                              />
                              <span>
                                <strong className="font-semibold text-[#142B40]">
                                  {item.metric}:
                                </strong>{' '}
                                {item.detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="pt-3 border-t border-[#142B40]/10 text-xs sm:text-[13.5px] text-[#4D5C6B] leading-[1.68]">
                        These findings provide a clearer view of how service demand is distributed
                        and how specific complaint categories can change across the year.
                      </p>
                    </div>

                    {/* Environment 2: Smart City — Synthetic Forecasting Sandbox */}
                    <div className="rounded-xl border border-[#C49A52]/45 bg-[#142B40] text-[#F6F1E8] p-5 sm:p-6 flex flex-col justify-between gap-4">
                      <div className="space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D9C4A0]/16">
                          <p className="font-heading text-sm sm:text-[15px] font-bold text-[#F6F1E8]">
                            Smart City — Synthetic Forecasting Sandbox
                          </p>
                          <span className="font-mono text-[10.5px] font-semibold px-2.5 py-1 rounded-md bg-[#101820]/70 border border-[#C49A52]/45 text-[#C49A52]">
                            Synthetic Sandbox
                          </span>
                        </div>

                        <p className="text-xs sm:text-[13.5px] text-[#D9C4A0]/88">
                          The separate synthetic forecasting experiment produced:
                        </p>

                        <ul className="space-y-2.5">
                          {SMART_CITY_FINDINGS.map((item) => (
                            <li
                              key={item.metric}
                              className="flex items-start gap-2.5 text-sm leading-[1.68] text-[#F6F1E8]/92"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2.5 w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                              />
                              <span>
                                <strong className="font-semibold text-[#C49A52]">
                                  {item.metric}
                                </strong>{' '}
                                {item.detail}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="pt-3 border-t border-[#D9C4A0]/16 text-xs sm:text-[13.5px] text-[#D9C4A0]/90 leading-[1.68]">
                        The model results demonstrate predictive performance within the synthetic
                        experiment. They should not be interpreted as validated forecasting
                        performance on live city operations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 06 · Why It Matters & 07 · Project Boundaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">06 ·</span>
                      Why It Matters
                    </h5>
                    <NarrativeParagraphs
                      text={project.caseStudy.businessRelevance}
                      className="font-body text-sm sm:text-[15px] leading-[1.78] text-[#101820]/84"
                    />
                  </div>

                  <div className="rounded-xl bg-[#F8F4EC] border border-[#142B40]/12 p-5 sm:p-6 space-y-2.5 max-w-[60ch]">
                    <h5 className="font-heading text-sm font-semibold tracking-[0.02em] text-[#142B40]">
                      <span className="text-[#7D5B22] font-mono text-xs mr-2">07 ·</span>
                      Project Boundaries
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
