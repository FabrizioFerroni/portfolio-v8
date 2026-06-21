import { ZardButtonComponent } from '@/shared/components/button';
import { ThemePicker } from '@/shared/components/fabriziodev';
import { ZardSheetService } from '@/shared/components/sheet';
import { LayoutService } from '@/shared/services';
import { mergeClasses } from '@/shared/utils';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideSettings, lucideX } from '@ng-icons/lucide';

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
    { name: 'Inicio', fragment: 'hero' },
    { name: 'Sobre mí', fragment: 'about' },
    { name: 'Habilidades', fragment: 'skills' },
    { name: 'Proyectos', fragment: 'projects' },
    { name: 'Experiencia', fragment: 'experience' },
    { name: 'Contacto', fragment: 'contact' },
  ];

  private handleScroll = () => {
    this.scrolled.set(window.scrollY > 10);
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  openThemePicker() {
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
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
