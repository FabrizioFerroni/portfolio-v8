import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronUp } from '@ng-icons/lucide';
import { ZardTooltipImports } from '../../tooltip';
import { ZardButtonComponent } from '../../button';

@Component({
  selector: 'app-go-to-top',
  imports: [NgIcon, ZardTooltipImports, ZardButtonComponent],
  templateUrl: './go-top.html',
  styleUrl: './go-top.css',
  viewProviders: [provideIcons({ lucideChevronUp })],
})
export class GoToTop {
  //#region Inyecciones
  private destroyRef = inject(DestroyRef);
  //#endregion

  //#region Variables
  protected readonly visible = signal<boolean>(false);
  private readonly threshold = 400;
  //#endregion

  //#region Inyecciones de dependencia
  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        this.visible.set(window.scrollY > this.threshold);
      };

      window.addEventListener('scroll', onScroll, { passive: true });

      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
  //#endregion

  //#region Funciones
  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  //#endregion
}
