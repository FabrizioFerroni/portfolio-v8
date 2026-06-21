import { Component, Input, inject, computed } from '@angular/core';
import { TabsContext } from './tabs.service';

@Component({
  selector: 'f-tabs-content',
  standalone: true,
  template: `
    @if (isActive()) {
      <ng-content />
    }
  `,
  host: {
    class: 'mt-2 ring-offset-background focus-visible:outline-none',
  },
})
export class TabsContentComponent {
  @Input({ required: true }) value!: string;

  private ctx = inject(TabsContext);

  isActive = computed(() => this.ctx.activeTab() === this.value);
}
