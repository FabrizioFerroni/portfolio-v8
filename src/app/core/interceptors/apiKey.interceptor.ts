import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const isApiRequest = req.url.startsWith('/api/') || req.url.includes('/api/');

  if (!isApiRequest) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: {
      'x-api-key': environment.apiKey,
    },
    withCredentials: false,
  });

  return next(cloned);
};
