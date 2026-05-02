import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, LayoutPanelTop, BarChart3, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Project } from '../constants'; // Ensure you export Project from constants if you use it

interface InteractiveProjectCardProps {
  proj: any;
  darkMode: boolean;
  onPlay?: () => void;
}

export function InteractiveProjectCard({ proj, darkMode, onPlay }: InteractiveProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt effect
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 30, stiffness: 200 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Normalize coordinates from -0.5 to 0.5
    mouseX.set(x / rect.width);
    mouseY.set(y / rect.height);
  }

  function onMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        perspective: 2000,
      }}
      className={cn(
        "relative w-full h-full cursor-pointer",
        !isHovered && "transition-transform duration-500"
      )}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        className={cn(
          "w-full h-full relative rounded-3xl overflow-hidden border p-8 flex flex-col transition-colors duration-500",
          darkMode ? "border-white/10 bg-zinc-900/60" : "border-black/5 bg-white/80"
        )}
      >
        {/* Dynamic Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              () => {
                const x = (mouseX.get() + 0.5) * 100;
                const y = (mouseY.get() + 0.5) * 100;
                return darkMode 
                  ? `radial-gradient(800px circle at ${x}% ${y}%, rgba(59, 130, 246, 0.15), transparent 40%)`
                  : `radial-gradient(800px circle at ${x}% ${y}%, rgba(59, 130, 246, 0.08), transparent 40%)`;
              }
            )
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full pointer-events-none">
          <div className="flex justify-between items-start mb-6">
            <h3 className={cn("text-3xl font-semibold tracking-tight transition-colors", darkMode ? "text-zinc-100 group-hover:text-white" : "text-zinc-900")}>
              {proj.title}
            </h3>
            {proj.videoUrl && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay?.();
                }}
                className="w-12 h-12 flex-shrink-0 rounded-[16px] border border-blue-500/30 text-blue-500 flex items-center justify-center transition-all bg-transparent pointer-events-auto hover:bg-blue-500 hover:text-white hover:scale-105"
              >
                <Play className="w-5 h-5 ml-1 fill-current" />
              </button>
            )}
          </div>

          <div className="flex gap-3 mb-6">
            {proj.metrics && (
              <span className={cn("inline-flex items-center px-3 py-1.5 text-[11px] font-bold tracking-wider rounded-full", darkMode ? "bg-blue-600/20 text-blue-400" : "bg-blue-50 text-blue-600")}>
                {proj.metrics}
              </span>
            )}
            <span className={cn("inline-flex items-center px-3 py-1.5 text-[11px] font-bold tracking-wider rounded-full border transition-colors", darkMode ? "border-white/10 text-zinc-300 hover:bg-white/5" : "border-black/10 text-zinc-600 hover:bg-black/5")}>
              VIEW DEEP DIVE
            </span>
          </div>

          <p className={cn("text-base sm:text-lg font-light leading-relaxed mb-8", darkMode ? "text-zinc-400" : "text-zinc-600")}>
            {proj.description}
          </p>

          {/* Deep dive expansion inline */}
          <AnimatePresence>
            {isExpanded && proj.deepDive && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-2">
                       Challenge
                    </h4>
                    <p className={cn("text-sm font-light", darkMode ? "text-zinc-300" : "text-zinc-700")}>
                      {proj.deepDive.challenges}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2 flex items-center gap-2">
                       Solution
                    </h4>
                    <p className={cn("text-sm font-light", darkMode ? "text-zinc-300" : "text-zinc-700")}>
                      {proj.deepDive.solutions}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pointer-events-auto pt-8 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                {proj.tech.split(', ').map((t: string) => (
                  <span key={t} className={cn("text-[11px] font-bold uppercase tracking-wider", darkMode ? "text-zinc-400" : "text-zinc-600")}>
                    {t}
                  </span>
                ))}
              </div>
              <div className={cn(
                "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300",
                darkMode ? "border-white/10 bg-transparent text-white" : "border-black/10 bg-transparent text-black",
                isExpanded ? "rotate-180 bg-white text-black border-transparent" : "hover:bg-white/10"
              )}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
