import { useState, useRef } from 'react';
import { motion, TargetAndTransition, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Mail, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

const detailContainerVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
      opacity: { duration: 0.4, delay: 0.2 },
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const detailItemVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } }
};

const getFloatAnimation = (antigravity: boolean, delay: number = 0): TargetAndTransition => {
  if (!antigravity) return {};
  return {
    y: [0, -15, 10, 0],
    x: [0, 10, -10, 0],
    rotate: [0, 1, -1, 0],
    transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut" }
  };
};

export function Intro({ antigravity }: { antigravity: boolean }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      y: -20,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={`max-w-3xl ${antigravity ? 'cursor-grab active:cursor-grabbing' : ''}`}
      drag={antigravity}
      dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
    >
      <motion.div
        animate={antigravity ? getFloatAnimation(true) : {}}
      >
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
          Frankie <br />
          <span className="font-medium text-white/90">Okoth.</span>
        </motion.h1>
        
        <motion.div variants={item} className="flex flex-col gap-6">
          <div className="border-l border-[#8B5CF6]/30 pl-5 py-1">
            <p className="text-white/60 text-sm md:text-base tracking-widest uppercase max-w-xl leading-relaxed mb-2">
              Software Engineer
            </p>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
              AI, Spatial Computing & Future Systems
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function About({ antigravity }: { antigravity: boolean }) {
  const transitionProps = { duration: 0.7, ease: "easeOut" as const };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', ...getFloatAnimation(antigravity, 1) }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className={`max-w-2xl w-full text-white/80 font-light leading-relaxed ${antigravity ? 'cursor-grab active:cursor-grabbing' : ''}`}
      drag={antigravity}
      dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8"
      >
        System.Identity
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="text-2xl md:text-4xl mb-8 text-white tracking-tight leading-tight"
      >
        I engineer intelligent systems and immersive realities.
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="text-sm md:text-base mb-6 text-white/50 tracking-wide"
      >
        I’m a software engineer focused on building well-structured, reliable systems. My work primarily centers on backend development, where I design scalable services, develop clean APIs, and implement systems that emphasize clarity, maintainability, and long-term performance.
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="text-sm md:text-base mb-12 text-white/50 tracking-wide"
      >
        I approach software with a creator’s mindset and an engineer’s discipline—solving problems through thoughtful design, structured logic, and practical implementation. I’m particularly interested in how complexity can be reduced through clear architecture and disciplined engineering across backend systems and full-stack applications.
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="text-sm md:text-base mb-12 text-white/50 tracking-wide"
      >
         Over time, my interests have expanded toward artificial intelligence and system design, exploring how intelligent and adaptive capabilities can be integrated into software in a practical and sustainable way.
      </motion.p>
       <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="text-sm md:text-base mb-12 text-white/50 tracking-wide"
      >
         Currently, I’m focused on strengthening my foundations in backend engineering, improving my system design thinking, and refining how I structure and evolve software over time, while continuing to explore how AI fits into the systems I build.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="flex flex-wrap gap-8 border-t border-[#8B5CF6]/20 pt-8"
      >
        <a href="mailto:frankieokoth99@gmail.com" className="text-white/40 hover:text-[#A3E635] transition-colors" aria-label="Email">
          <Mail size={20} strokeWidth={1.5} />
        </a>
        <a href="https://github.com/frankieokoth" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#A3E635] transition-colors" aria-label="GitHub">
          <Github size={20} strokeWidth={1.5} />
        </a>
        <a href="https://linkedin.com/in/franklin-p-okoth/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#A3E635] transition-colors" aria-label="LinkedIn">
          <Linkedin size={20} strokeWidth={1.5} />
        </a>
        <a href="#" className="text-white/40 hover:text-[#A3E635] transition-colors" aria-label="Resume">
          <FileText size={20} strokeWidth={1.5} />
        </a>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ p, i, antigravity, containerRef }: { p: any, i: number, antigravity: boolean, containerRef: React.RefObject<HTMLDivElement | null> }) {
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
      drag={antigravity}
      dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0, ...getFloatAnimation(antigravity, i) }}
      transition={{ 
        duration: 0.8, 
        delay: i * 0.15, 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }}
      className={`relative h-[400px] rounded-sm overflow-hidden group border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 hover:scale-[1.02] transition-all duration-500 ease-out bg-[#050014] ${antigravity ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-[-20%] w-[140%] h-[140%] z-0"
      >
        <img 
          src={p.images[0]} 
          alt={p.title} 
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 ease-out" 
          referrerPolicy="no-referrer" 
        />
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050014] via-[#050014]/80 to-transparent z-10" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
        <div className="translate-y-24 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <span className="text-[10px] tracking-widest text-[#A3E635] mb-2 block">{p.id}</span>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">{p.title}</h3>
          <p className="text-xs text-white/40 tracking-widest uppercase mb-4 group-hover:opacity-0 transition-opacity duration-300 absolute">{p.desc}</p>
          
          <div className="mt-8">
            <p className="text-sm text-white/70 mb-4 line-clamp-3 leading-relaxed opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">{p.longDesc}</p>
            <div className="flex flex-wrap gap-2 mb-6 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200 ease-out">
              {p.tech.map((t: string) => (
                <span key={t} className="text-[9px] tracking-widest uppercase text-[#A3E635] border border-[#A3E635]/30 px-2 py-1 rounded-full backdrop-blur-md bg-[#A3E635]/5">
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

export function ProjectGrid({ antigravity }: { antigravity: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    { 
      id: '01', 
      title: 'Neural Interface', 
      desc: 'Brain-computer interface visualization.',
      longDesc: 'A WebGL-powered visualization tool for real-time neural data. Built to render millions of data points with zero latency, utilizing custom shaders and a highly optimized React Three Fiber pipeline.',
      tech: ['WebGL', 'React', 'GLSL', 'WebSockets'],
      link: '#',
      images: [
        'https://picsum.photos/seed/neural1/600/400',
        'https://picsum.photos/seed/neural2/600/400',
        'https://picsum.photos/seed/neural3/600/400'
      ]
    },
    { 
      id: '02', 
      title: 'Void Engine', 
      desc: 'Custom WebGL rendering pipeline.',
      longDesc: 'An experimental physics and rendering engine built from scratch. Focuses on fluid dynamics, particle simulations, and non-photorealistic rendering techniques for web-based interactive art.',
      tech: ['Three.js', 'TypeScript', 'Physics', 'Shaders'],
      link: '#',
      images: [
        'https://picsum.photos/seed/void1/600/400',
        'https://picsum.photos/seed/void2/600/400',
        'https://picsum.photos/seed/void3/600/400'
      ]
    },
    { 
      id: '03', 
      title: 'Synapse', 
      desc: 'Distributed AI agent network.',
      longDesc: 'A decentralized protocol for autonomous AI agents to communicate, negotiate, and execute complex multi-step tasks. Features a real-time monitoring dashboard and secure node-to-node encryption.',
      tech: ['Node.js', 'WebRTC', 'OpenAI API', 'Cryptography'],
      link: '#',
      images: [
        'https://picsum.photos/seed/synapse1/600/400',
        'https://picsum.photos/seed/synapse2/600/400',
        'https://picsum.photos/seed/synapse3/600/400'
      ]
    },
    { 
      id: '04', 
      title: 'Quantum State', 
      desc: 'Quantum computing visualizer.',
      longDesc: 'An interactive educational tool that visualizes quantum states and gate operations in 3D space, making complex quantum mechanics concepts accessible and intuitive.',
      tech: ['React Three Fiber', 'Qiskit', 'Python', 'WebAssembly'],
      link: '#',
      images: [
        'https://picsum.photos/seed/quantum1/600/400',
        'https://picsum.photos/seed/quantum2/600/400',
        'https://picsum.photos/seed/quantum3/600/400'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className="w-full max-w-5xl flex flex-col"
    >
      <motion.h2 
        drag={antigravity}
        animate={getFloatAnimation(antigravity, 0.5)}
        className={`text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8 shrink-0 ${antigravity ? 'cursor-grab' : ''}`}
      >
        System.Projects
      </motion.h2>
      
      <div 
        ref={containerRef}
        className="flex-1 pb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} antigravity={antigravity} containerRef={containerRef} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Skills({ antigravity }: { antigravity: boolean }) {
  const skills = [
    'Artificial Intelligence', 
    'Spatial Computing (VR/AR)', 
    'WebGL & Three.js', 
    'React & Next.js Architecture', 
    'Systems Engineering', 
    'Generative Design'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className="w-full max-w-2xl"
    >
      <motion.h2 drag={antigravity} animate={getFloatAnimation(antigravity, 0.5)} className={`text-[10px] tracking-[0.4em] uppercase text-white/40 mb-12 ${antigravity ? 'cursor-grab' : ''}`}>System.Skills</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            drag={antigravity}
            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, ...getFloatAnimation(antigravity, i * 0.5) }}
            transition={{ ...transition, delay: i * 0.1 }}
            className={`flex items-center gap-6 group ${antigravity ? 'cursor-grab active:cursor-grabbing bg-[#050014] p-2 rounded' : ''}`}
          >
            <div className="w-1 h-1 bg-[#8B5CF6]/40 rounded-full group-hover:bg-[#A3E635] group-hover:scale-150 transition-all duration-300" />
            <span className="text-sm md:text-base font-light tracking-wide text-white/60 group-hover:text-white transition-colors duration-300">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Contact({ antigravity, onBack }: { antigravity: boolean, onBack?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [payload, setPayload] = useState('');
  const [activeField, setActiveField] = useState<string>('NONE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setActiveField('TRANSMITTING');
    setTimeout(() => {
      setStatus('success');
      setActiveField('SECURE');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className="w-full max-w-5xl"
    >
      <motion.h2 
        drag={antigravity}
        animate={getFloatAnimation(antigravity, 0.5)}
        className={`text-[10px] tracking-[0.4em] uppercase text-white/40 mb-12 ${antigravity ? 'cursor-grab' : ''}`}
      >
        System.Contact
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Form Column */}
        <div className="lg:col-span-3">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 border border-[#A3E635]/30 bg-[#A3E635]/5 text-[#A3E635] tracking-widest uppercase text-sm flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-[#A3E635] rounded-full animate-pulse" />
                Transmission Successful.
              </div>
              <div className="text-[10px] text-white/40 font-mono mt-4">
                [ACK] Payload received by F.OKOTH.<br/>
                [SYS] Connection terminated securely.
              </div>
              {onBack && (
                <button 
                  onClick={onBack}
                  className="mt-6 self-start px-6 py-3 bg-[#A3E635]/10 border border-[#A3E635]/30 text-xs tracking-[0.2em] uppercase hover:bg-[#A3E635]/20 hover:text-white transition-all text-[#A3E635]"
                >
                  [ Return to Previous View ]
                </button>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <motion.div drag={antigravity} dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }} className="flex flex-col gap-2 relative group">
                <label className="text-[10px] tracking-widest uppercase text-white/40 flex justify-between">
                  <span>Identity_</span>
                  <span className="text-[#8B5CF6] opacity-0 group-focus-within:opacity-100 transition-opacity">Required</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5CF6]/50 font-mono group-focus-within:text-[#A3E635] group-focus-within:translate-x-1 transition-all duration-300">{'>'}</span>
                  <input 
                    required 
                    type="text" 
                    onFocus={() => setActiveField('IDENTITY')}
                    onBlur={() => setActiveField('NONE')}
                    className="w-full bg-white/[0.02] border border-white/10 py-4 pl-10 pr-4 outline-none text-white focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]/50 focus:bg-[#A3E635]/5 transition-all duration-300 rounded-sm font-light placeholder-white/10" 
                    placeholder="Enter your designation" 
                  />
                </div>
              </motion.div>

              <motion.div drag={antigravity} dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }} className="flex flex-col gap-2 relative group">
                <label className="text-[10px] tracking-widest uppercase text-white/40 flex justify-between">
                  <span>Signal_</span>
                  <span className="text-[#8B5CF6] opacity-0 group-focus-within:opacity-100 transition-opacity">Required</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5CF6]/50 font-mono group-focus-within:text-[#A3E635] group-focus-within:translate-x-1 transition-all duration-300">{'>'}</span>
                  <input 
                    required 
                    type="email" 
                    onFocus={() => setActiveField('SIGNAL')}
                    onBlur={() => setActiveField('NONE')}
                    className="w-full bg-white/[0.02] border border-white/10 py-4 pl-10 pr-4 outline-none text-white focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]/50 focus:bg-[#A3E635]/5 transition-all duration-300 rounded-sm font-light placeholder-white/10" 
                    placeholder="Enter your return address" 
                  />
                </div>
              </motion.div>

              <motion.div drag={antigravity} dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }} className="flex flex-col gap-2 relative group">
                <label className="text-[10px] tracking-widest uppercase text-white/40 flex justify-between">
                  <span>Payload_</span>
                  <span className="text-[#8B5CF6] opacity-0 group-focus-within:opacity-100 transition-opacity">{payload.length} BYTES</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-[#8B5CF6]/50 font-mono group-focus-within:text-[#A3E635] group-focus-within:translate-x-1 transition-all duration-300">{'>'}</span>
                  <textarea 
                    required 
                    rows={5} 
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    onFocus={() => setActiveField('PAYLOAD')}
                    onBlur={() => setActiveField('NONE')}
                    className="w-full bg-white/[0.02] border border-white/10 py-4 pl-10 pr-4 outline-none text-white focus:border-[#A3E635] focus:ring-1 focus:ring-[#A3E635]/50 focus:bg-[#A3E635]/5 transition-all duration-300 resize-none rounded-sm font-light placeholder-white/10" 
                    placeholder="Enter your message parameters" 
                  />
                </div>
              </motion.div>

              <motion.button 
                drag={antigravity} dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
                type="submit" 
                disabled={status === 'submitting'}
                className="group relative self-start px-8 py-4 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs tracking-[0.2em] uppercase hover:bg-[#A3E635]/10 hover:border-[#A3E635] hover:text-[#A3E635] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-white/80 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                {status === 'submitting' ? 'Transmitting...' : 'Initiate Transfer'}
              </motion.button>
            </form>
          )}
        </div>

        {/* Status Panel Column */}
        <motion.div 
          drag={antigravity} 
          dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
          className="lg:col-span-2 hidden md:flex flex-col gap-6 p-6 border border-[#8B5CF6]/20 bg-[#050014]/80 backdrop-blur-md relative overflow-hidden rounded-sm"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50" />
          
          <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase border-b border-[#8B5CF6]/20 pb-4 flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'submitting' ? 'bg-[#A3E635] animate-pulse' : 'bg-[#8B5CF6]'}`} />
            Uplink Status
          </h3>
          
          <div className="text-[10px] font-mono tracking-widest flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-white/40">TARGET_NODE:</span>
              <span className="text-[#A3E635]">F.OKOTH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">ENCRYPTION:</span>
              <span className="text-white/80">AES-256-GCM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">INPUT_FOCUS:</span>
              <span className={`${activeField !== 'NONE' ? 'text-[#8B5CF6]' : 'text-white/30'}`}>
                [{activeField}]
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">PAYLOAD_SIZE:</span>
              <span className="text-white/80">{payload.length} B</span>
            </div>
          </div>

          {/* Signal Visualizer */}
          <div className="mt-4 h-24 border border-[#8B5CF6]/10 bg-black/20 relative overflow-hidden flex items-end justify-between p-2 gap-1">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: status === 'submitting' 
                    ? ['20%', '100%', '20%'] 
                    : activeField !== 'NONE' 
                      ? ['10%', `${40 + Math.random() * 40}%`, '10%']
                      : '10%'
                }}
                transition={{ 
                  duration: status === 'submitting' ? 0.5 : 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className={`w-full rounded-t-sm ${status === 'submitting' ? 'bg-[#A3E635]/50' : 'bg-[#8B5CF6]/30'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
