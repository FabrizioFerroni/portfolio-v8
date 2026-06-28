import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Event as RouterEvent,
  Router,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);

  private readonly _visible = signal(true);
  readonly visible = this._visible.asReadonly();

  private activeRequests = 0;
  private isNavigating = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.isNavigating = true;
          this.update();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isNavigating = false;
          this.update();
        }
      });
    }
  }

  show(): void {
    this.zone.run(() => {
      this.activeRequests++;
      this.update();
    });
  }

  hide(): void {
    this.zone.run(() => {
      if (this.activeRequests > 0) this.activeRequests--;
      this.update();
    });
  }

  private update(): void {
    const shouldShow = this.activeRequests > 0 || this.isNavigating;
    this._visible.set(shouldShow);

    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.style.overflow = shouldShow ? 'hidden' : '';
    }
  }
}
