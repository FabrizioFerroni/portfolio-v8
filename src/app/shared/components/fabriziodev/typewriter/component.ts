import { Component, OnDestroy, PLATFORM_ID, inject, signal, effect, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-typewriter',
  standalone: true,
  template: `
    <h2 class="text-2xl md:text-4xl font-semibold mb-6 h-12">
      <span class="text-muted-foreground">{{ displayText() }}</span>
      <span class="animate-blink">|</span>
    </h2>
  `,
  styleUrl: './component.css',
})
export class Typewriter implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  private readonly phrases = [
    'Desarrollador Fullstack',
    'Desarrollador Frontend',
    'Desarrollador Backend',
    'DevOps',
    'Soporte IT',
  ];

  displayText = signal('');
  private currentPhraseIndex = signal(0);
  private isDeleting = signal(false);

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        this.scheduleNext();
      });
    }
  }

  private scheduleNext(): void {
    if (this.timer) clearTimeout(this.timer);

    const phrase = this.phrases[this.currentPhraseIndex()];
    const current = this.displayText();
    const deleting = this.isDeleting();
    const speed = !deleting ? (current === phrase ? 1500 : 100) : 50;

    this.ngZone.runOutsideAngular(() => {
      this.timer = setTimeout(() => {
        this.ngZone.run(() => {
          if (!deleting) {
            if (current === phrase) {
              this.isDeleting.set(true);
            } else {
              this.displayText.set(phrase.substring(0, current.length + 1));
            }
          } else {
            if (current === '') {
              this.isDeleting.set(false);
              this.currentPhraseIndex.set((this.currentPhraseIndex() + 1) % this.phrases.length);
            } else {
              this.displayText.set(phrase.substring(0, current.length - 1));
            }
          }
        });
      }, speed);
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }
}
