import { BaseHttpService } from '@/shared/services';
import { Injectable } from '@angular/core';
import { SendNewsletter } from '../interface';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from '@/shared/response';

@Injectable()
export class NewsletterService extends BaseHttpService {
  sendSubscriber(data: SendNewsletter): Observable<HttpResponse<ApiResponse<string>>> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/subscribers`, data, {
      observe: 'response',
    });
  }
}
