import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ZardButtonComponent } from '../../button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideGlobe, lucideLock, lucideMonitor, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { ZardTooltipImports } from '../../tooltip';
import { ZardBadgeComponent } from '../../badge';
import { DarkModeOptions, EDarkModes, NavegadorStorage, ZardDarkMode } from '@/shared/services';
import { isPlatformBrowser } from '@angular/common';

type Language = 'es' | 'en';

interface ColorOption {
  name: string;
  value: string;
  foreground: string;
}

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-themepicker',
  imports: [ZardButtonComponent, NgIcon, ZardTooltipImports, ZardBadgeComponent],
  templateUrl: './themepicker.html',
  styleUrl: './themepicker.css',
  viewProviders: [provideIcons({ lucideSun, lucideMoon, lucideMonitor, lucideGlobe, lucideLock })],
})
export class ThemePicker {
  private readonly darkModeService = inject(ZardDarkMode);
  private readonly navStorageService = inject(NavegadorStorage);
  private readonly platformId = inject(PLATFORM_ID);
  private static readonly STORAGE_KEY = 'color';

  readonly EDarkModes = EDarkModes;
  language: Language = 'es';
  currentTheme: DarkModeOptions = this.darkModeService.currentTheme() || EDarkModes.SYSTEM;
  currentColor: string = 'Azul';

  constructor() {
    const colorSelected = this.navStorageService.getItemLS(ThemePicker.STORAGE_KEY);
    if (colorSelected !== null) {
      this.currentColor = colorSelected;
    }
  }

  colorOptions: ColorOption[] = [
    {
      name: 'Amarillo',
      value: '47.9 95.8% 53.1%',
      foreground: '26 83.3% 14.1%',
    },
    {
      name: 'Azul',
      value: '221.2 83.2% 53.3%',
      foreground: '210 20% 98%',
    },
    {
      name: 'Naranja',
      value: '24.6 95% 53.1%',
      foreground: '60 9.1% 97.8%',
    },
    {
      name: 'Rojo',
      value: '346.8 77.2% 49.8%',
      foreground: '355.7 100% 97.3%',
    },
    {
      name: 'Rosa',
      value: '316.6 73.1% 52.4%',
      foreground: '210 20% 98%',
    },
    {
      name: 'Turquesa',
      value: '189 94% 43%',
      foreground: '210 20% 98%',
    },
    {
      name: 'Verde',
      value: '142.1 76.2% 36.3%',
      foreground: '355.7 100% 97.3%',
    },
    {
      name: 'Violeta',
      value: '262.1 83.3% 57.8%',
      foreground: '210 20% 98%',
    },
  ];

  languageOptions: LanguageOption[] = [
    {
      code: 'es',
      name: 'Español',
      flag: '/img/flags/es.png',
    },
    {
      code: 'en',
      name: 'Inglés',
      flag: '/img/flags/en.png',
      disabled: true,
    },
  ];

  handleThemeChange(theme: DarkModeOptions) {
    this.darkModeService.toggleTheme(theme);
    this.currentTheme = theme;
  }

  handleLanguageChange(lang: Language) {
    console.log(lang);
  }

  handleColorSelected(color: string) {
    this.navStorageService.setItemLS(ThemePicker.STORAGE_KEY, color);
    this.currentColor = color;
    this.applyPrimaryColor(color);
  }

  private applyPrimaryColor(colorValue: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const selectedColor = this.colorOptions.find(color => color.name === colorValue);
    if (!selectedColor) return;

    const root = document.documentElement;
    root.style.setProperty('--primary', `hsl(${selectedColor.value})`);
    root.style.setProperty('--primary-foreground', `hsl(${selectedColor.foreground})`);
    root.style.setProperty('--ring', `hsl(${selectedColor.value})`);
  }
}
