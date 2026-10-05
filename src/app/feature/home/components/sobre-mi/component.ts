import { CVActions } from '@/data-access';
import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload, lucideLoader2 } from '@ng-icons/lucide';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sobre-mi',
  imports: [NgOptimizedImage, Card, CardContent, NgIcon, ZardButtonComponent],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideDownload, lucideLoader2 })],
})
export class SobreMi implements OnInit {
  //#region injecciones
  private readonly store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private actions$ = inject(Actions);
  //#endregion

  //#region variables
  isDownloading = signal(false);
  //#endregion

  //#region inicializacion
  ngOnInit(): void {
    this.actions$
      .pipe(
        ofType(CVActions.downloadCVSuccess, CVActions.downloadCVFailure),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.isDownloading.set(false);
      });
  }
  //#endregion

  //#region functions
  onDownloadCv(): void {
    this.isDownloading.set(true);
    this.store.dispatch(CVActions.downloadCV());
  }
  //#endregion
}
