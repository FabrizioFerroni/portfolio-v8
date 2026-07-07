import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
  OnInit,
  effect,
  Injector,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideExternalLink,
  lucideGithub,
  lucideGrid,
  lucideLock,
} from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadingProject, ProjectHome, ProyectoActions, selectProjectHome } from '@/data-access';
import { PaginationProjectHomeQuery } from '@/shared/interfaces';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';

interface CategoryType {
  id: string;
  name: string;
}

@Component({
  selector: 'app-proyectos-home',
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIcon,
    Card,
    CardContent,
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardSkeletonComponent,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [
    provideIcons({ lucideLock, lucideGithub, lucideExternalLink, lucideArrowRight, lucideGrid }),
  ],
})
export class ProyectosHome implements OnInit {
  //#region Inyecciones
  private readonly store = inject(Store);
  private readonly injector = inject(Injector);
  //#endregion

  //#region Variables
  catFilter: WritableSignal<string> = signal<string>('all');
  categories: CategoryType[] = [
    { id: 'all', name: 'Todos' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Fullstack' },
    { id: 'mobile', name: 'Mobile' },
  ];
  readonly skeletonItems = Array.from({ length: 6 }, (_, i) => i);
  //#endregion

  //#region Store
  readonly isLoading = this.store.selectSignal(loadingProject);
  readonly projectList = computed<ProjectHome[]>(() =>
    this.store
      .selectSignal(selectProjectHome)()
      .map((proj: ProjectHome) => proj)
  );
  //#endregion

  //#region ciclo de vida de angular
  ngOnInit() {
    effect(
      () => {
        const param: PaginationProjectHomeQuery = {
          category: this.catFilter(),
        };
        this.store.dispatch(ProyectoActions.getProyectosHome({ param }));
      },
      { injector: this.injector }
    );
  }
  //#endregion

  //#region Funciones
  setFilter(id: string) {
    this.catFilter.set(id);
  }
  //#endregion
}
