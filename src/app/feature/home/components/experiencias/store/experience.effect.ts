import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExperienceService } from '../service/experience-service';
import { ExperienceAction } from './experience.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { HandledError } from '@/shared/interfaces';

export const getExperiencesEffect = createEffect(
  (action$ = inject(Actions), experienceService = inject(ExperienceService)) =>
    action$.pipe(
      ofType(ExperienceAction.getExperience),
      switchMap(() =>
        experienceService.obtenerTodos().pipe(
          map(({ body }) => ExperienceAction.getExperienceSuccess({ data: body!.data })),
          catchError((error: HandledError) => {
            return of(
              ExperienceAction.getExperienceFailed({
                error: error.message,
                statusCode: error.statusCode,
              })
            );
          })
        )
      )
    ),
  { functional: true }
);
