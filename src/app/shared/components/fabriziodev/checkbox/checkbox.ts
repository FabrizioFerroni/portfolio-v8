import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [NgClass, NgIcon],
  viewProviders: [provideIcons({ lucideCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      type="button"
      role="checkbox"
      [attr.aria-checked]="checked()"
      [attr.aria-labelledby]="labelId()"
      (click)="toggle()"
      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary cursor-pointer
             ring-offset-background transition-colors
             focus-visible:outline-none focus-visible:ring-2
             focus-visible:ring-ring focus-visible:ring-offset-2
             disabled:cursor-not-allowed disabled:opacity-50"
      [ngClass]="checked() ? 'bg-primary text-primary-foreground' : 'bg-transparent'">
      @if (checked()) {
        <ng-icon name="lucideCheck" class="flex items-center justify-center h-4 w-4" />
      }
    </button>
  `,
})
export class Checkbox {
  readonly checked = input<boolean>(false);
  readonly labelId = input<string>('');

  readonly checkedChange = output<boolean>();

  toggle(): void {
    this.checkedChange.emit(!this.checked());
  }
}
