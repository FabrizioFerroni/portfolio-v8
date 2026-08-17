import { ZardBadgeComponent } from '@/shared/components/badge';
import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { CommonModule, NgOptimizedImage } from '@angular/common';
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
  lucideContainer,
  lucideExternalLink,
  lucideFolder,
  lucideFolderOpen,
  lucideGithub,
  lucideGrid,
  lucideLock,
  lucideMonitor,
  lucideMonitorSmartphone,
  lucideRotateCcw,
  lucideServer,
  lucideTabletSmartphone,
} from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadingProject,
  ProjectHome,
  ProjectTechnologieList,
  ProyectoActions,
  selectProjectHome,
} from '@/data-access';
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
    CommonModule,
    ZardButtonComponent,
    ZardBadgeComponent,
    ZardSkeletonComponent,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [
    provideIcons({
      lucideLock,
      lucideGithub,
      lucideExternalLink,
      lucideArrowRight,
      lucideGrid,
      lucideMonitor,
      lucideServer,
      lucideMonitorSmartphone,
      lucideTabletSmartphone,
      lucideContainer,
      lucideFolder,
      lucideFolderOpen,
      lucideRotateCcw,
    }),
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
    { id: 'devops', name: 'DevOps' },
  ];
  readonly skeletonItems = Array.from({ length: 6 }, (_, i) => i);
  protected readonly maxVisibleTechs = 4;
  //#endregion

  //#region Store
  readonly isLoading = this.store.selectSignal(loadingProject);
  readonly projectList = computed<ProjectHome[]>(() =>
    this.store
      .selectSignal(selectProjectHome)()
      .map((proj: ProjectHome) => proj)
  );

  protected readonly gridColsClass = computed(() => {
    const count = this.projectList().length;
    if (count === 1) return 'grid-cols-1 max-w-md';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2 max-w-5xl';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  });
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

  protected visibleTechnologies(project: ProjectHome): ProjectTechnologieList[] {
    return project.technologies.slice(0, this.maxVisibleTechs);
  }

  protected hiddenTechCount(project: ProjectHome): number {
    return Math.max(0, project.technologies.length - this.maxVisibleTechs);
  }

  private readonly categoryMeta: Record<string, { icon: string; label: string }> = {
    frontend: { icon: 'lucideMonitor', label: 'Frontend' },
    backend: { icon: 'lucideServer', label: 'Backend' },
    fullstack: { icon: 'lucideMonitorSmartphone', label: 'FullStack' },
    mobile: { icon: 'lucideTabletSmartphone', label: 'Mobile' },
    devops: { icon: 'lucideContainer', label: 'DevOps' },
  };

  getCategoryMeta(category: string): {
    icon: string;
    label: string;
  } {
    return this.categoryMeta[category] ?? { icon: 'lucideFolder', label: category };
  }
  //#endregion
}
