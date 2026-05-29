import { motion } from 'motion/react';

export function Intro() {
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
      y: -20,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40, clipPath: 'inset(100% -20% 0 -20%)' },
    show: { opacity: 1, y: 0, clipPath: 'inset(-20% -20% -20% -20%)', transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <div className="relative w-full">

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl mx-auto px-8 md:px-12 relative z-10 -translate-y-8 md:-translate-y-12"
      >
        <motion.h1 variants={item} className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8 leading-[1.1]">
          Frankie <br />
          <span className="font-medium text-white/90">Okoth.</span>
        </motion.h1>
        
        <motion.div variants={item} className="flex flex-col gap-6">
          <div className="border-l border-[#A3E635]/30 pl-5 py-1">
            <p className="text-white/60 text-sm md:text-base tracking-widest uppercase max-w-xl leading-relaxed mb-2">
              Software Engineer
            </p>
            <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
              AI, Spatial Computing &amp; Future Systems
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
