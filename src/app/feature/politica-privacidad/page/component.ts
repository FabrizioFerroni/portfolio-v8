import { SeoService } from '@/core';
import { Footer, Navbar } from '@/layout';
import { ZardButtonComponent } from '@/shared/components/button';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';

@Component({
  selector: 'app-politica-privacidad',
  imports: [Navbar, Footer, ZardButtonComponent, RouterLink, NgIcon],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideArrowLeft })],
})
export class PoliticaPrivacidad {
  private readonly seo = inject(SeoService);

  dateToday = new Date().toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  constructor() {
    this.seo.updateSeoTags({
      title: 'Política de Privacidad',
      description: 'Describe las politicas de privacidad del portfolio web',
      locale: 'es_AR',
    });

    this.seo.setIndexFollow(false);
  }
}
