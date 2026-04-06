import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Scene from './components/Scene';
import { Intro, About, ProjectGrid, Skills, Contact } from './components/Content';
import { HybridNav } from './components/HybridNav';

type LogEntry = { id: number; text: string; type: 'system' | 'user' | 'error' | 'success' };

export default function App() {
  const [view, setView] = useState('HOME');
  const prevViewRef = useRef('HOME');
  const [input, setInput] = useState('');
  const [antigravity, setAntigravity] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([
    { id: 1, text: 'AETHER.OS v2.0 initialized.', type: 'system' },
    { id: 2, text: 'Type "help" to view available commands.', type: 'system' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const logIdCounter = useRef(3);

  const handleSetView = (newView: string) => {
    if (newView !== view) {
      prevViewRef.current = view;
      setView(newView);
      const el = document.getElementById(newView.toLowerCase());
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setView(entry.target.id.toUpperCase());
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['home', 'about', 'work', 'stack', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keep focus on input when clicking anywhere on the background
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== 'INPUT') {
        inputRef.current?.focus();
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleCommand = (cmd: string) => {
    const c = cmd.toLowerCase().trim();
    let response: LogEntry | null = null;

    if (c === 'help') {
      response = { id: logIdCounter.current++, text: 'Commands: access [module], contact, execute [protocol], clear. Modules: home, about, work, stack, contact. Protocols: antigravity.', type: 'system' };
    } else if (c.startsWith('access ')) {
      const module = c.split(' ')[1];
      if (['home', 'about', 'work', 'stack', 'contact'].includes(module)) {
        handleSetView(module.toUpperCase());
        response = { id: logIdCounter.current++, text: `Accessing module: ${module.toUpperCase()}...`, type: 'success' };
      } else {
        response = { id: logIdCounter.current++, text: `Error: Module '${module}' not found.`, type: 'error' };
      }
    } else if (c === 'contact') {
      handleSetView('CONTACT');
      response = { id: logIdCounter.current++, text: 'Establishing secure link... Accessing CONTACT module.', type: 'success' };
    } else if (c === 'execute antigravity' || c === 'antigravity') {
      setAntigravity(prev => !prev);
      response = { id: logIdCounter.current++, text: `Protocol ANTIGRAVITY ${!antigravity ? 'engaged' : 'disabled'}.`, type: 'success' };
    } else if (c === 'clear') {
      setLog([]);
      return;
    } else {
      response = { id: logIdCounter.current++, text: `Command not recognized: ${c}`, type: 'error' };
    }

    setLog(prev => {
      const newLog = [...prev, { id: logIdCounter.current++, text: `> ${cmd}`, type: 'user' as const }];
      if (response) newLog.push(response);
      return newLog.slice(-6); // Keep only last 6 lines
    });
  };

  return (
    <div className="relative min-h-screen bg-[#050014] text-white overflow-hidden font-sans selection:bg-[#8B5CF6] selection:text-white">
      <Scene view={view} isAntigravity={antigravity} />

      {/* Fixed Header */}
      <header className="fixed top-8 left-8 md:top-16 md:left-16 z-50 pointer-events-auto">
        <motion.div 
          onClick={() => handleSetView('HOME')}
          drag={antigravity} 
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
          className={`text-[10px] tracking-[0.4em] uppercase font-medium flex flex-col gap-1 cursor-pointer hover:text-[#00FF41] transition-colors duration-300 ${antigravity ? 'active:cursor-grabbing' : ''}`}
        >
          <div className="text-xl tracking-[0.5em] font-light">A E T H E R</div>
        </motion.div>
      </header>

      <HybridNav 
        currentView={view} 
        setView={handleSetView} 
        log={log} 
        handleCommand={handleCommand} 
        input={input} 
        setInput={setInput} 
      />

      {/* Scrollable Content Area */}
      <main className="relative z-10 h-screen overflow-y-auto overflow-x-hidden scroll-smooth pointer-events-auto" id="main-scroll-container">
        <div className="px-8 md:px-16 pb-32">
          <div id="home" className="min-h-screen flex flex-col justify-center pt-20">
            <Intro antigravity={antigravity} />
          </div>
          <div id="about" className="min-h-screen flex flex-col justify-center pt-20">
            <About antigravity={antigravity} />
          </div>
          <div id="work" className="min-h-screen flex flex-col justify-center pt-20">
            <ProjectGrid antigravity={antigravity} />
          </div>
          <div id="stack" className="min-h-screen flex flex-col justify-center pt-20">
            <Skills antigravity={antigravity} />
          </div>
          <div id="contact" className="min-h-screen flex flex-col justify-center pt-20">
            <Contact antigravity={antigravity} onBack={() => handleSetView(prevViewRef.current)} />
          </div>
        </div>
      </main>
    </div>
  );
}
