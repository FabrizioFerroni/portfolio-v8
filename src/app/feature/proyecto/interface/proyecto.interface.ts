export interface ProjectGalleryItem {
  url: string;
  description: string;
}

export interface ProjectTechnologies {
  frontend: string[];
  backend: string[];
  devops: string[];
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'mobile' | 'devops';

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: ProjectGalleryItem[];
  tags: string[];
  category: ProjectCategory;
  github: string;
  demo: string;
  private: boolean;
  features: string[];
  challenges: string[];
  technologies: ProjectTechnologies;
  testimonial?: ProjectTestimonial; // opcional si no todos los proyectos lo tienen
}
