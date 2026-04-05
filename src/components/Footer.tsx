import { motion } from 'motion/react';
import { Mail, Github, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: 'mailto:hello@aether.design' },
    { icon: Github, href: 'https://github.com' },
    { icon: Twitter, href: 'https://twitter.com' },
    { icon: Instagram, href: 'https://instagram.com' },
  ];

  return (
    <footer id="contact" className="relative z-10 px-8 py-32 border-t border-white/5 bg-bg/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="flex flex-col gap-8 max-w-lg">
          <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter uppercase leading-[0.85]">
            LET'S <br />
            <span className="text-accent text-glow">COLLIDE.</span>
          </h2>
          <p className="text-white/40 font-light leading-relaxed">
            Interested in starting a new project or just want to say hello? 
            My inbox is always open for creative collaborations.
          </p>
          
          <div className="flex gap-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                whileHover={{ y: -5, color: '#00f2ff' }}
                className="text-white/40 transition-colors"
              >
                <link.icon size={24} strokeWidth={1} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-12 text-right">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-display tracking-[0.3em] text-accent uppercase">
              Location
            </span>
            <p className="text-xl font-display font-medium">LONDON, UK</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-display tracking-[0.3em] text-accent uppercase">
              Current Time
            </span>
            <p className="text-xl font-display font-medium">
              {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} GMT
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[10px] font-display tracking-[0.2em] text-white/20 uppercase">
          © 2026 AETHER DIGITAL. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[10px] font-display tracking-[0.2em] text-white/20 uppercase">
          DESIGNED BY AETHER.
        </span>
      </div>
    </footer>
  );
}
