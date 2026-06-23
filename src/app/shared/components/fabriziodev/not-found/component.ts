import { Navbar } from '@/layout';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, inject, PLATFORM_ID, RESPONSE_INIT, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ZardButtonComponent } from '../../button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideHome, lucideRefreshCw, lucideSearch } from '@ng-icons/lucide';
import { Location } from '@angular/common';

@Component({
  imports: [Navbar, NgOptimizedImage, RouterLink, ZardButtonComponent, NgIcon],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideHome, lucideArrowLeft, lucideSearch, lucideRefreshCw })],
})
export class NotFound {
  private platformId = inject(PLATFORM_ID);
  readonly searchQuery = signal('');
  readonly isSearching = signal(false);
  readonly funnyResponse = signal<string | null>(null);
  private location = inject(Location);

  private searchAttempts = signal(0);

  private readonly funnyResponses = [
    'Hmm, seguimos sin encontrar esa página. ¿Seguro que existe? 🤔',
    'Nope, todavía nada. ¿Quizás está de vacaciones? 🏖️',
    'He buscado hasta debajo de los píxeles y nada... 🔍',
    'Error 404: Sentido del humor encontrado, página no. 😅',
    'Esto es como buscar una línea de código en un proyecto de 10,000 archivos... 💻',
    'Houston, seguimos teniendo un problema. La página no aparece. 🚀',
    '¿Has probado apagando y encendiendo el internet? 🔌',
    'La página que buscas está en otro castillo. 🏰',
    'Creo que esta página se fue a tomar un café y no ha vuelto. ☕',
  ];

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      const responseInit = inject(RESPONSE_INIT, { optional: true });
      if (responseInit) {
        responseInit.status = 404;
        responseInit.statusText = 'Not Found';
      }
    }
  }

  handleSearch(): void {
    if (!this.searchQuery().trim()) return;

    this.isSearching.set(true);
    this.funnyResponse.set(null); // resetea para re-triggerear la animación

    setTimeout(() => {
      this.searchAttempts.update(n => n + 1);
      const index = (this.searchAttempts() - 1) % this.funnyResponses.length;
      this.isSearching.set(false);
      this.funnyResponse.set(this.funnyResponses[index]);
    }, 1500);
  }

  onNavClick(event: MouseEvent, fragment: string): void {
    event.preventDefault();

    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  goBack(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.location.back();
    }
  }
}
