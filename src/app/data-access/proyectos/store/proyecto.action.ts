import { PaginacionProjectQuery, PaginationProjectHomeQuery } from '@/shared/interfaces';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ProjectData,
  ProjectHome,
  ProjectImageList,
  ProjectList,
  ProjectRelated,
} from '../interfaces';

export const ProyectoActions = createActionGroup({
  source: 'Proyectos',
  events: {
    //TODO: el dispacher
    'Get Proyectos Home': props<{ param: PaginationProjectHomeQuery }>(),
    'Get Proyectos': props<{ paginado: PaginacionProjectQuery }>(),
    'Get Proyecto by Slug': props<{ slug: string }>(),
    'Get All Technologies': emptyProps(),
    'Get Images By ProjectId': props<{ projectId: string }>(),
    'Get Related Projects By ProjectId': props<{ projectId: string }>(),
    //TODO: respuesta exitosa
    'Get Proyectos Home Success': props<{ data: ProjectHome[] }>(),
    'Get Proyectos Success': props<{ data: ProjectData }>(),
    'Get Proyecto by Slug Success': props<{ data: ProjectList }>(),
    'Get All Technologies Success': props<{ data: string[] }>(),
    'Get Images By ProjectId Success': props<{ images: ProjectImageList[] }>(),
    'Get Related Projects By ProjectId Success': props<{ data: ProjectRelated[] }>(),
    //TODO: respuesta fallida
    'Get Proyectos Home Failed': props<{ error: string; statusCode: number }>(),
    'Get Proyectos Failed': props<{
      error: string;
      statusCode: number;
      paginado?: PaginacionProjectQuery;
    }>(),
    'Get Proyecto by Slug Failed': props<{ error: string; statusCode: number }>(),
    'Get All Technologies Failed': props<{ error: string; statusCode: number }>(),
    'Get Images By ProjectId Failure': props<{ error: string; statusCode: number }>(),
    'Get Related Projects By ProjectId Failure': props<{ error: string; statusCode: number }>(),
  },
});
