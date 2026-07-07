import { projectFeature } from './proyecto.reducer';

export const selectProjects = projectFeature.selectProjects;
export const selectProjectHome = projectFeature.selectProjectsHome;
export const selectProject = projectFeature.selectProject;
export const loadingProject = projectFeature.selectIsLoading;
export const errorProject = projectFeature.selectError;
export const paginationMeta = projectFeature.selectMeta;
export const statusCodeProject = projectFeature.selectStatusCode;
