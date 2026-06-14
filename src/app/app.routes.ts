import { Routes } from '@angular/router';
import { App } from './app';
import { Home } from './feature';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
];
