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

  return (
    <div className="relative w-full flex items-center justify-center">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-7xl mx-auto px-6 md:px-16 relative z-10 -mt-20 md:-mt-32"
      >
        <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-16 md:gap-24 lg:gap-40 w-full">
          
          {/* Left Column: Typography */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start justify-center mt-12 md:mt-0 z-20 shrink-0"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 leading-[1.0] mb-6 -ml-1">
              Frankie<br/>Okoth<span className="text-white">.</span>
            </h1>
            
            <div className="flex flex-col gap-3 md:gap-4 mt-2">
              <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-white/90">
                Software Engineer.
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed text-white/60 max-w-md">
                Architecting high-performance backend systems, AI integrations, and spatial computing interfaces. Building reliable, uncompromising software.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Option B - Massive Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-fit max-w-[90%] md:max-w-[50%] lg:max-w-[45%] relative border border-white/5 p-2 bg-white/[0.02] backdrop-blur-xl group z-10 flex-shrink-0 rounded-2xl"
          >
            <div className="relative overflow-hidden flex justify-center w-full h-full rounded-xl">
              <div className="absolute inset-0 bg-[#050014] opacity-30 z-10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-10 pointer-events-none"></div>
              <img 
                src="/profile.jpeg" 
                alt="Frankie Okoth - System Architect" 
                className="block w-auto h-auto max-h-[75vh] max-w-full object-contain grayscale contrast-125 transition-transform duration-1000 ease-out relative z-0"
              />
              
              {/* Analog Film Grain */}
              <div 
                className="absolute inset-0 z-20 opacity-[0.15] mix-blend-overlay pointer-events-none" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
              ></div>
              
            </div>
            {/* Structural accent */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b border-l border-[#A3E635]/50 z-0 pointer-events-none"></div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
