import { Component, Input, inject, computed } from '@angular/core';
import { TabsContext } from './tabs.service';

@Component({
  selector: 'f-tabs-trigger',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'hostClass()',
    '(click)': 'ctx.setActive(value)',
  },
})
export class TabsTriggerComponent {
  @Input({ required: true }) value!: string;

  ctx = inject(TabsContext);

  hostClass = computed(() => {
    const isActive = this.ctx.activeTab() === this.value;
    return [
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium',
      'ring-offset-background transition-all cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      isActive ? 'bg-background text-foreground shadow-sm' : 'hover:bg-background/50',
    ].join(' ');
  });
}
