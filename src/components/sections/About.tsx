import { motion } from 'motion/react';
import { Mail, Github, Linkedin, FileText } from 'lucide-react';
import { transition } from '../shared/animations';

export function About() {
  const transitionProps = { duration: 0.7, ease: "easeOut" as const };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className="w-full max-w-5xl mx-auto px-8 md:px-12 text-white/80 font-light leading-loose"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-16"
      >
        System.Identity
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10px" }}
        transition={transitionProps}
        className="text-2xl md:text-4xl mb-16 text-white tracking-tight leading-tight"
      >
        I engineer intelligent systems and immersive realities.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
        <div className="lg:col-span-3 flex flex-col gap-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={transitionProps}
            className="text-sm md:text-base text-white/50 tracking-wide"
          >
            I'm a software engineer focused on building well-structured, reliable systems. My work primarily centers on backend development, where I design scalable services, develop clean APIs, and implement systems that emphasize clarity, maintainability, and long-term performance.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={transitionProps}
            className="text-sm md:text-base text-white/50 tracking-wide"
          >
            I approach software with a creator's mindset and an engineer's discipline—solving problems through thoughtful design, structured logic, and practical implementation. I'm particularly interested in how complexity can be reduced through clear architecture and disciplined engineering.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={transitionProps}
          className="lg:col-span-2 hidden lg:flex flex-col gap-6 p-6 border border-[#8B5CF6]/20 bg-[#050014]/80 relative overflow-hidden rounded-sm"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50" />
          
          <h3 className="text-[10px] tracking-[0.3em] text-white/40 uppercase border-b border-[#8B5CF6]/20 pb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />
            System Profile
          </h3>
          
          <div className="text-[10px] font-mono tracking-widest flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-white/40">FOCUS:</span>
              <span className="text-[#A3E635]">Backend Systems</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">STACK:</span>
              <span className="text-white/80">Go, TS, Python</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">INTERESTS:</span>
              <span className="text-white/80">AI, System Design</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40">STATUS:</span>
              <span className="text-[#A3E635]">Active</span>
            </div>
          </div>
        </motion.div>
      </div>

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
