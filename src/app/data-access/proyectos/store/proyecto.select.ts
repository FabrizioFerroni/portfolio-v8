import { projectFeature } from './proyecto.reducer';

// TODO: Estos selectors son para el get de projects
export const selectProjects = projectFeature.selectProjects;
export const selectProjectHome = projectFeature.selectProjectsHome;
export const selectProject = projectFeature.selectProject;
export const loadingProject = projectFeature.selectIsLoading;
export const errorProject = projectFeature.selectError;
export const paginationMeta = projectFeature.selectMeta;
export const statusCodeProject = projectFeature.selectStatusCode;
