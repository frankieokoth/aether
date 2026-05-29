import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Instagram, Twitter, Download } from 'lucide-react';
import { Magnetic } from './shared/Magnetic';

function LocalTimeDisplay() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-xl tracking-widest text-white/80 tabular-nums">
      {time.toLocaleTimeString('en-US', { hour12: false, timeZoneName: 'short' })}
    </div>
  );
}

export function Footer({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement> }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ['start end', 'end end']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);

  return (
    <div id="contact" className="relative overflow-hidden w-full mt-16 md:mt-32 z-20 scroll-mt-20">
      <motion.footer 
        ref={containerRef}
        className="relative w-full border-t border-white/10 bg-[#050014]/30 backdrop-blur-2xl pt-24 md:pt-48 pb-16 px-6 md:px-16"
        style={{ y }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-12 md:gap-24">
            <div className="flex flex-col gap-10 max-w-2xl">
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white leading-[1.1]">
                Let's build <br/>
                something <span className="italic text-white/40 hover:text-[#A3E635] hover:drop-shadow-[0_0_15px_rgba(163,230,53,0.5)] transition-all duration-700 cursor-default">extraordinary.</span>
              </h2>
              <div className="self-start">
                <Magnetic>
                  <a href="mailto:frankieokoth99@gmail.com" className="group relative flex items-center gap-6 bg-white/5 border border-white/10 backdrop-blur-md text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-light tracking-wide hover:bg-white hover:text-black transition-all duration-500 overflow-hidden">
                    <span className="relative z-10 text-lg">Start a Conversation</span>
                    <span className="relative z-10 bg-white/10 group-hover:bg-black group-hover:text-white text-white p-2.5 rounded-full group-hover:rotate-45 transition-all duration-500">
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-2">Local Time</span>
              <LocalTimeDisplay />
              <div className="flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full border border-[#A3E635]/20 bg-[#A3E635]/5 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A3E635] animate-pulse shadow-[0_0_8px_#A3E635]" />
                <span className="text-[10px] tracking-widest uppercase text-[#A3E635]">Available for work</span>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-16" />

          <div className="flex flex-col xl:flex-row justify-between items-center gap-16">
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-8">
              <Magnetic>
                <a href="https://github.com/frankieokoth" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-base font-light text-white/70 hover:text-white transition-all capitalize hover:-translate-y-1">
                  <Github size={22} className="transition-colors" /> 
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">GitHub</span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">GitHub</span>
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://linkedin.com/in/franklin-p-okoth/" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-base font-light text-white/70 hover:text-white transition-all capitalize hover:-translate-y-1">
                  <Linkedin size={22} className="transition-colors" /> 
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">LinkedIn</span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">LinkedIn</span>
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-base font-light text-white/70 hover:text-white transition-all capitalize hover:-translate-y-1">
                  <Twitter size={22} className="transition-colors" /> 
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">X (Twitter)</span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">X (Twitter)</span>
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-base font-light text-white/70 hover:text-white transition-all capitalize hover:-translate-y-1">
                  <Instagram size={22} className="transition-colors" /> 
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Instagram</span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">Instagram</span>
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:frankieokoth99@gmail.com" className="group flex items-center gap-3 text-base font-light text-white/70 hover:text-white transition-all capitalize hover:-translate-y-1">
                  <Mail size={22} className="transition-colors" /> 
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Email</span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">Email</span>
                  </span>
                </a>
              </Magnetic>
            </div>

            <div className="flex flex-col xl:flex-row items-center gap-12 mt-8 xl:mt-0">
              <div className="flex flex-col items-center xl:items-end gap-1">
                <span className="text-lg md:text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-wide">
                  © {new Date().getFullYear()} Frankie Okoth.
                </span>
                <span className="text-[11px] font-light tracking-[0.25em] text-white/60 uppercase">
                  All Rights Reserved
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </motion.footer>
    </div>
  );
}
