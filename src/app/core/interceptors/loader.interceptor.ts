import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LoaderService } from '../services';
import { inject, PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const loaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  if (req.method !== 'GET') {
    return next(req);
  }

  const excludedExactPaths = ['/api/projects'];
  const excludedPatternPaths = [
    /^\/api\/images\/[^/]+$/,
    /^\/api\/projects\/related\/[^/]+$/,
    /^\/api\/projects\/[^/]+$/,
  ];

  const pathname = new URL(req.url, 'http://localhost').pathname;

  const isExcluded =
    excludedExactPaths.includes(pathname) ||
    excludedPatternPaths.some(pattern => pattern.test(pathname));

  if (isExcluded) {
    return next(req);
  }

  const loader = inject(LoaderService);

  loader.show();

  return next(req).pipe(
    finalize(() => {
      loader.hide();
    })
  );
};
