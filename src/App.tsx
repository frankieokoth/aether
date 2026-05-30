import { useEffect, Suspense, lazy, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { useAetherStore } from './store/aether-store';
import { Download } from 'lucide-react';
import { Magnetic } from './components/shared/Magnetic';

import { Navbar } from './components/Navbar';
import { Intro } from './components/sections/Intro';
import { Footer } from './components/Footer';

const Scene = lazy(() => import('./components/Scene'));
const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })));
const ProjectGrid = lazy(() => import('./components/sections/ProjectGrid').then(m => ({ default: m.ProjectGrid })));
const Skills = lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })));

export default function App() {
  const view = useAetherStore((s) => s.view);
  const setView = useAetherStore((s) => s.setView);
  const isScrolled = useAetherStore((s) => s.isScrolled);
  const setIsScrolled = useAetherStore((s) => s.setIsScrolled);
  const prevView = useAetherStore((s) => s.prevView);

  const mainScrollContainerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ container: mainScrollContainerRef });

  useEffect(() => {
    const container = mainScrollContainerRef.current;
    if (!container) return;
    
    const sections = ['home', 'about', 'work', 'stack', 'contact'];
    
    const handleScroll = () => {
      // 1. Update nav blur state
      setIsScrolled(container.scrollTop > 50);
      
      // 2. Track active section (Trigger point is 30% down the screen)
      const triggerPoint = container.scrollTop + container.clientHeight * 0.3;
      
      // Loop backwards to find the deepest section we've scrolled past
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= triggerPoint) {
          setView(sections[i].toUpperCase());
          break;
        }
      }
    };
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to initialize
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled, setView]);

  return (
    <div className="relative min-h-screen bg-[#050014] text-white overflow-hidden font-sans selection:bg-[#8B5CF6] selection:text-white">
      
      <Suspense fallback={<div className="fixed inset-0 bg-[#050014] z-0" />}>
        <Scene />
      </Suspense>

      <a href="#main-scroll-container" 
         className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#8B5CF6] focus:text-white">
          Skip to content
      </a>

      <motion.header 
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 pointer-events-auto transition-colors duration-300 ${
        isScrolled 
          ? 'bg-[#050014]/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-transparent'
      }`}>
        
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-[#A3E635] origin-left z-[60]"
        />
        
        <div className="max-w-7xl mx-auto px-6 md:px-16 h-16 md:h-20 flex items-center justify-between pt-[env(safe-area-inset-top)]">
          <button 
            onClick={() => {
              setView('HOME');
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`text-xl font-light capitalize transition-colors duration-300 px-2 ${view === 'HOME' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
          >
            Home
          </button>

          <div className="flex items-center gap-4 md:gap-10">
            <Navbar />
            
            <Magnetic>
              <a 
                href="/resume.pdf" 
                download 
                className="group relative hidden md:flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-light hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
              >
                <span className="relative z-10 text-base">Resume</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      <main ref={mainScrollContainerRef} className="relative z-10 h-screen overflow-y-auto overflow-x-hidden scroll-smooth pointer-events-auto pt-16 md:pt-20" id="main-scroll-container">
        <div className="pb-32">
          <section id="home" className="min-h-screen flex flex-col justify-center py-32 md:py-48 scroll-mt-20">
            <Intro />
          </section>
          
          <Suspense fallback={null}>
            <section id="about" className="pt-32 pb-16 scroll-mt-20">
              <About />
            </section>
            <section id="work" className="pt-32 pb-16 scroll-mt-20">
              <ProjectGrid />
            </section>
            <section id="stack" className="pt-32 pb-32 scroll-mt-20">
              <Skills />
            </section>
          </Suspense>
        </div>
        <Footer scrollContainerRef={mainScrollContainerRef} />
      </main>
    </div>
  );
}
