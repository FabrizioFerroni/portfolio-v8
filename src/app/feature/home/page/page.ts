import { Component } from '@angular/core';
import { Habilidades, Hero, ProyectosHome, SobreMi } from '../components';

@Component({
  selector: 'app-home',
  imports: [Hero, SobreMi, Habilidades, ProyectosHome],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Home {}
