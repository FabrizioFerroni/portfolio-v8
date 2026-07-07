import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, map, of, switchMap, timer } from 'rxjs';
import { HandledError } from '@/shared/interfaces';
import { ProyectoService } from '../service';
import { ProyectoActions } from './proyecto.action';

const MIN_LOADING_TIME = 300;

export const getProyectosHome = createEffect(
  (action$ = inject(Actions), proyectoService = inject(ProyectoService)) =>
    action$.pipe(
      ofType(ProyectoActions.getProyectosHome),
      switchMap(({ param }) =>
        combineLatest([proyectoService.obtenerTodosHome(param), timer(MIN_LOADING_TIME)]).pipe(
          map(([{ body }]) => ProyectoActions.getProyectosHomeSuccess({ data: body!.data })),
          catchError((error: HandledError) => {
            return of(
              ProyectoActions.getProyectosHomeFailed({
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

export const getProyectos = createEffect(
  (action$ = inject(Actions), proyectoService = inject(ProyectoService)) =>
    action$.pipe(
      ofType(ProyectoActions.getProyectos),
      switchMap(({ paginado }) =>
        combineLatest([
          proyectoService.obtenerTodosPaginados(paginado),
          timer(MIN_LOADING_TIME),
        ]).pipe(
          map(([{ body }]) => ProyectoActions.getProyectosSuccess({ data: body!.data })),
          catchError((error: HandledError) => {
            return of(
              ProyectoActions.getProyectosFailed({
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

export const getProyectoBySlug = createEffect(
  (action$ = inject(Actions), proyectoService = inject(ProyectoService)) =>
    action$.pipe(
      ofType(ProyectoActions.getProyectoBySlug),
      switchMap(({ slug }) =>
        combineLatest([proyectoService.obtenerPorSlug(slug), timer(MIN_LOADING_TIME)]).pipe(
          map(([{ body }]) => ProyectoActions.getProyectoBySlugSuccess({ data: body!.data })),
          catchError((error: HandledError) => {
            return of(
              ProyectoActions.getProyectosFailed({
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
