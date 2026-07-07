import { PaginacionProjectQuery, PaginationProjectHomeQuery } from '@/shared/interfaces';
import { ApiResponse } from '@/shared/response';
import { BaseHttpService } from '@/shared/services';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectData, ProjectHome, ProjectList } from '../interfaces';
import { construirQueryParams } from '@/shared/functions';

@Injectable()
export class ProyectoService extends BaseHttpService {
  obtenerTodosPaginados(
    paginado: PaginacionProjectQuery
  ): Observable<HttpResponse<ApiResponse<ProjectData>>> {
    const params = construirQueryParams(paginado);
    return this.http.get<ApiResponse<ProjectData>>(`${this.apiUrl}/projects`, {
      params,
      observe: 'response',
    });
  }

  obtenerTodosHome(
    param: PaginationProjectHomeQuery
  ): Observable<HttpResponse<ApiResponse<ProjectHome[]>>> {
    const params = construirQueryParams(param);
    return this.http.get<ApiResponse<ProjectHome[]>>(`${this.apiUrl}/projects/home`, {
      params,
      observe: 'response',
    });
  }

  obtenerPorSlug(slug: string): Observable<HttpResponse<ApiResponse<ProjectList>>> {
    return this.http.get<ApiResponse<ProjectList>>(`${this.apiUrl}/projects/${slug}`, {
      observe: 'response',
    });
  }
}
