import { Component } from '@angular/core';

@Component({
  selector: 'f-tabs-list',
  standalone: true,
  template: `<ng-content />`,
  host: {
    class:
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  },
})
export class TabsListComponent {}
