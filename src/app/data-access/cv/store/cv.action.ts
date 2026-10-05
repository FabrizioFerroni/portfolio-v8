import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CVActions = createActionGroup({
  source: 'CV',
  events: {
    //Dispatch
    'Download CV': emptyProps(),

    //Success
    'Download CV Success': props<{ filename: string }>(),

    //Failure
    'Download CV Failure': props<{ error: string; statusCode: number }>(),

    // Misc
    'Clear Error': emptyProps(),
  },
});
