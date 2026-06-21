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
import { lucideDatabase, lucideMonitor, lucideServer, lucideWrench } from '@ng-icons/lucide';

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
      { name: 'NestJS', logo: '/img/logos/backend/nestjs.svg?height=60&width=60' },
      { name: 'Node.js', logo: '/img/logos/backend/nodejs.svg?height=60&width=60' },
      { name: 'Spring Boot', logo: '/img/logos/backend/spring.svg?height=60&width=60' },
      { name: 'Java', logo: '/img/logos/backend/java.svg?height=60&width=60' },
      { name: 'C#', logo: '/img/logos/backend/csharp.svg?height=60&width=60' },
      { name: '.Net Core', logo: '/img/logos/backend/dotnetcore.svg?height=60&width=60' },
      { name: 'Laravel', logo: '/img/logos/backend/laravel.svg?height=60&width=60' },
      { name: 'PHP', logo: '/img/logos/backend/php.svg?height=60&width=60' },
    ],
  },
  {
    key: 'database',
    label: 'Bases de datos',
    icon: 'lucideDatabase',
    skills: [
      { name: 'MySQL', logo: '/img/logos/databases/mysql.svg?height=60&width=60' },
      { name: 'PostgreSQL', logo: '/img/logos/databases/postgresql.svg?height=60&width=60' },
      {
        name: 'MS SQL Server',
        logo: '/img/logos/databases/mssqlserver2022.svg?height=60&width=60',
      },
      { name: 'MongoDB', logo: '/img/logos/databases/mongodb.svg?height=60&width=60' },
      { name: 'Redis', logo: '/img/logos/databases/redis.svg?height=60&width=60' },
      { name: 'SQL Lite', logo: '/img/logos/databases/sqllite.svg?height=60&width=60' },
      { name: 'MariaDB', logo: '/img/logos/databases/mariadb.svg?height=60&width=60' },
    ],
  },
  {
    key: 'tools',
    label: 'Herramientas',
    icon: 'lucideWrench',
    skills: [
      { name: 'Git', logo: '/img/logos/tools/git.svg?height=60&width=60' },
      { name: 'GitHub Actions', logo: '/img/logos/tools/githubactions.svg?height=60&width=60' },
      { name: 'VS Code', logo: '/img/logos/tools/vscode.svg?height=60&width=60' },
      { name: 'Docker', logo: '/img/logos/tools/docker.svg?height=60&width=60' },
      { name: 'Portainer', logo: '/img/logos/tools/portainer.svg?height=60&width=60' },
      { name: 'AWS', logo: '/img/logos/tools/aws.svg?height=60&width=60' },
      { name: 'Nginx', logo: '/img/logos/tools/nginx.svg?height=60&width=60' },
      { name: 'Netlify', logo: '/img/logos/tools/netlify.svg?height=60&width=60' },
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
  viewProviders: [provideIcons({ lucideMonitor, lucideServer, lucideWrench, lucideDatabase })],
})
export class Habilidades {
  activeTab = signal<string>('frontend');
  readonly skillCategories: SkillCategory[] = skillCategories;

  setActiveTab(value: string | string[]) {
    this.activeTab.set(value as string);
  }
}
