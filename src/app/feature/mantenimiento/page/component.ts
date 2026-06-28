import { ZardButtonComponent } from '@/shared/components/button';
import { Component, signal } from '@angular/core';
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
  currentYear: number = new Date().getFullYear();
  email = signal('');
  subscribed = signal(false);

  handleSubscribe(event: Event) {
    event.preventDefault();
    if (this.email()) {
      this.subscribed.set(true);
    }
  }
}
