import { Pagination } from '@/shared/interfaces';
import { ProjectHome, ProjectImageList, ProjectList } from './projects.interface';

export interface ProjectState {
  projects: ProjectList[];
  projectsHome: ProjectHome[];
  project: ProjectList | null;
  meta: Pagination | null;
  isLoading: boolean;
  error: string | null;
  statusCode: number | null;
  //TODO: Images states
  imagesProject: ProjectImageList[] | null;
  imageLoadingProject: boolean;
  imageErrorProject: string | null;
  imageStatusCodeProject: number | null;
}

export interface ProjectData {
  projects: ProjectList[];
  meta: Pagination;
}
