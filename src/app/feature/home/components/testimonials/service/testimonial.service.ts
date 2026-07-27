import { ApiResponse } from '@/shared/response';
import { BaseHttpService } from '@/shared/services';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestimonialList } from '../interface';

@Injectable()
export class TestimonialsService extends BaseHttpService {
  getTestimonials(): Observable<HttpResponse<ApiResponse<TestimonialList[]>>> {
    return this.http.get<ApiResponse<TestimonialList[]>>(`${this.apiUrl}/testimonials`, {
      observe: 'response',
    });
  }
}
