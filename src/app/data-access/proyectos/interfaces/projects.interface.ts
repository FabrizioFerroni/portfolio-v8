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
  imageUrl: string;
  imageFullUrl: string;
  urlProyect: string;
  urlGithub: string;
  images: ProjectImageList[];
  technologies: ProjectTechnologieList[];
  features: ProjectFeatureList[];
}

export interface ProjectHome {
  id: string;
  title: string;
  summary: string;
  technologies: ProjectTechnologieList[];
  imageUrl: string;
  imageFullUrl: string;
  type: string;
  slug: string;
  visibility: string;
  urlProyect: string;
  urlGithub: string;
  category: string;
}

export interface ProjectRelated {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  imageFullUrl: string;
  slug: string;
  visibility: string;
  category: string;
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
