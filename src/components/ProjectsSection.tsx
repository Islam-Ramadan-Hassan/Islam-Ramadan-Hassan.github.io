import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronDown, Play, X } from 'lucide-react';
import {
  FEATURED_PROJECTS,
  STORY_CHAPTERS,
  type FeaturedProject,
  type ProjectCategory,
} from '../data/portfolioData';
import { PROJECT_PREVIEW_ASSETS } from '../data/projectAssets';
import { INTERACTION_CLASSES, MOTION_TOKENS } from '../styles/designSystem';
import { GithubRepos } from './GithubRepos';
import { MarketPulseCard } from './MarketPulseCard';
import { SectionContainer } from './SectionContainer';

const CATEGORIES: ProjectCategory[] = [
  'All',
  'E-Commerce & Retail',
  'Urban Operations',
  'Healthcare & Data Quality',
];

function ProjectPreviewMedia({
  project,
  isHorizontal,
}: {
  project: FeaturedProject;
  isHorizontal: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const asset = PROJECT_PREVIEW_ASSETS[project.id];

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#101820] ${
        isHorizontal ? 'aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[340px]' : 'aspect-[16/10]'
      }`}
    >
      {!imgFailed && asset ? (
        <img
          src={asset.src}
          alt={asset.alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] ${
            asset.cropClassName || ''
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#142B40] to-[#101820]">
          <span className="font-mono text-xs text-[#C49A52] mb-2 tabular-nums">{project.index}</span>
          <span className="font-display text-2xl text-[#F6F1E8]">{project.title}</span>
        </div>
      )}

      {/* Measured contrast scrim for bottom caption legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#101820]/92 via-[#101820]/50 to-transparent pointer-events-none"
      />

      <div className="absolute inset-x-0 bottom-0 px-5 py-3.5 flex items-center justify-between gap-3 text-[11px] font-mono">
        <span className={project.isConceptPreview ? 'text-[#C49A52]' : 'text-[#D9C4A0]'}>
          {project.isConceptPreview ? 'Concept Preview' : 'Editorial Visual'}
        </span>
        <span className="text-[#F6F1E8]/80 truncate">{project.categoryLabel}</span>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeWalkthrough, setActiveWalkthrough] = useState<{
    title: string;
    url: string;
  } | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{
    title: string;
    caption: string;
    src: string;
    alt: string;
  } | null>(null);
  const walkthroughTriggerRef = useRef<HTMLButtonElement | null>(null);
  const walkthroughCloseRef = useRef<HTMLButtonElement | null>(null);
  const lightboxTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);

  const closeWalkthrough = () => {
    setActiveWalkthrough(null);
    window.requestAnimationFrame(() => {
      walkthroughTriggerRef.current?.focus();
    });
  };

  const closeLightbox = () => {
    setActiveLightbox(null);
    window.requestAnimationFrame(() => {
      lightboxTriggerRef.current?.focus();
    });
  };

  const filteredProjects =
    activeCategory === 'All'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((project) => project.category === activeCategory);

  useEffect(() => {
    if (!activeWalkthrough) return;
    walkthroughCloseRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeWalkthrough();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeWalkthrough]);

  useEffect(() => {
    if (!activeLightbox) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lightboxCloseRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
        return;
      }
      if (e.key === 'Tab') {
        // Close button is the sole interactive control inside the screenshot lightbox
        e.preventDefault();
        lightboxCloseRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeLightbox]);

  return (
    <>
      <SectionContainer id="projects" surface="midnight" padding="standard" showConnector>
        {/* Section Header & Functional Segmented Filter Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-14">
            <div className="space-y-3 max-w-2xl">
              <p className="font-mono text-xs tracking-wide text-[#C49A52]">
                {STORY_CHAPTERS.chapter03.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.95rem] font-semibold tracking-tight text-[#F6F1E8] leading-[1.08]">
                {STORY_CHAPTERS.chapter03.heading}
              </h2>
              <p className="text-sm sm:text-[15px] text-[#D9C4A0]/82 leading-[1.7] max-w-[60ch]">
                {STORY_CHAPTERS.chapter03.subtitle}
              </p>
            </div>

            {/* Interactive Segmented Domain Filter Buttons */}
            <div
              role="group"
              aria-label="Filter projects by domain"
              className="flex flex-wrap items-center gap-1.5 border border-[#D9C4A0]/18 p-1.5 bg-[#142B40]/75 rounded-xl self-start lg:self-end"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`relative px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-200 whitespace-nowrap min-h-[44px] active:scale-[0.985] ${
                      isActive
                        ? 'text-[#101820] font-semibold'
                        : 'text-[#D9C4A0]/88 hover:text-[#F6F1E8]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={prefersReducedMotion ? undefined : 'project-filter-active'}
                        transition={{
                          duration: MOTION_TOKENS.duration.micro,
                          ease: MOTION_TOKENS.ease,
                        }}
                        className="absolute inset-0 bg-[#C49A52] rounded-lg"
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric Editorial Showcase: Full-Width Features (01 & 02 Reversed) + Contrasting Diptych (03 & 04) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-8">
            {filteredProjects.map((project, idx) => {
              const isDarkCard = project.theme === 'dark';
              const isExpanded = expandedId === project.id;

              if (project.id === 'marketpulse') {
                const marketpulseAsset = PROJECT_PREVIEW_ASSETS[project.id];
                return (
                  <motion.article
                    key={project.id}
                    layout={!prefersReducedMotion ? 'position' : false}
                    initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
                    whileInView={MOTION_TOKENS.revealAnimate}
                    viewport={MOTION_TOKENS.viewport}
                    transition={{
                      duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
                      ease: MOTION_TOKENS.ease,
                    }}
                    className="lg:col-span-2"
                  >
                    <MarketPulseCard
                      project={project}
                      isExpanded={isExpanded}
                      onToggleExpand={() => setExpandedId(isExpanded ? null : project.id)}
                      onOpenLightbox={(triggerEl) => {
                        lightboxTriggerRef.current = triggerEl;
                        setActiveLightbox({
                          title: `${project.title} — Olist Marketplace Dashboard`,
                          caption: project.previewCaption,
                          src: marketpulseAsset.src,
                          alt: marketpulseAsset.alt,
                        });
                      }}
                    />
                  </motion.article>
                );
              }

              const isHorizontalFeature =
                (activeCategory === 'All' && (idx === 0 || idx === 1)) ||
                filteredProjects.length === 1;
              const isReversedMedia = activeCategory === 'All' && idx === 1;

              return (
                <motion.article
                  key={project.id}
                  layout={!prefersReducedMotion ? 'position' : false}
                  initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
                  whileInView={MOTION_TOKENS.revealAnimate}
                  viewport={MOTION_TOKENS.viewport}
                  transition={{
                    duration: MOTION_TOKENS.duration.standard,
                    ease: MOTION_TOKENS.ease,
                  }}
                  className={isHorizontalFeature ? 'lg:col-span-2' : 'flex flex-col'}
                >
                  <div
                    className={`group rounded-2xl border overflow-hidden flex-1 flex flex-col ${
                      isDarkCard
                        ? `${INTERACTION_CLASSES.cardHoverDark} bg-[#142B40] text-[#F6F1E8] border-[#C49A52]/25 hover:border-[#C49A52]/65 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]`
                        : `${INTERACTION_CLASSES.cardHoverIvory} bg-[#F8F4EC] text-[#101820] border-[#D9C4A0]/45 hover:border-[#C49A52] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]`
                    }`}
                  >
                  {/* Primary Card Surface */}
                  <div
                    className={
                      isHorizontalFeature
                        ? 'grid grid-cols-1 lg:grid-cols-12 items-stretch'
                        : 'flex flex-col flex-1'
                    }
                  >
                    {/* Visual Preview Column */}
                    <div
                      className={`flex flex-col ${
                        isHorizontalFeature
                          ? `lg:col-span-5 ${
                              isReversedMedia ? 'lg:order-2 lg:border-l' : 'lg:order-1 lg:border-r'
                            } ${isDarkCard ? 'border-[#D9C4A0]/12' : 'border-[#142B40]/10'}`
                          : `border-b ${isDarkCard ? 'border-[#D9C4A0]/12' : 'border-[#142B40]/10'}`
                      }`}
                    >
                      <div className="flex-1">
                        <ProjectPreviewMedia
                          project={project}
                          isHorizontal={isHorizontalFeature}
                        />
                      </div>
                      <p
                        className={`px-5 py-2.5 text-[11px] font-mono border-t ${
                          isDarkCard
                            ? 'text-[#D9C4A0]/82 border-[#D9C4A0]/12 bg-[#101820]/55'
                            : 'text-[#4D5C6B] border-[#142B40]/10 bg-[#EFE8DC]/85'
                        }`}
                      >
                        {project.previewCaption}
                      </p>
                    </div>

                    {/* Analytical Content Column */}
                    <div
                      className={`p-6 sm:p-8 lg:p-9 flex flex-col justify-between ${
                        isHorizontalFeature
                          ? `lg:col-span-7 ${isReversedMedia ? 'lg:order-1' : 'lg:order-2'}`
                          : 'flex-1'
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Project Number · Exact Category */}
                        <div
                          className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs ${
                            isDarkCard ? 'text-[#C49A52]' : 'text-[#7D5B22]'
                          }`}
                        >
                          <span className="tabular-nums font-medium">{project.index}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.categoryLabel}</span>
                        </div>

                        {/* Title, Headline & Role */}
                        <div className="space-y-2">
                          <h3
                            className={`font-display text-2xl sm:text-3xl lg:text-[2rem] font-semibold tracking-tight leading-[1.12] ${
                              isDarkCard ? 'text-[#F6F1E8]' : 'text-[#142B40]'
                            }`}
                          >
                            {project.title}
                          </h3>
                          <p
                            className={`text-base sm:text-[17px] font-medium leading-snug ${
                              isDarkCard ? 'text-[#F6F1E8]/92' : 'text-[#142B40]'
                            }`}
                          >
                            {project.headline}
                          </p>
                          <p
                            className={`text-xs sm:text-[13px] font-medium pt-0.5 ${
                              isDarkCard ? 'text-[#D9C4A0]/92' : 'text-[#4D5C6B]'
                            }`}
                          >
                            My Role: {project.role}
                          </p>
                        </div>

                        {/* Concise Description */}
                        <p
                          className={`text-sm sm:text-[15px] leading-[1.68] ${
                            isDarkCard ? 'text-[#F6F1E8]/82' : 'text-[#101820]/82'
                          }`}
                        >
                          {project.description}
                        </p>

                        {/* Structured Verified Evidence Metric Grid */}
                        <div
                          className={`pt-4 pb-4 border-y space-y-2.5 ${
                            isDarkCard ? 'border-[#D9C4A0]/15' : 'border-[#142B40]/12'
                          }`}
                        >
                          <p
                            className={`font-mono text-[11px] tracking-wide ${
                              isDarkCard ? 'text-[#C49A52]' : 'text-[#7D5B22]'
                            }`}
                          >
                            Verified Analytical Findings
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 font-mono text-xs tabular-nums">
                            {project.kpiHighlights.map((metric) => (
                              <span
                                key={metric}
                                className={`flex items-start gap-2.5 leading-relaxed ${
                                  isDarkCard ? 'text-[#F6F1E8]/92' : 'text-[#142B40]'
                                }`}
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[7px] w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                                />
                                <span>{metric}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* UrbanPulse Explicit Domain & Synthetic Data Governance Note */}
                        {project.domainGovernanceNote && (
                          <p
                            className={`text-xs sm:text-[13px] leading-relaxed p-4 rounded-xl border ${
                              isDarkCard
                                ? 'bg-[#101820]/55 border-[#D9C4A0]/18 text-[#D9C4A0]'
                                : 'bg-[#EFE8DC]/85 border-[#142B40]/12 text-[#142B40]'
                            }`}
                          >
                            {project.domainGovernanceNote}
                          </p>
                        )}

                        {/* Clean Unboxed Technology List */}
                        <p
                          className={`pt-0.5 font-mono text-xs leading-relaxed ${
                            isDarkCard ? 'text-[#D9C4A0]/85' : 'text-[#4D5C6B]'
                          }`}
                        >
                          {project.technologies.join(' · ')}
                        </p>
                      </div>

                      {/* Card Action Bar */}
                      <div
                        className={`mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${
                          isDarkCard ? 'border-[#D9C4A0]/15' : 'border-[#142B40]/12'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-3.5">
                          {project.walkthroughUrl && (
                            <button
                              type="button"
                              onClick={(e) => {
                                walkthroughTriggerRef.current = e.currentTarget;
                                setActiveWalkthrough({
                                  title: project.title,
                                  url: project.walkthroughUrl!,
                                });
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold bg-[#C49A52] text-[#101820] hover:bg-[#D4AE6A] active:scale-[0.985] rounded-lg transition-[background-color,transform] duration-200 min-h-[44px] whitespace-nowrap"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                              <span>{project.walkthroughLabel || 'Watch Walkthrough'}</span>
                            </button>
                          )}

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`group/link inline-flex items-center gap-1.5 text-xs font-semibold py-2 min-h-[44px] transition-colors duration-200 whitespace-nowrap ${
                                isDarkCard
                                  ? 'text-[#D9C4A0] hover:text-[#C49A52]'
                                  : 'text-[#142B40] hover:text-[#7D5B22]'
                              }`}
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
                          onClick={() => setExpandedId(isExpanded ? null : project.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`case-study-${project.id}`}
                          className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg border active:scale-[0.985] transition-[background-color,border-color,color,transform] duration-200 min-h-[44px] whitespace-nowrap ${
                            isExpanded
                              ? isDarkCard
                                ? 'bg-[#101820]/60 border-[#C49A52]/60 text-[#C49A52]'
                                : 'bg-[#142B40] border-[#142B40] text-[#F6F1E8]'
                              : isDarkCard
                                ? 'border-[#D9C4A0]/25 text-[#F6F1E8] hover:border-[#C49A52] hover:text-[#C49A52]'
                                : 'border-[#142B40]/20 text-[#142B40] hover:border-[#7D5B22] hover:text-[#7D5B22]'
                          }`}
                        >
                          <span>{isExpanded ? 'Hide Case Study' : 'Read Case Study'}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Redesigned Full-Width Editorial 7-Part Case Study Dossier */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`case-study-${project.id}`}
                        initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                        transition={{
                          duration: MOTION_TOKENS.duration.standard,
                          ease: MOTION_TOKENS.ease,
                        }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`px-6 sm:px-8 lg:px-10 py-7 sm:py-9 border-t space-y-7 ${
                            isDarkCard
                              ? 'bg-[#101820]/65 border-[#C49A52]/25'
                              : 'bg-[#FFFFFF] border-[#142B40]/12'
                          }`}
                        >
                          {/* Row 1: Business Context & Analytical Challenge */}
                          <div
                            className={`grid grid-cols-1 ${
                              isHorizontalFeature ? 'md:grid-cols-2' : ''
                            } gap-6 lg:gap-8`}
                          >
                            <div className="space-y-1.5">
                              <p
                                className={`font-mono text-xs ${
                                  isDarkCard ? 'text-[#C49A52]' : 'text-[#7D5B22]'
                                }`}
                              >
                                01 · Business Context
                              </p>
                              <p
                                className={`text-sm leading-[1.7] ${
                                  isDarkCard ? 'text-[#F6F1E8]/85' : 'text-[#101820]/85'
                                }`}
                              >
                                {project.caseStudy.context}
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              <p
                                className={`font-mono text-xs ${
                                  isDarkCard ? 'text-[#C49A52]' : 'text-[#7D5B22]'
                                }`}
                              >
                                02 · Analytical Challenge
                              </p>
                              <p
                                className={`text-sm leading-[1.7] ${
                                  isDarkCard ? 'text-[#F6F1E8]/85' : 'text-[#101820]/85'
                                }`}
                              >
                                {project.caseStudy.businessChallenge}
                              </p>
                            </div>
                          </div>

                          {/* Row 2: My Contribution & Data & Methodology */}
                          <div
                            className={`pt-6 border-t grid grid-cols-1 ${
                              isHorizontalFeature ? 'md:grid-cols-2' : ''
                            } gap-6 lg:gap-8 ${
                              isDarkCard ? 'border-[#D9C4A0]/12' : 'border-[#142B40]/10'
                            }`}
                          >
                            <div className="space-y-1.5">
                              <p
                                className={`font-mono text-xs ${
                                  isDarkCard ? 'text-[#C49A52]' : 'text-[#7D5B22]'
                                }`}
                              >
                                03 · My Contribution
                              </p>
                              <p
                                className={`text-sm leading-[1.7] ${
                                  isDarkCard ? 'text-[#F6F1E8]/90' : 'text-[#101820]/90'
                                }`}
                              >
                                {project.caseStudy.roleAndContribution}
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              <p
                                className={`font-mono text-xs ${
                                  isDarkCard ? 'text-[#C49A52]' : 'text-[#7D5B22]'
                                }`}
                              >
                                04 · Data & Methodology
                              </p>
                              <p
                                className={`text-sm leading-[1.7] ${
                                  isDarkCard ? 'text-[#F6F1E8]/85' : 'text-[#101820]/85'
                                }`}
                              >
                                {project.caseStudy.approachAndTechnologies}
                              </p>
                            </div>
                          </div>

                          {/* Highlighted Band: 05 Key Findings & Verified Evidence */}
                          <div
                            className={`rounded-xl p-5 sm:p-6 border space-y-3 ${
                              isDarkCard
                                ? 'bg-[#142B40]/85 border-[#C49A52]/25'
                                : 'bg-[#F8F4EC] border-[#142B40]/10'
                            }`}
                          >
                            <p
                              className={`font-mono text-xs ${
                                isDarkCard ? 'text-[#C49A52]' : 'text-[#7D5B22]'
                              }`}
                            >
                              05 · Key Findings & Verified Evidence
                            </p>
                            <ul className="space-y-2.5">
                              {project.caseStudy.verifiedFindings.map((finding) => (
                                <li
                                  key={finding}
                                  className={`flex items-start gap-3 text-sm leading-[1.65] ${
                                    isDarkCard ? 'text-[#F6F1E8]/92' : 'text-[#101820]/90'
                                  }`}
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
                          <div
                            className={`grid grid-cols-1 ${
                              isHorizontalFeature ? 'md:grid-cols-2' : ''
                            } gap-6 lg:gap-8`}
                          >
                            <div className="space-y-1.5">
                              <p
                                className={`font-mono text-xs ${
                                  isDarkCard ? 'text-[#C49A52]' : 'text-[#7D5B22]'
                                }`}
                              >
                                06 · Business Implications
                              </p>
                              <p
                                className={`text-sm leading-[1.7] ${
                                  isDarkCard ? 'text-[#F6F1E8]/85' : 'text-[#101820]/85'
                                }`}
                              >
                                {project.caseStudy.businessRelevance}
                              </p>
                            </div>

                            <div className="space-y-1.5">
                              <p
                                className={`font-mono text-xs ${
                                  isDarkCard ? 'text-[#D9C4A0]' : 'text-[#4D5C6B]'
                                }`}
                              >
                                07 · Limitations & Project Evidence
                              </p>
                              <p
                                className={`text-xs sm:text-sm leading-[1.7] ${
                                  isDarkCard ? 'text-[#D9C4A0]/85' : 'text-[#4D5C6B]'
                                }`}
                              >
                                {project.caseStudy.limitationsAndEvidence}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Live GitHub Repositories Section */}
          <GithubRepos />

          {/* Narrative Transition to Chapter 04 */}
          <div className="mt-12 pt-8 border-t border-[#D9C4A0]/12 flex justify-end">
            <a
              href="#journey"
              className="group inline-flex items-center gap-2 text-xs font-mono text-[#C49A52] hover:text-[#D4AE6A] transition-colors py-2 min-h-[44px]"
            >
              <span>{STORY_CHAPTERS.chapter03.transitionLabel.replace(' →', '')}</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
      </SectionContainer>

      {/* Verified Video Walkthrough Lightbox Modal */}
      <AnimatePresence>
        {activeWalkthrough && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="walkthrough-modal-title"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            onClick={closeWalkthrough}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#101820]/85 backdrop-blur-sm"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: MOTION_TOKENS.duration.micro, ease: MOTION_TOKENS.ease }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-2xl bg-[#142B40] border border-[#C49A52]/45 overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#D9C4A0]/15 bg-[#101820]">
                <div>
                  <p className="font-mono text-[11px] text-[#C49A52]">Dashboard Walkthrough</p>
                  <h3
                    id="walkthrough-modal-title"
                    className="font-display text-xl font-semibold text-[#F6F1E8]"
                  >
                    {activeWalkthrough.title}
                  </h3>
                </div>
                <button
                  ref={walkthroughCloseRef}
                  type="button"
                  onClick={closeWalkthrough}
                  aria-label="Close walkthrough modal"
                  className="inline-flex items-center justify-center w-11 h-11 text-[#F6F1E8] hover:text-[#C49A52] border border-[#D9C4A0]/25 hover:border-[#C49A52] active:scale-[0.97] rounded-lg transition-[border-color,color,transform] duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe
                src={activeWalkthrough.url}
                title={`${activeWalkthrough.title} Walkthrough`}
                className="w-full aspect-video border-0 bg-[#101820]"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Resolution Dashboard Screenshot Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="screenshot-lightbox-title"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.micro,
              ease: MOTION_TOKENS.ease,
            }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#101820]/92"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.985 }}
              transition={{
                duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.micro,
                ease: MOTION_TOKENS.ease,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1460px] max-h-[94vh] flex flex-col rounded-xl bg-[#142B40] border border-[#C49A52]/40 overflow-hidden font-body"
            >
              <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-[#D9C4A0]/15 bg-[#101820] shrink-0">
                <div className="min-w-0">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C49A52]">
                    {activeLightbox.caption}
                  </p>
                  <h3
                    id="screenshot-lightbox-title"
                    className="font-heading text-base sm:text-lg font-semibold text-[#F6F1E8] truncate"
                  >
                    {activeLightbox.title}
                  </h3>
                </div>
                <button
                  ref={lightboxCloseRef}
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close enlarged dashboard screenshot"
                  className="inline-flex items-center justify-center w-11 h-11 shrink-0 text-[#F6F1E8] hover:text-[#C49A52] border border-[#D9C4A0]/25 hover:border-[#C49A52] rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-2.5 sm:p-5 bg-[#070E1A] flex items-center justify-center overflow-auto">
                <img
                  src={activeLightbox.src}
                  alt={activeLightbox.alt}
                  width={1415}
                  height={791}
                  className="block max-w-full max-h-[80vh] w-auto h-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
