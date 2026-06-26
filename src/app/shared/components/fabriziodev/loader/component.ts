import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  input,
  output,
  signal,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      [class.opacity-0]="!isLoading()"
      [class.pointer-events-none]="!isLoading()"
      [class.opacity-100]="isLoading()">
      <div class="relative">
        <!-- Spinner exterior -->
        <div
          class="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>

        <!-- Iniciales en el centro -->
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-2xl font-bold text-primary">FFD</span>
        </div>
      </div>

      <p class="mt-6 text-lg font-medium text-muted-foreground">Cargando...</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Loader implements OnInit {
  readonly duration = input<number>(2500);
  readonly loadingComplete = output<void>();

  readonly isLoading = signal(true);
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
      if (!this.isBrowser) return;
      document.documentElement.style.overflow = '';
      this.loadingComplete.emit();
    }, this.duration());
  }
}
