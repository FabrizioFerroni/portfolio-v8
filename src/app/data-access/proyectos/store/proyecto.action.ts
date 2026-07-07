import { PaginacionProjectQuery, PaginationProjectHomeQuery } from '@/shared/interfaces';
import { createActionGroup, props } from '@ngrx/store';
import { ProjectData, ProjectHome, ProjectList } from '../interfaces';

export const ProyectoActions = createActionGroup({
  source: 'Proyectos',
  events: {
    //TODO: el dispacher
    'Get Proyectos Home': props<{ param: PaginationProjectHomeQuery }>(),
    'Get Proyectos': props<{ paginado: PaginacionProjectQuery }>(),
    'Get Proyecto by Slug': props<{ slug: string }>(),
    //TODO: respuesta exitosa
    'Get Proyectos Home Success': props<{ data: ProjectHome[] }>(),
    'Get Proyectos Success': props<{ data: ProjectData }>(),
    'Get Proyecto by Slug Success': props<{ data: ProjectList }>(),
    //TODO: respuesta fallida
    'Get Proyectos Home Failed': props<{ error: string; statusCode: number }>(),
    'Get Proyectos Failed': props<{ error: string; statusCode: number }>(),
    'Get Proyecto by Slug Failed': props<{ error: string; statusCode: number }>(),
  },
});
