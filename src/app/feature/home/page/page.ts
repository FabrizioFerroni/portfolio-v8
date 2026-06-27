import { Component } from '@angular/core';
import {
  Habilidades,
  Hero,
  ProyectosHome,
  SobreMi,
  Experiencias,
  Newsletter,
  Testimonials,
  Contacto,
} from '../components';
import { Footer } from '@/layout';

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
export class Home {}
