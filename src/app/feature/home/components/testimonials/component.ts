import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { ZardTooltipImports } from '@/shared/components/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight, lucideQuote } from '@ng-icons/lucide';
import { map } from 'rxjs';

@Component({
  selector: 'app-testimonials',
  imports: [NgIcon, ZardButtonComponent, ZardTooltipImports, Card, CardContent, NgOptimizedImage],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideChevronLeft, lucideChevronRight, lucideQuote })],
})
export class Testimonials implements OnInit {
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);

  // ── Estado ──────────────────────────────────────────────
  currentIndex = signal(0);
  autoplay = signal(true);

  // Touch state (no necesita ser signal porque no afecta la vista)
  private touchStart = 0;
  private touchEnd = 0;
  private autoplayTimer: ReturnType<typeof setTimeout> | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  // ── Responsive ──────────────────────────────────────────
  // Reemplaza useIsMobile(): convierte el Observable del CDK a signal
  isMobile = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)),
    { initialValue: false }
  );

  // ── Computed ─────────────────────────────────────────────
  // Equivalente a getVisibleTestimonials() pero reactivo
  visibleTestimonials = computed(() => {
    const total = this.testimonials.length;
    const count = this.isMobile() ? 1 : 3;
    const result = [];

    for (let i = 0; i < count; i++) {
      const index = (this.currentIndex() + i) % total;
      result.push(this.testimonials[index]);
    }

    return result;
  });

  testimonials = [
    {
      id: 1,
      name: 'Ana Martínez',
      role: 'CEO, TechSolutions',
      image: '/img/placeholder.svg?height=100&width=100',
      text: 'Trabajar con Fabrizio fue una experiencia excepcional. Su capacidad para entender nuestras necesidades y convertirlas en soluciones tecnológicas superó todas nuestras expectativas. El proyecto se entregó a tiempo y con una calidad sobresaliente.',
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      role: 'Director de Producto, InnovateTech',
      image: '/img/placeholder.svg?height=100&width=100',
      text: 'Fabrizio demostró un dominio técnico impresionante y una gran capacidad para resolver problemas complejos. Su enfoque metódico y su comunicación clara hicieron que el proceso de desarrollo fuera fluido y sin complicaciones.',
    },
    {
      id: 3,
      name: 'Laura Sánchez',
      role: 'CTO, StartupVision',
      image: '/img/placeholder.svg?height=100&width=100',
      text: 'La atención al detalle y el compromiso con la calidad son las características que definen el trabajo de Fabrizio. Transformó nuestra idea en un producto digital excepcional que ha recibido elogios de nuestros usuarios.',
    },
    {
      id: 4,
      name: 'Miguel Fernández',
      role: 'Director de Marketing, GrowthDigital',
      image: '/img/placeholder.svg?height=100&width=100',
      text: 'Fabrizio no solo es un desarrollador técnicamente brillante, sino también un gran colaborador que entiende el aspecto comercial de los proyectos. Su capacidad para proponer mejoras y optimizaciones fue clave para el éxito de nuestra plataforma.',
    },
    {
      id: 5,
      name: 'Elena Torres',
      role: 'Fundadora, EcoTech',
      image: '/img/placeholder.svg?height=100&width=100',
      text: 'Contratar a Fabrizio para desarrollar nuestra aplicación fue una de las mejores decisiones que tomamos. Su profesionalismo, conocimiento técnico y dedicación hicieron posible que lanzáramos nuestro producto antes de lo previsto y con una calidad excepcional.',
    },
  ];

  // ── Lifecycle ────────────────────────────────────────────
  ngOnInit(): void {
    this.startAutoplay();
  }

  // ── Navegación ───────────────────────────────────────────
  nextTestimonial(): void {
    this.currentIndex.update(prev => (prev + 1) % this.testimonials.length);
  }

  prevTestimonial(): void {
    this.currentIndex.update(
      prev => (prev - 1 + this.testimonials.length) % this.testimonials.length
    );
  }

  // ── Autoplay ─────────────────────────────────────────────
  private startAutoplay(): void {
    this.clearAutoplay();

    // effect() también funciona, pero setInterval con DestroyRef es más explícito
    // para intervalos recurrentes
    this.intervalId = setInterval(() => {
      if (this.autoplay()) {
        this.nextTestimonial();
      }
    }, 5000);

    // Cleanup automático cuando el componente se destruye
    this.destroyRef.onDestroy(() => this.clearAutoplay());
  }

  private clearAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  handleInteraction(): void {
    this.autoplay.set(false);

    if (this.autoplayTimer) clearTimeout(this.autoplayTimer);

    this.autoplayTimer = setTimeout(() => {
      this.autoplay.set(true);
    }, 10000);
  }

  // ── Touch handlers ───────────────────────────────────────
  onTouchStart(e: TouchEvent): void {
    this.touchStart = e.targetTouches[0].clientX;
  }

  onTouchMove(e: TouchEvent): void {
    this.touchEnd = e.targetTouches[0].clientX;
  }

  onTouchEnd(): void {
    const diff = this.touchStart - this.touchEnd;

    if (diff > 50) {
      this.nextTestimonial();
      this.handleInteraction();
    } else if (diff < -50) {
      this.prevTestimonial();
      this.handleInteraction();
    }
  }
}
