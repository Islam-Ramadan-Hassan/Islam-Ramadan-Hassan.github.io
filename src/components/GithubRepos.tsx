import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export function GithubRepos({ darkMode, username = "Islam-Ramadan-Hassan" }: { darkMode: boolean, username?: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        const allowedRepos = ['Kickstarter-Pulse', 'Pizza_Sales_2022', 'European-Sales-Analytics'];
        const filtered = data.filter((r: Repo) => !r.fork && allowedRepos.includes(r.name));
        filtered.sort((a: Repo, b: Repo) => allowedRepos.indexOf(a.name) - allowedRepos.indexOf(b.name));
        setRepos(filtered);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) {
    return (
      <div className="mt-20">
        <div className="flex items-center gap-4 mb-10">
          <div className={cn("flex items-center justify-center w-12 h-12 rounded-2xl shadow-inner", darkMode ? "bg-white/5 text-white ring-1 ring-white/10" : "bg-black/5 text-zinc-900 ring-1 ring-black/5")}>
            <Github className="w-6 h-6 opacity-80" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">Open Source</h3>
            <h4 className={cn("text-2xl font-semibold tracking-tight", darkMode ? "text-zinc-100" : "text-zinc-900")}>GitHub Activity</h4>
          </div>
        </div>
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || repos.length === 0) {
    return (
      <div className="mt-20">
        <div className="flex items-center gap-4 mb-10">
          <div className={cn("flex items-center justify-center w-12 h-12 rounded-2xl shadow-inner", darkMode ? "bg-white/5 text-white ring-1 ring-white/10" : "bg-black/5 text-zinc-900 ring-1 ring-black/5")}>
            <Github className="w-6 h-6 opacity-80" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">Open Source</h3>
            <h4 className={cn("text-2xl font-semibold tracking-tight", darkMode ? "text-zinc-100" : "text-zinc-900")}>GitHub Activity</h4>
          </div>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className={cn("ml-auto px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2", darkMode ? "bg-white/5 hover:bg-white/10 text-white" : "bg-black/5 hover:bg-black/10 text-black")}>
            View Profile <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className={cn("p-8 rounded-[24px] border text-center", darkMode ? "bg-zinc-900/40 border-white/10" : "bg-white/60 border-black/5")}>
          <p className={cn("text-lg", darkMode ? "text-zinc-400" : "text-zinc-600")}>
            {error ? `Failed to fetch repositories for @${username}. Please check the username or try again later.` : `No public repositories found for @${username}.`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="flex items-center gap-4 mb-10">
        <div className={cn("flex items-center justify-center w-12 h-12 rounded-2xl shadow-inner", darkMode ? "bg-white/5 text-white ring-1 ring-white/10" : "bg-black/5 text-zinc-900 ring-1 ring-black/5")}>
          <Github className="w-6 h-6 opacity-80" />
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">Open Source</h3>
          <h4 className={cn("text-2xl font-semibold tracking-tight", darkMode ? "text-zinc-100" : "text-zinc-900")}>GitHub Activity</h4>
        </div>
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className={cn("ml-auto px-4 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2", darkMode ? "bg-white/5 hover:bg-white/10 text-white" : "bg-black/5 hover:bg-black/10 text-black")}>
          View Profile <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {repos.map((repo, i) => (
          <motion.a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            key={repo.id}
            className={cn(
              "group block p-6 sm:p-8 rounded-[24px] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
              darkMode ? "bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-800/60" : "bg-white/60 border-black/5 hover:border-black/10 hover:bg-white"
            )}
          >
            <h5 className={cn("text-xl font-semibold tracking-tight mb-3 flex items-center gap-3 transition-colors", darkMode ? "text-zinc-200 group-hover:text-blue-400" : "text-zinc-800 group-hover:text-blue-600")}>
              {repo.name}
              <ExternalLink className="w-4 h-4 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
            </h5>
            <p className={cn("text-sm font-light mb-6 line-clamp-2", darkMode ? "text-zinc-400" : "text-zinc-600")}>
              {repo.description || "No description provided."}
            </p>
            <div className="flex items-center gap-6 mt-auto">
              {repo.language && (
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className={cn("text-xs font-medium", darkMode ? "text-zinc-300" : "text-zinc-600")}>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className={cn("flex items-center gap-1.5 text-xs font-medium", darkMode ? "text-zinc-400 group-hover:text-amber-400" : "text-zinc-500 group-hover:text-amber-600")}>
                  <Star className="w-4 h-4" /> {repo.stargazers_count}
                </div>
                <div className={cn("flex items-center gap-1.5 text-xs font-medium", darkMode ? "text-zinc-400 group-hover:text-emerald-400" : "text-zinc-500 group-hover:text-emerald-600")}>
                  <GitFork className="w-4 h-4" /> {repo.forks_count}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
