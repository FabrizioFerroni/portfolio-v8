import { projectFeature } from './proyecto.reducer';

export const selectProjects = projectFeature.selectProjects;
export const selectProjectHome = projectFeature.selectProjectsHome;
export const selectProject = projectFeature.selectProject;
export const loadingProject = projectFeature.selectIsLoading;
export const loadingMoreProject = projectFeature.selectIsLoadingMore;
export const errorProject = projectFeature.selectError;
export const paginationMeta = projectFeature.selectMeta;
export const statusCodeProject = projectFeature.selectStatusCode;
export const selectAllTechnologies = projectFeature.selectAllTechnologies;

//TODO: Estos selectors son para obtener las imagenes
export const imagesSelectedProject = projectFeature.selectImagesProject;
export const imageLoadingProject = projectFeature.selectImageLoadingProject;
export const imageErrorProject = projectFeature.selectImageErrorProject;
export const imageStatusCodeProject = projectFeature.selectImageStatusCodeProject;

//TODO: Estos selectors son para obtener los proyectos relacionados
export const relatedsSelectedProject = projectFeature.selectRelatedProjects;
export const relatedLoadingProject = projectFeature.selectIsLoadingRelatedProject;
export const relatedErrorProject = projectFeature.selectRelatedErrorProject;
export const relatedStatusCodeProject = projectFeature.selectRelatedStatusCodeProject;
