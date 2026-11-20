import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AlertCircle, ArrowUp, MessageSquare, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { MOTION_TOKENS } from '../styles/designSystem';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

type BackendStatus = 'checking' | 'ready' | 'unavailable';

const STARTER_PROMPTS = [
  'Summarize Islam’s Data Analyst & BI Analyst stack and workflow',
  'What did Islam personally own in MarketPulse vs. UrbanPulse?',
  'What verified findings came out of Hospital Management and European Sales?',
  'List his education, training programs, and completed certifications',
];

const ASSISTANT_ENDPOINTS = {
  chatUrl: '/api/assistant/chat',
  healthUrl: '/api/assistant/health',
} as const;

export function PortfolioAssistant() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking');
  const [backendNotice, setBackendNotice] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherButtonRef = useRef<HTMLButtonElement>(null);
  const endpoints = ASSISTANT_ENDPOINTS;

  const closeAssistant = () => {
    setIsOpen(false);
    window.requestAnimationFrame(() => {
      launcherButtonRef.current?.focus();
    });
  };

  const checkBackend = async () => {
    setBackendStatus('checking');
    setBackendNotice('');
    try {
      const res = await fetch(endpoints.healthUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        setBackendStatus('unavailable');
        if (res.status === 502 || res.status === 503 || res.status === 504) {
          setBackendNotice(
            `The assistant backend is temporarily restarting or unavailable (HTTP ${res.status}). Please close and reopen the assistant in a moment.`
          );
        } else {
          setBackendNotice(
            'The live Gemini assistant requires a separate server backend and is not active on static-only hosting (such as GitHub Pages without a configured API endpoint).'
          );
        }
        return;
      }

      const data = (await res.json()) as { configured?: boolean };
      if (!data.configured) {
        setBackendStatus('unavailable');
        setBackendNotice(
          'The assistant server is reachable, but server-side Gemini credentials are not configured yet.'
        );
        return;
      }

      setBackendStatus('ready');
    } catch {
      setBackendStatus('unavailable');
      setBackendNotice(
        'The live Gemini assistant backend is currently unreachable. On static GitHub Pages, a separate secure backend must be deployed and configured before live AI chat is active.'
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkBackend();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && backendStatus === 'ready') {
      inputRef.current?.focus();
    }
  }, [isOpen, backendStatus]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAssistant();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending, errorText]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isSending || backendStatus !== 'ready') return;

    setErrorText(null);
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const historyPayload = messages.slice(-8).map((m) => ({
      role: m.role,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch(endpoints.chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        if (response.status === 404) {
          throw new Error(
            'The AI assistant backend endpoint is not available in this static hosting environment.'
          );
        }
        if (response.status === 502 || response.status === 503 || response.status === 504) {
          throw new Error(
            `The Gemini AI service is temporarily busy or timed out (HTTP ${response.status}). Please try your question again in a moment.`
          );
        }
        if (response.status === 403) {
          throw new Error(
            'The request was blocked by the server origin/CORS policy (HTTP 403).'
          );
        }
        const rawText = await response.text().catch(() => '');
        if (rawText.includes('Starting Server') || rawText.includes('warmup_start_time')) {
          throw new Error(
            'The Gemini AI service is temporarily busy or restarting. Please try your question again in a moment.'
          );
        }
        throw new Error(
          `The AI assistant backend returned an unexpected response (HTTP ${response.status}). Please try again shortly.`
        );
      }

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        throw new Error(
          data.error || 'Unable to generate a response from the Gemini assistant right now.'
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.reply!,
        },
      ]);
    } catch (err) {
      setErrorText(
        err instanceof Error
          ? err.message
          : 'Unable to reach the Gemini assistant service.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            role="dialog"
            aria-labelledby="portfolio-assistant-title"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: MOTION_TOKENS.duration.micro, ease: MOTION_TOKENS.ease }}
            className="mb-3 w-[calc(100vw-2rem)] max-w-[390px] max-h-[min(560px,calc(100dvh-6.5rem))] rounded-2xl bg-[#101820] text-[#F6F1E8] border border-[#C49A52]/40 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.65)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-3.5 bg-[#142B40] border-b border-[#D9C4A0]/15 flex items-center justify-between gap-3">
              <div>
                <h3
                  id="portfolio-assistant-title"
                  className="font-display text-lg font-semibold text-[#F6F1E8] leading-tight"
                >
                  Portfolio Assistant
                </h3>
                <p className="font-mono text-[11px] text-[#D9C4A0]/82 mt-0.5">
                  Grounded in verified portfolio records
                </p>
              </div>
              <button
                type="button"
                onClick={closeAssistant}
                aria-label="Close Portfolio Assistant"
                className="inline-flex items-center justify-center w-11 h-11 text-[#D9C4A0] hover:text-[#F6F1E8] border border-[#D9C4A0]/25 hover:border-[#C49A52] active:scale-[0.97] rounded-lg transition-[border-color,color,transform] duration-200 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 text-sm min-h-[260px]"
            >
              {backendStatus === 'checking' && (
                <p className="text-xs font-mono text-[#D9C4A0]/75">
                  Checking assistant service availability...
                </p>
              )}

              {backendStatus === 'unavailable' && (
                <div
                  role="status"
                  className="p-4 bg-[#142B40]/75 border border-[#C49A52]/35 space-y-3"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle
                      className="w-4 h-4 text-[#C49A52] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1.5">
                      <p className="font-semibold text-[#F6F1E8] text-sm">
                        Live AI Assistant Unavailable
                      </p>
                      <p className="text-xs text-[#D9C4A0]/85 leading-relaxed">
                        {backendNotice}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#D9C4A0]/15 flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono">
                    <a
                      href="#projects"
                      onClick={() => setIsOpen(false)}
                      className="text-[#C49A52] hover:text-[#D4AE6A]"
                    >
                      Projects →
                    </a>
                    <a
                      href="#skills"
                      onClick={() => setIsOpen(false)}
                      className="text-[#C49A52] hover:text-[#D4AE6A]"
                    >
                      Skills →
                    </a>
                    <a
                      href="#journey"
                      onClick={() => setIsOpen(false)}
                      className="text-[#C49A52] hover:text-[#D4AE6A]"
                    >
                      Education & Certs →
                    </a>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-[#C49A52] hover:text-[#D4AE6A]"
                    >
                      Email Islam →
                    </a>
                  </div>
                </div>
              )}

              {backendStatus === 'ready' && messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-sm text-[#F6F1E8]/85 leading-relaxed">
                    Ask about {PROFILE.name}’s four featured case studies, personal vs. team contributions, analytical workflow, verified findings, education, training, or certifications.
                  </p>
                  <div className="space-y-2">
                    <p className="font-mono text-[11px] text-[#C49A52]">Suggested Questions</p>
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="w-full text-left px-3.5 py-2.5 min-h-[44px] text-xs text-[#F6F1E8]/92 bg-[#142B40]/75 hover:bg-[#19344D] border border-[#D9C4A0]/15 hover:border-[#C49A52]/60 active:scale-[0.99] transition-[background-color,border-color,transform] duration-200 rounded-xl"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#C49A52] text-[#101820] font-medium'
                        : 'bg-[#142B40] text-[#F6F1E8] border border-[#D9C4A0]/15'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start" aria-live="polite">
                  <div className="px-4 py-3 bg-[#142B40] border border-[#D9C4A0]/15 text-xs font-mono text-[#D9C4A0]/80">
                    Generating response...
                  </div>
                </div>
              )}

              {errorText && (
                <div
                  role="alert"
                  className="p-3 bg-[#142B40] border border-[#C49A52]/50 text-xs text-[#D9C4A0] leading-relaxed"
                >
                  {errorText}
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="p-3.5 bg-[#142B40]/80 border-t border-[#D9C4A0]/15 flex items-center gap-2"
            >
              <label htmlFor="assistant-input" className="sr-only">
                Ask about Islam Ramadan Hassan’s portfolio
              </label>
              <input
                id="assistant-input"
                ref={inputRef}
                type="text"
                value={input}
                maxLength={600}
                disabled={backendStatus !== 'ready' || isSending}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  backendStatus === 'ready'
                    ? 'Ask about projects, SQL, Power BI...'
                    : 'Live assistant requires backend service'
                }
                className="flex-1 px-3.5 py-2.5 min-h-[44px] text-sm bg-[#101820] text-[#F6F1E8] placeholder:text-[#8495A6] border border-[#D9C4A0]/20 focus:border-[#C49A52] rounded-xl disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={backendStatus !== 'ready' || isSending || !input.trim()}
                aria-label="Send message"
                className="inline-flex items-center justify-center w-11 h-11 bg-[#C49A52] text-[#101820] hover:bg-[#D4AE6A] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-[background-color,transform] duration-200 shrink-0"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Restrained Floating Launcher Button */}
      <div className="flex justify-end">
        <button
          ref={launcherButtonRef}
          type="button"
          onClick={() => (isOpen ? closeAssistant() : setIsOpen(true))}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close Portfolio Assistant' : 'Open Portfolio Assistant'}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 min-h-[44px] sm:min-h-[48px] bg-[#142B40] text-[#F6F1E8] hover:text-[#C49A52] hover:bg-[#19344D] active:scale-[0.985] border border-[#C49A52]/60 shadow-[0_14px_32px_rgba(16,24,32,0.45)] rounded-xl transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 text-xs font-mono tracking-wide"
        >
          {isOpen ? (
            <>
              <X className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
              <span>Close</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4 text-[#C49A52]" aria-hidden="true" />
              <span>Ask Portfolio AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
