import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import {
  JOURNEY_MILESTONES,
  type JourneyMilestone,
  type JourneyTrack,
} from '../data/portfolioData';
import { MOTION_TOKENS } from '../styles/designSystem';

const TRACK_FILTERS: ReadonlyArray<{ id: JourneyTrack; label: string }> = [
  { id: 'all', label: 'All Milestones' },
  { id: 'education', label: 'Education' },
  { id: 'training', label: 'Training' },
];

export function JourneyTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTrack, setActiveTrack] = useState<JourneyTrack>('all');
  const [expandedIds, setExpandedIds] = useState<string[]>([
    JOURNEY_MILESTONES[0]?.id ?? 'acud-practical-training',
  ]);

  const visibleMilestones =
    activeTrack === 'all'
      ? JOURNEY_MILESTONES
      : JOURNEY_MILESTONES.filter((item) => item.track === activeTrack);

  const allVisibleExpanded =
    visibleMilestones.length > 0 &&
    visibleMilestones.every((item) => expandedIds.includes(item.id));

  const toggleMilestone = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    const visibleIds = visibleMilestones.map((item) => item.id);
    if (allVisibleExpanded) {
      setExpandedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setExpandedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleTrackChange = (track: JourneyTrack) => {
    setActiveTrack(track);
    const nextMilestones =
      track === 'all'
        ? JOURNEY_MILESTONES
        : JOURNEY_MILESTONES.filter((item) => item.track === track);

    if (
      nextMilestones.length > 0 &&
      !nextMilestones.some((item) => expandedIds.includes(item.id))
    ) {
      setExpandedIds((prev) => [...prev, nextMilestones[0].id]);
    }
  };

  const handleProjectJump = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('projects');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    if (window.location.hash !== '#projects') {
      window.history.pushState(null, '', '#projects');
    }
  };

  const getTrackCount = (track: JourneyTrack) =>
    track === 'all'
      ? JOURNEY_MILESTONES.length
      : JOURNEY_MILESTONES.filter((item) => item.track === track).length;

  return (
    <div className="font-body space-y-6">
      {/* Subtle Filter Bar & Expand/Collapse All Utility */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#142B40]/12">
        <div
          role="group"
          aria-label="Filter career journey milestones"
          className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#EFE8DC]/85 border border-[#142B40]/10 max-w-full"
        >
          {TRACK_FILTERS.map((filter) => {
            const isActive = activeTrack === filter.id;
            const count = getTrackCount(filter.id);
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleTrackChange(filter.id)}
                className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[44px] rounded-lg text-xs font-medium tracking-[-0.005em] whitespace-nowrap shrink-0 transition-[background-color,color,box-shadow] duration-[var(--duration-micro)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#142B40] shadow-[0_2px_8px_-4px_rgba(20,43,64,0.22)] font-semibold'
                    : 'text-[#4D5C6B] hover:text-[#142B40]'
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`font-heading text-[11px] tabular-nums ${
                    isActive ? 'text-[#7D5B22]' : 'text-[#4D5C6B]/80'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleToggleAll}
          className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-lg text-xs font-medium tracking-[0.01em] text-[#7D5B22] hover:text-[#142B40] hover:bg-[#EFE8DC]/70 transition-colors duration-[var(--duration-micro)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
        >
          <span>{allVisibleExpanded ? 'Collapse all' : 'Expand all'}</span>
        </button>
      </div>

      {/* Connected Vertical Editorial Timeline */}
      <ol className="relative pl-6 sm:pl-9 space-y-4 sm:space-y-5">
        {/* Hairline Timeline Spine */}
        <span
          aria-hidden="true"
          className="absolute left-[4px] sm:left-[5px] top-3 bottom-3 w-px bg-[#142B40]/14 pointer-events-none"
        />

        {visibleMilestones.map((milestone: JourneyMilestone, idx: number) => {
          const isExpanded = expandedIds.includes(milestone.id);
          const triggerId = `journey-trigger-${milestone.id}`;
          const panelId = `journey-panel-${milestone.id}`;

          return (
            <motion.li
              key={milestone.id}
              initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
              whileInView={MOTION_TOKENS.revealAnimate}
              viewport={MOTION_TOKENS.viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
                delay: prefersReducedMotion ? 0 : Math.min(idx * 0.04, 0.12),
                ease: MOTION_TOKENS.ease,
              }}
              className="relative"
            >
              {/* Geometric Timeline Node (Filled Antique Gold when expanded, refined hollow diamond when collapsed) */}
              <span
                aria-hidden="true"
                className={`absolute -left-[24px] sm:-left-[35px] top-6 w-2.5 h-2.5 rotate-45 ring-4 ring-[#F8F4EC] transition-[background-color,border-color,transform] duration-[var(--duration-micro)] ${
                  isExpanded
                    ? 'bg-[#C49A52] border border-[#C49A52] scale-110'
                    : 'bg-[#F8F4EC] border border-[#142B40]/45'
                }`}
              />

              <article
                className={`rounded-2xl bg-[#FFFFFF] border transition-[border-color,box-shadow] duration-[var(--duration-micro)] ${
                  isExpanded
                    ? 'border-[#C49A52]/55 shadow-[0_14px_34px_-26px_rgba(20,43,64,0.22)]'
                    : 'border-[#142B40]/10 hover:border-[#C49A52]/45'
                }`}
              >
                {/* Interactive Milestone Header Trigger */}
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => toggleMilestone(milestone.id)}
                  className="group w-full text-left p-5 sm:p-6 min-h-[44px] rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 space-y-2">
                      {/* Unboxed Metadata Row with Tabular Period & Separators */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-[1.45]">
                        <span className="font-heading font-semibold text-[#7D5B22] tabular-nums tracking-[0.02em]">
                          {milestone.period}
                        </span>
                        <span aria-hidden="true" className="text-[#C49A52]">
                          ·
                        </span>
                        <span className="font-medium text-[#4D5C6B]">
                          {milestone.categoryLabel}
                        </span>
                        <span aria-hidden="true" className="text-[#C49A52]">
                          ·
                        </span>
                        <span
                          className={
                            milestone.isCurrent
                              ? 'font-semibold text-[#7D5B22]'
                              : 'font-medium text-[#142B40]/80'
                          }
                        >
                          {milestone.statusLabel}
                        </span>
                      </div>

                      {/* Milestone Title (Plus Jakarta Sans) */}
                      <h3 className="font-heading text-[17px] sm:text-[18.5px] font-bold tracking-[-0.02em] leading-[1.3] text-[#142B40] group-hover:text-[#101820] transition-colors">
                        {milestone.title}
                      </h3>

                      {/* Institution / Organization */}
                      <p className="font-body text-[13.5px] sm:text-sm font-medium text-[#142B40]/82 leading-[1.5] tracking-[-0.006em]">
                        {milestone.organization}
                      </p>

                      {/* Concise Preview Line (visible when collapsed for immediate scannability) */}
                      {!isExpanded && (
                        <p className="font-body text-[14px] sm:text-[14.5px] text-[#4D5C6B] leading-[1.65] tracking-[-0.006em] pt-0.5 max-w-[58ch]">
                          {milestone.brief}
                        </p>
                      )}
                    </div>

                    {/* Explicit Expand / Collapse Affordance */}
                    <span className="inline-flex items-center gap-1.5 pt-0.5 text-xs font-medium text-[#7D5B22] group-hover:text-[#142B40] transition-colors shrink-0">
                      <span className="hidden sm:inline whitespace-nowrap">
                        {isExpanded ? 'Hide' : 'Context'}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border transition-[border-color,background-color,transform] duration-[var(--duration-micro)] ${
                          isExpanded
                            ? 'border-[#C49A52]/45 bg-[#F8F4EC] text-[#7D5B22]'
                            : 'border-[#142B40]/12 bg-[#F8F4EC]/50 text-[#4D5C6B] group-hover:border-[#C49A52]/45 group-hover:text-[#7D5B22]'
                        }`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-[var(--duration-micro)] motion-reduce:transition-none ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </span>
                    </span>
                  </div>
                </button>

                {/* Smooth Collapsible Editorial Context Drawer */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isExpanded}
                  className={`grid transition-[grid-template-rows,opacity] duration-[220ms] ease-[var(--ease-editorial)] motion-reduce:transition-none ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-6 pt-1 space-y-5">
                      <div className="h-px bg-[#142B40]/10" aria-hidden="true" />

                      {/* Detailed Progression Context */}
                      <p className="font-body text-[14.5px] sm:text-[15.5px] font-normal text-[#101820]/86 leading-[1.76] tracking-[-0.008em] max-w-[60ch]">
                        {milestone.context}
                      </p>

                      {/* Core Focus Areas / Curriculum */}
                      <div className="space-y-2.5">
                        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.15em] text-[#7D5B22]">
                          {milestone.highlightsLabel}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                          {milestone.highlights.map((topic) => (
                            <li
                              key={topic}
                              className="flex items-start gap-2.5 font-body text-[14px] text-[#101820]/88 leading-[1.55] tracking-[-0.006em]"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                              />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Role Progression Takeaway & Optional Verified Project Link */}
                      <div className="pt-4 border-t border-[#142B40]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="font-body text-xs sm:text-[13px] text-[#4D5C6B] leading-[1.6] tracking-[-0.004em] max-w-[48ch]">
                          {milestone.progressionNote}
                        </p>

                        {milestone.relatedProject && (
                          <a
                            href="#projects"
                            tabIndex={isExpanded ? 0 : -1}
                            onClick={handleProjectJump}
                            className="group/link inline-flex items-center gap-1.5 py-2 px-1 -mx-1 min-h-[44px] text-xs font-semibold text-[#7D5B22] hover:text-[#142B40] transition-colors whitespace-nowrap shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
                          >
                            <span>View {milestone.relatedProject.title}</span>
                            <ArrowUpRight
                              className="w-3.5 h-3.5 transition-transform duration-[var(--duration-micro)] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transform-none"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
