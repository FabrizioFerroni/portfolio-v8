import { EnvironmentProviders, Provider } from '@angular/core';
import { NewsletterService } from './service';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { newsletterEffect, newsletterFeature } from './store';

export const newsletterConfig: (Provider | EnvironmentProviders)[] = [
  NewsletterService,
  provideState(newsletterFeature),
  provideEffects(newsletterEffect),
];
