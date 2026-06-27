import { Routes } from '@angular/router';
import { Home } from './feature';
import { NotFound } from './shared/components/fabriziodev';
import { Rutas } from './shared/utils';
import { PoliticaPrivacidad } from './feature/politica-privacidad';

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
    path: Rutas.NOT_FOUND,
    component: NotFound,
    pathMatch: 'full',
  },
];
