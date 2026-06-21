import { Component } from '@angular/core';
import { Hero, SobreMi } from '../components';

@Component({
  selector: 'app-home',
  imports: [Hero, SobreMi],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Home {}
