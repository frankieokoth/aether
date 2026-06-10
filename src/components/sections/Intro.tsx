import { motion } from 'motion/react';

export function Intro() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const charVariant = {
    hidden: { y: "100%", rotateX: -90, opacity: 0 },
    show: { 
      y: 0, 
      rotateX: 0, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 14, mass: 1 } 
    }
  };

  const slowDrift = {
    hidden: { opacity: 0, scale: 1.05 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 2.0, 
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.6
      } 
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.8 } 
    }
  };

  const name1 = "Frankie".split("");
  const name2 = "Okoth.".split("");

  return (
    <div className="relative w-full flex items-center justify-center perspective-[1000px]">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-7xl mx-auto px-6 md:px-16 relative z-10 -mt-20 md:-mt-32"
      >
        <div className="flex flex-col md:flex-row items-center md:items-center justify-center gap-16 md:gap-24 lg:gap-40 w-full">
          
          {/* Left Column: Typography */}
          <div className="flex flex-col items-start justify-center mt-12 md:mt-0 z-20 shrink-0">
            <div className="flex flex-col mb-6 -ml-1">
              
              {/* Word 1 */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9] flex overflow-hidden pb-2">
                {name1.map((char, index) => (
                  <motion.span 
                    key={index} 
                    variants={charVariant} 
                    className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
              
              {/* Word 2 */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9] flex overflow-hidden pb-2 -mt-2">
                {name2.map((char, index) => (
                  <motion.span 
                    key={index} 
                    variants={charVariant} 
                    className={`${char === '.' ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70'} inline-block origin-bottom`}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

            </div>
            
            <motion.div variants={fadeUp} className="flex flex-col gap-3 md:gap-4 mt-2">
              <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-white/90">
                Software Engineer.
              </p>
              <p className="text-base md:text-lg font-light leading-relaxed text-white/60 max-w-md">
                Architecting high-performance backend systems, AI integrations, and spatial computing interfaces. Building reliable, uncompromising software.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Massive Portrait */}
          <motion.div 
            variants={slowDrift}
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
            <motion.div variants={fadeUp} className="absolute -bottom-2 -left-2 w-12 h-12 border-b border-l border-[#A3E635]/50 z-0 pointer-events-none"></motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
