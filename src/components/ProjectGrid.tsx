import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PROJECTS = [
  {
    id: '01',
    title: 'NEBULAE',
    category: 'Interactive Art',
    image: 'https://picsum.photos/seed/nebulae/1200/800',
    description: 'A fluid simulation exploring the birth of stars in distant galaxies.',
    color: '#00f2ff'
  },
  {
    id: '02',
    title: 'GRAVITY',
    category: 'Web Experience',
    image: 'https://picsum.photos/seed/gravity/1200/800',
    description: 'An experimental interface that reacts to the physics of motion.',
    color: '#ff00f2'
  },
  {
    id: '03',
    title: 'KINETIC',
    category: 'Motion Design',
    image: 'https://picsum.photos/seed/kinetic/1200/800',
    description: 'Capturing the essence of movement through digital sculptures.',
    color: '#f2ff00'
  },
  {
    id: '04',
    title: 'VOID',
    category: 'Immersive VR',
    image: 'https://picsum.photos/seed/void/1200/800',
    description: 'A journey through the silence of the deep space.',
    color: '#ffffff'
  }
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number, key?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className={cn(
        "relative group w-full mb-32 md:mb-64 flex flex-col",
        index % 2 === 0 ? "md:items-start" : "md:items-end"
      )}
    >
      <div className="relative w-full md:w-[70%] aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <motion.img
          style={{ y }}
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-[140%] object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
        
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-display tracking-[0.3em] text-accent uppercase">
              {project.category}
            </span>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
              {project.title}
            </h3>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md"
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>
      </div>

      <div className={cn(
        "mt-8 max-w-sm px-4 md:px-0",
        index % 2 === 0 ? "md:text-left" : "md:text-right"
      )}>
        <p className="text-white/40 font-light leading-relaxed mb-4">
          {project.description}
        </p>
        <span className="text-[10px] font-display tracking-[0.2em] text-white/20">
          PROJECT {project.id}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProjectGrid() {
  return (
    <section id="work" className="relative z-10 px-8 py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 flex flex-col gap-4">
          <span className="text-[10px] font-display tracking-[0.5em] text-accent uppercase">
            Selected Works
          </span>
          <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter uppercase">
            THE ARCHIVE.
          </h2>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
