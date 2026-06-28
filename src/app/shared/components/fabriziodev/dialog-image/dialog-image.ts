import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ImageDialogData } from './dialog-image.model';

@Component({
  selector: 'app-image-dialog',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
        (click)="handleClose()"
        aria-hidden="true"></div>

      <!-- Panel -->
      <div
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title()"
        class="
          fixed left-1/2 top-1/2 z-50
          w-[calc(100%-2rem)] max-w-4xl
          -translate-x-1/2 -translate-y-1/2
          grid gap-4
          border border-border
          bg-background
          p-6 shadow-lg
          rounded-lg
          animate-in fade-in-0 zoom-in-95 
          duration-200
        ">
        <!-- Close button (X esquina) -->
        <button
          type="button"
          class="
            absolute right-4 top-4
            rounded-sm opacity-70
            ring-offset-background
            transition-opacity
            hover:opacity-100
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          "
          (click)="handleClose()"
          aria-label="Cerrar">
          <!-- X icon inline SVG para no depender de lucide-angular aquí -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span class="sr-only">Cerrar</span>
        </button>

        <!-- Header -->
        <div class="flex flex-col space-y-1.5 text-center sm:text-left pr-8">
          <h2 class="text-lg font-semibold leading-none tracking-tight">
            {{ title() }}
          </h2>
          @if (image()?.description) {
            <p class="text-sm text-muted-foreground">
              {{ image()!.description }}
            </p>
          }
        </div>

        <!-- Imagen -->
        <div class="relative aspect-video w-full overflow-hidden rounded-lg">
          @if (image() && isBrowser) {
            <img
              [src]="image()!.url || '/placeholder.svg'"
              [alt]="image()!.description || 'Imagen del proyecto'"
              class="object-contain w-full h-full" />
          }
        </div>

        <!-- Footer -->
        <div class="flex justify-end">
          <button
            type="button"
            class="
              inline-flex items-center justify-center gap-2
              rounded-md border border-input
              bg-background
              px-4 py-2
              text-sm font-medium
              shadow-sm
              hover:bg-accent hover:text-accent-foreground
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
              transition-colors
            "
            (click)="handleClose()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Cerrar
          </button>
        </div>
      </div>
    }
  `,
})
export class ImageDialog {
  // Inputs
  open = input.required<boolean>();
  title = input.required<string>();
  image = input<ImageDialogData | null>(null);

  // Outputs
  closed = output<void>();

  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  handleClose(): void {
    this.closed.emit();
  }
}
