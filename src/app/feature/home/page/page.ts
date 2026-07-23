import { Component, inject } from '@angular/core';
import {
  Habilidades,
  Hero,
  ProyectosHome,
  SobreMi,
  Experiencias,
  Newsletter,
  // Testimonials,
  Contacto,
  Testimonials,
} from '../components';
import { Footer } from '@/layout';
import { SeoService, SettingsService } from '@/core';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    SobreMi,
    Habilidades,
    ProyectosHome,
    Experiencias,
    Newsletter,
    Testimonials,
    Contacto,
    Footer,
  ],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Home {
  private readonly seo = inject(SeoService);
  protected readonly settingsService = inject(SettingsService);

  constructor() {
    this.seo.updateSeoTags({
      title: '',
      description:
        'Pagina principal del portfolio donde se demuestran mis habilidades, proyectos, y experiencias ademas de una breve reseña hacia mi persona.',
    });
    this.seo.setIndexFollow(true);
  }
}
