import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
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

// Physics Dock Item Component
function DockItem({ mouseX, href, icon: Icon, label }: { mouseX: any, href: string, icon: any, label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Base size 48px, max size 72px on hover
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.div ref={ref} style={{ width }} className="flex items-center justify-center aspect-square">
      <motion.a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        style={{ width, height: width }}
        className="group relative flex items-center justify-center rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-white/10 hover:border-white/20 transition-colors"
      >
        <motion.div style={{ scale: useTransform(width, [48, 72], [1, 1.5]) }}>
          <Icon strokeWidth={1.5} className="text-white/50 group-hover:text-white transition-colors duration-300 w-5 h-5" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
}

function XIcon(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className={props.className}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
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
  const mouseX = useMotionValue(Infinity);

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
                  <a href="mailto:frankieokoth99@gmail.com" aria-label="Start a Conversation" className="group relative flex items-center gap-6 bg-white/5 border border-white/10 backdrop-blur-md text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-light tracking-wide hover:bg-white hover:text-black transition-all duration-500 overflow-hidden">
                    <span className="relative z-10 text-lg">Start a Conversation</span>
                    <span className="relative z-10 bg-white/10 group-hover:bg-black group-hover:text-white text-white p-2.5 rounded-full group-hover:rotate-45 transition-all duration-500" aria-hidden="true">
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

          <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
            
            {/* Fluid Physics Dock */}
            <div className="flex justify-center lg:justify-start w-full lg:w-auto">
              <div 
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-center justify-center gap-3 h-[88px] px-4 w-max rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-2xl"
              >
              <DockItem mouseX={mouseX} href="https://github.com/frankieokoth" icon={Github} label="GitHub" />
              <DockItem mouseX={mouseX} href="https://linkedin.com/in/franklin-p-okoth/" icon={Linkedin} label="LinkedIn" />
              <DockItem mouseX={mouseX} href="https://x.com/frankie_okoth" icon={XIcon} label="X (Twitter)" />
              <DockItem mouseX={mouseX} href="https://instagram.com/frankie_okoth/" icon={Instagram} label="Instagram" />
            </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 mt-8 lg:mt-0">
              <div className="flex flex-col items-center lg:items-end gap-1">
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
