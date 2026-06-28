import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [NgClass, NgIcon],
  styleUrl: './acordion.css',
  viewProviders: [provideIcons({ lucideChevronDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="border-b border-border flex flex-1 flex-col">
      <!-- Trigger -->
      <button
        type="button"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="'content-' + value()"
        [id]="'accordion-' + value()"
        (click)="toggle()"
        class="underline-none cursor-pointer flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full">
        <!-- Slot para el header (título + badge, etc.) -->
        <ng-content select="[accordionTrigger]" />

        <ng-icon
          name="lucideChevronDown"
          class="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200"
          [ngClass]="{ 'rotate-180': isOpen() }" />
      </button>

      <!-- Content con animación CSS grid -->
      <div
        role="region"
        [attr.aria-labelledby]="'accordion-' + value()"
        [id]="'content-' + value()"
        class="grid text-sm transition-all duration-200 overflow-hidden"
        [ngClass]="isOpen() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
        <div class="overflow-hidden">
          <div class="pt-0 pb-4">
            <ng-content />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Accordion {
  readonly value = input<string>('');

  readonly isOpen = signal(false);

  toggle(): void {
    this.isOpen.update(v => !v);
  }
}
