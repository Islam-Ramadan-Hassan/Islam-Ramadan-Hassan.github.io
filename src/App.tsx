import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'motion/react';
import { 
  User, Code2, Briefcase, History, Mail, ArrowRight, Download, Github, Linkedin, Twitter, ExternalLink,
  MessageSquare, Monitor, Database, Star, Sun, Moon, Camera, Gamepad2, Plane, Languages, Book, Award,
  Sparkles, Play, X, PlayCircle, BarChart3, PieChart, Brain, Globe, ChevronDown, ChevronUp, Quote, ChevronRight, ArrowUp
} from 'lucide-react';
import { cn } from './lib/utils';
import { COMMANDS, RESPONSE_DATA, INITIAL_GREETING, type Message, type Command } from './constants';
import photoSrc from './assets/photo-nobg.png';

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
  const [darkMode, setDarkMode] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = ["Data Analyst", "BI Developer", "Data Scientist", "Strategist"];

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
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
            <p className="font-display font-bold text-sm tracking-tight leading-none mb-1 text-current">ISLAM RAMADAN</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60 leading-none">BI Developer</p>
          </div>
        </a>

        <div className={cn("flex items-center p-1 rounded-full overflow-x-auto scrollbar-hide ml-2 sm:ml-4 sm:flex-none flex-1 max-w-full", darkMode ? "bg-white/5" : "bg-black/5")}>
          <a href="#hero" className={cn("px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap", darkMode ? "text-white/60 hover:text-white hover:bg-white/10 lg:hover:bg-white/5" : "text-black/60 hover:text-black hover:bg-white hover:shadow-sm")}>Home</a>
          <a href="#about" className={cn("px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap", darkMode ? "text-white/60 hover:text-white hover:bg-white/10 lg:hover:bg-white/5" : "text-black/60 hover:text-black hover:bg-white hover:shadow-sm")}>About</a>
          <a href="#skills" className={cn("px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap", darkMode ? "text-white/60 hover:text-white hover:bg-white/10 lg:hover:bg-white/5" : "text-black/60 hover:text-black hover:bg-white hover:shadow-sm")}>Skills</a>
          <a href="#experience" className={cn("px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap", darkMode ? "text-white/60 hover:text-white hover:bg-white/10 lg:hover:bg-white/5" : "text-black/60 hover:text-black hover:bg-white hover:shadow-sm")}>Experience</a>
          <a href="#projects" className={cn("px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap", darkMode ? "text-white/60 hover:text-white hover:bg-white/10 lg:hover:bg-white/5" : "text-black/60 hover:text-black hover:bg-white hover:shadow-sm")}>Projects</a>
          <a href="#contact" className={cn("px-3 sm:px-4 py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap", darkMode ? "text-white/60 hover:text-white hover:bg-white/10 lg:hover:bg-white/5" : "text-black/60 hover:text-black hover:bg-white hover:shadow-sm")}>Contact</a>
        </div>

        <div className="flex items-center gap-2 pr-1">
          <button onClick={() => setDarkMode(!darkMode)} className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all", darkMode ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white hover:bg-black/5 border border-black/5 text-black shadow-sm")}>
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      <main className="relative z-10 w-full">
        {/* Section 1: Landing */}
        <section id="hero" className="min-h-screen flex flex-col lg:flex-row items-center justify-center pt-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden gap-12">
          {/* Text Content */}
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex-1 w-full relative z-20 space-y-8 mt-10 lg:mt-0 text-center lg:text-left">
            <div className="relative inline-flex items-center gap-4">
              <div className={cn("px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm", darkMode ? "bg-white/10 border-white/10 text-white" : "bg-black/5 border-black/5 text-black")}>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  Available for new projects
                </span>
              </div>
            </div>
            
            <motion.h1 style={{ x: parallaxX, y: parallaxY }} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-black tracking-tighter leading-[0.9] lg:leading-[0.85]">
              <span className="block opacity-40 text-2xl lg:text-3xl mb-4 font-bold tracking-tight">I'm Islam,</span>
              <span className="block h-[1.2em] overflow-hidden relative">
                <AnimatePresence mode="popLayout">
                  <motion.span key={currentRoleIndex} initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ y: "-100%" }} transition={{ duration: 1.5, ease: "circOut" }} className="absolute inset-0 flex items-center justify-center lg:justify-start whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg opacity-70 leading-relaxed font-medium">
              Transforming complex datasets into actionable intelligence. I design robust data architectures, write advanced SQL, and build compelling stories through interactive dashboards.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <a href="#projects" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-[20px] font-bold text-[13px] uppercase tracking-widest shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:scale-105 hover:bg-blue-700 transition-all text-center flex items-center justify-center gap-3">
                Explore Work <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#about" className={cn("w-full sm:w-auto px-8 py-4 rounded-[20px] font-bold text-[13px] uppercase tracking-widest border transition-all text-center flex items-center justify-center gap-3", darkMode ? "border-white/10 hover:bg-white/10" : "border-black/5 hover:bg-black/5")}>
                View Profile
              </a>
            </div>
          </motion.div>

          {/* Visual Content */}
          <div className="flex-1 relative w-full flex items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] order-first lg:order-last">
            <motion.div style={{ x: parallaxXReverse, y: parallaxYReverse }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-blue-500/10 rounded-full blur-[80px]" />
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1, y: [-5, 5, -5] }} 
              transition={{ 
                scale: { delay: 0.4, duration: 1, ease: "easeOut" },
                opacity: { delay: 0.4, duration: 1, ease: "easeOut" },
                y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }
              }} 
              className="relative z-10 mx-auto group pointer-events-none w-[280px] h-[340px] sm:w-[380px] sm:h-[440px] lg:w-[460px] lg:h-[520px] flex items-end justify-center"
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 lg:bottom-12 lg:-translate-x-1/2 lg:w-[120%] lg:left-[50%] h-[90%] my-auto bg-blue-500 rounded-t-full opacity-30 mix-blend-screen filter blur-3xl pointer-events-none" />
              
              {/* Background Arch Shape */}
              <div className={cn("absolute inset-0 rounded-t-[1000px] rounded-b-[40px] overflow-hidden border shadow-2xl transition-all duration-700 pointer-events-none ring-1 ring-inset", darkMode ? "border-white/10 ring-white/10 shadow-[0_0_80px_-20px_rgba(59,130,246,0.25)] bg-zinc-900/60 backdrop-blur-3xl" : "border-blue-200/50 ring-white/80 shadow-[0_0_80px_-20px_rgba(59,130,246,0.25)] bg-white/40 backdrop-blur-3xl")}>
                <div className={cn("absolute inset-0 bg-gradient-to-b opacity-80", darkMode ? "from-blue-500/20 via-zinc-900/40 to-zinc-950" : "from-blue-500/20 via-blue-50/40 to-transparent")} />
                
                {/* Animated Orbs */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    y: [0, -20, 0],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute -top-10 -left-10 w-2/3 h-2/3 bg-blue-500 rounded-full blur-[60px]"
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    y: [0, 20, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-10 -right-10 w-3/4 h-3/4 bg-indigo-500 rounded-full blur-[80px]"
                />
                <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay" />
              </div>

                {/* Photo Container */}
              <div className="relative z-10 flex items-end justify-center overflow-hidden rounded-t-[1000px] rounded-b-[40px] w-full h-full p-2 sm:p-4 pt-12">
                <motion.img 
                   src={photoSrc} 
                   alt="Islam Ramadan" 
                   className="w-[95%] h-[95%] object-bottom object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] contrast-[1.2] saturate-[1.15] brightness-[1.05] transition-transform duration-1000 group-hover:scale-[1.03] origin-bottom relative z-10"
                 />
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              initial={{ x: 40, opacity: 0 }} 
              animate={{ x: 0, opacity: 1, y: [-8, 8, -8] }} 
              transition={{ 
                x: { delay: 0.6, duration: 0.8, ease: "easeOut" },
                opacity: { delay: 0.6, duration: 0.8 },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }
              }} 
              className="absolute -right-4 sm:-right-8 top-[35%] max-w-[200px] z-20 hidden md:block select-none"
            >
              <div className="p-4 rounded-2xl border border-white/10 bg-[#0A0D14]/90 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Analytics</p>
                  <p className="text-xs font-bold leading-tight mt-0.5 whitespace-nowrap">Top Rated Specialist</p>
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
        <section id="about" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter">THE <span className="text-blue-500">ENGINEER.</span></h2>
            <p className="text-lg leading-relaxed opacity-80 max-w-xl">
              {RESPONSE_DATA.about.text} {RESPONSE_DATA.about.details}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className={cn("p-8 rounded-[20px] border transition-colors", darkMode ? "border-white/10" : "bg-white/50 border-black/5")}>
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4">Education</h3>
                <div className="space-y-4">
                  {RESPONSE_DATA.education.items.map((ed, i) => (
                    <div key={i}><p className="font-bold text-sm tracking-tight">{ed.degree}</p><p className="text-xs opacity-70 mt-1">{ed.school}</p></div>
                  ))}
                </div>
              </div>
              <div className={cn("p-8 rounded-[20px] border transition-colors", darkMode ? "border-white/10" : "bg-white/50 border-black/5")}>
                <h3 className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-4">Languages & Awards</h3>
                <div className="space-y-4">
                  {RESPONSE_DATA.languages.items.map((l, i) => (
                    <div key={i}><p className="font-bold text-sm tracking-tight">{l.name}</p><p className="text-xs opacity-70 mt-1">{l.level}</p></div>
                  ))}
                  <div className="pt-4 border-t mt-4" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                     {RESPONSE_DATA.awards.items.slice(0, 2).map((a, i) => <p key={i} className="text-xs font-bold leading-tight mt-2 opacity-80">★ {a}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="skills" className="flex-1 w-full space-y-8 scroll-mt-24">
            <h3 className="text-2xl font-display font-black tracking-tight">TECH <span className="opacity-50">STACK</span></h3>
            <div className="grid gap-4">
              {RESPONSE_DATA.skills.sections.map((s, idx) => (
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} key={s.title} className={cn("p-6 rounded-[20px] border transition-all", darkMode ? "border-white/10 hover:bg-white/[0.02]" : "bg-white/50 border-black/5 hover:bg-white")}>
                  <div className="flex items-center gap-3 mb-6">
                    <DynamicIcon name={s.icon} className="w-5 h-5 text-blue-500" />
                    <h4 className="font-bold tracking-tight">{s.title}</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {s.items.map(i => (
                      <div key={i.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold">{i.name}</span>
                          <span className="text-[10px] font-mono opacity-40">{i.rating}/5</span>
                        </div>
                        <div className="flex gap-1 h-1">
                          {[1,2,3,4,5].map(st => <div key={st} className={cn("flex-1 rounded-[2px]", st <= i.rating ? "bg-blue-500" : (darkMode ? "bg-white/10" : "bg-black/5"))} />)}
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
        <section id="experience" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter">CAREER <span className="text-blue-500 opacity-50">PATH</span></h2>
            <p className="opacity-70 text-sm">A technical overview of my professional timeline.</p>
          </div>
          <div className="flex flex-col border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            {RESPONSE_DATA.experience.map((exp, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.5 }} 
                key={i} 
                className={cn("group flex flex-col md:flex-row gap-4 md:gap-12 py-10 border-b transition-colors duration-300", darkMode ? "border-white/10 hover:bg-white/[0.02]" : "border-black/10 hover:bg-black/[0.02]")}
              >
                <div className="shrink-0 w-full md:w-1/4 pt-1">
                  <p className="font-mono text-[11px] opacity-50 uppercase tracking-widest">{exp.period}</p>
                  <p className="font-bold text-sm tracking-tight mt-1 text-blue-500">{exp.company}</p>
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight">{exp.role}</h3>
                  <p className="text-sm opacity-70 leading-relaxed font-medium">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4: Projects */}
        <section id="projects" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
          <div className="flex items-center flex-col text-center mb-20 gap-4">
              <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter">CASE <span className="text-blue-500 opacity-50">STUDIES</span></h2>
              <p className="opacity-70 text-sm max-w-lg">Interactive data models, robust architectures, and analytical deep dives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {RESPONSE_DATA.projects.map((proj, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.6 }} 
                key={proj.title} 
                layout 
                onClick={() => setExpandedProject(expandedProject === proj.title ? null : proj.title)} 
                className={cn(
                  "group cursor-pointer p-8 sm:p-12 relative overflow-hidden transition-all duration-500 rounded-[24px] border hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl", 
                  darkMode ? "border-white/10 hover:bg-white/[0.04] hover:border-blue-500/70 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]" : "border-black/10 hover:bg-white bg-white/50 hover:border-blue-500/60 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                )}
              >
                <div className="flex flex-col h-full gap-8 relative z-10">
                  <div className="space-y-5">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-3xl font-bold tracking-tight">{proj.title}</h3>
                      {proj.videoUrl && (
                        <button onClick={(e) => { e.stopPropagation(); setSelectedVideo(proj.videoUrl); }} className="w-12 h-12 shrink-0 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </button>
                      )}
                    </div>
                    {proj.metrics && <span className={cn("inline-block px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-blue-500 rounded-full", darkMode ? "bg-blue-500/10" : "bg-blue-50")}>{proj.metrics}</span>}
                    <p className="text-sm opacity-80 leading-relaxed font-medium">{proj.description}</p>
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
                            <p className="text-xs opacity-70 leading-relaxed font-medium">{proj.deepDive.challenges}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-emerald-500 mb-2 tracking-widest">Solution</p>
                            <p className="text-xs opacity-70 leading-relaxed font-medium">{proj.deepDive.solutions}</p>
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

        {/* Footer */}
        <footer id="contact" className={cn("py-16 md:py-24 border-t text-center space-y-8 backdrop-blur-3xl mt-12 transition-colors", darkMode ? "bg-black/40 border-white/5" : "bg-white/60 border-black/5 text-zinc-900")}>
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="text-4xl font-display font-black tracking-tighter">LET'S CONNECT</h2>
            <div className={cn("p-6 rounded-3xl border transition-colors inline-block", darkMode ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-xl")}>
              <p className="font-bold text-xl sm:text-2xl select-all">{RESPONSE_DATA.contact.email}</p>
              <p className="text-[10px] uppercase font-black tracking-[0.3em] opacity-40 mt-2">Available for Opportunities</p>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <a href={RESPONSE_DATA.contact.socials[0].link} target="_blank" className={cn("w-14 h-14 rounded-full border flex items-center justify-center hover:scale-110 transition-all", darkMode ? "border-white/20 hover:bg-white hover:text-black text-white" : "border-black/10 hover:bg-black hover:text-white text-zinc-900 bg-white shadow-md")}><Linkedin className="w-5 h-5" /></a>
              <a href="#" className={cn("w-14 h-14 rounded-full border flex items-center justify-center hover:scale-110 transition-all", darkMode ? "border-white/20 hover:bg-white hover:text-black text-white" : "border-black/10 hover:bg-black hover:text-white text-zinc-900 bg-white shadow-md")}><Github className="w-5 h-5" /></a>
            </div>
          </div>
          <p className="text-[9px] uppercase tracking-widest font-black opacity-30">© 2026 Islam Ramadan. Crafted in AI Studio.</p>
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
