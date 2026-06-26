import {
  AngularIconComponent,
  MongoDBIconComponent,
  NestJSIconComponent,
} from '@/shared/components/fabriziodev/tech-icons';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideLinkedin, lucideMail } from '@ng-icons/lucide';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgIcon, AngularIconComponent, MongoDBIconComponent, NestJSIconComponent],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideGithub, lucideLinkedin, lucideMail })],
})
export class Footer {
  currentYear: number = new Date().getFullYear();
}
