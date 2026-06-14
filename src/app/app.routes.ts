import { Routes } from '@angular/router';
import { Home } from './feature';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
];
