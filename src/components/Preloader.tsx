import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[10000] bg-bg flex flex-col items-center justify-center p-8"
    >
      <div className="relative w-full max-w-md flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-bold tracking-tighter"
          >
            AETHER.
          </motion.h1>
          <span className="text-xs font-display tracking-[0.2em] text-accent">
            {progress}%
          </span>
        </div>
        
        <div className="h-[1px] w-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="h-full w-full bg-accent origin-left"
          />
        </div>
        
        <div className="flex justify-between">
          <span className="text-[10px] font-display tracking-[0.3em] text-white/20 uppercase">
            Initializing Experience
          </span>
          <span className="text-[10px] font-display tracking-[0.3em] text-white/20 uppercase">
            Gravity: 0.0G
          </span>
        </div>
      </div>
    </motion.div>
  );
}
