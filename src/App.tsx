import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Scene from './components/Scene';
import { Intro, About, ProjectGrid, Archive, Contact } from './components/Content';
import { HybridNav } from './components/HybridNav';

type LogEntry = { id: number; text: string; type: 'system' | 'user' | 'error' | 'success' };

export default function App() {
  const [view, setView] = useState('INTRO');
  const prevViewRef = useRef('INTRO');
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
    }
  };

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
      response = { id: logIdCounter.current++, text: 'Commands: access [module], contact, execute [protocol], clear. Modules: about, projects, archive, contact. Protocols: antigravity.', type: 'system' };
    } else if (c.startsWith('access ')) {
      const module = c.split(' ')[1];
      if (['about', 'projects', 'archive', 'intro', 'contact'].includes(module)) {
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

      <main className="relative z-10 h-screen flex flex-col justify-between p-8 md:p-16 pointer-events-none">
        {/* Header */}
        <header className="flex justify-between items-center pointer-events-auto">
          <motion.div 
            drag={antigravity} 
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
            className={`text-[10px] tracking-[0.4em] uppercase font-medium flex flex-col gap-1 ${antigravity ? 'cursor-grab' : ''}`}
          >
            <div>Aether<span className="text-white/30">.OS</span></div>
            <div className="text-white/30 text-[8px]">User: F.Okoth</div>
          </motion.div>
          <motion.div 
            drag={antigravity} 
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
            className={`text-[10px] tracking-widest text-white/30 uppercase text-right ${antigravity ? 'cursor-grab' : ''}`}
          >
            Module: {view} <br/>
            Gravity: {antigravity ? '0.0G' : '1.0G'}
          </motion.div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 flex flex-col justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {view === 'INTRO' && <Intro key="intro" antigravity={antigravity} />}
            {view === 'ABOUT' && <About key="about" antigravity={antigravity} />}
            {view === 'PROJECTS' && <ProjectGrid key="projects" antigravity={antigravity} />}
            {view === 'ARCHIVE' && <Archive key="archive" antigravity={antigravity} />}
            {view === 'CONTACT' && <Contact key="contact" antigravity={antigravity} onBack={() => handleSetView(prevViewRef.current)} />}
          </AnimatePresence>
        </div>

        <HybridNav 
          currentView={view} 
          setView={handleSetView} 
          log={log} 
          handleCommand={handleCommand} 
          input={input} 
          setInput={setInput} 
        />
      </main>
    </div>
  );
}
