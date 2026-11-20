import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowRight, List, Network } from 'lucide-react';
import {
  CORE_TECHNICAL_TOOLKIT,
  STORY_CHAPTERS,
  WORKFLOW_STAGES,
} from '../data/portfolioData';
import { MOTION_TOKENS } from '../styles/designSystem';
import {
  AnalysisGlyphIcon,
  DataGlyphIcon,
  InsightGlyphIcon,
} from './EgyptianDataGlyphs';
import { CONTAINER_GEOMETRY, SectionContainer } from './SectionContainer';
import { WorkflowFlowchartSvg } from './WorkflowFlowchartSvg';

/**
 * Chapter 01 Continuation: Editorial About Section (#F8F4EC Soft Ivory surface)
 */
export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const targetRoles = [
    'Data Analyst',
    'BI Analyst',
    'Business Performance Analyst',
  ] as const;

  const analyticalDomains = [
    'E-Commerce',
    'Healthcare',
    'Urban Operations',
    'Retail Analytics',
  ] as const;

  const handleStoryFlowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('skills');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    if (window.location.hash !== '#skills') {
      window.history.pushState(null, '', '#skills');
    }
  };

  return (
    <>
      <SectionContainer id="about" surface="ivory" padding="standard" showConnector>
        <div
          aria-labelledby="about-heading"
          className="font-body max-w-[740px] mx-auto xl:max-w-none xl:mx-0"
        >
          {/* Tier 1: Editorial Header & Hero-Bridging Standfirst */}
          <motion.div
            initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
            whileInView={MOTION_TOKENS.revealAnimate}
            viewport={MOTION_TOKENS.viewport}
            transition={{
              duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
              ease: MOTION_TOKENS.ease,
            }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-y-6 sm:gap-y-7 xl:gap-x-12 items-end pb-8 sm:pb-10 lg:pb-12 border-b border-[#142B40]/12"
          >
            <div className="xl:col-span-5 space-y-4 sm:space-y-5 min-w-0">
              <p className="font-body inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] leading-[1.4] text-[#7D5B22]">
                <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                <span>{STORY_CHAPTERS.chapter01.aboutKicker}</span>
              </p>

              <h2
                id="about-heading"
                className="font-heading text-[clamp(2rem,3.2vw,2.85rem)] font-bold tracking-[-0.025em] leading-[1.12] text-[#142B40]"
              >
                {STORY_CHAPTERS.chapter01.aboutHeading}
              </h2>

              <div className="pt-1 flex items-center gap-2.5 text-[#7D5B22]" aria-hidden="true">
                <span className="h-px w-8 bg-[#C49A52]" />
                <span className="inline-flex items-center gap-2 text-[#7D5B22]/85">
                  <DataGlyphIcon className="w-[15px] h-[15px]" />
                  <span className="w-1 h-1 rotate-45 bg-[#C49A52]/75 shrink-0" />
                  <AnalysisGlyphIcon className="w-[15px] h-[15px]" />
                  <span className="w-1 h-1 rotate-45 bg-[#C49A52]/75 shrink-0" />
                  <InsightGlyphIcon className="w-[15px] h-[15px]" />
                </span>
                <span className="h-px flex-1 bg-[#142B40]/12" />
              </div>
            </div>

            <div className="xl:col-span-7 min-w-0 xl:pb-1">
              <p className="font-body text-[17.5px] sm:text-[19.5px] font-medium text-[#142B40] leading-[1.58] tracking-[-0.015em] max-w-[56ch]">
                Finding what the data reveals starts long before opening a dashboard. As a Data
                Analyst, my role sits at the point where scattered records become clear
                answers—building structured data models, Power BI dashboards, and evidence-based
                reports across e-commerce, healthcare, urban operations, and retail analytics.
              </p>
            </div>
          </motion.div>

          {/* Tier 2: Balanced Two-Column Editorial Canvas (Single Column on Mobile & Tablet, Equal-Height Split at xl) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-7 xl:gap-10 pt-8 sm:pt-10 lg:pt-12 items-stretch">
            {/* Left (7 cols): Unified Editorial Narrative Essay Sheet */}
            <motion.article
              initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
              whileInView={MOTION_TOKENS.revealAnimate}
              viewport={MOTION_TOKENS.viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
                delay: prefersReducedMotion ? 0 : 0.04,
                ease: MOTION_TOKENS.ease,
              }}
              className="xl:col-span-7 rounded-2xl bg-[#FFFFFF] border border-[#142B40]/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-7 min-w-0"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#142B40]/10">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                    />
                    <h3 className="font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] leading-[1.4] text-[#7D5B22]">
                      From Question to Clarity
                    </h3>
                  </div>
                  <div
                    aria-hidden="true"
                    className="inline-flex items-center gap-2.5 text-[#7D5B22]/85 shrink-0"
                  >
                    <DataGlyphIcon className="w-[17px] h-[17px]" />
                    <AnalysisGlyphIcon className="w-[17px] h-[17px]" />
                    <InsightGlyphIcon className="w-[17px] h-[17px]" />
                  </div>
                </div>

                <div className="space-y-5 max-w-[60ch]">
                  <p className="font-body text-[15px] sm:text-[16px] font-normal text-[#101820]/86 leading-[1.82] tracking-[-0.008em]">
                    I approach every dataset as an investigation rather than a routine summary.
                    Beginning with structured data preparation in SQL Server and Excel, I verify
                    data quality and test assumptions through exploratory analysis in Python—tracing
                    the operational bottlenecks, customer behaviors, and financial patterns hidden
                    beneath surface-level metrics.
                  </p>

                  <p className="font-body text-[15px] sm:text-[16px] font-normal text-[#101820]/86 leading-[1.82] tracking-[-0.008em]">
                    Once the evidence holds up, the work becomes translation: shaping verified
                    findings into clear visual narratives that teams can trust, question, and act
                    on. Whether examining marketplace dynamics, urban service demand, hospital
                    billing records, or retail margins, my aim stays consistent—separate meaningful
                    signal from noise and report what the data honestly shows.
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-[#142B40]/10 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-body text-xs font-medium tracking-[-0.004em] text-[#4D5C6B] leading-[1.6]">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7D5B22] mr-1">
                  Domains
                </span>
                {analyticalDomains.map((domain, idx) => (
                  <React.Fragment key={domain}>
                    {idx > 0 && (
                      <span aria-hidden="true" className="text-[#C49A52]">
                        ·
                      </span>
                    )}
                    <span>{domain}</span>
                  </React.Fragment>
                ))}
              </div>
            </motion.article>

            {/* Right (5 cols): Midnight Navy Career Focus & Role Alignment Panel */}
            <motion.aside
              initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
              whileInView={MOTION_TOKENS.revealAnimate}
              viewport={MOTION_TOKENS.viewport}
              transition={{
                duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
                delay: prefersReducedMotion ? 0 : 0.08,
                ease: MOTION_TOKENS.ease,
              }}
              className="xl:col-span-5 relative rounded-2xl bg-[#142B40] text-[#F6F1E8] border border-[#C49A52]/28 p-6 sm:p-8 lg:p-9 flex flex-col justify-between gap-7 overflow-hidden min-w-0"
            >
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#C49A52]/55 to-transparent pointer-events-none"
              />

              <div className="space-y-6">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                      />
                      <h3 className="font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] leading-[1.4] text-[#C49A52]">
                        Career Focus
                      </h3>
                    </div>
                    <AnalysisGlyphIcon className="w-[18px] h-[18px] text-[#C49A52]/90 shrink-0" />
                  </div>

                  <p className="font-body text-[15px] sm:text-[15.5px] font-normal text-[#F6F1E8]/92 leading-[1.78] tracking-[0.002em] max-w-[52ch]">
                    That investigative approach shapes the teams I want to support next—where
                    disciplined data modeling and honest reporting help organizations move
                    confidently from raw data to better-informed decisions.
                  </p>
                </div>

                {/* Role Alignment List Integrated Cleanly */}
                <div className="pt-5 border-t border-[#D9C4A0]/15">
                  <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] leading-[1.4] text-[#C49A52] mb-3.5">
                    Role Alignment
                  </p>
                  <ul className="divide-y divide-[#D9C4A0]/12">
                    {targetRoles.map((role, idx) => (
                      <li
                        key={role}
                        className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 min-w-0"
                      >
                        <span className="font-body flex items-center gap-2.5 text-[14.5px] font-medium tracking-[0.002em] leading-[1.45] text-[#F6F1E8]">
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                          />
                          <span>{role}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-heading text-[11px] font-semibold tracking-[0.04em] text-[#C49A52]/85 tabular-nums shrink-0"
                        >
                          {`0${idx + 1}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9C4A0]/15">
                <a
                  href="#skills"
                  onClick={handleStoryFlowClick}
                  className="group font-body inline-flex items-center gap-2 py-1.5 px-2 -mx-2 min-h-[44px] text-[13.5px] sm:text-sm font-medium tracking-[0.004em] leading-[1.45] text-[#C49A52] hover:text-[#D9C4A0] border border-transparent rounded-lg transition-[color,border-color,background-color] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:bg-[#101820]/55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
                >
                  <span>Next in the story: How I approach analytical work</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </SectionContainer>

      {/* Thin Antique Gold (#C49A52 at 15% opacity) Horizontal Rule Transitioning Into Skills */}
      <div
        aria-hidden="true"
        className={`${CONTAINER_GEOMETRY.outerGutter} pt-10 sm:pt-12 lg:pt-14 mb-6 sm:mb-8 lg:mb-10`}
      >
        <div className={`${CONTAINER_GEOMETRY.maxWidth} ${CONTAINER_GEOMETRY.horizontalPadding}`}>
          <div className={CONTAINER_GEOMETRY.innerRail}>
            <hr className="h-px w-full border-0 bg-[#C49A52]/15" />
          </div>
        </div>
      </div>
    </>
  );
}

const TOOLKIT_TOOLTIPS: Record<string, { stage: string; detail: string }> = {
  'SQL Server': {
    stage: '02 · Prepare',
    detail: 'Stores, indexes, and queries structured business datasets to establish a dependable analytical foundation.',
  },
  'T-SQL': {
    stage: '02 · Prepare',
    detail: 'Performs aggregations, joins, window functions, and validation checks to clean and transform operational records.',
  },
  'Relational Database Design': {
    stage: '02 · Prepare',
    detail: 'Normalizes tables, keys, and constraints to preserve referential integrity across analytical schemas.',
  },
  'SQL Views': {
    stage: '02 · Prepare',
    detail: 'Encapsulates reusable transformation and metric logic so downstream reports query consistent definitions.',
  },
  'Power BI': {
    stage: '04 · Communicate',
    detail: 'Turns validated data models into interactive executive dashboards and drill-down performance views.',
  },
  DAX: {
    stage: '03 · Investigate',
    detail: 'Defines dynamic measures, time-intelligence comparisons, and custom KPIs inside analytical models.',
  },
  'Power Query': {
    stage: '02 · Prepare',
    detail: 'Automates repeatable data ingestion, cleansing, and shaping steps prior to semantic modeling.',
  },
  'Data Modeling': {
    stage: '02 · Prepare',
    detail: 'Designs star-schema relationships and conformed dimensions so metrics filter accurately across views.',
  },
  'KPI Development': {
    stage: '01 · Understand',
    detail: 'Translates business objectives into clear, auditable measures that anchor scope and performance tracking.',
  },
  Python: {
    stage: '03 · Investigate',
    detail: 'Automates exploratory analysis, anomaly detection, and reproducible analytical scripts across large datasets.',
  },
  Pandas: {
    stage: '03 · Investigate',
    detail: 'Profiles, merges, and reshapes tabular datasets to test hypotheses and uncover operational patterns.',
  },
  NumPy: {
    stage: '03 · Investigate',
    detail: 'Powers vectorized numerical computations and statistical comparisons during deep data investigation.',
  },
  'Scikit-learn': {
    stage: '03 · Investigate',
    detail: 'Builds and cross-validates baseline predictive models to evaluate drivers and quantify analytical patterns.',
  },
  LightGBM: {
    stage: '03 · Investigate',
    detail: 'Trains gradient-boosted models on structured tabular data to test non-linear relationships and risk signals.',
  },
  'Model Training & Evaluation': {
    stage: '03 · Investigate',
    detail: 'Measures out-of-sample performance and feature reliability before recommending predictive approaches.',
  },
  Excel: {
    stage: '04 · Communicate',
    detail: 'Delivers transparent ad-hoc reconciliations, financial summaries, and decision-ready stakeholder workbooks.',
  },
  'Power Pivot': {
    stage: '02 · Prepare',
    detail: 'Builds in-memory relational models inside Excel to analyze multi-table datasets without fragile formulas.',
  },
  PivotTables: {
    stage: '04 · Communicate',
    detail: 'Enables rapid cross-tabulation and KPI validation when slicing operational and sales performance.',
  },
  'Tableau (Basic)': {
    stage: '04 · Communicate',
    detail: 'Supports visual exploration and clear chart storytelling when presenting findings across BI environments.',
  },
  ETL: {
    stage: '02 · Prepare',
    detail: 'Extracts, transforms, and loads raw source data into clean, reliable tables ready for analysis.',
  },
  'Jupyter Notebook': {
    stage: '03 · Investigate',
    detail: 'Combines executable code, charts, and written reasoning to document reproducible analytical investigations.',
  },
  Git: {
    stage: '02 · Prepare',
    detail: 'Tracks changes across SQL scripts, notebooks, and modeling logic to keep analytical work auditable.',
  },
  GitHub: {
    stage: '04 · Communicate',
    detail: 'Publishes documented analytical code, project walkthroughs, and reproducible case-study artifacts.',
  },
};

/**
 * Chapter 02: How I Approach Data (#EFE8DC Warm Parchment surface, alternating from #F8F4EC About)
 */
export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const ledgerRef = useRef<HTMLDivElement>(null);
  const toolkitCardRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const contextMenuActionRef = useRef<HTMLAnchorElement>(null);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<{
    tool: string;
    align: 'left' | 'center' | 'right';
  } | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    stageIndex: string;
    stageTitle: string;
  } | null>(null);
  const [workflowView, setWorkflowView] = useState<'editorial' | 'diagram'>(() => {
    try {
      const saved = window.localStorage.getItem('workflow-view-preference');
      return saved === 'diagram' ? 'diagram' : 'editorial';
    } catch {
      return 'editorial';
    }
  });
  const [revealedStages, setRevealedStages] = useState<boolean[]>(() =>
    WORKFLOW_STAGES.map(() => Boolean(prefersReducedMotion))
  );

  const handleWorkflowViewChange = (nextView: 'editorial' | 'diagram') => {
    setWorkflowView(nextView);
    setContextMenu(null);
    try {
      window.localStorage.setItem('workflow-view-preference', nextView);
    } catch {
      // Ignore storage restrictions in sandboxed iframes
    }
  };

  const { scrollYProgress } = useScroll({
    target: ledgerRef,
    offset: ['start 72%', 'end 62%'],
  });

  const spineProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.25,
  });

  // Track which workflow stage is currently in the upper-middle reading zone
  useEffect(() => {
    if (workflowView !== 'editorial') return;
    const nodes = stageRefs.current.filter((el): el is HTMLLIElement => el !== null);
    if (nodes.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const idx = nodes.indexOf(visible[0].target as HTMLLIElement);
          if (idx !== -1) {
            setActiveStageIdx(idx);
          }
        }
      },
      {
        rootMargin: '-24% 0px -54% 0px',
        threshold: [0, 0.25, 0.5],
      }
    );

    nodes.forEach((node) => activeObserver.observe(node));
    return () => activeObserver.disconnect();
  }, [workflowView]);

  // One-shot Intersection Observer triggering subtle editorial slide-in per stage on scroll
  useEffect(() => {
    if (workflowView !== 'editorial') return;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setRevealedStages(WORKFLOW_STAGES.map(() => true));
      return;
    }

    const nodes = stageRefs.current.filter((el): el is HTMLLIElement => el !== null);
    if (nodes.length === 0) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = nodes.indexOf(entry.target as HTMLLIElement);
          if (idx !== -1) {
            setRevealedStages((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
          revealObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.14,
      }
    );

    nodes.forEach((node) => revealObserver.observe(node));
    return () => revealObserver.disconnect();
  }, [prefersReducedMotion, workflowView]);

  const handleStageAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    stageId: string,
    idx: number
  ) => {
    const target = document.getElementById(`workflow-${stageId}`);
    if (!target) return;
    e.preventDefault();
    setActiveStageIdx(idx);
    setRevealedStages((prev) => {
      if (prev[idx]) return prev;
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
    if (window.location.hash !== `#workflow-${stageId}`) {
      window.history.replaceState(null, '', `#workflow-${stageId}`);
    }
  };

  useEffect(() => {
    if (!activeTooltip) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveTooltip(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTooltip]);

  const openToolTooltip = (tool: string, triggerEl: HTMLElement) => {
    const cardRect = toolkitCardRef.current?.getBoundingClientRect();
    const triggerRect = triggerEl.getBoundingClientRect();
    let align: 'left' | 'center' | 'right' = 'center';

    if (cardRect) {
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      const spaceLeft = triggerCenter - cardRect.left;
      const spaceRight = cardRect.right - triggerCenter;
      if (spaceLeft < 150) {
        align = 'left';
      } else if (spaceRight < 150) {
        align = 'right';
      }
    }

    setActiveTooltip({ tool, align });
  };

  useEffect(() => {
    if (!contextMenu) return;

    const rafId = window.requestAnimationFrame(() => {
      contextMenuActionRef.current?.focus({ preventScroll: true });
    });

    const handlePointerDown = (event: PointerEvent) => {
      if (
        contextMenuRef.current &&
        event.target instanceof Node &&
        contextMenuRef.current.contains(event.target)
      ) {
        return;
      }
      setContextMenu(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setContextMenu(null);
      }
    };

    const handleViewportChange = () => {
      setContextMenu(null);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, [contextMenu]);

  const handleStageContextMenu = (
    e: React.MouseEvent<Element>,
    stageIndex: string,
    stageTitle: string
  ) => {
    e.preventDefault();
    const menuWidth = 256;
    const menuHeight = 112;
    const margin = 12;
    const x = Math.max(margin, Math.min(e.clientX, window.innerWidth - menuWidth - margin));
    const y = Math.max(margin, Math.min(e.clientY, window.innerHeight - menuHeight - margin));
    setContextMenu({ x, y, stageIndex, stageTitle });
  };

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById('projects');
    setContextMenu(null);
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

  const activeStage = WORKFLOW_STAGES[activeStageIdx] ?? WORKFLOW_STAGES[0];

  return (
    <>
      <SectionContainer id="skills" surface="parchment" padding="standard" showConnector>
      <div
        aria-labelledby="skills-heading"
        className="font-body max-w-[760px] mx-auto xl:max-w-none xl:mx-0"
      >
        {/* Chapter 02 Editorial Introduction Band */}
        <motion.div
          initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
          whileInView={MOTION_TOKENS.revealAnimate}
          viewport={MOTION_TOKENS.viewport}
          transition={{
            duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
            ease: MOTION_TOKENS.ease,
          }}
          className="grid grid-cols-1 xl:grid-cols-12 gap-y-6 sm:gap-y-7 xl:gap-x-12 items-end pb-8 sm:pb-10 lg:pb-12 border-b border-[#142B40]/12"
        >
          <div className="xl:col-span-7 space-y-3.5 sm:space-y-4 min-w-0">
            <p className="font-body inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] leading-[1.4] text-[#7D5B22]">
              <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
              <span>{STORY_CHAPTERS.chapter02.kicker}</span>
            </p>
            <h2
              id="skills-heading"
              className="font-heading text-[clamp(2rem,3.2vw,2.85rem)] font-bold tracking-[-0.025em] leading-[1.12] text-[#142B40]"
            >
              {STORY_CHAPTERS.chapter02.heading}
            </h2>
          </div>

          <p className="xl:col-span-5 font-body text-[15.5px] sm:text-[16px] font-normal text-[#4D5C6B] leading-[1.74] tracking-[-0.008em] max-w-[52ch] xl:pb-1">
            {STORY_CHAPTERS.chapter02.subtitle}
          </p>
        </motion.div>

        {/* A. Analytical Workflow — Connected Vertical Editorial Process Ledger & D3 Diagram Toggle */}
        <div
          ref={ledgerRef}
          className="relative mt-8 sm:mt-10 lg:mt-12 rounded-2xl bg-[#F8F4EC] border border-[#142B40]/10 px-5 sm:px-8 xl:px-10 pb-1 sm:pb-2 overflow-x-clip"
        >
          {/* Editorial Stage Anchor Index, Reading Position Indicator & View Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 py-3.5 sm:py-4 border-b border-[#142B40]/10">
            <p className="font-heading inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.06em] leading-[1.4] text-[#142B40] min-w-0">
              <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
              {workflowView === 'editorial' ? (
                <>
                  <span className="tabular-nums text-[#7D5B22] shrink-0">
                    {activeStage.index} / 04
                  </span>
                  <span aria-hidden="true" className="text-[#142B40]/25 shrink-0">
                    ·
                  </span>
                  <span className="truncate font-medium text-[#4D5C6B] tracking-[-0.005em]">
                    {activeStage.title}
                  </span>
                </>
              ) : (
                <>
                  <span className="uppercase tracking-[0.14em] text-[#7D5B22] shrink-0">
                    Process Flow
                  </span>
                  <span aria-hidden="true" className="text-[#142B40]/25 shrink-0">
                    ·
                  </span>
                  <span className="truncate font-medium text-[#4D5C6B] tracking-[-0.005em]">
                    Four Connected Stages
                  </span>
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {workflowView === 'editorial' && (
                <nav
                  aria-label="Analytical workflow stage anchors"
                  className="flex items-center gap-1 sm:gap-1.5"
                >
                  {WORKFLOW_STAGES.map((stage, idx) => {
                    const isCurrent = idx === activeStageIdx;
                    return (
                      <a
                        key={stage.id}
                        href={`#workflow-${stage.id}`}
                        onClick={(e) => handleStageAnchorClick(e, stage.id, idx)}
                        aria-current={isCurrent ? 'location' : undefined}
                        aria-label={`Jump to stage ${stage.index} of 04: ${stage.title}`}
                        title={`${stage.index} — ${stage.title}`}
                        className={`relative inline-flex items-center justify-center min-w-[36px] min-h-[44px] px-2 font-heading text-xs font-semibold tabular-nums tracking-[0.06em] rounded-md transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] ${
                          isCurrent
                            ? 'text-[#7D5B22]'
                            : 'text-[#4D5C6B] hover:text-[#142B40]'
                        }`}
                      >
                        <span>{stage.index}</span>
                        <span
                          aria-hidden="true"
                          className={`absolute left-2 right-2 bottom-2 h-[2px] rounded-full bg-[#C49A52] transition-[opacity,transform] duration-200 motion-reduce:transition-none ${
                            isCurrent ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                          }`}
                        />
                      </a>
                    );
                  })}
                </nav>
              )}

              <div
                role="group"
                aria-label="Analytical workflow view mode"
                className="inline-flex items-center rounded-lg border border-[#142B40]/14 bg-[#EFE8DC]/65 p-0.5"
              >
                <button
                  type="button"
                  aria-pressed={workflowView === 'editorial'}
                  onClick={() => handleWorkflowViewChange('editorial')}
                  className={`inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-md font-heading text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] ${
                    workflowView === 'editorial'
                      ? 'bg-[#F8F4EC] text-[#142B40] shadow-[0_1px_2px_rgba(20,43,64,0.08)]'
                      : 'text-[#4D5C6B] hover:text-[#142B40]'
                  }`}
                >
                  <List className="w-3.5 h-3.5 text-[#7D5B22]" aria-hidden="true" />
                  <span>Editorial</span>
                </button>
                <button
                  type="button"
                  aria-pressed={workflowView === 'diagram'}
                  onClick={() => handleWorkflowViewChange('diagram')}
                  className={`inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-md font-heading text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] ${
                    workflowView === 'diagram'
                      ? 'bg-[#F8F4EC] text-[#142B40] shadow-[0_1px_2px_rgba(20,43,64,0.08)]'
                      : 'text-[#4D5C6B] hover:text-[#142B40]'
                  }`}
                >
                  <Network className="w-3.5 h-3.5 text-[#7D5B22]" aria-hidden="true" />
                  <span>Diagram</span>
                </button>
              </div>
            </div>
          </div>

          {workflowView === 'diagram' ? (
            <WorkflowFlowchartSvg
              stages={WORKFLOW_STAGES}
              onStageContextMenu={handleStageContextMenu}
            />
          ) : (
            <div className="relative">
              {/* Base Continuous Subtle Vertical Antique Gold Spine */}
              <span
                aria-hidden="true"
                className="absolute left-[4.5px] top-[36px] sm:top-[40px] xl:top-[44px] bottom-7 sm:bottom-8 xl:bottom-9 w-px bg-[#C49A52]/22 pointer-events-none"
              />

              {/* Scroll-Linked Antique Gold Progress Spine */}
              <motion.span
                aria-hidden="true"
                style={{ scaleY: prefersReducedMotion ? 1 : spineProgress }}
                className="absolute left-[4.5px] top-[36px] sm:top-[40px] xl:top-[44px] bottom-7 sm:bottom-8 xl:bottom-9 w-px origin-top bg-gradient-to-b from-[#C49A52] via-[#C49A52] to-[#B88B3E] pointer-events-none"
              />

              <ol
                aria-label="Analytical Workflow"
                className="pl-7 sm:pl-9 xl:pl-11 divide-y divide-[#142B40]/10"
              >
                {WORKFLOW_STAGES.map((stage, idx) => {
                  const isCurrent = idx === activeStageIdx;
                  const isRevealed = Boolean(prefersReducedMotion) || Boolean(revealedStages[idx]);
                  return (
                    <li
                      key={stage.id}
                      id={`workflow-${stage.id}`}
                      ref={(el) => {
                        stageRefs.current[idx] = el;
                      }}
                      onContextMenu={(e) => handleStageContextMenu(e, stage.index, stage.title)}
                      className="group relative py-7 sm:py-8 xl:py-9 scroll-mt-28"
                    >
                      {/* Geometric Antique Gold Diamond Node Centered Along Spine */}
                      <span
                        aria-hidden="true"
                        className={`absolute z-10 -left-[28px] sm:-left-[36px] xl:-left-[44px] top-[31px] sm:top-[35px] xl:top-[39px] w-2.5 h-2.5 rotate-45 origin-center ring-4 ring-[#F8F4EC] transition-[opacity,scale,transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125 group-hover:bg-[#B88B3E] group-hover:shadow-[0_0_12px_3px_rgba(196,154,82,0.45)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-100 motion-reduce:group-hover:scale-100 ${
                          !isRevealed
                            ? 'opacity-0 scale-75 bg-[#C49A52]'
                            : isCurrent
                              ? 'opacity-100 scale-[1.14] bg-[#B88B3E] shadow-[0_0_10px_2px_rgba(196,154,82,0.38)]'
                              : 'opacity-100 scale-100 bg-[#C49A52]'
                        }`}
                      />

                      {/* Single-Column on Mobile/Tablet/Compact Desktop (<1280px); Balanced Two-Zone Ledger at xl (1280px+) */}
                      <div
                        className={`grid grid-cols-1 xl:grid-cols-12 gap-y-5 xl:gap-x-10 items-start transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 ${
                          isRevealed
                            ? 'opacity-100 translate-x-0 translate-y-0'
                            : 'opacity-0 translate-x-3 translate-y-1.5'
                        }`}
                      >
                        {/* Stage Sequence, Title & Explanation */}
                        <div className="xl:col-span-6 space-y-2.5 min-w-0">
                          <p className="font-heading text-xs font-semibold tabular-nums tracking-[0.06em] leading-[1.4]">
                            <span className="text-[#7D5B22]">{stage.index}</span>
                            <span aria-hidden="true" className="text-[#142B40]/30 mx-1.5">
                              /
                            </span>
                            <span className="text-[#4D5C6B]">04</span>
                          </p>

                          <h3 className="font-heading text-[19px] sm:text-[21px] font-bold tracking-[-0.02em] leading-[1.28] text-[#142B40]">
                            {stage.title}
                          </h3>

                          <p className="font-body text-[15px] sm:text-[15.5px] font-normal text-[#4D5C6B] leading-[1.74] tracking-[-0.008em] max-w-[48ch] pt-0.5">
                            {stage.summary}
                          </p>
                        </div>

                        {/* Supporting Capabilities List */}
                        <div className="xl:col-span-6 xl:border-l xl:border-[#142B40]/10 xl:pl-10 xl:pt-6 min-w-0">
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                            {stage.items.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 font-body text-[14px] sm:text-[14.5px] font-normal text-[#101820]/90 leading-[1.55] tracking-[-0.006em]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[8px] w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>

        {/* Analytical Pillars — Editorial Philosophy Bridge (Data Integrity vs. Actionable Insight) */}
        <motion.section
          aria-labelledby="analytical-pillars-heading"
          initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
          whileInView={MOTION_TOKENS.revealAnimate}
          viewport={MOTION_TOKENS.viewport}
          transition={{
            duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
            ease: MOTION_TOKENS.ease,
          }}
          className="mt-10 sm:mt-12 pt-8 sm:pt-9 border-t border-[#142B40]/12"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 pb-6 sm:pb-7">
            <div className="inline-flex items-center gap-2.5">
              <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
              <h3
                id="analytical-pillars-heading"
                className="font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] leading-[1.4] text-[#7D5B22]"
              >
                Analytical Pillars
              </h3>
            </div>

            <p className="font-body text-[13.5px] sm:text-sm font-medium text-[#4D5C6B] leading-[1.55] tracking-[-0.005em]">
              Integrity builds trust; insight earns action—neither stands alone.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-8 xl:gap-x-12 items-start">
            {/* Pillar 01: Data Integrity */}
            <article className="space-y-3 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-heading text-xs font-semibold tabular-nums tracking-[0.06em] text-[#7D5B22]">
                    01
                  </span>
                  <span aria-hidden="true" className="w-4 h-px bg-[#C49A52]/70 shrink-0" />
                  <h4 className="font-heading text-[18px] sm:text-[19px] font-bold tracking-[-0.02em] leading-[1.3] text-[#142B40]">
                    Data Integrity
                  </h4>
                </div>
                <DataGlyphIcon className="w-[16px] h-[16px] text-[#7D5B22]/80 shrink-0" />
              </div>

              <p className="font-body text-[14.5px] sm:text-[15.5px] font-normal text-[#4D5C6B] leading-[1.76] tracking-[-0.008em] max-w-[54ch]">
                Clean visuals cannot compensate for unreliable records. Before drawing any
                conclusion, I verify schema relationships, reconcile totals, and surface anomalies
                honestly—because decision-makers need numbers they can question and trust.
              </p>

              <p className="pt-1 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7D5B22]/90">
                <span>Discipline</span>
                <span aria-hidden="true" className="text-[#C49A52] mx-2">
                  ·
                </span>
                <span>Validation</span>
                <span aria-hidden="true" className="text-[#C49A52] mx-2">
                  ·
                </span>
                <span>Reproducible Logic</span>
              </p>
            </article>

            {/* Pillar 02: Actionable Insight */}
            <article className="space-y-3 pt-7 border-t border-[#142B40]/10 xl:pt-0 xl:border-t-0 xl:border-l xl:border-[#142B40]/12 xl:pl-12 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-heading text-xs font-semibold tabular-nums tracking-[0.06em] text-[#7D5B22]">
                    02
                  </span>
                  <span aria-hidden="true" className="w-4 h-px bg-[#C49A52]/70 shrink-0" />
                  <h4 className="font-heading text-[18px] sm:text-[19px] font-bold tracking-[-0.02em] leading-[1.3] text-[#142B40]">
                    Actionable Insight
                  </h4>
                </div>
                <InsightGlyphIcon className="w-[16px] h-[16px] text-[#7D5B22]/80 shrink-0" />
              </div>

              <p className="font-body text-[14.5px] sm:text-[15.5px] font-normal text-[#4D5C6B] leading-[1.76] tracking-[-0.008em] max-w-[54ch]">
                Verified data only creates value when it clarifies a real decision. I strip away
                decorative noise to frame what changed, why it matters, and where operational or
                financial attention belongs next.
              </p>

              <p className="pt-1 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-[#7D5B22]/90">
                <span>Clarity</span>
                <span aria-hidden="true" className="text-[#C49A52] mx-2">
                  ·
                </span>
                <span>Business Context</span>
                <span aria-hidden="true" className="text-[#C49A52] mx-2">
                  ·
                </span>
                <span>Honest Reporting</span>
              </p>
            </article>
          </div>
        </motion.section>

        {/* B. Supporting Technical Toolkit — Midnight Navy Editorial Taxonomy Matrix */}
        <motion.div
          ref={toolkitCardRef}
          initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
          whileInView={MOTION_TOKENS.revealAnimate}
          viewport={MOTION_TOKENS.viewport}
          transition={{
            duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.standard,
            ease: MOTION_TOKENS.ease,
          }}
          className="mt-10 sm:mt-12 relative rounded-2xl bg-[#142B40] text-[#F6F1E8] border border-[#C49A52]/28 p-6 sm:p-8 xl:p-10 2xl:p-12 overflow-visible"
        >
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-[#C49A52]/55 to-transparent pointer-events-none"
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-7 2xl:pb-7 2xl:mb-8 border-b border-[#D9C4A0]/15">
            <div className="space-y-2 min-w-0">
              <p className="font-heading inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] leading-[1.4] text-[#C49A52]">
                <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
                <span>{CORE_TECHNICAL_TOOLKIT.label}</span>
              </p>
              <h3 className="font-heading text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] leading-[1.2] text-[#F6F1E8]">
                {CORE_TECHNICAL_TOOLKIT.title}
              </h3>
            </div>

            <a
              href="#projects"
              onClick={handleProjectsClick}
              className="group font-body inline-flex items-center gap-2 py-2 px-2 -mx-2 min-h-[44px] text-[13.5px] sm:text-sm font-medium tracking-[0.004em] leading-[1.45] text-[#C49A52] hover:text-[#D9C4A0] border border-transparent rounded-lg transition-[color,border-color,background-color] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:bg-[#101820]/55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] sm:whitespace-nowrap self-start md:self-auto"
            >
              <span>{STORY_CHAPTERS.chapter02.transitionLabel.replace(' →', '')}</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 2xl:gap-x-12 gap-y-7 xl:gap-y-8 2xl:gap-y-9">
            {CORE_TECHNICAL_TOOLKIT.groups.map((group, idx) => {
              const colInRow = idx % 3;
              const responsiveSpan =
                colInRow === 1
                  ? 'md:col-span-6 xl:col-span-4 2xl:col-span-5'
                  : colInRow === 2
                    ? 'md:col-span-6 xl:col-span-4 2xl:col-span-3'
                    : 'md:col-span-6 xl:col-span-4 2xl:col-span-4';

              return (
                <div
                  key={group.category}
                  className={`space-y-2.5 min-w-0 ${responsiveSpan} ${
                    idx > 0 ? 'pt-5 border-t border-[#D9C4A0]/12' : ''
                  } ${idx < 2 ? 'md:pt-0 md:border-t-0' : 'md:pt-6'} ${
                    idx < 3 ? 'xl:pt-0 xl:border-t-0' : 'xl:pt-7 2xl:pt-8'
                  }`}
                >
                  <h4 className="font-heading text-xs 2xl:text-[13px] font-semibold uppercase tracking-[0.14em] 2xl:tracking-[0.15em] leading-[1.45] text-[#C49A52] text-balance">
                    {group.category}
                  </h4>
                  <p className="font-body text-[14.5px] sm:text-[15px] 2xl:text-[15.5px] font-normal text-[#F6F1E8]/90 leading-[1.8] tracking-[0.002em] max-w-[42ch]">
                    {group.tools.map((tool, toolIdx) => {
                      const info = TOOLKIT_TOOLTIPS[tool];
                      const isOpen = activeTooltip?.tool === tool;
                      const tooltipId = `toolkit-tip-${idx}-${toolIdx}`;
                      const alignClass =
                        activeTooltip?.align === 'left'
                          ? 'left-0'
                          : activeTooltip?.align === 'right'
                            ? 'right-0'
                            : 'left-1/2 -translate-x-1/2';

                      return (
                        <React.Fragment key={tool}>
                          {toolIdx > 0 && (
                            <span aria-hidden="true" className="text-[#C49A52]/80 mx-2">
                              ·
                            </span>
                          )}
                          <span
                            className="relative inline-block"
                            onMouseLeave={() =>
                              setActiveTooltip((prev) => (prev?.tool === tool ? null : prev))
                            }
                          >
                            <button
                              type="button"
                              aria-describedby={isOpen && info ? tooltipId : undefined}
                              onMouseEnter={(e) => info && openToolTooltip(tool, e.currentTarget)}
                              onFocus={(e) => info && openToolTooltip(tool, e.currentTarget)}
                              onBlur={() =>
                                setActiveTooltip((prev) => (prev?.tool === tool ? null : prev))
                              }
                              onClick={(e) => {
                                if (!info) return;
                                if (isOpen) {
                                  setActiveTooltip(null);
                                } else {
                                  openToolTooltip(tool, e.currentTarget);
                                }
                              }}
                              className="inline cursor-help bg-transparent border-0 p-0 text-left font-inherit text-inherit underline decoration-[#C49A52]/30 decoration-dotted underline-offset-[5px] transition-colors duration-150 hover:text-[#FFFFFF] hover:decoration-[#C49A52] focus-visible:text-[#FFFFFF] focus-visible:decoration-[#C49A52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52] rounded-[2px]"
                            >
                              {tool}
                            </button>

                            {info && (
                              <span
                                id={tooltipId}
                                role="tooltip"
                                aria-hidden={!isOpen}
                                className={`pointer-events-none absolute z-30 bottom-full mb-2.5 ${alignClass} w-[264px] max-w-[calc(100vw-3.5rem)] rounded-xl bg-[#0D1924] border border-[#C49A52]/35 px-3.5 py-2.5 text-left shadow-[0_14px_30px_-10px_rgba(6,12,18,0.78)] transition-[opacity,transform,visibility] duration-150 ease-out motion-reduce:transition-none ${
                                  isOpen
                                    ? 'visible opacity-100 translate-y-0'
                                    : 'invisible opacity-0 translate-y-1'
                                }`}
                              >
                                <span className="block font-heading text-[10px] font-semibold uppercase tracking-[0.14em] leading-[1.35] text-[#C49A52] mb-1">
                                  {info.stage}
                                </span>
                                <span className="block font-body text-[12.5px] font-normal leading-[1.55] tracking-[0.002em] text-[#F6F1E8]/92">
                                  {info.detail}
                                </span>
                              </span>
                            )}
                          </span>
                        </React.Fragment>
                      );
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionContainer>

      <AnimatePresence>
        {contextMenu && (
          <motion.div
            ref={contextMenuRef}
            role="menu"
            aria-label={`Stage ${contextMenu.stageIndex} navigation actions`}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 2, scale: 0.98 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.14,
              ease: MOTION_TOKENS.ease,
            }}
            style={{ left: contextMenu.x, top: contextMenu.y }}
            className="fixed z-50 w-[256px] rounded-xl bg-[#0E1A26] border border-[#C49A52]/35 p-1.5 shadow-[0_18px_40px_-12px_rgba(6,12,18,0.78)]"
          >
            <div className="px-2.5 py-1.5 mb-1 border-b border-[#D9C4A0]/12 flex items-center gap-2 min-w-0">
              <span aria-hidden="true" className="w-1.5 h-1.5 rotate-45 bg-[#C49A52] shrink-0" />
              <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C49A52] truncate">
                {contextMenu.stageIndex} / 04 · {contextMenu.stageTitle}
              </span>
            </div>

            <a
              ref={contextMenuActionRef}
              href="#projects"
              role="menuitem"
              onClick={handleProjectsClick}
              className="group flex items-center justify-between gap-3 w-full rounded-lg px-2.5 py-2.5 text-left transition-colors duration-150 hover:bg-[#142B40] focus-visible:bg-[#142B40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A52]"
            >
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-heading text-xs font-semibold tracking-[0.02em] text-[#F6F1E8]">
                  <span className="tabular-nums text-[#C49A52]">03</span>
                  <span>Jump to Projects</span>
                </span>
                <span className="block font-body text-[11.5px] leading-[1.4] text-[#D9C4A0]/75 mt-0.5">
                  See this workflow in practice
                </span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="w-3.5 h-3.5 text-[#C49A52] shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function AboutSkillsSection() {
  return (
    <>
      <AboutSection />
      <SkillsSection />
    </>
  );
}
