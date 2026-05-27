import { useEffect, Suspense, lazy, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { useAetherStore } from './store/aether-store';

import { Navbar } from './components/Navbar';
import { Intro } from './components/sections/Intro';
import { Footer } from './components/Footer';

const Scene = lazy(() => import('./components/Scene'));
const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })));
const ProjectGrid = lazy(() => import('./components/sections/ProjectGrid').then(m => ({ default: m.ProjectGrid })));
const Skills = lazy(() => import('./components/sections/Skills').then(m => ({ default: m.Skills })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));

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
    
    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 50);
    };
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [setIsScrolled]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setView(entry.target.id.toUpperCase());
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['home', 'about', 'work', 'stack', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setView]);

  return (
    <div className="relative min-h-screen bg-[#050014] text-white overflow-hidden font-sans selection:bg-[#8B5CF6] selection:text-white">
      
      <Suspense fallback={<div className="fixed inset-0 bg-[#050014] z-0" />}>
        <Scene />
      </Suspense>

      <a href="#main-scroll-container" 
         className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#8B5CF6] focus:text-white">
          Skip to content
      </a>

      <header className={`fixed top-0 left-0 w-full z-50 pointer-events-auto transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050014]/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
        
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-[#00FF41] origin-left z-[60]"
        />
        
        <div className="max-w-7xl mx-auto px-8 md:px-16 h-20 flex items-center justify-between">
          <button 
            onClick={() => {
              setView('HOME');
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`text-xl font-light capitalize transition-colors duration-300 px-2 ${view === 'HOME' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
          >
            Home
          </button>

          <Navbar />
        </div>
      </header>

      <main ref={mainScrollContainerRef} className="relative z-10 h-screen overflow-y-auto overflow-x-hidden scroll-smooth pointer-events-auto pt-20" id="main-scroll-container">
        <div className="pb-32">
          <section id="home" className="min-h-screen flex flex-col justify-center py-32 md:py-48 scroll-mt-20">
            <Intro />
          </section>
          
          <Suspense fallback={null}>
            <section id="about" className="min-h-screen flex flex-col justify-center py-32 md:py-48 scroll-mt-20">
              <About />
            </section>
            <section id="work" className="min-h-screen flex flex-col justify-center py-32 md:py-48 scroll-mt-20">
              <ProjectGrid />
            </section>
            <section id="stack" className="min-h-screen flex flex-col justify-center py-32 md:py-48 scroll-mt-20">
              <Skills />
            </section>
            <section id="contact" className="min-h-screen flex flex-col justify-center py-32 md:py-48 scroll-mt-20">
              <Contact onBack={() => {
                setView(prevView);
                document.getElementById(prevView.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }} />
            </section>
          </Suspense>
        </div>
        <Footer />
      </main>
    </div>
  );
}
