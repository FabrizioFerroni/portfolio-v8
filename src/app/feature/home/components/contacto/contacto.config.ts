import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { ContactoService } from './service';
import { contactEffects, contactFeature } from './store';
import { provideEffects } from '@ngrx/effects';

export const contactConfig: (Provider | EnvironmentProviders)[] = [
  ContactoService,
  provideState(contactFeature),
  provideEffects(contactEffects),
];
