import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { PROFILE, STORY_CHAPTERS } from '../data/portfolioData';
import { INTERACTION_CLASSES, MOTION_TOKENS } from '../styles/designSystem';
import { SectionContainer } from './SectionContainer';

export function ContactFooter() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROFILE.email);
      } else {
        const helper = document.createElement('textarea');
        helper.value = PROFILE.email;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <SectionContainer id="contact" surface="charcoal" padding="footer" as="footer" showConnector>
      <motion.div
        initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
        whileInView={MOTION_TOKENS.revealAnimate}
        viewport={MOTION_TOKENS.viewport}
        transition={{ duration: MOTION_TOKENS.duration.standard, ease: MOTION_TOKENS.ease }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start"
      >
        {/* Left Column: Closing Statement & Primary Contact Actions */}
        <div className="lg:col-span-7 space-y-6">
          <p className="font-mono text-xs tracking-wide text-[#C49A52]">
            {STORY_CHAPTERS.chapter05.kicker}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,5vw,3rem)] font-semibold tracking-tight text-[#F6F1E8] leading-[1.08]">
            {STORY_CHAPTERS.chapter05.heading}
          </h2>
          <div className="space-y-3.5 max-w-[58ch]">
            <p className="text-[15px] sm:text-base text-[#D9C4A0]/90 leading-[1.7]">
              {STORY_CHAPTERS.chapter05.bodyPrimary}
            </p>
            <p className="text-sm sm:text-[15px] text-[#F6F1E8]/84 leading-[1.7]">
              {STORY_CHAPTERS.chapter05.bodySecondary}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <a
              href={`mailto:${PROFILE.email}`}
              className={`group ${INTERACTION_CLASSES.primaryButton}`}
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{STORY_CHAPTERS.chapter05.ctaLabel}</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] max-w-full border border-[#D9C4A0]/30 bg-[#142B40]/55 text-[#F6F1E8] hover:border-[#C49A52] hover:bg-[#142B40] hover:text-[#C49A52] active:scale-[0.985] font-mono text-xs rounded-xl transition-[background-color,border-color,color,transform] duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#C49A52] shrink-0" aria-hidden="true" />
                  <span>Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{PROFILE.email}</span>
                </>
              )}
            </button>
            <span role="status" aria-live="polite" className="sr-only">
              {copied ? `Email address ${PROFILE.email} copied to clipboard.` : ''}
            </span>
          </div>
        </div>

        {/* Right Column: Structured Contact Panel (Approved Public Channels Only) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#142B40]/90 border border-[#C49A52]/25 p-6 sm:p-8 space-y-5">
          <div className="pb-4 border-b border-[#D9C4A0]/14">
            <p className="font-mono text-xs text-[#C49A52] mb-1.5">Email</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center min-h-[44px] text-sm sm:text-base font-medium text-[#F6F1E8] hover:text-[#C49A52] transition-colors break-all"
            >
              {PROFILE.email}
            </a>
          </div>

          <div className="pb-4 border-b border-[#D9C4A0]/14">
            <p className="font-mono text-xs text-[#C49A52] mb-1.5">Location</p>
            <p className="text-sm sm:text-base font-medium text-[#F6F1E8] inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xl border border-[#D9C4A0]/20 bg-[#101820]/45 hover:border-[#C49A52] hover:bg-[#101820]/75 active:scale-[0.985] text-sm font-medium text-[#F6F1E8] hover:text-[#C49A52] transition-[background-color,border-color,color,transform] duration-200"
            >
              <span className="inline-flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
                LinkedIn
              </span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xl border border-[#D9C4A0]/20 bg-[#101820]/45 hover:border-[#C49A52] hover:bg-[#101820]/75 active:scale-[0.985] text-sm font-medium text-[#F6F1E8] hover:text-[#C49A52] transition-[background-color,border-color,color,transform] duration-200"
            >
              <span className="inline-flex items-center gap-2">
                <Github className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
                GitHub
              </span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Quiet Copyright Bar */}
      <div className="mt-14 pt-7 border-t border-[#D9C4A0]/14 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D9C4A0]/82">
        <p>
          © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.title}
        </p>
        <div className="flex flex-wrap items-center gap-5 sm:gap-6 font-mono">
          <a
            href="#hero"
            className="group inline-flex items-center gap-1.5 py-2 min-h-[44px] hover:text-[#C49A52] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center py-2 min-h-[44px] hover:text-[#C49A52] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center py-2 min-h-[44px] hover:text-[#C49A52] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </SectionContainer>
  );
}
