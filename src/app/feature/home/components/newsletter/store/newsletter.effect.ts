import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NewsletterService } from '../service';
import { inject } from '@angular/core';
import { NewsletterAction } from './newsletter.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { HandledError } from '@/shared/interfaces';

export const sendSubscriberEffect = createEffect(
  (actions$ = inject(Actions), newsletterService = inject(NewsletterService)) =>
    actions$.pipe(
      ofType(NewsletterAction.sendSubscriber),
      switchMap(({ data }) =>
        newsletterService.sendSubscriber(data).pipe(
          map(({ body }) =>
            NewsletterAction.sendSubscriberSuccess({
              message: body!.data,
              statusCode: body!.statusCode,
            })
          ),
          catchError((error: HandledError) => {
            return of(
              NewsletterAction.sendSubscriberFailed({
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
