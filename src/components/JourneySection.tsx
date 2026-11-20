import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Award } from 'lucide-react';
import {
  COMPLETED_CERTIFICATIONS,
  PROFILE,
  STORY_CHAPTERS,
} from '../data/portfolioData';
import { MOTION_TOKENS } from '../styles/designSystem';
import { JourneyTimeline } from './JourneyTimeline';
import { SectionContainer } from './SectionContainer';

export function JourneySection() {
  const prefersReducedMotion = useReducedMotion();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('contact');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    if (window.location.hash !== '#contact') {
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <SectionContainer id="journey" surface="ivory" padding="standard" showConnector>
      {/* Section Header */}
      <div className="font-body grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 lg:mb-14">
        <div className="lg:col-span-7 space-y-3.5">
          <p className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] leading-[1.4] text-[#7D5B22]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
            <span>{STORY_CHAPTERS.chapter04.kicker}</span>
          </p>
          <h2 className="font-heading text-[clamp(2rem,3.2vw,2.85rem)] font-bold tracking-[-0.025em] leading-[1.12] text-[#142B40]">
            {STORY_CHAPTERS.chapter04.heading}
          </h2>
        </div>
        <p className="lg:col-span-5 text-[15px] sm:text-[15.5px] text-[#4D5C6B] leading-[1.72] tracking-[-0.006em] max-w-[52ch]">
          {STORY_CHAPTERS.chapter04.subtitle} Select any milestone below to explore the academic
          and practical context behind my progression.
        </p>
      </div>

      {/* Asymmetric Editorial Layout: Left Interactive Journey Timeline + Right Verified Credentials Monolith */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column (7 cols): Interactive Expandable Career Progression Timeline */}
        <div className="lg:col-span-7 min-w-0">
          <JourneyTimeline />
        </div>

        {/* Right Column (5 cols): Midnight Navy Verified Certifications & Languages Monolith */}
        <motion.aside
          initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
          whileInView={MOTION_TOKENS.revealAnimate}
          viewport={MOTION_TOKENS.viewport}
          transition={{
            duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
            ease: MOTION_TOKENS.ease,
          }}
          className="font-body lg:col-span-5 lg:sticky lg:top-24 rounded-2xl bg-[#142B40] text-[#F6F1E8] border border-[#C49A52]/30 p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_48px_-28px_rgba(16,24,32,0.5)]"
        >
          <div>
            <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-[#D9C4A0]/15">
              <div className="inline-flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#F6F1E8]">
                  Certifications
                </h3>
              </div>
              <span className="text-xs font-medium tracking-[0.02em] text-[#C49A52]">
                Microsoft · Google
              </span>
            </div>

            <div className="divide-y divide-[#D9C4A0]/14">
              {COMPLETED_CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 text-xs tabular-nums">
                    <span className="font-heading font-semibold tracking-[0.02em] text-[#C49A52]">
                      {cert.credentialTag === cert.issuer
                        ? cert.issuer
                        : `${cert.issuer} · ${cert.credentialTag}`}
                    </span>
                    <span className="text-[#D9C4A0]/88">{cert.status}</span>
                  </div>
                  <h4 className="text-sm sm:text-[15px] font-medium text-[#F6F1E8] leading-[1.45] tracking-[0.002em]">
                    {cert.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Sub-Block */}
          <div className="mt-8 pt-6 border-t border-[#D9C4A0]/15 space-y-4">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C49A52]">
              Languages
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROFILE.languages.map((lang) => (
                <div key={lang.name} className="space-y-0.5">
                  <p className="text-sm font-semibold text-[#F6F1E8]">{lang.name}</p>
                  <p className="text-xs text-[#D9C4A0]/85 leading-relaxed">{lang.proficiency}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#D9C4A0]/12">
              <a
                href="#contact"
                onClick={handleContactClick}
                className="group inline-flex items-center gap-2 text-[13px] sm:text-sm font-medium tracking-[0.004em] text-[#C49A52] hover:text-[#D9C4A0] transition-colors py-2 px-1 -mx-1 min-h-[44px] rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
              >
                <span>{STORY_CHAPTERS.chapter04.transitionLabel.replace(' →', '')}</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </motion.aside>
      </div>
    </SectionContainer>
  );
}
