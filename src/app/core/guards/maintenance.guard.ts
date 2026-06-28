import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { SettingsService } from '../services';
import { inject } from '@angular/core';
import { Rutas } from '@/shared/utils';

export const maintenanceGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const settings = inject(SettingsService);
  const router = inject(Router);

  const isMaintenancePage = route.routeConfig?.path === `${Rutas.MANTENIMIENTO}`;

  if (settings.maintenanceMode && !isMaintenancePage) {
    return router.createUrlTree([`/${Rutas.MANTENIMIENTO}`]);
  }

  if (!settings.maintenanceMode && isMaintenancePage) {
    return router.createUrlTree(['/']);
  }

  return true;
};
