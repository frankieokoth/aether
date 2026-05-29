import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';
import { transition } from '../shared/animations';
import { projects, type Project } from '../../data/projects';

function ProjectCard({ p, i, containerRef }: { p: Project, i: number, containerRef: React.RefObject<HTMLDivElement | null> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1, 
        delay: i * 0.1, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden group border border-white/5 hover:border-white/10 transition-all duration-700 ease-out bg-white/[0.01] backdrop-blur-sm"
    >
      {/* Background Image Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
      >
        <img 
          src={p.images[0]} 
          alt={p.title} 
          className="w-full h-full object-cover opacity-50 md:opacity-30 md:group-hover:opacity-100 transition-opacity duration-1000 ease-out grayscale-0 md:grayscale md:group-hover:grayscale-0 mix-blend-screen" 
          referrerPolicy="no-referrer" 
        />
      </motion.div>
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-[#050014]/90 md:via-[#050014]/80 to-transparent z-10 md:group-hover:via-[#050014]/90 transition-all duration-700" />
      
      {/* Card Content */}
      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end z-20">
        <div className="translate-y-0 md:translate-y-16 md:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
            <span className="text-[10px] tracking-[0.3em] text-white/30 font-mono uppercase block">{p.id} //</span>
            <span className="text-xs text-white/40 tracking-widest uppercase font-light">{p.desc}</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-light tracking-tight text-white">{p.title}</h3>
          
          <div className="mt-4 md:mt-6 max-w-2xl opacity-100 md:opacity-0 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">
            <p className="hidden md:block text-base md:text-lg text-white/60 font-light leading-relaxed mb-8">
              {p.longDesc}
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {p.tech.map((t) => (
                  <span key={t} className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/50 border border-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/[0.03]">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 w-full md:w-auto mt-2 md:mt-0">
                {p.githubLink && (
                  <a 
                    href={p.githubLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-4 py-3 md:py-2 rounded-full transition-all duration-300 font-light w-full md:w-auto"
                  >
                    <Github size={13} strokeWidth={1.5} />
                    <span>Code</span>
                  </a>
                )}
                
                {p.liveLink && (
                  <a 
                    href={p.liveLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#A3E635] hover:text-white border border-[#A3E635]/20 hover:border-[#A3E635]/40 bg-[#A3E635]/5 hover:bg-[#A3E635]/15 px-4 py-3 md:py-2 rounded-full transition-all duration-300 font-light w-full md:w-auto"
                  >
                    <span>Live</span>
                    <ArrowUpRight size={13} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const transitionProps = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={transitionProps}
      className="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-16 items-center"
    >
      {/* Header */}
      <div className="w-full flex flex-col gap-12 items-center text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-mono">
            02 //
          </span>
          <span className="text-xl font-light text-white capitalize">
            Work
          </span>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={transitionProps}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 leading-[1.1] max-w-4xl mx-auto"
        >
          Architecting scale. <br className="hidden md:block" />
          Building what <span className="italic text-white/70">feels</span> right.
        </motion.h2>
      </div>
      
      {/* Grid */}
      <div 
        ref={containerRef}
        className="w-full flex flex-col gap-16 pb-12"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} containerRef={containerRef} />
        ))}
      </div>
    </motion.div>
  );
}
