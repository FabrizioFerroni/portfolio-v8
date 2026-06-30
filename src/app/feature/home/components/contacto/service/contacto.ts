import { BaseHttpService } from '@/shared/services';
import { Injectable } from '@angular/core';
import { SendContact } from '../interfaces';
import { Observable } from 'rxjs';
import { ApiResponse } from '@/shared/response';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class ContactoService extends BaseHttpService {
  sendContact(data: SendContact): Observable<HttpResponse<ApiResponse<string>>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/contact`, data, {
      observe: 'response',
    });
  }
}
