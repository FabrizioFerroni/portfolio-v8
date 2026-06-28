import { Routes } from '@angular/router';
/* import {
  Home,
  Mantenimiento,
  PoliticaPrivacidad,
  Proyecto,
  Proyectos,
  TerminosCondiciones,
} from './feature';
import { NotFound } from './shared/components/fabriziodev'; */
import { Rutas } from './shared/utils';
import { maintenanceGuard } from './core';

export const routes: Routes = [
  {
    path: Rutas.HOME,
    pathMatch: 'full',
    canActivate: [maintenanceGuard],
    loadComponent: () => import('./feature').then(m => m.Home),
  },
  {
    path: Rutas.POLITICA_PRIVACIDAD,
    canActivate: [maintenanceGuard],
    loadComponent: () => import('./feature').then(m => m.PoliticaPrivacidad),
  },
  {
    path: Rutas.TERMINOS_CONDICIONES,
    canActivate: [maintenanceGuard],
    loadComponent: () => import('./feature').then(m => m.TerminosCondiciones),
  },
  {
    path: Rutas.PROYECTOS,
    canActivate: [maintenanceGuard],
    loadComponent: () => import('./feature').then(m => m.Proyectos),
  },
  {
    path: `${Rutas.PROYECTO}/:slug`,
    canActivate: [maintenanceGuard],
    loadComponent: () => import('./feature').then(m => m.Proyecto),
  },
  {
    path: Rutas.MANTENIMIENTO,
    canActivate: [maintenanceGuard],
    loadComponent: () => import('./feature').then(m => m.Mantenimiento),
  },
  {
    path: Rutas.NOT_FOUND,
    canActivate: [maintenanceGuard],
    loadComponent: () => import('./shared/components/fabriziodev').then(m => m.NotFound),
    pathMatch: 'full',
  },
];
