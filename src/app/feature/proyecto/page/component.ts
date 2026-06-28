import { Footer, Navbar } from '@/layout';
import { ZardButtonComponent } from '@/shared/components/button';
import { Rutas } from '@/shared/utils';
import { Component, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeft,
  lucideArrowRight,
  lucideExternalLink,
  lucideFolderSearch,
  lucideGithub,
  lucideHome,
  lucideLock,
  lucideMaximize2,
  lucideQuote,
} from '@ng-icons/lucide';
import { Project } from '../interface';
import { ZardBadgeComponent } from '@/shared/components/badge';
import { NgOptimizedImage } from '@angular/common';
import {
  Card,
  CardContent,
  ImageDialog,
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TabsTriggerComponent,
} from '@/shared/components/fabriziodev';
import { ZardSelectImports } from '@/shared/components/select';

@Component({
  selector: 'app-proyecto',
  imports: [
    Navbar,
    Footer,
    ZardButtonComponent,
    RouterLink,
    NgIcon,
    ZardBadgeComponent,
    NgOptimizedImage,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent,
    ZardSelectImports,
    Card,
    CardContent,
    ImageDialog,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [
    provideIcons({
      lucideArrowLeft,
      lucideLock,
      lucideGithub,
      lucideExternalLink,
      lucideQuote,
      lucideMaximize2,
      lucideArrowRight,
      lucideFolderSearch,
      lucideHome,
    }),
  ],
})
export class Proyecto {
  //borrar desps
  projects: Project[] = [
    {
      id: 1,
      slug: 'ecommerce-platform',
      title: 'E-commerce Platform',
      description:
        'Una plataforma de comercio electrónico completa con carrito de compras, pagos y panel de administración.',
      longDescription: `
      Este proyecto es una plataforma de comercio electrónico completa desarrollada con React en el frontend y Node.js con Express en el backend. La aplicación permite a los usuarios navegar por productos, añadirlos al carrito, realizar pagos y gestionar sus pedidos.
      
      Para los administradores, incluye un panel de control completo donde pueden gestionar productos, categorías, pedidos y usuarios. El sistema también incluye análisis de ventas y generación de informes.
      
      La arquitectura del proyecto sigue un enfoque modular, con una clara separación entre el frontend y el backend a través de una API RESTful. La base de datos utiliza MongoDB para almacenar productos, usuarios, pedidos y otras entidades del sistema.
    `,
      image: '/img/placeholder.svg?height=400&width=600',
      gallery: [
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Página principal de la tienda con productos destacados y categorías',
        },
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Detalle de producto con opciones de compra y reseñas',
        },
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Panel de administración para gestión de productos y pedidos',
        },
      ],
      tags: ['React', 'Node.js', 'MongoDB', 'Redux', 'Express', 'JWT', 'Stripe', 'AWS S3'],
      category: 'fullstack',
      github: 'https://github.com/yourusername/project1',
      demo: 'https://project1-demo.com',
      private: false,
      features: [
        'Catálogo de productos con búsqueda y filtros',
        'Carrito de compras y proceso de pago',
        'Autenticación y gestión de usuarios',
        'Panel de administración completo',
        'Procesamiento de pagos con Stripe',
        'Gestión de inventario en tiempo real',
        'Notificaciones por email',
        'Análisis de ventas y reportes',
      ],
      challenges: [
        'Implementación de un sistema de carrito persistente entre sesiones',
        'Optimización del rendimiento para catálogos grandes',
        'Integración segura con la pasarela de pagos',
        'Diseño de una arquitectura escalable para manejar picos de tráfico',
      ],
      technologies: {
        frontend: ['React', 'Redux', 'Tailwind CSS', 'Axios'],
        backend: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
        devops: ['Docker', 'AWS EC2', 'AWS S3', 'GitHub Actions'],
      },
      testimonial: {
        quote:
          'La plataforma transformó completamente nuestra operación de ventas online, aumentando nuestras conversiones en un 35%.',
        author: 'Cliente XYZ',
        role: 'Director de E-commerce',
      },
    },
    {
      id: 2,
      slug: 'dashboard-analytics',
      title: 'Dashboard Analytics',
      description:
        'Panel de control interactivo para visualizar datos de negocio con gráficos y filtros avanzados.',
      longDescription: `
      Este dashboard de análisis es una aplicación web interactiva diseñada para visualizar y analizar datos de negocio en tiempo real. Utiliza React para la interfaz de usuario y D3.js para la visualización de datos complejos.
      
      El dashboard permite a los usuarios ver métricas clave, tendencias y patrones a través de diversos tipos de gráficos y visualizaciones. Los usuarios pueden filtrar los datos por diferentes parámetros, exportar informes y configurar alertas basadas en umbrales personalizados.
      
      La aplicación se conecta a diversas fuentes de datos a través de APIs y permite la integración con sistemas de BI existentes. El diseño responsive asegura que el dashboard sea accesible desde cualquier dispositivo.
    `,
      image: '/img/placeholder.svg?height=400&width=600',
      gallery: [
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Vista general del dashboard con métricas clave y gráficos',
        },
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Panel de filtros avanzados para análisis personalizado',
        },
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Visualización de tendencias temporales con datos históricos',
        },
      ],
      tags: ['React', 'D3.js', 'Tailwind CSS', 'Redux', 'Firebase'],
      category: 'frontend',
      github: 'https://github.com/yourusername/project2',
      demo: 'https://project2-demo.com',
      private: true,
      features: [
        'Visualizaciones interactivas con D3.js',
        'Filtros avanzados y búsqueda',
        'Exportación de datos e informes',
        'Alertas y notificaciones configurables',
        'Temas personalizables y modo oscuro',
        'Integración con múltiples fuentes de datos',
        'Diseño responsive para todos los dispositivos',
      ],
      challenges: [
        'Optimización del rendimiento con grandes conjuntos de datos',
        'Diseño de visualizaciones intuitivas para datos complejos',
        'Implementación de filtros que mantengan la coherencia entre diferentes visualizaciones',
        'Creación de un sistema de temas flexible y accesible',
      ],
      technologies: {
        frontend: ['React', 'D3.js', 'Tailwind CSS', 'Redux Toolkit', 'React Query'],
        backend: ['Firebase', 'Cloud Functions'],
        devops: ['Vercel', 'GitHub Actions'],
      },
      testimonial: {
        quote:
          'Este dashboard nos ha permitido identificar tendencias que antes pasaban desapercibidas, mejorando significativamente nuestra toma de decisiones.',
        author: 'Cliente ABC',
        role: 'Director de Operaciones',
      },
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
      longDescription: `
      Esta API RESTful es un sistema backend completo que proporciona endpoints para gestionar datos de una aplicación. Incluye autenticación JWT, autorización basada en roles, y documentación completa con Swagger.
      
      La API está construida con Node.js y Express, utilizando PostgreSQL como base de datos principal. Implementa patrones de diseño como Repository y Service para mantener el código limpio y mantenible.
      
      Entre sus características destacan la validación de datos, manejo de errores centralizado, logging, y pruebas automatizadas para garantizar la calidad del código.
    `,
      gallery: [
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Documentación interactiva con Swagger UI',
        },
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Diagrama de la arquitectura de la API',
        },
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Panel de monitoreo de rendimiento y logs',
        },
      ],
      features: [
        'Autenticación con JWT',
        'Autorización basada en roles',
        'Documentación con Swagger',
        'Validación de datos con Joi',
        'Manejo de errores centralizado',
        'Logging con Winston',
        'Tests con Jest y Supertest',
      ],
      challenges: [
        'Diseño de una estructura escalable para la API',
        'Implementación de un sistema de autenticación seguro',
        'Optimización de consultas a la base de datos',
        'Documentación exhaustiva de todos los endpoints',
      ],
      technologies: {
        frontend: ['Swagger UI'],
        backend: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'JWT'],
        devops: ['Docker', 'GitHub Actions', 'Heroku'],
      },
      testimonial: {
        quote:
          'La API ha sido fundamental para conectar nuestros sistemas y aplicaciones móviles de manera eficiente y segura.',
        author: 'Cliente DEF',
        role: 'CTO',
      },
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
      longDescription: `
      Esta aplicación móvil multiplataforma está diseñada para ayudar a los usuarios a gestionar sus tareas diarias y mejorar su productividad. Desarrollada con React Native, funciona tanto en iOS como en Android con una única base de código.
      
      La aplicación permite a los usuarios crear listas de tareas, establecer recordatorios, organizar proyectos y colaborar con otros usuarios. Incluye funcionalidades como sincronización en la nube, modo offline, notificaciones push y estadísticas de productividad.
      
      El diseño de la interfaz se centra en la simplicidad y la facilidad de uso, con animaciones fluidas y transiciones que mejoran la experiencia del usuario.
    `,
      gallery: [
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Pantalla principal con lista de tareas y categorías',
        },
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Creación y edición de tareas con opciones avanzadas',
        },
        {
          url: '/img/placeholder.svg?height=400&width=600',
          description: 'Dashboard de estadísticas de productividad personal',
        },
      ],
      features: [
        'Gestión de tareas y proyectos',
        'Recordatorios y notificaciones',
        'Sincronización en la nube',
        'Modo offline',
        'Colaboración en tiempo real',
        'Estadísticas de productividad',
        'Temas personalizables',
      ],
      challenges: [
        'Optimización del rendimiento en dispositivos de gama baja',
        'Implementación de sincronización bidireccional con soporte offline',
        'Diseño de una interfaz intuitiva y accesible',
        'Gestión eficiente del estado de la aplicación',
      ],
      technologies: {
        frontend: ['React Native', 'Redux', 'React Navigation', 'Styled Components'],
        backend: ['Firebase', 'Cloud Functions'],
        devops: ['Fastlane', 'App Center', 'Google Play Console', 'App Store Connect'],
      },
      testimonial: {
        quote:
          'Esta aplicación ha transformado la forma en que organizamos nuestro trabajo diario, aumentando nuestra productividad en un 25%.',
        author: 'Cliente GHI',
        role: 'Director de Producto',
      },
    },
  ];
  //fin borrar dsp
  //#region Dependencias
  private readonly router = inject(Router);

  //#endregion

  //#region Variables
  slug = input.required<string>();
  readonly baseRoute = `/${Rutas.PROYECTOS}`;
  readonly homeRoute = `/${Rutas.HOME}`;
  selectedImage = signal<{ url: string; description: string } | null>(null);
  project!: Project;
  relatedProjects: Project[] = [];
  activeTab = signal<string>('overview');
  //#endregion

  //#region Ciclo de vida angular
  constructor() {
    effect(() => {
      // effect se re-ejecuta automáticamente cada vez que slug() cambia
      const currentSlug = this.slug();
      this.project = this.projects.find(p => p.slug === currentSlug)!;
      this.relatedProjects = this.getRelatedProjects();
    });
  }
  //#endregion

  //#region Funciones
  getProyects() {
    this.project = this.projects.find(p => p.slug === this.slug())!;
  }

  setActiveTab(value: string | string[]) {
    this.activeTab.set(value as string);
  }

  getRelatedProjects = () => {
    if (!this.project) return [];

    const others = this.projects.filter(p => p.id !== this.project.id);

    // Priorizar proyectos de la misma categoría
    const sameCategory = others.filter(p => p.category === this.project.category);
    const differentCategory = others.filter(p => p.category !== this.project.category);

    // Completar hasta 3 con proyectos de otras categorías si hace falta
    return [...sameCategory, ...differentCategory].slice(0, 3);
  };
  //#endregion
}
