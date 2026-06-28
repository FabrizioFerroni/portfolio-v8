import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideZard } from '@/shared/core/provider/providezard';
import { ReactiveFormsModule } from '@angular/forms';
import { apiKeyInterceptor, loaderInterceptor, SettingsService } from './core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideZard(),
    ReactiveFormsModule,
    provideHttpClient(withInterceptors([apiKeyInterceptor, loaderInterceptor])),
    provideAppInitializer(async () => {
      const settings = inject(SettingsService);
      await settings.loadSettings();
    }),
  ],
};
