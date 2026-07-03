import { createFeature, createReducer, on } from '@ngrx/store';
import { ExperienceState } from '../interfaces';
import { ExperienceAction } from './experience.action';

const initialState: ExperienceState = {
  experiences: [],
  isLoading: false,
  error: null,
  statusCode: null,
};

export const experienceFeature = createFeature({
  name: 'experiences',
  reducer: createReducer(
    initialState,

    on(ExperienceAction.getExperience, state => ({
      ...state,
      experiences: [],
      isLoading: true,
      error: null,
      statusCode: null,
    })),

    on(ExperienceAction.getExperienceSuccess, (state, { data }) => ({
      ...state,
      experiences: data,
      isLoading: false,
      error: null,
      statusCode: 200,
    })),

    on(ExperienceAction.getExperienceFailed, (state, { error, statusCode }) => ({
      ...state,
      error,
      statusCode,
      isLoading: false,
      experiences: [],
    }))
  ),
});
