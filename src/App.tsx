import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { 
  User, Code2, Briefcase, History, Mail, ArrowRight, Download, Github, Linkedin, Twitter, ExternalLink,
  MessageSquare, Monitor, Database, Star, Sun, Moon, Camera, Gamepad2, Plane, Languages, Book, Award,
  Sparkles, Play, X, PlayCircle, BarChart3, PieChart, Brain, Globe, ChevronDown, ChevronUp, Quote, ChevronRight, ArrowUp, ArrowUpRight, Menu
} from 'lucide-react';
import { cn } from './lib/utils';
import { COMMANDS, RESPONSE_DATA, INITIAL_GREETING, type Message, type Command } from './constants';
import { photoSrc } from './assets/photoData';

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, any> = { User, Code2, Briefcase, History, Mail, Monitor, Database, Camera, Gamepad2, Plane, Book, Award, BarChart3, PieChart, Brain, Globe };
  const Icon = icons[name] || MessageSquare;
  return <Icon className={className || "w-4 h-4"} />;
};

const TypingIndicator = () => (
  <div role="log" aria-live="polite" className="flex gap-1.5 p-2">
    {[0, 1, 2].map((i) => (
      <motion.div key={i} className="w-1.5 h-1.5 bg-zinc-400 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3], y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }} />
    ))}
    <span className="sr-only">Assistant is thinking...</span>
  </div>
);

const StreamingText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current <= text.length) { setDisplayed(text.substring(0, current)); current++; } else { clearInterval(interval); }
    }, 15);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}</span>;
};

