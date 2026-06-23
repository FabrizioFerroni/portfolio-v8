import { Routes } from '@angular/router';
import { Home } from './feature';
import { NotFound } from './shared/components/fabriziodev';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
  {
    path: '**',
    component: NotFound,
    pathMatch: 'full',
  },
];
