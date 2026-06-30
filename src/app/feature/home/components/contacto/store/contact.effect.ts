import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HandledError } from '@/shared/interfaces/error-response.interface';
import { ContactoService } from '../service';
import { ContactoAction } from './contact.action';

export const sendContactEffect = createEffect(
  (actions$ = inject(Actions), contactService = inject(ContactoService)) =>
    actions$.pipe(
      ofType(ContactoAction.sendContact),
      switchMap(({ data }) =>
        contactService.sendContact(data).pipe(
          map(({ body }) =>
            ContactoAction.sendContactSuccess({ message: body!.data, statusCode: body!.statusCode })
          ),
          catchError((error: HandledError) => {
            return of(
              ContactoAction.sendContactFailed({
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
