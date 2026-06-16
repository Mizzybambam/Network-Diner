export interface Project {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface Socials {
  twitter?: string;
  github?: string;
  linkedin?: string;
  dribbble?: string;
}

export interface Freelancer {
  id: string;
  name: string;
  skill: string;
  categoryId: string;
  rating: number;
  rate: number;
  availability: string;
  avatar: string;
  bio: string;
  skills: string[];
  portfolioUrl: string;
  socials: Socials;
  projects: Project[];
}

export interface Region {
  id: string;
  name: string;
  description: string;
  color: string;
}
