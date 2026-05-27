import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { transition } from '../shared/animations';
import { projects, type Project } from '../../data/projects';

function ProjectCard({ p, i, containerRef }: { p: Project, i: number, containerRef: React.RefObject<HTMLDivElement | null> }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: i * 0.15, 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }}
      className="relative h-[400px] rounded-sm overflow-hidden group border border-white/10 hover:border-[#8B5CF6]/50 hover:scale-[1.02] transition-all duration-500 ease-out bg-[#050014]/40 shadow-lg"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-[-20%] w-[140%] h-[140%] z-0"
      >
        <img 
          src={p.images[0]} 
          alt={p.title} 
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 ease-out grayscale group-hover:grayscale-0" 
          referrerPolicy="no-referrer" 
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-[#050014]/80 to-transparent z-10" />
      
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
        <div className="translate-y-24 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <span className="text-[10px] tracking-widest text-[#A3E635] mb-2 block">{p.id}</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">{p.title}</h3>
          <p className="text-xs text-white/40 tracking-widest uppercase mb-4 group-hover:opacity-0 transition-opacity duration-300 absolute">{p.desc}</p>
          
          <div className="mt-8">
            <p className="text-sm text-white/70 mb-4 line-clamp-3 leading-relaxed opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">{p.longDesc}</p>
            <div className="flex flex-wrap gap-2 mb-6 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200 ease-out">
              {p.tech.map((t) => (
                <span key={t} className="text-[9px] tracking-widest uppercase text-[#A3E635] border border-[#A3E635]/30 px-2 py-1 rounded-full bg-[#A3E635]/5">
                  {t}
                </span>
              ))}
            </div>
            <a 
              href={p.link} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white hover:text-[#A3E635] opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-300 ease-out"
            >
              <span>View Project</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className="w-full max-w-5xl mx-auto px-8 md:px-12 flex flex-col"
    >
      <motion.h2 className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-16 shrink-0">
        System.Projects
      </motion.h2>
      
      <div 
        ref={containerRef}
        className="flex-1 pb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} containerRef={containerRef} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
