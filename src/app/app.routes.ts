import { Routes } from '@angular/router';
import {
  Home,
  Mantenimiento,
  PoliticaPrivacidad,
  Proyecto,
  Proyectos,
  TerminosCondiciones,
} from './feature';
import { NotFound } from './shared/components/fabriziodev';
import { Rutas } from './shared/utils';

export const routes: Routes = [
  {
    path: Rutas.HOME,
    pathMatch: 'full',
    component: Home,
  },
  {
    path: Rutas.POLITICA_PRIVACIDAD,
    component: PoliticaPrivacidad,
  },
  {
    path: Rutas.TERMINOS_CONDICIONES,
    component: TerminosCondiciones,
  },
  {
    path: Rutas.PROYECTOS,
    component: Proyectos,
  },
  {
    path: `${Rutas.PROYECTO}/:slug`,
    component: Proyecto,
  },
  {
    path: Rutas.MANTENIMIENTO,
    component: Mantenimiento,
  },
  {
    path: Rutas.NOT_FOUND,
    component: NotFound,
    pathMatch: 'full',
  },
];
