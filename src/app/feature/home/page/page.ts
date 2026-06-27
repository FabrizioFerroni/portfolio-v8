import { Component } from '@angular/core';
import { Habilidades, Hero, ProyectosHome, SobreMi } from '../components';
import { Footer } from '@/layout';
import { Experiencias } from '../components/experiencias';

@Component({
  selector: 'app-home',
  imports: [Hero, SobreMi, Habilidades, ProyectosHome, Experiencias, Footer],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Home {}
