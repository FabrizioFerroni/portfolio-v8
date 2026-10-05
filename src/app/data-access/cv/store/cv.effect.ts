import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CVService } from '../service';
import { CVActions } from './cv.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HandledError } from '@/shared/interfaces';

function triggerBrowserSave(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export const downloadCv = createEffect(
  (actions$ = inject(Actions), cvService = inject(CVService)) =>
    actions$.pipe(
      ofType(CVActions.downloadCV),
      switchMap(() =>
        cvService.downloadCv().pipe(
          tap(({ blob, filename }) => triggerBrowserSave(blob, filename)),
          map(({ filename }) => CVActions.downloadCVSuccess({ filename })),
          catchError((error: HandledError) =>
            of(
              CVActions.downloadCVFailure({
                error: error.message,
                statusCode: error.statusCode,
              })
            )
          )
        )
      )
    ),
  { functional: true }
);
