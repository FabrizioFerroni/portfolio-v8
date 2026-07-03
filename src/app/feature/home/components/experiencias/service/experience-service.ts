import { ApiResponse } from '@/shared/response';
import { BaseHttpService } from '@/shared/services';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienceData } from '../interfaces';

@Injectable()
export class ExperienceService extends BaseHttpService {
  obtenerTodos(): Observable<HttpResponse<ApiResponse<ExperienceData[]>>> {
    return this.http.get<ApiResponse<ExperienceData[]>>(`${this.apiUrl}/experiences/all`, {
      observe: 'response',
    });
  }
}
