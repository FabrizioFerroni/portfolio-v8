import { Component } from '@angular/core';
import { Habilidades, Hero, SobreMi } from '../components';

@Component({
  selector: 'app-home',
  imports: [Hero, SobreMi, Habilidades],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Home {}
