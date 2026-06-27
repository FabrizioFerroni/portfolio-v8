import { Footer, Navbar } from '@/layout';
import { ZardButtonComponent } from '@/shared/components/button';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';

@Component({
  selector: 'app-terminos-condiciones',
  imports: [Navbar, Footer, ZardButtonComponent, RouterLink, NgIcon],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideArrowLeft })],
})
export class TerminosCondiciones {
  dateToday = new Date().toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