const ChatBubble: React.FC<{msg: Message, darkMode: boolean}> = ({ msg, darkMode }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} role="article" className={cn("flex w-full group mb-4", msg.sender === 'user' ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[90%] relative", msg.sender === 'user' ? "text-right" : "text-left")}>
        <div className="flex items-center gap-2 mb-1 px-1">
          {msg.sender === 'ai' && <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] opacity-40", darkMode ? "text-white" : "text-black")}>Assistant Core</span>}
          <span className={cn("text-[8px] font-mono opacity-30")}>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {msg.sender === 'user' && <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] opacity-40", darkMode ? "text-white" : "text-black")}>Inquiry</span>}
        </div>
        <div className={cn("rounded-[24px] px-5 py-4 transition-all duration-500 relative overflow-hidden", 
            msg.sender === 'user' 
              ? (darkMode ? "bg-white text-black shadow-xl" : "bg-zinc-900 text-white shadow-xl")
              : (darkMode ? "bg-zinc-900/80 text-zinc-100 border border-white/10 backdrop-blur-3xl" : "bg-white/90 text-zinc-900 border border-black/5 shadow-sm backdrop-blur-3xl")
          )}>
          {msg.sender === 'ai' && <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />}
          {msg.text && <p className={cn("leading-relaxed text-[14px] font-medium tracking-tight", darkMode && msg.sender === 'ai' ? "text-zinc-300" : "")}>{msg.sender === 'ai' ? <StreamingText text={msg.text} /> : msg.text}</p>}
          {msg.content && <div className="mt-3 text-sm">{msg.content}</div>}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = ["Data Analyst", "BI Developer", "Data Scientist", "Strategist"];

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);
  const springConfig = { damping: 50, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const parallaxX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-30, 30]);
  const parallaxY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [-30, 30]);
  const parallaxXReverse = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [30, -30]);
  const parallaxYReverse = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [30, -30]);
  const strongParallaxX = useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-60, 60]);
  const strongParallaxY = useTransform(smoothY, [0, typeof window !== 'undefined' ? window.innerHeight : 800], [-60, 60]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const initUnicorn = () => {
      if (typeof window !== 'undefined' && (window as any).UnicornStudio) {
        (window as any).UnicornStudio.init();
      }
    };
    
    // Try immediate init
    initUnicorn();

    // Check periodically if script hasn't loaded yet
    const interval = setInterval(() => {
      if ((window as any).UnicornStudio) {
        initUnicorn();
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping, isChatOpen]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ id: 'init', sender: 'ai', text: INITIAL_GREETING, timestamp: new Date() }]);
    }
  }, []);

  const handleCommand = async (command: Command | {id: string, label: string}) => {
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: command.label, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1000));

    let aiResponse: Message = { id: (Date.now() + 1).toString(), sender: 'ai', timestamp: new Date() };

    switch(command.id) {
      case 'about':
        aiResponse.content = (
          <div className="space-y-4">
            <p className="font-medium text-sm leading-relaxed">{RESPONSE_DATA.about.text}</p>
            <p className="text-xs opacity-70 leading-relaxed">{RESPONSE_DATA.about.details}</p>
          </div>
        ); break;
      case 'skills':
        aiResponse.content = (
          <div className="space-y-4">
            <p className="text-xs opacity-70">Infrastructure scan complete. Matrix generated.</p>
            {RESPONSE_DATA.skills.sections.map(s => (
              <div key={s.title}>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-50 mb-2">{s.title}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map(i => <span key={i.name} className={cn("text-[10px] px-2.5 py-1 rounded-md border backdrop-blur-md", darkMode ? "bg-white/5 text-white border-white/10" : "bg-black/5 border-black/5")}>{i.name}</span>)}
                </div>
              </div>
            ))}
          </div>
        ); break;
      case 'projects':
        aiResponse.content = <p className="text-sm">Projects overview generated. Please check the main project section on the page for interactive details.</p>;
        break;
      case 'experience':
        aiResponse.content = <p className="text-sm">Timeline audit complete. See the Experience section.</p>;
        break;
      case 'contact':
        aiResponse.content = (
          <div className="space-y-2">
            <p className="font-bold text-lg select-all">{RESPONSE_DATA.contact.email}</p>
            <p className="text-xs opacity-70">Looking forward to connecting.</p>
          </div>
        ); break;
      default: aiResponse.text = "I'm not sure how to help. Try asking about skills, or experience.";
    }

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const submitQuery = () => {
    if (!inputRef.current?.value.trim()) return;
    const val = inputRef.current.value.trim().toLowerCase();
    const mapMatch = [...COMMANDS].find(c => c.label.toLowerCase().includes(val) || c.id === val);
    handleCommand(mapMatch || { id: 'unknown', label: inputRef.current.value });
    inputRef.current.value = '';
  };

  return (
    <div className={cn("min-h-screen font-sans transition-colors duration-500 relative scroll-smooth", darkMode ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900")}>
      
      {/* Background System */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={cn("absolute inset-0 transition-opacity duration-700", darkMode ? "opacity-100 mix-blend-screen" : "opacity-60")}>
          <div data-us-project="0bj47BRhqOMrgLlpMNC0" data-us-dpi="1.5" data-us-fps="60" data-us-lazyload="true" data-us-production="true" className="absolute inset-0 w-full h-full"></div>
        </div>
        <div className={cn("absolute inset-0 bg-grid opacity-[0.04] mix-blend-overlay", darkMode ? "filter invert" : "")} />
        <div className="absolute inset-0 bg-grain opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Global Nav / Header */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={cn(
          "fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-3 py-3 rounded-full border backdrop-blur-2xl transition-all duration-500 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-4xl shadow-2xl",
          darkMode ? "bg-zinc-950/40 border-white/10 shadow-black/50" : "bg-white/60 border-black/5 shadow-blue-900/5"
        )}
      >
        <a href="#hero" className="flex items-center gap-4 pl-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <p className="font-display font-black tracking-[0.15em] text-xs uppercase text-current">ISLAM RAMADAN</p>
          </div>
        </a>

        <div className={cn("hidden lg:flex items-center p-1.5 rounded-full ml-4 flex-none gap-1", darkMode ? "bg-white/5 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" : "bg-black/5 border border-black/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]")}>
          {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={item === 'Home' ? '#hero' : `#${item.toLowerCase()}`} className={cn("px-5 py-2 flex-shrink-0 rounded-full text-[10px] font-black tracking-[0.15em] uppercase transition-all duration-300 relative group overflow-hidden flex items-center justify-center", darkMode ? "text-white/70 hover:text-white" : "text-zinc-600 hover:text-zinc-900")}>
              <span className="relative z-10">{item}</span>
              <div className={cn("absolute inset-0 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 blur-sm", darkMode ? "bg-white/20" : "bg-white/80 shadow-md")} />
              <div className={cn("absolute inset-0 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300", darkMode ? "bg-white/10" : "bg-white")} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 pr-1 ml-auto lg:ml-0">
          <button onClick={() => setDarkMode(!darkMode)} className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all", darkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white hover:bg-black/5 border border-black/5 text-black shadow-sm")}>
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={cn("lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all", darkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white hover:bg-black/5 border border-black/5 text-black shadow-sm")}>
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn("fixed inset-x-4 top-24 z-40 p-4 rounded-3xl border shadow-2xl backdrop-blur-3xl lg:hidden", darkMode ? "bg-zinc-950/90 border-white/10" : "bg-white/90 border-black/5")}
          >
            <div className="flex flex-col gap-2">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Home' ? '#hero' : `#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn("px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] transition-all text-center relative overflow-hidden group", darkMode ? "text-white/70 hover:text-white" : "text-zinc-600 hover:text-zinc-900")}
                >
                  <span className="relative z-10">{item}</span>
                  <div className={cn("absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300", darkMode ? "bg-white/5" : "bg-black/5")} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 w-full">
        {/* Section 1: Landing */}
        <section id="hero" className="min-h-screen flex flex-col lg:flex-row items-center justify-center pt-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden gap-12">
          {/* Text Content */}
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex-1 w-full relative z-20 space-y-8 mt-10 lg:mt-0 text-center lg:text-left">
            <div className="relative inline-flex items-center gap-4">
              <div className={cn("px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-md transition-colors", darkMode ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-zinc-900")}>
                <span className="flex items-center gap-2">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-500"></span>
                  </span>
                  Available for new projects
                </span>
              </div>
            </div>
            
            <motion.h1 style={{ x: parallaxX, y: parallaxY }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-black tracking-tighter leading-[1] lg:leading-[0.9]">
              <span className={cn("block text-2xl lg:text-3xl mb-4 font-bold tracking-tight", darkMode ? "text-zinc-500" : "text-zinc-400")}>I'm Islam,</span>
              <span className="block h-[1.3em] overflow-hidden relative">
                <AnimatePresence mode="popLayout">
                  <motion.span key={currentRoleIndex} initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 flex items-center justify-center lg:justify-start whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-400 bg-[length:200%_auto] animate-gradient">
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
              <p className={cn("text-lg sm:text-xl font-medium leading-relaxed", darkMode ? "text-zinc-300/80" : "text-zinc-600")}>
                Transforming complex datasets into <span className={cn("font-bold text-transparent bg-clip-text bg-gradient-to-r", darkMode ? "from-white to-white/70" : "from-black to-black/70")}>actionable intelligence</span>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={cn("group flex flex-col gap-4 p-5 rounded-3xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl", darkMode ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-black/50" : "bg-black/[0.02] border-black/5 hover:bg-white hover:border-black/10 hover:shadow-blue-900/5")}>
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-translate-y-1", darkMode ? "bg-gradient-to-br from-white/10 to-white/5 text-white ring-1 ring-white/10" : "bg-white text-zinc-900 shadow-sm border border-black/5 ring-1 ring-black/5")}>
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={cn("font-bold text-sm tracking-tight", darkMode ? "text-zinc-100" : "text-zinc-900")}>Data Architecture</p>
                      <p className={cn("text-xs font-medium mt-1.5 leading-relaxed", darkMode ? "text-zinc-400" : "text-zinc-500")}>Designing robust scalable structures</p>
                    </div>
                </div>
                
                <div className={cn("group flex flex-col gap-4 p-5 rounded-3xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl", darkMode ? "bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10 hover:border-blue-500/30 hover:shadow-blue-900/20" : "bg-blue-50/50 border-blue-100 hover:bg-blue-50 hover:border-blue-200 hover:shadow-blue-900/5")}>
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-translate-y-1", darkMode ? "bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-400 ring-1 ring-blue-500/20" : "bg-white text-blue-600 border border-blue-100 shadow-sm ring-1 ring-blue-500/10")}>
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={cn("font-bold text-sm tracking-tight", darkMode ? "text-blue-100" : "text-blue-900")}>Advanced SQL</p>
                      <p className={cn("text-xs font-medium mt-1.5 leading-relaxed", darkMode ? "text-blue-300" : "text-blue-700/70")}>Writing complex optimal queries</p>
                    </div>
                </div>

                <div className={cn("group flex flex-col gap-4 p-5 rounded-3xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl", darkMode ? "bg-indigo-500/5 border-indigo-500/20 hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:shadow-indigo-900/20" : "bg-indigo-50/50 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-indigo-900/5")}>
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-translate-y-1", darkMode ? "bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 text-indigo-400 ring-1 ring-indigo-500/20" : "bg-white text-indigo-600 border border-indigo-100 shadow-sm ring-1 ring-indigo-500/10")}>
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={cn("font-bold text-sm tracking-tight", darkMode ? "text-indigo-100" : "text-indigo-900")}>Data Stories</p>
                      <p className={cn("text-xs font-medium mt-1.5 leading-relaxed", darkMode ? "text-indigo-300" : "text-indigo-700/70")}>Building interactive dashboards</p>
                    </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-6">
              <a href="#projects" className="group relative w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest overflow-hidden shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all duration-300 text-center flex items-center justify-center gap-3">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3">Explore Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
              </a>
              <a href="#about" className={cn("group w-full sm:w-auto px-8 py-4 rounded-full font-bold text-[13px] uppercase tracking-widest border transition-all duration-300 text-center flex items-center justify-center gap-3", darkMode ? "border-white/10 hover:bg-white/10 hover:border-white/20 text-white hover:text-white" : "border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-zinc-900")}>
                View Profile
              </a>
            </div>
          </motion.div>

          {/* Visual Content */}
          <div className="flex-1 relative w-full flex items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] order-first lg:order-last">
            <motion.div style={{ x: parallaxXReverse, y: parallaxYReverse }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={cn("w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full blur-[100px] transition-colors duration-1000", darkMode ? "bg-blue-500/20" : "bg-blue-300/30")} />
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1, y: [-5, 5, -5] }} 
              transition={{ 
                scale: { delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] },
                opacity: { delay: 0.4, duration: 1, ease: "easeOut" },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }
              }} 
              className="relative z-10 mx-auto group pointer-events-none w-[280px] h-[340px] sm:w-[380px] sm:h-[440px] lg:w-[460px] lg:h-[520px] flex items-end justify-center"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 lg:bottom-12 lg:-translate-x-1/2 lg:w-[120%] lg:left-[50%] h-[90%] my-auto bg-blue-500 rounded-t-full opacity-20 mix-blend-screen filter blur-[80px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-40" />
              
              {/* Background Arch Shape */}
              <div className={cn("absolute inset-0 rounded-t-[1000px] rounded-b-[40px] overflow-hidden border shadow-2xl transition-all duration-700 pointer-events-none ring-1 ring-inset backdrop-blur-3xl", darkMode ? "border-white/10 ring-white/10 shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] bg-zinc-900/60" : "border-blue-200/50 ring-white/80 shadow-[0_30px_100px_-20px_rgba(59,130,246,0.3)] bg-white/40")}>
                <div className={cn("absolute inset-0 bg-gradient-to-b opacity-80", darkMode ? "from-blue-500/20 via-zinc-900/40 to-zinc-950" : "from-blue-400/20 via-blue-50/60 to-white/20")} />
                
                {/* Animated Orbs */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    y: [0, -20, 0],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute -top-10 -left-10 w-2/3 h-2/3 bg-blue-400 rounded-full blur-[60px]"
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    y: [0, 20, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -right-10 w-3/4 h-3/4 bg-indigo-400 rounded-full blur-[80px]"
                />
                <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay" />
              </div>

                {/* Photo Container */}
              <div className="relative z-10 flex items-end justify-center overflow-hidden rounded-t-[1000px] rounded-b-[40px] w-full h-full p-2 sm:p-4 pt-12">
                <motion.img 
                   src={photoSrc} 
                   alt="Islam Ramadan" 
                   className="w-full h-full object-bottom object-contain pointer-events-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] contrast-[1.1] saturate-[1.1] brightness-[1.1] transition-transform duration-1000 group-hover:scale-[1.05] ease-out origin-bottom relative z-10"
                 />
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ x: 40, opacity: 0 }} 
              animate={{ x: 0, opacity: 1, y: [-8, 8, -8] }} 
              transition={{ 
                x: { delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                opacity: { delay: 0.6, duration: 0.8 },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }
              }} 
              className="absolute -right-4 sm:-right-8 top-[35%] max-w-[220px] z-20 hidden md:block select-none"
            >
              <div className={cn("p-4 rounded-[24px] border backdrop-blur-2xl shadow-xl flex items-center gap-4 transition-colors", darkMode ? "bg-[#0A0D14]/90 border-white/10 text-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/10" : "bg-white/90 border-white text-zinc-900 shadow-[0_20px_40px_rgba(0,0,0,0.1)] ring-1 ring-inset ring-black/5")}>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.4)] ring-1 ring-white/20">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className={cn("text-[9px] font-black uppercase tracking-widest", darkMode ? "text-blue-400" : "text-blue-600")}>Analytics</p>
                  <p className="text-sm font-bold leading-tight mt-1 whitespace-nowrap">Top Rated Specialist</p>
                </div>
              </div>
            </motion.div>
          </div>

          
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center w-full opacity-40 pb-8 cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </section>

        {/* Section 2: About & Skills */}
        <section id="about" className="py-20 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col xl:flex-row gap-16 lg:gap-24 items-start">
          <div className="flex-1 space-y-10 w-full">
            <div>
              <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter mb-6">THE <span className="text-blue-500">ENGINEER.</span></h2>
              <p className={cn("text-lg sm:text-xl leading-relaxed font-medium", darkMode ? "text-zinc-300" : "text-zinc-600")}>
                {RESPONSE_DATA.about.text}
              </p>
              <p className={cn("text-base leading-relaxed mt-4", darkMode ? "text-zinc-400" : "text-zinc-500")}>
                {RESPONSE_DATA.about.details}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className={cn("group p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl", darkMode ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]" : "bg-black/[0.02] border-black/5 hover:bg-white")}>
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-6", darkMode ? "bg-white/10 text-white" : "bg-white border text-zinc-900 shadow-sm")}>
                  <Book className="w-5 h-5" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-5">Education</h3>
                <div className="space-y-5">
                  {RESPONSE_DATA.education.items.map((ed, i) => (
                    <div key={i}>
                      <p className={cn("font-bold text-sm tracking-tight", darkMode ? "text-zinc-100" : "text-zinc-900")}>{ed.degree}</p>
                      <p className={cn("text-xs mt-1.5 font-medium", darkMode ? "text-zinc-400" : "text-zinc-500")}>{ed.school}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cn("group p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl", darkMode ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]" : "bg-black/[0.02] border-black/5 hover:bg-white")}>
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-6", darkMode ? "bg-blue-500/20 text-blue-400" : "bg-white border border-blue-100 text-blue-600 shadow-sm")}>
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-5">Languages & Awards</h3>
                <div className="space-y-5">
                  {RESPONSE_DATA.languages.items.map((l, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <p className={cn("font-bold text-sm tracking-tight", darkMode ? "text-zinc-100" : "text-zinc-900")}>{l.name}</p>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold uppercase", darkMode ? "bg-zinc-800 text-zinc-400" : "bg-zinc-100 text-zinc-500")}>{l.level}</span>
                    </div>
                  ))}
                  <div className="pt-5 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                     {RESPONSE_DATA.awards.items.slice(0, 2).map((a, i) => (
                       <p key={i} className="text-xs font-bold leading-tight mt-3 first:mt-0 flex items-start gap-2">
                         <Star className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="currentColor" />
                         <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>{a}</span>
                       </p>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="skills" className="flex-1 w-full space-y-10 scroll-mt-32">
            <div>
               <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter mb-4 text-center sm:text-left">TECH <span className="text-blue-500/50">STACK</span></h2>
               <p className={cn("text-base font-medium text-center sm:text-left", darkMode ? "text-zinc-400" : "text-zinc-500")}>Core competencies and specialized tools.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {RESPONSE_DATA.skills.sections.map((s, idx) => (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} key={s.title} className={cn("p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg", darkMode ? "border-white/10 bg-zinc-900/40 hover:bg-zinc-900/80" : "bg-white/60 border-black/5 hover:bg-white")}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className={cn("p-2 rounded-xl", darkMode ? "bg-white/5" : "bg-blue-50")}>
                      <DynamicIcon name={s.icon} className="w-5 h-5 text-blue-500" />
                    </div>
                    <h4 className={cn("font-bold tracking-tight text-sm", darkMode ? "text-zinc-100" : "text-zinc-900")}>{s.title}</h4>
                  </div>
                  <div className="flex flex-col gap-5">
                    {s.items.map(i => (
                      <div key={i.name} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className={cn("text-xs font-bold transition-colors", darkMode ? "text-zinc-300 group-hover:text-white" : "text-zinc-600 group-hover:text-black")}>{i.name}</span>
                          <span className={cn("text-[10px] font-mono", darkMode ? "text-zinc-500" : "text-zinc-400")}>{i.rating}.0</span>
                        </div>
                        <div className={cn("flex gap-1 h-1.5 overflow-hidden rounded-full", darkMode ? "bg-white/5" : "bg-black/5")}>
                          <motion.div 
                            initial={{ width: 0 }} 
                            whileInView={{ width: `${(i.rating / 5) * 100}%` }} 
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Experience */}
        <section id="experience" className="py-20 sm:py-32 px-6 sm:px-12 max-w-5xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter">CAREER <span className="text-blue-500/50">PATH</span></h2>
            <p className={cn("text-base font-medium", darkMode ? "text-zinc-400" : "text-zinc-500")}>A technical overview of my professional timeline.</p>
          </div>
          <div className="relative border-l-2 ml-3 md:ml-6 space-y-12 pb-12" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            {RESPONSE_DATA.experience.map((exp, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
                key={i} 
                className="relative pl-8 md:pl-16 group"
              >
                {/* Timeline Dot */}
                <div className={cn("absolute left-0 -translate-x-[17px] sm:-translate-x-[21px] top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-[4px] sm:border-[6px] flex items-center justify-center transition-colors duration-300", darkMode ? "bg-zinc-950 border-zinc-900 group-hover:border-blue-500/30" : "bg-white border-zinc-50 group-hover:border-blue-100")}>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-500 transition-transform duration-300 group-hover:scale-[1.5]" />
                </div>
                
                <div className={cn("flex flex-col md:flex-row gap-6 md:gap-12 p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl", darkMode ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]" : "border-black/5 bg-black/[0.02] hover:bg-white hover:border-black/10")}>
                   <div className="shrink-0 w-full md:w-1/3">
                     <span className={cn("inline-block px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-full mb-4 shadow-sm", darkMode ? "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20" : "bg-blue-50 text-blue-600 ring-1 ring-blue-100")}>{exp.period}</span>
                     <p className={cn("font-bold text-lg tracking-tight", darkMode ? "text-zinc-100" : "text-zinc-900")}>{exp.company}</p>
                   </div>
                   <div className="flex-1 space-y-4 pt-1">
                     <h3 className="text-2xl font-bold tracking-tight text-blue-500">{exp.role}</h3>
                     <p className={cn("text-sm sm:text-base leading-relaxed font-medium", darkMode ? "text-zinc-400" : "text-zinc-600")}>{exp.description}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4: Projects */}
        <section id="projects" className="py-20 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="flex items-center flex-col text-center mb-20 gap-4">
              <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter">CASE <span className="text-blue-500/50">STUDIES</span></h2>
              <p className={cn("text-base font-medium max-w-lg", darkMode ? "text-zinc-400" : "text-zinc-500")}>Interactive data models, robust architectures, and analytical deep dives.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
            {RESPONSE_DATA.projects.map((proj, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
                key={proj.title} 
                layout 
                onClick={() => setExpandedProject(expandedProject === proj.title ? null : proj.title)} 
                className={cn(
                  "group cursor-pointer p-6 sm:p-10 relative overflow-hidden transition-all duration-500 rounded-[32px] border hover:-translate-y-2 hover:shadow-2xl", 
                  darkMode ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]" : "border-black/5 bg-black/[0.02] hover:bg-white hover:border-blue-500/30 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]"
                )}
              >
                <div className="flex flex-col h-full gap-8 relative z-10">
                  <div className="space-y-5">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className={cn("text-3xl font-bold tracking-tight", darkMode ? "text-zinc-100" : "text-zinc-900")}>{proj.title}</h3>
                      {proj.videoUrl && (
                        <button onClick={(e) => { e.stopPropagation(); setSelectedVideo(proj.videoUrl); }} className="w-12 h-12 shrink-0 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </button>
                      )}
                    </div>
                    {proj.metrics && <span className={cn("inline-block px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-blue-500 rounded-full", darkMode ? "bg-blue-500/10" : "bg-blue-50")}>{proj.metrics}</span>}
                    <p className={cn("text-sm leading-relaxed font-medium", darkMode ? "text-zinc-400" : "text-zinc-600")}>{proj.description}</p>
                  </div>

                  <AnimatePresence>
                    {expandedProject === proj.title && proj.deepDive && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }} 
                        className="space-y-6 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 pt-4 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-rose-500 mb-2 tracking-widest">Challenge</p>
                            <p className={cn("text-xs leading-relaxed font-medium", darkMode ? "text-zinc-400" : "text-zinc-600")}>{proj.deepDive.challenges}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-emerald-500 mb-2 tracking-widest">Solution</p>
                            <p className={cn("text-xs leading-relaxed font-medium", darkMode ? "text-zinc-400" : "text-zinc-600")}>{proj.deepDive.solutions}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto pt-6 border-t flex items-center justify-between" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {proj.tech.split(', ').map(t => (
                        <span key={t} className="text-[10px] font-mono opacity-50">{t}</span>
                      ))}
                    </div>
                    <div className={cn("w-8 h-8 rounded-full border flex items-center justify-center transition-all opacity-50", darkMode ? "border-white/20 group-hover:bg-white text-zinc-500 group-hover:text-black group-hover:opacity-100" : "border-black/20 group-hover:bg-zinc-900 text-zinc-500 group-hover:text-white group-hover:opacity-100")}>
                      {expandedProject === proj.title ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 5: Contact / Footer */}
        <footer id="contact" className={cn("py-16 sm:py-24 border-t mt-12 transition-colors", darkMode ? "border-white/10 bg-black/20" : "border-black/5 bg-zinc-50/50")}>
          <div className="max-w-5xl mx-auto px-6 sm:px-12 flex flex-col items-center text-center">
            <div className={cn("p-10 sm:p-20 w-full rounded-[40px] border relative overflow-hidden shadow-2xl transition-all duration-500 mb-16", darkMode ? "bg-gradient-to-b from-white/10 to-transparent border-white/10" : "bg-gradient-to-b from-blue-50 to-transparent border-black/5")}>
               <div className="absolute inset-0 bg-grid-white/[0.02]" />
               <div className={cn("absolute inset-x-0 -top-px h-px w-3/4 mx-auto", darkMode ? "bg-gradient-to-r from-transparent via-white/30 to-transparent" : "bg-gradient-to-r from-transparent via-black/10 to-transparent")} />
               
               <h2 className="text-5xl sm:text-7xl font-display font-black tracking-tighter mb-6 relative z-10 leading-[1.1]">LET'S WORK <br className="hidden sm:block"/><span className="text-blue-500 flex items-center justify-center gap-4 mt-2">TOGETHER <ArrowUpRight className="w-10 h-10 sm:w-16 sm:h-16 text-blue-500" strokeWidth={3} /></span></h2>
               
               <p className={cn("max-w-md mx-auto mb-10 relative z-10 text-base sm:text-lg font-medium leading-relaxed", darkMode ? "text-zinc-300" : "text-zinc-600")}>Currently accepting new freelance opportunities. Let's build something exceptional.</p>
               
               <a href={`mailto:${RESPONSE_DATA.contact.email}`} className="relative z-10 px-8 py-5 bg-blue-500 text-white rounded-full font-bold tracking-widest text-sm uppercase hover:bg-blue-600 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] transition-all duration-300 flex items-center justify-center gap-3 mx-auto w-max group">
                 <Mail className="w-5 h-5 transition-transform group-hover:scale-110" /> GET IN TOUCH
               </a>
            </div>

            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <p className={cn("text-xs sm:text-sm font-bold tracking-tight uppercase", darkMode ? "text-zinc-500" : "text-zinc-400")}>© {new Date().getFullYear()} ISLAM RAMADAN. All rights reserved.</p>
              <div className="flex justify-center gap-8">
                <a href={RESPONSE_DATA.contact.socials[0].link} target="_blank" rel="noopener noreferrer" className={cn("transition-colors uppercase tracking-widest text-[10px] font-bold", darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-black")}>LinkedIn</a>
                <a href={RESPONSE_DATA.contact.socials[1].link} target="_blank" rel="noopener noreferrer" className={cn("transition-colors uppercase tracking-widest text-[10px] font-bold", darkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-black")}>GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Chat Button */}
      <motion.button 
        key="fab"
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-shadow"
      >
        <AnimatePresence mode="popLayout">
          {isChatOpen ? <motion.div key="x" initial={{rotate:-90, opacity:0}} animate={{rotate:0, opacity:1}} exit={{rotate:90, opacity:0}}><X className="w-6 h-6" /></motion.div>
                      : <motion.div key="chat" initial={{rotate:90, opacity:0}} animate={{rotate:0, opacity:1}} exit={{rotate:-90, opacity:0}}><Sparkles className="w-6 h-6" /></motion.div>}
        </AnimatePresence>
      </motion.button>

      {/* Modern Floating Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed bottom-28 right-6 w-[calc(100vw-3rem)] sm:w-[420px] max-w-[420px] h-[600px] z-50 rounded-[32px] border flex flex-col shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur-3xl overflow-hidden",
              darkMode ? "bg-zinc-950/80 border-white/10" : "bg-white/80 border-white/60 shadow-xl"
            )}
          >
            <div className={cn("px-6 py-5 border-b flex items-center gap-4", darkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/5")}>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm tracking-tight text-current">ISLAM.AI</p>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/><p className={cn("text-[9px] uppercase tracking-widest font-black", darkMode ? "text-zinc-500" : "text-zinc-500")}>Assistant Active</p></div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className={cn("w-8 h-8 rounded-full flex items-center justify-center border transition-all", darkMode ? "border-white/10 text-white/50 hover:text-white" : "border-black/5 text-black/50 hover:bg-black/5")}><ChevronDown className="w-4 h-4"/></button>
            </div>

            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-5 scroll-smooth scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {messages.map(msg => <ChatBubble key={msg.id} msg={msg} darkMode={darkMode} />)}
                {isTyping && (
                  <motion.div layout initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="flex justify-start mb-4">
                    <div className={cn("rounded-[24px] px-3 py-2 border backdrop-blur-md shadow-sm", darkMode ? "bg-white/5 border-white/10" : "bg-white/90 border-black/5")}><TypingIndicator /></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={cn("p-4 border-t", darkMode ? "bg-zinc-950 border-white/10" : "bg-white border-black/5")}>
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide snap-x">
                {COMMANDS.map(cmd => (
                  <button key={cmd.id} onClick={() => handleCommand(cmd as Command)} className={cn("shrink-0 snap-start px-4 py-2 rounded-[16px] border text-[10px] uppercase font-black tracking-widest flex items-center gap-1.5 hover:scale-105 transition-all outline-none focus:ring-2 focus:ring-blue-500/50", darkMode ? "bg-zinc-900 border-white/10 hover:bg-white/10 text-white/80 hover:text-white shadow-sm" : "bg-zinc-100 border-transparent hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 shadow-sm")}>
                    <DynamicIcon name={cmd.icon!} className="w-3" /> {cmd.label}
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input ref={inputRef} onKeyDown={e => e.key === 'Enter' && submitQuery()} type="text" placeholder="Ask about my experience..." className={cn("w-full pl-5 pr-12 py-3.5 rounded-[20px] text-sm focus:outline-none transition-all font-medium border border-transparent shadow-inner", darkMode ? "bg-zinc-900 text-white placeholder:text-zinc-600 focus:bg-zinc-800 focus:border-white/10" : "bg-zinc-100/80 text-zinc-900 placeholder:text-zinc-500 focus:bg-white focus:border-black/5 focus:shadow-md")} />
                <button onClick={submitQuery} className="absolute right-2 top-2 p-1.5 rounded-[14px] bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"><ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60" onClick={() => setSelectedVideo(null)}>
            <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 20, opacity: 0 }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className={cn("w-full max-w-5xl rounded-[32px] overflow-hidden border shadow-2xl relative", darkMode ? "bg-zinc-950 border-white/10" : "bg-zinc-900 border-white/20")} onClick={e => e.stopPropagation()}>
              <div className="flex justify-end p-6 absolute top-0 right-0 z-10"><button onClick={() => setSelectedVideo(null)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"><X className="w-5 h-5"/></button></div>
              <video src={selectedVideo} controls autoPlay className="w-full aspect-video object-contain bg-black" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
