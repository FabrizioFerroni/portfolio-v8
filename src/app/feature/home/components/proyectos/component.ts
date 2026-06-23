import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideExternalLink,
  lucideGithub,
  lucideGrid,
  lucideLock,
} from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';

interface CategoryType {
  id: string;
  name: string;
}

@Component({
  selector: 'app-proyectos-home',
  imports: [
    ZardButtonComponent,
    Card,
    CardContent,
    NgOptimizedImage,
    NgIcon,
    ZardBadgeComponent,
    RouterLink,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [
    provideIcons({ lucideLock, lucideGithub, lucideExternalLink, lucideArrowRight, lucideGrid }),
  ],
})
export class ProyectosHome {
  catFilter: WritableSignal<string> = signal<string>('all');
  categories: CategoryType[] = [
    { id: 'all', name: 'Todos' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Fullstack' },
    { id: 'mobile', name: 'Mobile' },
  ];

  /* borrar dsp */
  projects = [
    {
      id: 1,
      slug: 'ecommerce-platform',
      title: 'E-commerce Platform',
      description:
        'Una plataforma de comercio electrónico completa con carrito de compras, pagos y panel de administración.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
      category: 'fullstack',
      github: 'https://github.com/yourusername/project1',
      demo: 'https://project1-demo.com',
      private: false,
    },
    {
      id: 2,
      slug: 'dashboard-analytics',
      title: 'Dashboard Analytics',
      description:
        'Panel de control interactivo para visualizar datos de negocio con gráficos y filtros avanzados.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React', 'D3.js', 'Tailwind CSS'],
      category: 'frontend',
      github: 'https://github.com/yourusername/project2',
      demo: 'https://project2-demo.com',
      private: true,
    },
    {
      id: 3,
      slug: 'api-restful',
      title: 'API RESTful',
      description: 'API RESTful con autenticación, autorización y documentación completa.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      category: 'backend',
      github: 'https://github.com/yourusername/project3',
      demo: 'https://project3-docs.com',
      private: false,
    },
    {
      id: 4,
      slug: 'aplicacion-movil',
      title: 'Aplicación Móvil',
      description: 'Aplicación móvil multiplataforma para gestión de tareas y productividad.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React Native', 'Redux', 'Firebase'],
      category: 'mobile',
      github: 'https://github.com/yourusername/project4',
      demo: 'https://project4-demo.com',
      private: true,
    },
    {
      id: 5,
      slug: 'sitio-web-personal',
      title: 'Sitio Web Personal',
      description: 'Sitio web personal con blog y portfolio integrado.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Next.js', 'Tailwind CSS', 'MDX'],
      category: 'frontend',
      github: 'https://github.com/yourusername/project5',
      demo: 'https://project5-demo.com',
      private: false,
    },
    {
      id: 6,
      slug: 'microservicios',
      title: 'Microservicios',
      description: 'Arquitectura de microservicios para una aplicación escalable.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Docker', 'Kubernetes', 'Node.js', 'gRPC'],
      category: 'backend',
      github: 'https://github.com/yourusername/project6',
      demo: 'https://project6-demo.com',
      private: false,
    },
  ];

  /*filteredProjects =
    this.catFilter() === 'all'
      ? this.projects
      : this.projects.filter(project => project.category === this.catFilter());*/

  filteredProjects = computed(() => {
    const cat = this.catFilter();
    return cat === 'all'
      ? this.projects
      : this.projects.filter(project => project.category === cat);
  });

  setFilter(id: string) {
    this.catFilter.set(id);
  }
}
