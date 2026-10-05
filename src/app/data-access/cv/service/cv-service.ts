import { BaseHttpService } from '@/shared/services';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class CVService extends BaseHttpService {
  downloadCv(): Observable<{ blob: Blob; filename: string }> {
    return this.http
      .get(`${this.apiUrl}/cv/download`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        map(response => ({
          blob: response.body as Blob,
          filename: this.extractFilename(response.headers.get('content-disposition')),
        }))
      );
  }

  private extractFilename(header: string | null): string {
    const match = header?.match(/filename="?(.+?)"?$/);
    return match?.[1] ?? 'cv.pdf';
  }
}
