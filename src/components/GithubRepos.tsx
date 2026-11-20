import React, { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, GitFork, Github, RefreshCw, Star } from 'lucide-react';
import { PRIORITY_GITHUB_REPOS, PROFILE } from '../data/portfolioData';
import { INTERACTION_CLASSES, MOTION_TOKENS } from '../styles/designSystem';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  size: number;
  updated_at: string;
}

type FetchStatus = 'loading' | 'ready' | 'empty' | 'error';

const ANALYTICS_KEYWORDS = [
  'analytics',
  'analysis',
  'sales',
  'sql',
  'powerbi',
  'power-bi',
  'dashboard',
  'kickstarter',
  'marketpulse',
  'urbanpulse',
  'hospital',
  'pizza',
  'excel',
  'etl',
  'olist',
];

function isRelevantAnalyticsRepo(repo: GitHubRepo): boolean {
  if (repo.fork || repo.archived) return false;
  const lowerName = repo.name.toLowerCase();
  if (
    lowerName === PROFILE.githubUsername.toLowerCase() ||
    lowerName === `${PROFILE.githubUsername.toLowerCase()}.github.io`
  ) {
    return false;
  }
  if (PRIORITY_GITHUB_REPOS.includes(repo.name)) return true;

  const haystack = `${repo.name} ${repo.description ?? ''}`.toLowerCase();
  return ANALYTICS_KEYWORDS.some((kw) => haystack.includes(kw));
}

export function GithubRepos() {
  const prefersReducedMotion = useReducedMotion();
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<FetchStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchRepos = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch(
        `https://api.github.com/users/${PROFILE.githubUsername}/repos?sort=updated&per_page=30`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit reached. You can still browse all repositories directly on GitHub.');
        }
        throw new Error(`GitHub API returned status ${response.status}.`);
      }

      const data: GitHubRepo[] = await response.json();
      const filtered = data.filter(isRelevantAnalyticsRepo);

      filtered.sort((a, b) => {
        const idxA = PRIORITY_GITHUB_REPOS.indexOf(a.name);
        const idxB = PRIORITY_GITHUB_REPOS.indexOf(b.name);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });

      const curated = filtered.slice(0, 6);
      setRepos(curated);
      setStatus(curated.length > 0 ? 'ready' : 'empty');
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to load repositories from GitHub right now.'
      );
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <div className="mt-16 pt-14 border-t border-[#D9C4A0]/15">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
        <div className="space-y-2 max-w-2xl">
          <p className="font-mono text-xs tracking-wide text-[#C49A52]">
            Live GitHub Integration
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6F1E8]">
            Explore My Work on GitHub
          </h3>
          <p className="text-sm text-[#D9C4A0]/85 leading-relaxed">
            Explore selected projects, analytical workflows, and technical implementations.
          </p>
        </div>

        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-xs font-mono text-[#D9C4A0] hover:text-[#C49A52] transition-colors py-2 min-h-[44px] self-start sm:self-end"
        >
          <Github className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
          <span>@{PROFILE.githubUsername}</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      {status === 'loading' && (
        <div
          aria-live="polite"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[0, 1, 2].map((skeleton) => (
            <div
              key={skeleton}
              className="p-6 rounded-2xl bg-[#142B40]/60 border border-[#D9C4A0]/14 space-y-4 animate-pulse"
            >
              <div className="h-5 w-2/3 bg-[#D9C4A0]/15 rounded-md" />
              <div className="h-4 w-full bg-[#D9C4A0]/10 rounded-md" />
              <div className="h-4 w-4/5 bg-[#D9C4A0]/10 rounded-md" />
              <div className="h-3 w-1/2 bg-[#C49A52]/20 rounded-md pt-2" />
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="p-6 sm:p-7 rounded-2xl bg-[#142B40]/75 border border-[#C49A52]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[#F6F1E8]">
              Could not fetch live GitHub repositories
            </p>
            <p className="text-sm text-[#D9C4A0]/85">{errorMessage}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={fetchRepos}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-[#C49A52] text-[#101820] hover:bg-[#D4AE6A] active:scale-[0.985] rounded-lg transition-[background-color,transform] duration-200 min-h-[44px]"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Retry</span>
            </button>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-[#D9C4A0]/30 text-[#F6F1E8] hover:border-[#C49A52] active:scale-[0.985] rounded-lg transition-[border-color,transform] duration-200 min-h-[44px]"
            >
              <span>Open GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}

      {status === 'empty' && (
        <div className="p-6 sm:p-7 rounded-2xl bg-[#142B40]/60 border border-[#D9C4A0]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-[#D9C4A0]/88">
            No matching public analytics repositories were returned right now. Visit GitHub directly to browse all public work.
          </p>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#C49A52] hover:text-[#D4AE6A] whitespace-nowrap py-2 min-h-[44px]"
          >
            <span>Browse GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      )}

      {status === 'ready' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {repos.map((repo, idx) => (
            <motion.div
              key={repo.id}
              initial={prefersReducedMotion ? false : MOTION_TOKENS.revealInitial}
              whileInView={MOTION_TOKENS.revealAnimate}
              viewport={MOTION_TOKENS.viewport}
              transition={{
                duration: MOTION_TOKENS.duration.standard,
                delay: idx * 0.04,
                ease: MOTION_TOKENS.ease,
              }}
              className="flex"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex-1 p-6 rounded-2xl bg-[#142B40]/78 border border-[#D9C4A0]/16 hover:border-[#C49A52]/65 hover:bg-[#19344D]/85 active:scale-[0.99] flex flex-col justify-between shadow-[0_14px_30px_-22px_rgba(0,0,0,0.5)] ${INTERACTION_CLASSES.cardHoverDark}`}
              >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-mono text-sm font-medium text-[#F6F1E8] group-hover:text-[#C49A52] transition-colors break-words">
                    {repo.name}
                  </h4>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#D9C4A0]/70 group-hover:text-[#C49A52] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-[#D9C4A0]/85 leading-relaxed line-clamp-3">
                  {repo.description || 'Public analytics and BI project repository.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D9C4A0]/12 flex items-center justify-between gap-3 font-mono text-xs text-[#D9C4A0]/82 tabular-nums">
                <span>{repo.language || 'Analytics'}</span>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1" title="Stars">
                    <Star className="w-3.5 h-3.5 text-[#C49A52]" aria-hidden="true" />
                    {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1" title="Forks">
                    <GitFork className="w-3.5 h-3.5 text-[#D9C4A0]/70" aria-hidden="true" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
              </a>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
