import { experienceFeature } from './experience.reducer';

export const sendingExperience = experienceFeature.selectIsLoading;
export const errorExperience = experienceFeature.selectError;
export const statusCodeExperience = experienceFeature.selectStatusCode;
export const selectExperiences = experienceFeature.selectExperiences;
