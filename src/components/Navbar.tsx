import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, MapPin, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { CONTAINER_GEOMETRY, MOTION_TOKENS } from '../styles/designSystem';
import { EyeOfHorusLogo } from './EyeOfHorusLogo';

const NAV_LINKS = [
  { id: 'about', index: '01', label: 'About', href: '#about' },
  { id: 'skills', index: '02', label: 'Skills', href: '#skills' },
  { id: 'projects', index: '03', label: 'Projects', href: '#projects' },
  { id: 'journey', index: '04', label: 'Journey', href: '#journey' },
  { id: 'contact', index: '05', label: 'Contact', href: '#contact' },
] as const;

export function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const lastMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);

    const updateActiveFromScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 12);

      if (scrollY < 160) {
        setActiveSection('');
        return;
      }

      const nearBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;
      if (nearBottom) {
        setActiveSection('contact');
        return;
      }

      // Use a viewport trigger line (32% from top) so tall sections like #projects
      // (~8,000px) activate reliably regardless of their total height.
      const triggerY = Math.round(window.innerHeight * 0.32);
      let currentId = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom > 96) {
          currentId = id;
        }
      }
      if (currentId) {
        setActiveSection(currentId);
      }
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    window.addEventListener('resize', updateActiveFromScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActiveFromScroll);
      window.removeEventListener('resize', updateActiveFromScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    firstMobileLinkRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const firstEl = firstMobileLinkRef.current;
        const lastEl = lastMobileLinkRef.current;
        if (!firstEl || !lastEl) return;

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const onBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    mediaQuery.addEventListener('change', onBreakpointChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      mediaQuery.removeEventListener('change', onBreakpointChange);
    };
  }, [mobileOpen]);

  const closeMobileMenu = (restoreFocus = false) => {
    setMobileOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    }
  };

  const handleSectionSelect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    closeDrawer = false
  ) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);

    if (closeDrawer) {
      document.body.style.overflow = '';
      closeMobileMenu(false);
    }

    if (target) {
      e.preventDefault();
      const scrollToTarget = () => {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
        if (window.location.hash !== `#${sectionId}`) {
          window.history.pushState(null, '', `#${sectionId}`);
        }
      };

      if (closeDrawer) {
        window.requestAnimationFrame(scrollToTarget);
      } else {
        scrollToTarget();
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full font-body transition-[background-color,border-color,box-shadow] duration-[var(--duration-standard)] ${
          mobileOpen
            ? 'bg-[#142B40] border-b border-[#C49A52]/32 shadow-[0_12px_30px_-16px_rgba(16,24,32,0.72)]'
            : scrolled
              ? 'bg-[#142B40]/96 backdrop-blur-md border-b border-[#C49A52]/32 shadow-[0_12px_30px_-16px_rgba(16,24,32,0.72)]'
              : 'bg-[#101820]/96 backdrop-blur-sm border-b border-[#C49A52]/20'
        }`}
      >
        {/* Subtle architectural top antique-gold hairline echoing SectionContainer */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-10 sm:inset-x-24 h-px bg-gradient-to-r from-transparent via-[#C49A52]/42 to-transparent pointer-events-none"
        />

        <div className={CONTAINER_GEOMETRY.outerGutter}>
          <div className={`${CONTAINER_GEOMETRY.maxWidth} ${CONTAINER_GEOMETRY.horizontalPadding}`}>
            <div
              className={`${CONTAINER_GEOMETRY.innerRail} h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8`}
            >
              {/* Zone 1: Accessible Home Anchor Wrapping Eye of Horus Brand Signature (Always Visible Above Mobile Menu) */}
              <a
                href="#hero"
                onClick={(e) => {
                  const wasOpen = mobileOpen;
                  setActiveSection('');
                  if (wasOpen) {
                    document.body.style.overflow = '';
                    setMobileOpen(false);
                  }
                  const heroEl = document.getElementById('hero');
                  if (heroEl) {
                    e.preventDefault();
                    const scrollHome = () => {
                      window.scrollTo({
                        top: 0,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth',
                      });
                      if (window.location.hash && window.location.hash !== '#hero') {
                        window.history.pushState(null, '', '#hero');
                      }
                    };
                    if (wasOpen) {
                      window.requestAnimationFrame(scrollHome);
                    } else {
                      scrollHome();
                    }
                  }
                }}
                aria-label={`${PROFILE.name} — Return to home section`}
                aria-current={activeSection === '' ? 'location' : undefined}
                className="group/brand inline-flex items-center min-h-[44px] px-1.5 -mx-1.5 py-1 shrink-0 rounded-lg border border-transparent transition-[border-color,background-color] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:bg-[#19344D]/55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
              >
                <EyeOfHorusLogo
                  variant="primary"
                  theme="dark"
                  size="sm"
                  ariaLabel={`Eye of Horus brand logo for ${PROFILE.name}`}
                />
              </a>

              {/* Zone 2: High-Contrast Editorial Section Navigation Links */}
              <nav
                aria-label="Primary navigation"
                className="hidden md:flex items-center gap-3.5 lg:gap-6 xl:gap-8 text-[13.5px] font-medium tracking-[0.005em]"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleSectionSelect(e, link.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`group relative px-2 -mx-2 py-2 min-h-[40px] inline-flex items-center gap-1.5 rounded-lg border border-transparent transition-[color,border-color,background-color] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:bg-[#19344D]/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'text-[#F6F1E8] font-semibold'
                          : 'text-[#F6F1E8]/86 hover:text-[#F6F1E8] focus-visible:text-[#F6F1E8]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`hidden xl:inline font-heading text-[11px] font-semibold tabular-nums transition-colors duration-[var(--duration-micro)] ${
                          isActive
                            ? 'text-[#C49A52]'
                            : 'text-[#C49A52]/75 group-hover:text-[#C49A52] group-focus-visible:text-[#C49A52]'
                        }`}
                      >
                        {link.index}
                      </span>
                      <span>{link.label}</span>

                      {!isActive && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-0 right-0 bottom-0.5 h-px bg-[#C49A52]/75 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-[var(--duration-micro)] ease-out"
                        />
                      )}

                      {isActive && (
                        <motion.span
                          layoutId={prefersReducedMotion ? undefined : 'nav-active-indicator'}
                          transition={{
                            duration: MOTION_TOKENS.duration.standard,
                            ease: MOTION_TOKENS.ease,
                          }}
                          className="pointer-events-none absolute left-0 right-0 bottom-0.5 h-[1.5px] bg-[#C49A52] flex items-center justify-center"
                        >
                          <span className="w-1 h-1 rotate-45 bg-[#C49A52]" />
                        </motion.span>
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* Zone 3: Primary Action (Desktop lg+) + Accessible Mobile Menu Button */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <a
                  href="#projects"
                  onClick={(e) => handleSectionSelect(e, 'projects')}
                  className="group hidden lg:inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] text-xs font-semibold tracking-[0.015em] hero-cta-primary-gradient text-[#101820] border border-[#C49A52]/40 hover:-translate-y-px active:scale-[0.985] shadow-[0_6px_18px_-8px_rgba(196,154,82,0.55)] transition-[transform,box-shadow,border-color] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] rounded-lg whitespace-nowrap shrink-0"
                >
                  <span>Explore Projects</span>
                  <ArrowDownRight
                    className="w-3.5 h-3.5 transition-transform duration-[var(--duration-micro)] group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>

                <button
                  ref={menuButtonRef}
                  type="button"
                  onClick={() => setMobileOpen((prev) => !prev)}
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-nav-drawer"
                  aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F6F1E8] bg-[#142B40]/90 border border-[#C49A52]/38 hover:border-[#C49A52] hover:text-[#C49A52] active:scale-[0.97] rounded-lg transition-[border-color,color,background-color,transform] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:bg-[#19344D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Vertical Slide Mobile Menu Below Sticky Header (Keeps Eye of Horus Logo Visible at z-50) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={prefersReducedMotion ? false : { opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.reveal }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-hidden font-body"
          >
            {/* Subtle Backdrop Fade */}
            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : MOTION_TOKENS.duration.micro }}
              onClick={() => closeMobileMenu(true)}
              className="absolute inset-0 bg-[#101820]/65"
            />

            {/* Full-Screen Vertically Sliding Editorial Drawer */}
            <motion.nav
              id="mobile-nav-drawer"
              aria-label="Mobile navigation"
              initial={prefersReducedMotion ? false : { y: '-100%' }}
              animate={{ y: '0%' }}
              exit={prefersReducedMotion ? undefined : { y: '-100%' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: MOTION_TOKENS.duration.reveal, ease: MOTION_TOKENS.ease }
              }
              className="relative h-full w-full overflow-y-auto hero-surface-gradient border-t border-[#C49A52]/26 flex flex-col justify-between"
            >
              <div className={`${CONTAINER_GEOMETRY.outerGutter} flex-1 flex flex-col`}>
                <div
                  className={`${CONTAINER_GEOMETRY.maxWidth} ${CONTAINER_GEOMETRY.horizontalPadding} flex-1 flex flex-col`}
                >
                  <div
                    className={`${CONTAINER_GEOMETRY.innerRail} w-full flex-1 flex flex-col justify-between py-6 sm:py-8 gap-8`}
                  >
                    {/* Top Brand Context Bar */}
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#D9C4A0]/16">
                      <span className="font-heading text-xs font-semibold text-[#C49A52] tracking-[0.02em]">
                        From Data to Decisions.
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#F6F1E8]/85">
                        <MapPin className="w-3.5 h-3.5 text-[#C49A52] shrink-0" aria-hidden="true" />
                        <span>{PROFILE.location}</span>
                      </span>
                    </div>

                    {/* Full-Screen Editorial Section Links */}
                    <div className="flex flex-col divide-y divide-[#D9C4A0]/14 my-auto">
                      {NAV_LINKS.map((link, idx) => {
                        const isActive = activeSection === link.id;
                        return (
                          <motion.a
                            key={link.href}
                            ref={idx === 0 ? firstMobileLinkRef : undefined}
                            href={link.href}
                            aria-current={isActive ? 'location' : undefined}
                            onClick={(e) => handleSectionSelect(e, link.id, true)}
                            initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={
                              prefersReducedMotion
                                ? { duration: 0 }
                                : {
                                    duration: MOTION_TOKENS.duration.standard,
                                    delay: 0.06 + idx * 0.035,
                                    ease: MOTION_TOKENS.ease,
                                  }
                            }
                            className={`px-3 -mx-3 py-4 min-h-[56px] flex items-center justify-between rounded-lg border border-transparent transition-[color,border-color,background-color] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:bg-[#142B40]/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] ${
                              isActive
                                ? 'text-[#C49A52]'
                                : 'text-[#F6F1E8] hover:text-[#C49A52] focus-visible:text-[#F6F1E8]'
                            }`}
                          >
                            <span className="inline-flex items-baseline gap-4">
                              <span className="font-heading text-xs font-semibold text-[#C49A52]/85 tabular-nums">
                                {link.index}
                              </span>
                              <span className="font-heading text-2xl sm:text-[1.75rem] font-semibold tracking-[-0.02em]">
                                {link.label}
                              </span>
                            </span>
                            {isActive && (
                              <span
                                aria-hidden="true"
                                className="w-2 h-2 rotate-45 bg-[#C49A52] shrink-0"
                              />
                            )}
                          </motion.a>
                        );
                      })}
                    </div>

                    {/* Bottom Primary CTA & Verified Social Links */}
                    <div className="pt-5 border-t border-[#D9C4A0]/16 space-y-4">
                      <a
                        href="#projects"
                        onClick={(e) => handleSectionSelect(e, 'projects', true)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold hero-cta-primary-gradient text-[#101820] border border-[#C49A52]/40 active:scale-[0.985] transition-[transform,border-color,box-shadow] duration-[var(--duration-micro)] focus-visible:border-[#C49A52] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52] rounded-xl min-h-[48px]"
                      >
                        <span>Explore My Projects</span>
                        <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                      </a>

                      <div className="flex items-center justify-center gap-6 text-sm font-medium text-[#D9C4A0]/90">
                        <a
                          href={PROFILE.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-2.5 py-1 min-h-[44px] border border-transparent hover:text-[#C49A52] transition-[color,border-color,background-color] duration-[var(--duration-micro)] rounded-lg focus-visible:text-[#F6F1E8] focus-visible:border-[#C49A52] focus-visible:bg-[#142B40]/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
                        >
                          <Linkedin className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
                          <span>LinkedIn</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                        </a>
                        <span aria-hidden="true" className="text-[#D9C4A0]/28">
                          /
                        </span>
                        <a
                          ref={lastMobileLinkRef}
                          href={PROFILE.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-2.5 py-1 min-h-[44px] border border-transparent hover:text-[#C49A52] transition-[color,border-color,background-color] duration-[var(--duration-micro)] rounded-lg focus-visible:text-[#F6F1E8] focus-visible:border-[#C49A52] focus-visible:bg-[#142B40]/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A52]"
                        >
                          <Github className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
                          <span>GitHub</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
