import { motion } from 'motion/react';
import { transition } from '../shared/animations';
import { skills } from '../../data/skills';

export function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
      className="w-full max-w-5xl mx-auto px-8 md:px-12"
    >
      <motion.h2 className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-16">System.Skills</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: i * 0.1 }}
            className="flex items-center gap-6 group p-4 rounded bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all"
          >
            <div className="w-1 h-1 bg-[#8B5CF6]/40 rounded-full group-hover:bg-[#A3E635] group-hover:scale-150 transition-all duration-300" />
            <span className="text-sm md:text-base font-light tracking-wide text-white/60 group-hover:text-white transition-colors duration-300 leading-loose">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
