import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './shared/components/fabriziodev';

@Component({
  selector: 'app-root',
  imports: [Loader, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PortfolioV8');
}
