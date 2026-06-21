import { Injectable, signal } from '@angular/core';

@Injectable()
export class TabsContext {
  readonly activeTab = signal<string>('');

  setActive(value: string) {
    this.activeTab.set(value);
  }
}
