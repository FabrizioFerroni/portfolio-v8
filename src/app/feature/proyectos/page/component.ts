import { Footer, Navbar } from '@/layout';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardInputDirective } from '@/shared/components/input';
import { ZardSelectImports } from '@/shared/components/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideChevronLeft,
  lucideChevronRight,
  lucideExternalLink,
  lucideFilter,
  lucideGithub,
  lucideLock,
  lucideSearch,
  lucideSortAsc,
  lucideSortDesc,
  lucideX,
} from '@ng-icons/lucide';
import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Accordion, Card, CardContent, Checkbox } from '@/shared/components/fabriziodev';
import { RouterLink } from '@angular/router';

const PROJECTS_PER_PAGE = 9;

const SORT_OPTIONS = ['date-desc', 'date-asc', 'name-asc', 'name-desc'] as const;
type SortBy = (typeof SORT_OPTIONS)[number];

// type guard
function isSortBy(value: string): value is SortBy {
  return (SORT_OPTIONS as readonly string[]).includes(value);
}

@Component({
  selector: 'app-proyectos',
  imports: [
    Navbar,
    Footer,
    NgIcon,
    ZardInputDirective,
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardSelectImports,
    Accordion,
    Checkbox,
    Card,
    CardContent,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [
    provideIcons({
      lucideSearch,
      lucideX,
      lucideFilter,
      lucideSortDesc,
      lucideSortAsc,
      lucideLock,
      lucideGithub,
      lucideExternalLink,
      lucideArrowRight,
      lucideChevronLeft,
      lucideChevronRight,
    }),
  ],
})
export class Proyectos {
  isOpenFilter = signal<boolean>(false);
  projectsLoaded = signal<boolean>(false);

  readonly searchTerm = signal('');
  readonly categoryFilter = signal<string>('all');
  readonly visibilityFilter = signal<'all' | 'public' | 'private'>('all');
  readonly techFilters = signal<string[]>([]);
  readonly sortBy = signal<SortBy>('date-desc');
  readonly currentPage = signal(1);
  private platformId = inject(PLATFORM_ID);

  allProjects = signal([
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
      date: '2023-05-15',
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
      date: '2023-03-22',
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
      date: '2023-01-10',
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
      date: '2022-11-05',
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
      date: '2022-09-18',
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
      date: '2022-07-30',
    },
    {
      id: 7,
      slug: 'app-gestion-inventario',
      title: 'App de Gestión de Inventario',
      description:
        'Aplicación para gestionar inventario con seguimiento en tiempo real y alertas de stock.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Vue.js', 'Firebase', 'Vuetify'],
      category: 'frontend',
      github: 'https://github.com/yourusername/project7',
      demo: 'https://project7-demo.com',
      private: false,
      date: '2022-06-12',
    },
    {
      id: 8,
      slug: 'sistema-reservas',
      title: 'Sistema de Reservas',
      description: 'Sistema de reservas para restaurantes con gestión de mesas y clientes.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Angular', 'Node.js', 'MongoDB'],
      category: 'fullstack',
      github: 'https://github.com/yourusername/project8',
      demo: 'https://project8-demo.com',
      private: false,
      date: '2022-04-25',
    },
    {
      id: 9,
      slug: 'plataforma-educativa',
      title: 'Plataforma Educativa',
      description: 'Plataforma para cursos online con sistema de evaluación y certificados.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React', 'Express', 'PostgreSQL', 'Redux'],
      category: 'fullstack',
      github: 'https://github.com/yourusername/project9',
      demo: 'https://project9-demo.com',
      private: true,
      date: '2022-02-08',
    },
    {
      id: 10,
      slug: 'ci-cd-pipeline',
      title: 'CI/CD Pipeline',
      description:
        'Implementación de pipeline de integración y despliegue continuo para aplicaciones web.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Jenkins', 'Docker', 'AWS', 'Terraform'],
      category: 'devops',
      github: 'https://github.com/yourusername/project10',
      demo: 'https://project10-demo.com',
      private: false,
      date: '2022-01-15',
    },
    {
      id: 11,
      slug: 'chat-app',
      title: 'Chat App',
      description: 'Aplicación de chat en tiempo real con soporte para mensajes multimedia.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React', 'Socket.io', 'Express', 'MongoDB'],
      category: 'fullstack',
      github: 'https://github.com/yourusername/project11',
      demo: 'https://project11-demo.com',
      private: false,
      date: '2021-11-20',
    },
    {
      id: 12,
      slug: 'kubernetes-cluster',
      title: 'Kubernetes Cluster',
      description: 'Configuración y gestión de cluster Kubernetes para aplicaciones escalables.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana'],
      category: 'devops',
      github: 'https://github.com/yourusername/project12',
      demo: 'https://project12-demo.com',
      private: true,
      date: '2021-09-05',
    },
    {
      id: 13,
      slug: 'blockchain-wallet',
      title: 'Blockchain Wallet',
      description: 'Wallet para criptomonedas con soporte para múltiples blockchains y tokens.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React', 'Web3.js', 'Ethereum', 'Solidity'],
      category: 'frontend',
      github: 'https://github.com/yourusername/project13',
      demo: 'https://project13-demo.com',
      private: false,
      date: '2021-07-18',
    },
    {
      id: 14,
      slug: 'cms-headless',
      title: 'CMS Headless',
      description: 'Sistema de gestión de contenido headless con API GraphQL.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Node.js', 'GraphQL', 'MongoDB', 'React'],
      category: 'fullstack',
      github: 'https://github.com/yourusername/project14',
      demo: 'https://project14-demo.com',
      private: false,
      date: '2021-05-22',
    },
    {
      id: 15,
      slug: 'iot-dashboard',
      title: 'IoT Dashboard',
      description:
        'Dashboard para monitoreo de dispositivos IoT y análisis de datos en tiempo real.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React', 'MQTT', 'Node.js', 'InfluxDB'],
      category: 'fullstack',
      github: 'https://github.com/yourusername/project15',
      demo: 'https://project15-demo.com',
      private: true,
      date: '2021-03-10',
    },
    {
      id: 16,
      slug: 'ar-shopping-app',
      title: 'AR Shopping App',
      description:
        'Aplicación de compras con realidad aumentada para visualizar productos en el espacio real.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React Native', 'ARKit', 'ARCore', 'Firebase'],
      category: 'mobile',
      github: 'https://github.com/yourusername/project16',
      demo: 'https://project16-demo.com',
      private: false,
      date: '2021-01-05',
    },
    {
      id: 17,
      slug: 'serverless-api',
      title: 'Serverless API',
      description: 'API serverless con funciones Lambda y API Gateway.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Serverless Framework'],
      category: 'backend',
      github: 'https://github.com/yourusername/project17',
      demo: 'https://project17-demo.com',
      private: false,
      date: '2020-11-15',
    },
    {
      id: 18,
      slug: 'ml-recommendation-engine',
      title: 'ML Recommendation Engine',
      description: 'Motor de recomendaciones basado en machine learning para e-commerce.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Python', 'TensorFlow', 'Flask', 'AWS'],
      category: 'backend',
      github: 'https://github.com/yourusername/project18',
      demo: 'https://project18-demo.com',
      private: true,
      date: '2020-09-20',
    },
    {
      id: 19,
      slug: 'design-system',
      title: 'Design System',
      description: 'Sistema de diseño con componentes reutilizables y documentación.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['React', 'Storybook', 'Styled Components', 'Figma'],
      category: 'frontend',
      github: 'https://github.com/yourusername/project19',
      demo: 'https://project19-demo.com',
      private: false,
      date: '2020-07-08',
    },
    {
      id: 20,
      slug: 'monitoring-platform',
      title: 'Monitoring Platform',
      description:
        'Plataforma de monitoreo de infraestructura y aplicaciones con alertas y dashboards.',
      image: '/img/placeholder.svg?height=400&width=600',
      tags: ['Prometheus', 'Grafana', 'Kubernetes', 'Go'],
      category: 'devops',
      github: 'https://github.com/yourusername/project20',
      demo: 'https://project20-demo.com',
      private: false,
      date: '2020-05-12',
    },
  ]);

  allTechnologies = Array.from(new Set(this.allProjects().flatMap(project => project.tags))).sort();

  // Categorías disponibles
  categories = [
    { id: 'all', name: 'Todos' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Fullstack' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'devops', name: 'DevOps' },
  ];

  setSortBy(value: string | string[]) {
    //this.sortBy.set(value as string);
    const raw = Array.isArray(value) ? value[0] : value;
    if (isSortBy(raw)) {
      this.sortBy.set(raw);
    }
  }

  readonly filteredProjects = computed(() => {
    let result = [...this.allProjects()];
    const term = this.searchTerm().toLowerCase();

    if (term) {
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (this.categoryFilter() !== 'all') {
      result = result.filter(p => p.category === this.categoryFilter());
    }

    if (this.visibilityFilter() === 'public') {
      result = result.filter(p => !p.private);
    } else if (this.visibilityFilter() === 'private') {
      result = result.filter(p => p.private);
    }

    const techs = this.techFilters();
    if (techs.length > 0) {
      result = result.filter(p => techs.some(t => p.tags.includes(t)));
    }

    switch (this.sortBy()) {
      case 'date-desc':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.filteredProjects().length / PROJECTS_PER_PAGE)
  );

  readonly currentProjects = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * PROJECTS_PER_PAGE;
    return this.filteredProjects().slice(start, start + PROJECTS_PER_PAGE);
  });

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const maxPagesToShow = 5;
    const pages: (number | '...')[] = [];

    if (total <= maxPagesToShow) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    let start = Math.max(1, current - Math.floor(maxPagesToShow / 2));
    let end = start + maxPagesToShow - 1;

    if (end > total) {
      end = total;
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) pages.push('...');
      pages.push(total);
    }

    return pages;
  });

  // ── Acciones ───────────────────────────────────────────────────
  paginate(page: number) {
    this.currentPage.set(page);

    // Guard SSR: window solo existe en browser
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPreviousPage() {
    if (this.currentPage() > 1) this.paginate(this.currentPage() - 1);
  }

  goToNextPage() {
    if (this.currentPage() < this.totalPages()) this.paginate(this.currentPage() + 1);
  }

  handleTechFilterChange(tech: string) {
    this.techFilters.update(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
    // Reset paginación al cambiar filtros
    this.currentPage.set(1);
  }

  readonly paginationLabel = computed(() => {
    const total = this.filteredProjects().length;
    const page = this.currentPage();
    const start = Math.min((page - 1) * PROJECTS_PER_PAGE + 1, total);
    const end = Math.min(page * PROJECTS_PER_PAGE, total);
    return `Mostrando ${start} - ${end} de ${total} proyectos`;
  });

  clearFilters() {
    this.searchTerm.set('');
    this.categoryFilter.set('all');
    this.visibilityFilter.set('all');
    this.techFilters.set([]);
    this.sortBy.set('date-desc');
    this.currentPage.set(1);
  }
}
