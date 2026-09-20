export type ImageVariantName = 'thumbnail' | 'medium';

export interface ProjectList {
  id: string;
  title: string;
  summary: string;
  description: string;
  publishedDate: Date | null;
  slug: string;
  visibility: string;
  category: string;
  type: string;
  urlProyect: string;
  urlGithub: string;
  images: ProjectImageList[];
  technologies: ProjectTechnologieList[];
  features: ProjectFeatureList[];
  imageVariants: Record<ImageVariantName, { url: string }>;
}

export interface ProjectHome {
  id: string;
  title: string;
  summary: string;
  technologies: ProjectTechnologieList[];
  type: string;
  slug: string;
  visibility: string;
  urlProyect: string;
  urlGithub: string;
  category: string;
  imageVariants: Record<ImageVariantName, { url: string }>;
}

export interface ProjectRelated {
  id: string;
  title: string;
  summary: string;
  slug: string;
  visibility: string;
  category: string;
  imageVariants: Record<ImageVariantName, { url: string }>;
}

export interface ProjectImageList {
  id: string;
  imageUrl: string;
  imageFullUrl: string;
  displayOrder: number;
  altText: string;
}

export interface ProjectTechnologieList {
  id: string;
  name: string;
  category: string;
}

export interface ProjectFeatureList {
  id: string;
  description: string;
  displayOrder: number;
}
