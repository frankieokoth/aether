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
    title: 'Project Alpha',
    desc: 'Coming soon.',
    longDesc: 'Detailed description coming soon. This project is currently under construction and details will be updated shortly.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    link: '#',
    images: ['https://picsum.photos/seed/alpha/600/400']
  },
  {
    id: '02',
    title: 'Project Beta',
    desc: 'Coming soon.',
    longDesc: 'Detailed description coming soon. This project is currently under construction and details will be updated shortly.',
    tech: ['Node.js', 'PostgreSQL', 'Docker'],
    link: '#',
    images: ['https://picsum.photos/seed/beta/600/400']
  },
  {
    id: '03',
    title: 'Project Gamma',
    desc: 'Coming soon.',
    longDesc: 'Detailed description coming soon. This project is currently under construction and details will be updated shortly.',
    tech: ['Python', 'FastAPI', 'Redis'],
    link: '#',
    images: ['https://picsum.photos/seed/gamma/600/400']
  },
  {
    id: '04',
    title: 'Project Delta',
    desc: 'Coming soon.',
    longDesc: 'Detailed description coming soon. This project is currently under construction and details will be updated shortly.',
    tech: ['Go', 'gRPC', 'Kubernetes'],
    link: '#',
    images: ['https://picsum.photos/seed/delta/600/400']
  }
];
