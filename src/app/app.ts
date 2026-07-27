import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoToTop, Loader } from './shared/components/fabriziodev';

@Component({
  selector: 'app-root',
  imports: [Loader, RouterOutlet, GoToTop],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PortfolioV8');
}
