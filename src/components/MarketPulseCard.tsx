import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Maximize2 } from 'lucide-react';
import type { FeaturedProject } from '../data/portfolioData';
import { PROJECT_PREVIEW_ASSETS } from '../data/projectAssets';
import { MOTION_TOKENS } from '../styles/designSystem';

interface MarketPulseCardProps {
  project: FeaturedProject;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onOpenLightbox: (triggerEl: HTMLButtonElement) => void;
}

const MARKETPULSE_PROJECT_TITLE = 'Multi-Domain E-Commerce Intelligence Platform';

/**
 * Dedicated screenshot-first editorial showcase card for MarketPulse.
 * Preserves the exact original 1415x791 Olist Marketplace Power BI screenshot
 * uncropped, unadorned, and separated cleanly from captions and interactive controls.
 */
export function MarketPulseCard({
  project,
  isExpanded,
  onToggleExpand,
  onOpenLightbox,
}: MarketPulseCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);
  const asset = PROJECT_PREVIEW_ASSETS[project.id];
  const hasVerifiedDemo = Boolean(project.demoUrl && project.demoUrl.trim().length > 0);

  return (
    <div className="rounded-xl border border-[#C49A52]/25 hover:border-[#C49A52]/45 bg-[#142B40] text-[#F6F1E8] transition-colors duration-200 overflow-hidden font-body">
      {/* 1–3. Top Editorial Identity Header */}
      <div className="px-5 sm:px-7 lg:px-9 pt-6 sm:pt-7 pb-5 sm:pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-2 min-w-0">
          <div className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] leading-[1.4] text-[#C49A52]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
            <span className="tabular-nums">{project.index}</span>
            <span aria-hidden="true" className="text-[#D9C4A0]/45">
              ·
            </span>
            <span>{project.categoryLabel}</span>
          </div>

          <div className="space-y-1">
            <h3 className="font-heading text-2xl sm:text-[1.85rem] lg:text-[2.05rem] font-bold tracking-[-0.025em] leading-[1.14] text-[#F6F1E8]">
              {project.title}
            </h3>
            <p className="font-heading text-[15px] sm:text-[17px] font-medium tracking-[-0.012em] leading-[1.35] text-[#D9C4A0]">
              {MARKETPULSE_PROJECT_TITLE}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 lg:text-right min-w-0 lg:max-w-[440px]">
          <p className="font-body text-xs sm:text-[13px] font-medium text-[#F6F1E8]/85 leading-[1.45]">
            <span className="text-[#C49A52]">Role:</span> {project.role}
          </p>
          <p className="font-body text-xs text-[#D9C4A0]/80 leading-[1.55] tracking-[0.005em]">
            {project.technologies.join(' · ')}
          </p>
        </div>
      </div>

      {/* 4. Original Olist Marketplace Dashboard Screenshot Presentation Stage */}
      <div className="bg-[#101820] border-y border-[#D9C4A0]/14 px-2.5 sm:px-5 lg:px-8 pt-3 sm:pt-5 lg:pt-6 pb-3 sm:pb-4">
        <div className="max-w-[1060px] mx-auto">
          {!imgFailed && asset ? (
            <button
              type="button"
              onClick={(e) => onOpenLightbox(e.currentTarget)}
              aria-label="Enlarge original MarketPulse Olist Marketplace Dashboard screenshot (Page 1: Executive Overview)"
              className="block w-full p-0 border border-[#D9C4A0]/20 hover:border-[#C49A52]/65 rounded-md bg-[#070E1A] cursor-zoom-in transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
            >
              <span className="block w-full aspect-[1415/791]">
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
            <div className="w-full aspect-[1415/791] border border-[#D9C4A0]/20 rounded-md bg-[#142B40] flex flex-col items-center justify-center p-6 text-center">
              <span className="font-heading text-xs uppercase tracking-[0.14em] text-[#C49A52] mb-2 tabular-nums">
                {project.index}
              </span>
              <span className="font-heading text-xl font-semibold text-[#F6F1E8]">
                {project.title}
              </span>
            </div>
          )}

          {/* Caption & Image-Enlargement Control Strictly Outside Screenshot Bounds */}
          <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-body text-[12px] sm:text-[12.5px] text-[#D9C4A0]/82 leading-[1.45]">
              {project.previewCaption}
            </p>

            {!imgFailed && asset && (
              <button
                type="button"
                onClick={(e) => onOpenLightbox(e.currentTarget)}
                aria-label="Expand Olist Marketplace Dashboard screenshot to full screen"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 -mx-2.5 sm:mx-0 min-h-[44px] text-xs font-medium text-[#C49A52] hover:text-[#D9C4A0] rounded-md transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] whitespace-nowrap"
              >
                <Maximize2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Expand Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5–7. Concise Approved Description & Separated Action Row */}
      <div className="px-5 sm:px-7 lg:px-9 py-5 sm:py-6 lg:py-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
        <p className="font-body text-sm sm:text-[15px] text-[#F6F1E8]/86 leading-[1.7] max-w-[62ch]">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {hasVerifiedDemo && project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/demo inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-[#C49A52] text-[#101820] hover:bg-[#D4AE6A] font-heading text-xs font-semibold tracking-[0.02em] rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap"
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
            className={`inline-flex items-center gap-2 px-4 py-2 min-h-[44px] text-xs font-heading font-semibold tracking-[0.04em] rounded-lg border transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap ${
              isExpanded
                ? 'bg-[#101820]/70 border-[#C49A52]/65 text-[#C49A52]'
                : 'border-[#D9C4A0]/28 text-[#F6F1E8] hover:border-[#C49A52] hover:text-[#C49A52]'
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

      {/* Preserved 7-Part Expandable Editorial Case Study Dossier */}
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
            <div className="px-5 sm:px-7 lg:px-9 py-7 sm:py-9 border-t border-[#C49A52]/25 bg-[#101820]/70 space-y-7">
              {/* Row 1: Business Context & Analytical Challenge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-1.5">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
                    01 · Business Context
                  </p>
                  <p className="font-body text-sm leading-[1.72] text-[#F6F1E8]/85">
                    {project.caseStudy.context}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
                    02 · Analytical Challenge
                  </p>
                  <p className="font-body text-sm leading-[1.72] text-[#F6F1E8]/85">
                    {project.caseStudy.businessChallenge}
                  </p>
                </div>
              </div>

              {/* Row 2: My Contribution & Data & Methodology */}
              <div className="pt-6 border-t border-[#D9C4A0]/12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-1.5">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
                    03 · My Contribution
                  </p>
                  <p className="font-body text-sm leading-[1.72] text-[#F6F1E8]/90">
                    {project.caseStudy.roleAndContribution}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
                    04 · Data &amp; Methodology
                  </p>
                  <p className="font-body text-sm leading-[1.72] text-[#F6F1E8]/85">
                    {project.caseStudy.approachAndTechnologies}
                  </p>
                </div>
              </div>

              {/* Highlighted Band: 05 Key Findings & Verified Evidence */}
              <div className="rounded-xl p-5 sm:p-6 border border-[#C49A52]/25 bg-[#142B40]/85 space-y-3">
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
                  05 · Key Findings &amp; Verified Evidence
                </p>
                <ul className="space-y-2.5">
                  {project.caseStudy.verifiedFindings.map((finding) => (
                    <li
                      key={finding}
                      className="flex items-start gap-3 font-body text-sm leading-[1.68] text-[#F6F1E8]/92"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                      />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Row 3: Business Implications & Limitations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-1.5">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
                    06 · Business Implications
                  </p>
                  <p className="font-body text-sm leading-[1.72] text-[#F6F1E8]/85">
                    {project.caseStudy.businessRelevance}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D9C4A0]">
                    07 · Limitations &amp; Project Evidence
                  </p>
                  <p className="font-body text-xs sm:text-sm leading-[1.72] text-[#D9C4A0]/85">
                    {project.caseStudy.limitationsAndEvidence}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
