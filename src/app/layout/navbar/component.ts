import { ZardButtonComponent } from '@/shared/components/button';
import { ZardSheetService } from '@/shared/components/sheet';
import { LayoutService } from '@/shared/services';
import { mergeClasses } from '@/shared/utils';
import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { NavigationEnd, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideSettings, lucideX } from '@ng-icons/lucide';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

interface NavLinks {
  name: string;
  fragment: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ZardButtonComponent, NgIcon],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideSettings, lucideMenu, lucideX })],
})
export class Navbar implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private sheetService = inject(ZardSheetService);
  activeFragment = signal<string>('');
  private observer: IntersectionObserver | null = null;
  private router = inject(Router);

  layout = inject(LayoutService);
  isMovile = this.layout.isMobile;
  isOpen = signal<boolean>(false);

  scrolled = signal(false);
  headerClass = computed(() =>
    mergeClasses(
      'fixed top-0 w-full z-50 transition-all duration-300',
      this.scrolled() ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    )
  );

  navLinks: NavLinks[] = [
    { name: 'Inicio', fragment: 'inicio' },
    { name: 'Sobre mí', fragment: 'sobre-mi' },
    { name: 'Habilidades', fragment: 'habilidades' },
    { name: 'Proyectos', fragment: 'proyectos' },
    { name: 'Experiencia', fragment: 'experiencias' },
    { name: 'Contacto', fragment: 'contacto' },
  ];

  private get lastFragment(): string {
    return this.navLinks[this.navLinks.length - 1].fragment;
  }

  private handleScroll = () => {
    this.scrolled.set(window.scrollY > 10);

    const isHome = this.router.url === '/' || this.router.url.startsWith('/#');
    if (!isHome) return;

    const threshold = 50;
    const nearBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - threshold;

    if (nearBottom) {
      this.activeFragment.set(this.lastFragment);
    }
  };

  constructor() {
    afterNextRender(() => this.initScrollSpy());

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      const isHome = (e as NavigationEnd).urlAfterRedirects === '/';
      if (!isHome) {
        this.activeFragment.set('');
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleScroll);
    }

    this.observer?.disconnect();
  }

  private initScrollSpy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          this.activeFragment.set(entry.target.id);
        }
      }
    }, options);

    this.navLinks.forEach(link => {
      const el = document.getElementById(link.fragment);
      if (el) this.observer!.observe(el);
    });
  }

  async openThemePicker() {
    const { ThemePicker } = await import('@/shared/components/fabriziodev');
    this.sheetService.create({
      zTitle: 'Personalizar tema',
      zDescription: `Configura el aspecto de tu portfolio según tus preferencias.`,
      zContent: ThemePicker,
      zHideFooter: true,
      zMaskClosable: true,
    });
  }

  setIsOpen(value: boolean) {
    this.isOpen.set(value);
  }

  onNavClick(event: MouseEvent, fragment: string): void {
    event.preventDefault();

    if (this.isMovile()) {
      this.setIsOpen(false);
    }

    if (isPlatformBrowser(this.platformId)) {
      const isHome = this.router.url === '/' || this.router.url.startsWith('/#');

      if (isHome) {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => {
            document
              .getElementById(fragment)
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        });
      }
    }
  }
}
