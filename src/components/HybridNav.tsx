"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type LogEntry = { id: number; text: string; type: 'system' | 'user' | 'error' | 'success' };

interface HybridNavProps {
  currentView: string;
  setView: (view: string) => void;
  log: LogEntry[];
  handleCommand: (cmd: string) => void;
  input: string;
  setInput: (val: string) => void;
}

export function HybridNav({ currentView, setView, log, handleCommand, input, setInput }: HybridNavProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isTerminalOpen) {
      // Small delay to ensure the input is rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  const navItems = [
    { id: 'ABOUT', label: '// 01. ABOUT' },
    { id: 'WORK', label: '// 02. WORK' },
    { id: 'STACK', label: '// 03. STACK' },
    { id: 'CONTACT', label: '// 04. CONTACT' },
  ];

  return (
    <>
      {/* Minimalist Navbar */}
      <div className="fixed top-8 right-8 z-40 pointer-events-auto">
        <nav className="flex items-center gap-4 md:gap-8 py-4">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`relative font-mono text-xs tracking-widest uppercase transition-all duration-300 group py-1 ${isActive ? 'text-[#00FF41] font-bold' : 'text-white/70 hover:text-white'}`}
              >
                <span className={`absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#00FF41] ${isActive ? 'opacity-100' : ''}`}>[</span>
                {item.label}
                <span className={`absolute -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#00FF41] ${isActive ? 'opacity-100' : ''}`}>]</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#00FF41] shadow-[0_0_8px_rgba(0,255,65,0.8)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Hidden Terminal */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-end pointer-events-auto"
          >
            {/* Heavy blur backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
              onClick={() => setIsTerminalOpen(false)} 
            />
            
            {/* Terminal Window */}
            <div className="relative w-full h-[50vh] bg-[#050505] border-t border-[#00FF41]/30 p-6 md:p-12 flex flex-col font-mono text-[#00FF41] shadow-[0_-10px_40px_rgba(0,255,65,0.05)] rounded-t-sm">
              <div className="flex justify-between items-center mb-6 border-b border-[#00FF41]/20 pb-4">
                <span className="text-xs tracking-widest opacity-70">TERMINAL // PRESS ` TO CLOSE</span>
                <button onClick={() => setIsTerminalOpen(false)} className="text-xs hover:text-white transition-colors tracking-widest">[ CLOSE ]</button>
              </div>
              
              <div className="flex-1 overflow-y-auto flex flex-col justify-end gap-2 mb-6 text-xs md:text-sm tracking-wider">
                {log.map((entry) => (
                  <div 
                    key={entry.id}
                    className={`
                      ${entry.type === 'user' ? 'text-[#00FF41]/70' : ''}
                      ${entry.type === 'system' ? 'text-[#00FF41]/50' : ''}
                      ${entry.type === 'error' ? 'text-rose-500' : ''}
                      ${entry.type === 'success' ? 'text-[#00FF41]' : ''}
                    `}
                  >
                    {entry.text}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs md:text-sm">
                <span className="opacity-80 shrink-0">{'>'} AETHER.OS // ENTER COMMAND:</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && input) {
                      handleCommand(input);
                      setInput('');
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-[#00FF41] placeholder-[#00FF41]/30 uppercase tracking-widest w-full"
                  spellCheck={false}
                  autoComplete="off"
                />
                <motion.div 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} 
                  className="w-2 h-4 bg-[#00FF41] shrink-0" 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

