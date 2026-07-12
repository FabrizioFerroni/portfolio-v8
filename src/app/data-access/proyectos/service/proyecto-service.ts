import { PaginacionProjectQuery, PaginationProjectHomeQuery } from '@/shared/interfaces';
import { ApiResponse } from '@/shared/response';
import { BaseHttpService } from '@/shared/services';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProjectData,
  ProjectHome,
  ProjectImageList,
  ProjectList,
  ProjectRelated,
} from '../interfaces';
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

  obtenerTodasLasTecnologias(): Observable<HttpResponse<ApiResponse<string[]>>> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/project-technologies`, {
      observe: 'response',
    });
  }

  obtenerImagenesPorProjectId(
    projectId: string
  ): Observable<HttpResponse<ApiResponse<ProjectImageList[]>>> {
    return this.http.get<ApiResponse<ProjectImageList[]>>(`${this.apiUrl}/images/${projectId}`, {
      observe: 'response',
    });
  }

  obtenerRelatedProjectsPorProjectId(
    projectId: string
  ): Observable<HttpResponse<ApiResponse<ProjectRelated[]>>> {
    return this.http.get<ApiResponse<ProjectRelated[]>>(
      `${this.apiUrl}/projects/related/${projectId}`,
      {
        observe: 'response',
      }
    );
  }
}
