import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Magnetic } from './shared/Magnetic';

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  // Parallax effect: the footer slides up slightly slower than the scroll
  const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);
  
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden w-full mt-32 z-20">
      <motion.footer 
        ref={containerRef}
        className="relative w-full border-t border-white/10 bg-[#050014]/30 backdrop-blur-2xl pt-48 pb-16 px-8 md:px-16"
        style={{ y }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top section: Massive typography & Call to Action */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-24">
            <div className="flex flex-col gap-10 max-w-2xl">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white leading-[1.1]">
                Let's build <br/>
                something <span className="italic text-white/40">extraordinary.</span>
              </h2>
              <div className="self-start">
                <Magnetic>
                  <a href="mailto:frankieokoth99@gmail.com" className="group flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-medium tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    Start a Conversation
                    <span className="group-hover:rotate-45 transition-transform duration-300 bg-black text-white p-2 rounded-full">
                      <ArrowUpRight size={16} />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 text-right">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Local Time</span>
              <div className="font-mono text-xl tracking-widest text-white/80 tabular-nums">
                {time.toLocaleTimeString('en-US', { hour12: false, timeZoneName: 'short' })}
              </div>
              <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/5 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-pulse shadow-[0_0_8px_#A3E635]" />
                <span className="text-[10px] tracking-widest uppercase text-[#A3E635]">Available for work</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-16" />

          {/* Bottom Section: Links & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            
            <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
              <Magnetic>
                <a href="https://github.com/frankieokoth" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                  <Github size={16} className="group-hover:text-[#8B5CF6] transition-colors" /> GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://linkedin.com/in/franklin-p-okoth/" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                  <Linkedin size={16} className="group-hover:text-[#8B5CF6] transition-colors" /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:frankieokoth99@gmail.com" className="group flex items-center gap-3 text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                  <Mail size={16} className="group-hover:text-[#8B5CF6] transition-colors" /> Email
                </a>
              </Magnetic>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <span className="text-[10px] tracking-[0.2em] text-white/20 uppercase font-mono">
                © {new Date().getFullYear()} F.OKOTH
              </span>
              <button 
                onClick={scrollToTop} 
                className="group flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/40 hover:text-white uppercase transition-colors"
                aria-label="Scroll to top"
              >
                <span className="w-8 h-[1px] bg-white/20 group-hover:bg-[#A3E635] transition-colors" />
                Back to top
              </button>
            </div>

          </div>
          
        </div>
      </motion.footer>
    </div>
  );
}
