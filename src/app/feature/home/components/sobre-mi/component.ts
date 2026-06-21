import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';

@Component({
  selector: 'app-sobre-mi',
  imports: [NgOptimizedImage, Card, CardContent, NgIcon, ZardButtonComponent],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideDownload })],
})
export class SobreMi {}
