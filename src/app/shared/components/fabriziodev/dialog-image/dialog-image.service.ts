import {
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ImageDialogData } from './dialog-image.model';
import { ImageDialog } from './dialog-image';

@Injectable({ providedIn: 'root' })
export class ImageDialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private platformId = inject(PLATFORM_ID);
  private dialogRef: ReturnType<typeof createComponent<ImageDialog>> | null = null;

  open(title: string, image: ImageDialogData): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.dialogRef) this.close(); // evitar duplicados

    const ref = createComponent(ImageDialog, {
      environmentInjector: this.injector,
    });

    // Setear inputs
    ref.setInput('open', true);
    ref.setInput('title', title);
    ref.setInput('image', image);

    // Escuchar el output "closed"
    ref.instance.closed.subscribe(() => this.close());

    // Adjuntar al árbol de change detection y al DOM
    this.appRef.attachView(ref.hostView);
    document.body.appendChild(ref.location.nativeElement);

    this.dialogRef = ref;
  }

  close(): void {
    if (!this.dialogRef) return;
    this.appRef.detachView(this.dialogRef.hostView);
    this.dialogRef.destroy();
    this.dialogRef = null;
  }
}
