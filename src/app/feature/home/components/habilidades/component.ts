import { Card, CardContent } from '@/shared/components/fabriziodev';
import {
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TabsTriggerComponent,
} from '@/shared/components/fabriziodev/tabs';
import { ZardSelectImports } from '@/shared/components/select';
import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMonitor, lucideServer, lucideWrench } from '@ng-icons/lucide';

const skillCategories = [
  {
    key: 'frontend',
    label: 'Frontend',
    icon: 'lucideMonitor',
    skills: [
      { name: 'HTML', logo: '/img/logos/frontend/html5.svg?height=60&width=60' },
      { name: 'CSS', logo: '/img/logos/frontend/css.svg?height=60&width=60' },
      { name: 'JavaScript', logo: '/img/logos/frontend/javascript.svg?height=60&width=60' },
      { name: 'TypeScript', logo: '/img/logos/frontend/typescript.svg?height=60&width=60' },
      { name: 'Angular', logo: '/img/logos/frontend/angular.svg?height=60&width=60' },
      { name: 'Blazor', logo: '/img/logos/frontend/blazor.svg?height=60&width=60' },
      { name: 'Tailwind CSS', logo: '/img/logos/frontend/tailwindcss.svg?height=60&width=60' },
      { name: 'Bootstrap', logo: '/img/logos/frontend/bootstrap.svg?height=60&width=60' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    icon: 'lucideServer',
    skills: [
      { name: 'Node.js', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'Express', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'NestJS', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'MongoDB', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'PostgreSQL', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'GraphQL', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'Firebase', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'Docker', logo: '/img/placeholder.svg?height=60&width=60' },
    ],
  },
  {
    key: 'tools',
    label: 'Herramientas',
    icon: 'lucideWrench',
    skills: [
      { name: 'Git', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'GitHub', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'VS Code', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'Figma', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'Jest', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'AWS', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'Vercel', logo: '/img/placeholder.svg?height=60&width=60' },
      { name: 'Netlify', logo: '/img/placeholder.svg?height=60&width=60' },
    ],
  },
] as const satisfies SkillCategory[];

interface Skill {
  name: string;
  logo: string;
}

interface SkillCategory {
  key: string;
  label: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-habilidades',
  imports: [
    NgIcon,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    Card,
    CardContent,
    NgOptimizedImage,
    ZardSelectImports,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideMonitor, lucideServer, lucideWrench })],
})
export class Habilidades {
  activeTab = signal<string>('frontend');
  readonly skillCategories: SkillCategory[] = skillCategories;

  setActiveTab(value: string | string[]) {
    this.activeTab.set(value as string);
  }
}
