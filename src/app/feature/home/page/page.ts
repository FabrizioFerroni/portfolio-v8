import { Component } from '@angular/core';
import { Hero } from '../components';

@Component({
  selector: 'app-home',
  imports: [Hero],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Home {}
