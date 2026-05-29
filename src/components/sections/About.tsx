import { motion } from 'motion/react';
import { transition } from '../shared/animations';

export function About() {
  const transitionProps = { duration: 1, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="relative w-full py-16 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
        className="w-full max-w-7xl mx-auto px-6 md:px-16"
      >
        <div className="flex flex-col gap-16 items-center">
          
          {/* Main Content: Massive Statement & Text */}
          <div className="w-full flex flex-col gap-12 items-center">
            <div className="flex items-center justify-center gap-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-mono">
                01 //
              </span>
              <span className="text-xl font-light text-white capitalize">
                About
              </span>
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={transitionProps}
              className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 leading-[1.1] max-w-4xl mx-auto text-center"
            >
              I engineer intelligent <br className="hidden md:block" />
              systems and <span className="italic text-white/70">immersive</span> realities.
            </motion.h2>

            <div className="flex flex-col gap-6 max-w-3xl mt-4 mx-auto text-left md:text-justify">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ ...transitionProps, delay: 0.1 }}
                className="text-base md:text-lg text-white/70 font-light leading-relaxed tracking-wide"
              >
                I’m a software engineer driven by a fascination with the future of human experience. My work and interests sit at the intersection of artificial intelligence, virtual reality, and immersive systems. These technologies go beyond utility and reshape how people perceive, interact with, and experience the digital world.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ ...transitionProps, delay: 0.15 }}
                className="text-base md:text-lg text-white/70 font-light leading-relaxed tracking-wide"
              >
                I’ve always been drawn to work that carries atmosphere and emotional weight: music that feels timeless, films that linger long after they end, design that communicates identity without explanation, and systems that feel almost invisible in their elegance. These influences shape how I think about engineering. I’m not only interested in building what works. I’m interested in building what feels right.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ ...transitionProps, delay: 0.2 }}
                className="text-base md:text-lg text-white/70 font-light leading-relaxed tracking-wide"
              >
                Beyond code, I’m interested in how intelligent systems are designed, how human perception interacts with interfaces, and how creativity and computation reinforce each other. I spend most of my time strengthening the foundations that allow me to work on more complex systems with clarity and depth.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ ...transitionProps, delay: 0.25 }}
                className="text-base md:text-lg text-white/70 font-light leading-relaxed tracking-wide"
              >
                Long term, I aim to contribute to research in artificial intelligence and immersive computing, particularly in areas that explore more intuitive, expressive, and human-centered forms of interaction.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ ...transitionProps, delay: 0.3 }}
                className="text-base md:text-lg text-white/70 font-light leading-relaxed tracking-wide"
              >
                Right now, I’m focused on becoming a stronger engineer, sharpening my understanding of computer science fundamentals, building meaningful projects, and developing the discipline required to work on complex technical systems.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ ...transitionProps, delay: 0.35 }}
                className="text-base md:text-lg text-white/70 font-light leading-relaxed tracking-wide"
              >
                I’m interested in building technology that doesn’t just perform tasks, but changes how people think and experience the world.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
