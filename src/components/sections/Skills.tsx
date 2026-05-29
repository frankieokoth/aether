import { motion } from 'motion/react';
import { skills } from '../../data/skills';

export function Skills() {
  const transitionProps = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={transitionProps}
      className="w-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col gap-16 md:gap-24"
    >
      {/* Header */}
      <div className="w-full flex flex-col gap-12 items-center text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-mono">
            03 //
          </span>
          <span className="text-xl font-light text-white capitalize">
            Stack
          </span>
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10px" }}
          transition={transitionProps}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 leading-[1.1] max-w-4xl mx-auto"
        >
          Languages. Runtimes. <br className="hidden md:block" />
          <span className="italic text-white/70">Infrastructure.</span>
        </motion.h2>
      </div>

      {/* Typographic List */}
      <div className="w-full flex flex-col border-t border-white/5">
        {skills.map((group, groupIdx) => (
          <div key={group.category} className="w-full flex flex-col md:flex-row py-12 md:py-16 border-b border-white/5 gap-8 md:gap-16">
            
            {/* Category Marker */}
            <div className="w-full md:w-1/3 shrink-0">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-mono block mb-4">
                0{groupIdx + 1} //
              </span>
              <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                {group.category}
              </h3>
            </div>
            
            {/* Interactive Items */}
            <div className="w-full flex flex-col">
              {group.items.map((item) => (
                <div 
                  key={item} 
                  className="group relative flex items-center justify-between py-6 md:py-8 border-b border-white/[0.02] last:border-0 cursor-crosshair"
                >
                  <span className="text-3xl md:text-5xl font-light tracking-tight text-white/50 md:text-white/30 md:group-hover:text-white active:text-white transition-colors duration-500">
                    {item}
                  </span>
                  
                  {/* Cinematic Readout Tag */}
                  <div className="hidden md:flex opacity-0 group-hover:opacity-100 -translate-x-8 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] items-center gap-4">
                    <span className="text-[10px] tracking-[0.2em] text-[#A3E635] font-mono uppercase hidden md:block">
                      System.Active
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#A3E635] shadow-[0_0_10px_#A3E635]" />
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </motion.div>
  );
}
