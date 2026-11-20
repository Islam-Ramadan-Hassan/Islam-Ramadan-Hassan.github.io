import React from 'react';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection, SkillsSection } from './components/AboutSkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { ContactFooter } from './components/ContactFooter';
import { PortfolioAssistant } from './components/PortfolioAssistant';

export default function App() {
  return (
    <div className="min-h-screen bg-[#E6DDD0] text-[#101820] selection:bg-[#C49A52]/30 selection:text-[#101820]">
      <ReadingProgressBar />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C49A52] focus:text-[#101820] focus:font-semibold focus:text-sm focus:rounded-lg"
      >
        Skip to main content
      </a>

      <Navbar />

      <div className="pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-14">
        <main id="main-content">
          {/* Chapter 01 — The Analyst Behind the Data (Hero + About) */}
          <HeroSection />
          <AboutSection />

          {/* Chapter 02 — How I Turn Data Into Insights (Analytical Workflow & Toolkit) */}
          <SkillsSection />

          {/* Chapter 03 — Four Projects. Four Different Challenges. (Case Studies + Live GitHub) */}
          <ProjectsSection />

          {/* Chapter 04 — Building My Analytical Foundation (Education, Training & Certifications) */}
          <JourneySection />
        </main>

        {/* Chapter 05 — The Next Challenge Starts Here (Contact & Footer) */}
        <ContactFooter />
      </div>

      <PortfolioAssistant />
    </div>
  );
}
