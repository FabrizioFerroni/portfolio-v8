import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { ZardTooltipImports } from '@/shared/components/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronLeft,
  lucideChevronRight,
  lucideMessageSquareOff,
  lucideQuote,
} from '@ng-icons/lucide';
import { map } from 'rxjs';
import { TestimonialsService } from './service';
import { TestimonialList } from './interface';
import { ZardDialogService } from '@/shared/components/dialog';
import { DetailTestimonialDialog } from './detail';
import { ExceedsLengthPipe } from '@/shared/pipes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-testimonials',
  imports: [
    NgIcon,
    ZardButtonComponent,
    ZardTooltipImports,
    Card,
    CardContent,
    NgOptimizedImage,
    ExceedsLengthPipe,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [
    provideIcons({ lucideChevronLeft, lucideChevronRight, lucideQuote, lucideMessageSquareOff }),
  ],
})
export class Testimonials implements OnInit {
  //#region Inyecciones
  private destroyRef = inject(DestroyRef);
  private breakpointObserver = inject(BreakpointObserver);
  private testimonialsService = inject(TestimonialsService);
  private readonly dialogService = inject(ZardDialogService);
  //#endregion

  //#region Variables
  currentIndex = signal(0);
  autoplay = signal(true);
  testimonials = signal<TestimonialList[]>([]);
  loading = signal(true);

  private touchStart = 0;
  private touchEnd = 0;
  private autoplayTimer: ReturnType<typeof setTimeout> | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  isMobile = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)),
    { initialValue: false }
  );

  visibleTestimonials = computed(() => {
    const list = this.testimonials();
    const total = list.length;
    if (total === 0) return [];

    const count = this.isMobile() ? 1 : Math.min(3, total);
    const offset = Math.floor(count / 2);
    const result = [];

    for (let i = 0; i < count; i++) {
      const index = (this.currentIndex() + i - offset + total) % total;
      result.push({
        ...list[index],
        isActive: index === this.currentIndex() && total === 3 && !this.isMobile(),
      });
    }

    return result;
  });

  readonly truncateLength = 220;

  truncate(text: string): string {
    return text.length > this.truncateLength
      ? text.slice(0, this.truncateLength).trimEnd() + '…'
      : text;
  }

  protected readonly gridColsClass = computed(() => {
    const count = this.visibleTestimonials().length;
    if (count === 1) return 'grid-cols-1 max-w-md';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2 max-w-3xl';
    return 'grid-cols-1 md:grid-cols-3';
  });

  protected readonly maxWidthClass = computed(() => {
    const count = this.visibleTestimonials().length;
    if (count === 3) return 'max-w-5xl ' + this.gridColsClass();
    return this.gridColsClass();
  });
  //#endregion

  //#region Lifecycle
  ngOnInit(): void {
    this.testimonialsService.getTestimonials().subscribe({
      next: ({ body }) => {
        if (body) {
          this.testimonials.set(body.data);
          this.loading.set(false);
        }
      },
      error: () => this.loading.set(false),
    });
  }
  //#endregion

  //#region VerDetalle
  onViewDetail(test: TestimonialList): void {
    this.dialogService.create({
      zTitle: 'Ver detalle del testimonio',
      zContent: DetailTestimonialDialog,
      zData: {
        testimonial: test,
      },
      zHideFooter: true,
      zWidth: '600px',
    });
  }
  //#endregion

  //#region Navegación
  nextTestimonial(): void {
    const total = this.testimonials().length;
    if (total === 0) return;
    this.currentIndex.update(prev => (prev + 1) % total);
  }

  prevTestimonial(): void {
    const total = this.testimonials().length;
    if (total === 0) return;
    this.currentIndex.update(prev => (prev - 1 + total) % total);
  }
  //#endregion

  // #region Autoplay
  private startAutoplay(): void {
    this.clearAutoplay();
    this.intervalId = setInterval(() => {
      if (this.autoplay()) this.nextTestimonial();
    }, 25000);
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
    this.autoplayTimer = setTimeout(() => this.autoplay.set(true), 10000);
  }
  //#endregion

  // #region Touch handlers
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
  //#endregion
}
