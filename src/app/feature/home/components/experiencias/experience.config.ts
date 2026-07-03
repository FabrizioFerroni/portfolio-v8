import { EnvironmentProviders, Provider } from '@angular/core';
import { experienceEffect, experienceFeature } from './store';
import { provideState } from '@ngrx/store';
import { ExperienceService } from './service/experience-service';
import { provideEffects } from '@ngrx/effects';

export const experienceConfig: (Provider | EnvironmentProviders)[] = [
  ExperienceService,
  provideState(experienceFeature),
  provideEffects(experienceEffect),
];
