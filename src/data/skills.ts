export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'JavaScript', 'SQL']
  },
  {
    category: 'Frameworks & Web',
    items: ['Django', 'REST APIs', 'React', 'HTML / CSS']
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB']
  },
  {
    category: 'Infrastructure',
    items: ['Git', 'Docker', 'Linux', 'Google Cloud', 'CI/CD']
  }
];
