import { Navbar } from '@/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [Navbar],
  templateUrl: './component.html',
  styleUrl: './component.css',
})
export class Hero {}
