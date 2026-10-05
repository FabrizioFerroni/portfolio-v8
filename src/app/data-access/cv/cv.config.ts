import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CVService } from './service';
import { cvEffect, cvFeature } from './store';

export const cvConfig: (Provider | EnvironmentProviders)[] = [
  CVService,
  provideState(cvFeature),
  provideEffects(cvEffect),
];
