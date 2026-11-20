import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
} from 'lucide-react';
import { HERO_PORTRAIT_PLACEHOLDER } from '../assets/portraitPlaceholder';
import { PROFILE } from '../data/portfolioData';
import { MOTION_TOKENS } from '../styles/designSystem';
import { DataInsightPreview } from './DataInsightPreview';
import { EyeOfHorusLogo } from './EyeOfHorusLogo';
import { CONTAINER_GEOMETRY, SectionContainer } from './SectionContainer';

const ORIGINAL_HERO_PORTRAIT = {
  src: './assets/hero-portrait.png',
  placeholder: HERO_PORTRAIT_PLACEHOLDER,
  width: 800,
  height: 800,
  alt: `Portrait of ${PROFILE.name}`,
} as const;

const CV_DRIVE_URL =
  'https://drive.google.com/file/d/19bL-4zPCmRhLjmms9j8DuVISaa95euMQ/view?usp=sharing';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = portraitImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setPortraitLoaded(true);
    }
  }, []);

  const handleSmoothAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    if (window.location.hash !== `#${targetId}`) {
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <>
      <SectionContainer id="hero" surface="hero" padding="hero">
      {/* Vertical Editorial Stack: Dedicated 12-Column Responsive Hero Grid + Conceptual Process Visual */}
      <div className="font-body space-y-6 lg:space-y-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          {/* Content Stack (second on mobile & tablet, left 7 columns on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 rounded-2xl border border-[#C49A52]/22 bg-[#142B40]/45 p-5 sm:p-8 lg:p-10 xl:p-11 flex flex-col justify-between gap-6 sm:gap-7">
          <div className="space-y-5 lg:space-y-6">
            {/* 1. Quiet Chapter Eyebrow */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
                ease: MOTION_TOKENS.ease,
              }}
              className="flex items-center pb-4 border-b border-[#D9C4A0]/14"
            >
              <span className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-[#C49A52]">
                <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52]" />
                <span>CHAPTER 01 · THE ANALYST</span>
              </span>
            </motion.div>

            {/* 2. Personal Name + Brand Statement + Plus Jakarta Sans Main Headline */}
            <div className="space-y-4">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
                  delay: prefersReducedMotion ? 0 : 0.04,
                  ease: MOTION_TOKENS.ease,
                }}
                className="flex flex-wrap items-center gap-x-3 gap-y-1.5"
              >
                <p className="font-heading text-[15px] sm:text-base font-semibold text-[#F6F1E8] tracking-[-0.01em]">
                  {PROFILE.name}
                </p>
                <span aria-hidden="true" className="w-5 h-px bg-[#C49A52]/70" />
                <p className="font-heading text-[14px] sm:text-[15px] font-medium text-[#C49A52] tracking-[0.01em]">
                  From Data to Decisions.
                </p>
              </motion.div>

              <h1 className="hero-enter-headline font-heading text-[clamp(1.75rem,4.5vw,3.65rem)] font-bold tracking-[-0.025em] leading-[1.12] text-[#F6F1E8]">
                Every number has a story.{' '}
                <span className="hero-headline-gradient">I find what the data reveals.</span>
              </h1>
            </div>

            {/* 3. Refined Editorial Description — High-Clarity Two-Beat Structure */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.reveal,
                delay: prefersReducedMotion ? 0 : 0.08,
                ease: MOTION_TOKENS.ease,
              }}
              className="relative pl-4 sm:pl-5 border-l-2 border-[#C49A52]/65 space-y-2.5 max-w-[54ch]"
            >
              <p className="text-[16px] sm:text-[17.5px] font-medium text-[#F6F1E8] leading-[1.6] tracking-[-0.005em]">
                I investigate business performance to uncover patterns and validate the evidence.
              </p>
              <p className="text-[15px] sm:text-[16px] font-normal text-[#D9C4A0]/92 leading-[1.68]">
                Turning verified findings into{' '}
                <span className="text-[#F6F1E8] font-medium">clear visual insights</span> that guide{' '}
                <span className="text-[#F6F1E8] font-medium">informed business decisions</span>.
              </p>
            </motion.div>
          </div>

          {/* 4. Three-Tier CTA Hierarchy + Separate Understated Social Links */}
          <div className="space-y-4 pt-2">
            <div className="hero-enter-actions flex flex-wrap items-center gap-3 sm:gap-3.5">
              {/* Primary CTA */}
              <a
                href="#projects"
                onClick={(e) => handleSmoothAnchorClick(e, 'projects')}
                className="group hero-cta-sheen inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[48px] hero-cta-primary-gradient text-[#101820] border border-[#C49A52]/40 active:scale-[0.985] font-semibold text-sm tracking-[0.01em] rounded-xl shadow-[0_14px_30px_-14px_rgba(196,154,82,0.62)] hover:shadow-[0_20px_36px_-14px_rgba(196,154,82,0.82)] hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap"
              >
                <span className="relative z-10">Explore My Projects</span>
                <ArrowDownRight
                  className="relative z-10 w-4 h-4 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              {/* Secondary CTA — Confirmed Google Drive CV */}
              <a
                href={CV_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${PROFILE.name}'s CV on Google Drive (opens in a new tab)`}
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] border border-[#C49A52]/48 bg-[#101820]/58 text-[#F6F1E8] hover:border-[#C49A52] hover:bg-[#19344D] hover:text-[#D9C4A0] active:scale-[0.985] font-medium text-sm tracking-[0.01em] rounded-xl hover:-translate-y-0.5 transition-[background-color,border-color,color,transform] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:bg-[#19344D] focus-visible:text-[#F6F1E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap"
              >
                <FileText
                  className="w-4 h-4 text-[#C49A52] shrink-0"
                  aria-hidden="true"
                />
                <span>View My CV</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-[#C49A52]/85 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C49A52]"
                  aria-hidden="true"
                />
              </a>

              {/* Tertiary Contact CTA */}
              <a
                href="#contact"
                onClick={(e) => handleSmoothAnchorClick(e, 'contact')}
                className="group inline-flex items-center justify-center gap-2 px-3.5 py-3 min-h-[48px] border border-transparent text-[#D9C4A0] hover:text-[#F6F1E8] font-medium text-sm tracking-[0.01em] rounded-xl transition-[color,border-color,background-color] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:bg-[#101820]/65 focus-visible:text-[#F6F1E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap"
              >
                <span className="border-b border-[#C49A52]/55 group-hover:border-[#C49A52] group-focus-visible:border-[#C49A52] pb-0.5 transition-colors duration-[var(--duration-micro)]">
                  Let&apos;s Talk
                </span>
                <ArrowRight
                  className="w-4 h-4 text-[#C49A52] transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Separate Understated Social Links */}
            <div className="pt-3 border-t border-[#D9C4A0]/12 flex flex-wrap items-center gap-5 sm:gap-6 text-sm font-medium text-[#D9C4A0]/90">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${PROFILE.name} on LinkedIn (opens in a new tab)`}
                className="group relative inline-flex items-center gap-2 px-2 -mx-2 py-1 border border-transparent hover:text-[#F6F1E8] transition-[color,border-color,background-color] duration-[var(--duration-micro)] min-h-[44px] rounded-lg focus-visible:border-[#C49A52] focus-visible:bg-[#101820]/65 focus-visible:text-[#F6F1E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
              >
                <Linkedin
                  className="w-4 h-4 text-[#C49A52] shrink-0"
                  aria-hidden="true"
                />
                <span>LinkedIn</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-[#C49A52]/80 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C49A52]"
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-2 right-2 bottom-1.5 h-px bg-[#C49A52]/70 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[var(--duration-micro)]"
                />
              </a>

              <span aria-hidden="true" className="text-[#D9C4A0]/28">
                /
              </span>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${PROFILE.name} on GitHub (opens in a new tab)`}
                className="group relative inline-flex items-center gap-2 px-2 -mx-2 py-1 border border-transparent hover:text-[#F6F1E8] transition-[color,border-color,background-color] duration-[var(--duration-micro)] min-h-[44px] rounded-lg focus-visible:border-[#C49A52] focus-visible:bg-[#101820]/65 focus-visible:text-[#F6F1E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
              >
                <Github
                  className="w-4 h-4 text-[#C49A52] shrink-0"
                  aria-hidden="true"
                />
                <span>GitHub</span>
                <ArrowUpRight
                  className="w-3.5 h-3.5 text-[#C49A52]/80 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#C49A52]"
                  aria-hidden="true"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-2 right-2 bottom-1.5 h-px bg-[#C49A52]/70 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[var(--duration-micro)]"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Primary Visual Anchor Portrait Container (first on mobile & tablet, right 5 columns on desktop) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: 0,
            ease: MOTION_TOKENS.ease,
          }}
          className="order-1 lg:order-2 lg:col-span-5 group/portrait hero-portrait-frame relative rounded-2xl border border-[#C49A52]/28 hover:border-[#C49A52]/60 hero-portrait-stage-gradient shadow-[0_26px_58px_-26px_rgba(0,0,0,0.72)] overflow-hidden flex flex-col justify-between"
        >
          {/* Specular Top Antique-Gold Hairline */}
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-[#C49A52]/65 to-transparent pointer-events-none z-20"
          />

          {/* Subtle Top Heritage Emblem & Chapter Number */}
          <div className="relative z-20 px-5 sm:px-6 pt-4 sm:pt-5 flex items-center justify-between">
            <EyeOfHorusLogo variant="symbol" theme="dark" size="sm" className="opacity-85" />
            <span className="font-heading text-[11px] font-semibold tracking-[0.08em] text-[#C49A52]/90 tabular-nums">
              01 / 05
            </span>
          </div>

          {/* Vertically & Horizontally Centered Portrait Aperture */}
          <div className="relative flex-1 flex items-center justify-center px-5 sm:px-6 pt-3 sm:pt-4 pb-0">
            {/* Soft Studio Key-Light Halo Centered Behind Face */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(196,154,82,0.22)_0%,rgba(26,58,87,0.16)_46%,transparent_72%)] opacity-85 group-hover/portrait:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
            />

            {/* Proportioned Centered Architectural Arch & Unmodified Original Portrait */}
            <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[380px] aspect-[4/4.05] flex items-end justify-center">
              <svg
                viewBox="0 0 380 385"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none select-none transition-opacity duration-500 opacity-75 group-hover/portrait:opacity-100"
              >
                <path
                  d="M28 385 L28 184 C28 92 100 24 190 24 C280 24 352 92 352 184 L352 385"
                  stroke="#C49A52"
                  strokeOpacity="0.44"
                  strokeWidth="1.2"
                />
                <path
                  d="M40 385 L40 186 C40 101 107 36 190 36 C273 36 340 101 340 186 L340 385"
                  stroke="#D9C4A0"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                />
                <polygon points="190,6 195,12 190,18 185,12" fill="#C49A52" />
              </svg>

              <div className="relative z-10 w-[92%] aspect-square flex items-end justify-center overflow-hidden">
                {!portraitFailed ? (
                  <>
                    {/* Low-Resolution Blur-Up Placeholder (LQIP — instant first paint) */}
                    <img
                      src={ORIGINAL_HERO_PORTRAIT.placeholder}
                      alt=""
                      aria-hidden="true"
                      width={ORIGINAL_HERO_PORTRAIT.width}
                      height={ORIGINAL_HERO_PORTRAIT.height}
                      decoding="sync"
                      className={`absolute inset-0 w-full h-full object-contain object-bottom select-none pointer-events-none blur-md scale-[1.05] ${
                        prefersReducedMotion
                          ? ''
                          : 'transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
                      } ${portraitLoaded ? 'opacity-0' : 'opacity-95'}`}
                    />

                    {/* Full-Resolution Eager High-Priority Original Portrait (Bit-Identical Unmodified Asset) */}
                    <img
                      ref={portraitImgRef}
                      src={ORIGINAL_HERO_PORTRAIT.src}
                      alt={ORIGINAL_HERO_PORTRAIT.alt}
                      width={ORIGINAL_HERO_PORTRAIT.width}
                      height={ORIGINAL_HERO_PORTRAIT.height}
                      referrerPolicy="no-referrer"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      onLoad={() => setPortraitLoaded(true)}
                      onError={() => setPortraitFailed(true)}
                      className={`relative z-10 w-full h-full object-contain object-bottom select-none ${
                        prefersReducedMotion
                          ? portraitLoaded
                            ? 'opacity-100'
                            : 'opacity-0'
                          : `transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              portraitLoaded
                                ? 'opacity-100 blur-0 scale-100 group-hover/portrait:scale-[1.02]'
                                : 'opacity-0 blur-sm scale-[1.01]'
                            }`
                      }`}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#142B40] text-[#F6F1E8] rounded-t-full">
                    <span className="font-heading text-3xl font-bold text-[#C49A52]">IR</span>
                    <span className="mt-2 text-xs text-[#D9C4A0]">{PROFILE.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Soft Grounding Vignette Along Bottom Frame Edge */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0D1620] via-[#0D1620]/35 to-transparent pointer-events-none z-20"
            />
          </div>
        </motion.div>
        </div>

        {/* Sole Analytical Visual — Conceptual "From Finding to Insight" Visualization */}
        <DataInsightPreview />
      </div>
      </SectionContainer>

      {/* Subtle Antique Gold (10–15% opacity) Horizontal Separator Transitioning Into About */}
      <div aria-hidden="true" className={`${CONTAINER_GEOMETRY.outerGutter} pt-4 sm:pt-5`}>
        <div className={`${CONTAINER_GEOMETRY.maxWidth} ${CONTAINER_GEOMETRY.horizontalPadding}`}>
          <div className={CONTAINER_GEOMETRY.innerRail}>
            <div className="h-px w-full bg-gradient-to-r from-[#C49A52]/10 via-[#C49A52]/15 to-[#C49A52]/10" />
          </div>
        </div>
      </div>
    </>
  );
}
