import { Component } from '@angular/core';
import { Habilidades, Hero, ProyectosHome, SobreMi } from '../components';
import { Footer } from '@/layout';

@Component({
  selector: 'app-home',
  imports: [Hero, SobreMi, Habilidades, ProyectosHome, Footer],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Home {}
