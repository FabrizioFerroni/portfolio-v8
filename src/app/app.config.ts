import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideZard } from '@/shared/core/provider/providezard';
import { ReactiveFormsModule } from '@angular/forms';
import {
  apiKeyInterceptor,
  errorHandlerInterceptor,
  loaderInterceptor,
  SettingsService,
} from './core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { contactConfig, experienceConfig, newsletterConfig } from './feature/home/components';
import { proyectosConfig } from './data-access';

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
    provideHttpClient(
      withInterceptors([apiKeyInterceptor, errorHandlerInterceptor, loaderInterceptor]),
      withFetch()
    ),
    provideAppInitializer(async () => {
      const settings = inject(SettingsService);
      await settings.loadSettings();
    }),
    provideStore({}),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75,
      connectInZone: true,
    }),
    ...contactConfig,
    ...newsletterConfig,
    ...experienceConfig,
    ...proyectosConfig,
  ],
};
