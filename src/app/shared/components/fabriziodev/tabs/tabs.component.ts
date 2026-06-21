import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TabsContext } from './tabs.service';

@Component({
  selector: 'f-tabs',
  standalone: true,
  template: `<ng-content />`,
  providers: [TabsContext], // ← instancia nueva por cada <f-tabs>
  host: { class: 'block' },
})
export class TabsComponent implements OnChanges {
  @Input() value = '';

  private ctx = inject(TabsContext);

  /* ngOnInit() {
    this.ctx.setActive(this.value);
  } */

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.ctx.setActive(changes['value'].currentValue);
    }
  }
}
