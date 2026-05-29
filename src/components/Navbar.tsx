import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAetherStore } from '../store/aether-store';
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const view = useAetherStore((s) => s.view);
  const setView = useAetherStore((s) => s.setView);

  const navItems = [
    { id: 'ABOUT', label: 'About', index: '01' },
    { id: 'WORK', label: 'Work', index: '02' },
    { id: 'STACK', label: 'Stack', index: '03' },
    { id: 'CONTACT', label: 'Contact', index: '04' },
  ];

  const socials = [
    { href: 'https://github.com/frankieokoth', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/franklin-p-okoth/', icon: Linkedin, label: 'LinkedIn' },
    { href: '#', icon: Twitter, label: 'X' },
    { href: 'mailto:frankieokoth99@gmail.com', icon: Mail, label: 'Email' },
  ];

  // Lock the actual scroll container when menu is open
  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container');
    if (!scrollContainer) return;
    if (isOpen) {
      scrollContainer.style.overflow = 'hidden';
    } else {
      scrollContainer.style.overflow = '';
    }
    return () => { scrollContainer.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (id: string) => {
    setView(id);
    setIsOpen(false);
    // Small delay so the exit animation plays before scroll
    setTimeout(() => {
      const target = document.getElementById(id.toLowerCase());
      const scrollContainer = document.getElementById('main-scroll-container');
      if (target && scrollContainer) {
        const targetTop = target.offsetTop - 80; // account for fixed header height
        scrollContainer.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = view === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
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

      {/* Mobile Hamburger — Custom Animated Bars */}
      <button
        className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[7px] z-[110]"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block w-7 h-[1.5px] bg-white origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block w-7 h-[1.5px] bg-white origin-center"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="block w-7 h-[1.5px] bg-white origin-center"
        />
      </button>

      {/* Mobile Overlay — Portalled to escape transformed header containment */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[100] bg-[#050014] flex flex-col"
            >
              {/* Subtle grid texture */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }} />

              {/* Close Button */}
              <button
                className="absolute top-7 right-6 text-white/40 hover:text-white p-2 z-20 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={28} strokeWidth={1.5} />
              </button>

              {/* Navigation Links — Left-aligned, brutalist */}
              <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, i) => {
                    const isActive = view === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => handleNavClick(item.id)}
                        className="group flex items-baseline gap-5 py-4 text-left border-b border-white/[0.04] last:border-0"
                      >
                        <span className={`text-[11px] font-mono tracking-[0.3em] transition-colors duration-300 ${isActive ? 'text-[#A3E635]' : 'text-white/20 group-active:text-white/40'}`}>
                          {item.index}
                        </span>
                        <span className={`text-[2.5rem] font-light tracking-tight leading-none transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50 group-active:text-white'}`}>
                          {item.label}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="w-2 h-2 rounded-full bg-[#A3E635] shadow-[0_0_12px_#A3E635] ml-auto self-center"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer — Social Icons + Resume CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="px-8 pb-10 relative z-10"
              >
                <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-8" />
                
                <div className="flex items-center justify-between">
                  {/* Social Icons */}
                  <div className="flex items-center gap-6">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noreferrer"
                        className="text-white/30 hover:text-white transition-colors duration-300"
                        aria-label={s.label}
                      >
                        <s.icon size={20} strokeWidth={1.5} />
                      </a>
                    ))}
                  </div>

                  {/* Resume CTA */}
                  <a
                    href="/resume.pdf"
                    download
                    className="group flex items-center gap-3 text-sm tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-300"
                  >
                    <span>Resume</span>
                    <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

