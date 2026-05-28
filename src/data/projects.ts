export interface Project {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  tech: string[];
  link: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'Lemmon-714',
    desc: 'Idempotent cross-platform infrastructure deployment.',
    longDesc: 'An idempotent, cross-platform infrastructure deployment bridging Windows 11 and Ubuntu (WSL2). Engineered for high-signal AI and systems development using GNU Stow and PowerShell, guaranteeing zero environment drift and identical capabilities across isolated operating systems.',
    tech: ['PowerShell', 'Shell', 'Makefile'],
    link: 'https://github.com/frankieokoth/lemmon-714',
    images: ['/assets/project_01_bg.png']
  },
  {
    id: '02',
    title: 'Aether.OS',
    desc: 'Ethereal Brutalism portfolio architecture.',
    longDesc: 'A highly optimized, glassmorphic portfolio architecture built on React and Vite. Features a bespoke spatial navigation system, strict minimalistic design patterns, and an immersive user experience prioritizing atmosphere and monolithic typography.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    link: 'https://github.com/frankieokoth/aether',
    images: ['/assets/project_02_bg.png']
  },
  {
    id: '03',
    title: 'Sauti ya Mwananchi',
    desc: 'Autonomous multi-agent civic AI for voters.',
    longDesc: 'An autonomous, multi-agent civic AI designed specifically for Kenyan voters. Built on a hybrid RAG architecture utilizing Gemini 2.5 Flash and deterministic JSON corpora, it provides strictly neutral, hallucination-free citations of IEBC guidelines and the Constitution while guaranteeing zero-retention of PII.',
    tech: ['TypeScript', 'Gemini 2.5 Flash', 'Hybrid RAG', 'React', 'Express'],
    link: 'https://github.com/frankieokoth/sauti-ya-mwananchi',
    images: ['/assets/project_03_bg.png']
  }
];
