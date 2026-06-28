import { LoaderService } from '@/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, inject } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500"
      [class.opacity-0]="!loader.visible()"
      [class.pointer-events-none]="!loader.visible()"
      [class.opacity-100]="loader.visible()">
      <div class="relative">
        <div class="w-32 h-32 relative flex items-center justify-center">
          <div
            class="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>

          <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center z-10">
            <span class="text-3xl font-bold text-primary">FFD</span>
          </div>
        </div>
      </div>

      <div class="mt-8 text-lg font-medium text-muted-foreground flex items-center">
        <span class="uppercase">Cargando</span>
        <span class="flex w-12 justify-start ml-1">
          <span class="animate-bounce mx-0.5 delay-100">.</span>
          <span class="animate-bounce mx-0.5 delay-200">.</span>
          <span class="animate-bounce mx-0.5 delay-300">.</span>
        </span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class Loader {
  readonly loader = inject(LoaderService);
}
