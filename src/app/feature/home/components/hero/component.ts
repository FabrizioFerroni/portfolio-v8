import { Navbar } from '@/layout';
import { ZardButtonComponent } from '@/shared/components/button';
import { Typewriter } from '@/shared/components/fabriziodev';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowDown, lucideGithub, lucideLinkedin, lucideMail } from '@ng-icons/lucide';
@Component({
  selector: 'app-hero',
  imports: [Navbar, Typewriter, ZardButtonComponent, NgIcon, NgOptimizedImage],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideGithub, lucideLinkedin, lucideMail, lucideArrowDown })],
})
export class Hero {
  private platformId = inject(PLATFORM_ID);

  onNavClick(event: MouseEvent, fragment: string): void {
    event.preventDefault();

    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
