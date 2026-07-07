import { EnvironmentProviders, Provider } from '@angular/core';
import { ProyectoService } from './service';
import { provideState } from '@ngrx/store';
import { projectFeature, proyectoEffect } from './store';
import { provideEffects } from '@ngrx/effects';

export const proyectosConfig: (Provider | EnvironmentProviders)[] = [
  ProyectoService,
  provideState(projectFeature),
  provideEffects(proyectoEffect),
];
