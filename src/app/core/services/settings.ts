import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Settings } from '../interfaces';
import { BaseHttpService } from '@/shared/services';
import { ApiResponse } from '@/shared/response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SettingsService extends BaseHttpService {
  private readonly _settings = signal<Settings | null>(null);
  readonly settings = this._settings.asReadonly();
  private readonly platformId = inject(PLATFORM_ID);

  async loadSettings(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const headers = new HttpHeaders({
      observer: 'response',
    });

    const response = await firstValueFrom(
      this.http.get<ApiResponse<Settings>>(`${this.apiUrl}/setting`, { headers })
    );

    this._settings.set(response.data);
  }

  get maintenanceMode(): boolean {
    return this._settings()?.maintenanceMode ?? false;
  }
}
