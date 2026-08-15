import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  readonly http = inject(HttpClient);
  protected readonly platformId = inject(PLATFORM_ID);

  private readonly serverApiBase = process.env['API_URL_INTERNAL'] ?? environment.apiUrl;

  readonly apiUrl = isPlatformServer(this.platformId)
    ? `${this.serverApiBase}${environment.api}`
    : environment.api;

  readonly authUrl = isPlatformServer(this.platformId)
    ? `${this.serverApiBase}${environment.auth}`
    : environment.auth;

  readonly fileUrl = isPlatformServer(this.platformId)
    ? `${this.serverApiBase}${environment.file}`
    : environment.file;

  readonly apiKey = environment.apiKey;
}
