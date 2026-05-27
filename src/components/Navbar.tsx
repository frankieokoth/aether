import { motion } from 'motion/react';
import { useAetherStore } from '../store/aether-store';

export function Navbar() {
  const view = useAetherStore((s) => s.view);
  const setView = useAetherStore((s) => s.setView);

  const navItems = [
    { id: 'ABOUT', label: '// 01. ABOUT' },
    { id: 'WORK', label: '// 02. WORK' },
    { id: 'STACK', label: '// 03. STACK' },
    { id: 'CONTACT', label: '// 04. CONTACT' },
  ];

  return (
    <nav className="flex items-center gap-4 md:gap-8">
      {navItems.map((item) => {
        const isActive = view === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              setView(item.id);
              document.getElementById(item.id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
            }}
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
  );
}
