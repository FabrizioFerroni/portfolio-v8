import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ExperienceData } from '../interfaces';

export const ExperienceAction = createActionGroup({
  source: 'Experiences',
  events: {
    'Get Experience': emptyProps(),
    'Get Experience Success': props<{ data: ExperienceData[] }>(),
    'Get Experience Failed': props<{ error: string; statusCode: number }>(),
  },
});
