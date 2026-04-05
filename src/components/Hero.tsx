import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-block px-4 py-1 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm"
        >
          <span className="text-[10px] font-display tracking-[0.3em] text-accent uppercase">
            Digital Experience Designer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12vw] md:text-[10vw] font-display font-bold leading-[0.85] tracking-tighter uppercase"
        >
          CREATING <br />
          <span className="text-accent text-glow">UNSEEN</span> <br />
          REALITIES.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <p className="max-w-md text-sm md:text-base text-white/50 font-light leading-relaxed">
            Exploring the intersection of art, physics, and code to craft 
            immersive digital landscapes that defy gravity.
          </p>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-8 text-accent"
          >
            <ArrowDownRight size={32} strokeWidth={1} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-20px", "20px"],
              opacity: [0, 0.2, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute w-24 h-24 border border-white/10 rounded-full blur-sm"
          />
        ))}
      </div>
    </section>
  );
}
