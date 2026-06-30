import { SeoService } from '@/core';
import { ZardButtonComponent } from '@/shared/components/button';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBell,
  lucideClock,
  lucideGithub,
  lucideLinkedin,
  lucideMail,
  lucideTwitter,
  lucideWrench,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-mantenimiento',
  imports: [RouterLink, NgIcon, ZardButtonComponent],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [
    provideIcons({
      lucideWrench,
      lucideClock,
      lucideBell,
      lucideGithub,
      lucideLinkedin,
      lucideTwitter,
      lucideMail,
    }),
  ],
})
export class Mantenimiento {
  private readonly seo = inject(SeoService);
  currentYear: number = new Date().getFullYear();
  email = signal('');
  subscribed = signal(false);

  constructor() {
    this.seo.updateSeoTags({
      title: 'Pagina en mantenimiento',
      description: 'El portfolio web se encuentra en mantenimiento',
    });

    this.seo.setIndexFollow(false);
  }

  handleSubscribe(event: Event) {
    event.preventDefault();
    if (this.email()) {
      this.subscribed.set(true);
    }
  }
}
