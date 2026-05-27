import { motion } from 'motion/react';
import { useAetherStore } from '../store/aether-store';

export function Navbar() {
  const view = useAetherStore((s) => s.view);
  const setView = useAetherStore((s) => s.setView);

  const navItems = [
    { id: 'ABOUT', label: 'About' },
    { id: 'WORK', label: 'Work' },
    { id: 'STACK', label: 'Stack' },
    { id: 'CONTACT', label: 'Contact' },
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
            className={`relative text-xl font-light capitalize transition-all duration-300 group py-1 px-2 ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
          >
            {item.label}
            {isActive && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
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
