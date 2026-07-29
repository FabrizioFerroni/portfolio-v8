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
  lucideContainer,
  lucideExternalLink,
  lucideFilter,
  lucideFolder,
  lucideFolderOpen,
  lucideGithub,
  lucideLock,
  lucideMonitor,
  lucideMonitorSmartphone,
  lucideRotateCcw,
  lucideSearch,
  lucideSearchX,
  lucideServer,
  lucideSortAsc,
  lucideSortDesc,
  lucideTabletSmartphone,
  lucideX,
} from '@ng-icons/lucide';
import {
  Component,
  signal,
  computed,
  inject,
  Injector,
  OnInit,
  DestroyRef,
  PLATFORM_ID,
  Signal,
  WritableSignal,
  viewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Accordion, Card, CardContent, Checkbox } from '@/shared/components/fabriziodev';
import { RouterLink } from '@angular/router';
import { SeoService } from '@/core';
import { Store } from '@ngrx/store';
import {
  errorProject,
  loadingMoreProject,
  loadingProject,
  paginationMeta,
  ProjectList,
  ProyectoActions,
  selectAllTechnologies,
  selectProjects,
} from '@/data-access';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  merge,
  Observable,
  skip,
  take,
} from 'rxjs';
import { PaginacionProjectQuery, Pagination } from '@/shared/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

const PROJECTS_PER_PAGE: number = 9;

const SORT_OPTIONS = ['date-desc', 'date-asc', 'name-asc', 'name-desc'] as const;
type SortBy = (typeof SORT_OPTIONS)[number];

// type guard
function isSortBy(value: string): value is SortBy {
  return (SORT_OPTIONS as readonly string[]).includes(value);
}

type CategoryId = 'all' | 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops';

interface Category {
  id: CategoryId;
  name: string;
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
      lucideMonitor,
      lucideServer,
      lucideMonitorSmartphone,
      lucideTabletSmartphone,
      lucideContainer,
      lucideFolder,
      lucideSearchX,
      lucideRotateCcw,
      lucideFolderOpen,
    }),
  ],
})
export class Proyectos implements OnInit {
  //#region injecciones
  private readonly seo = inject(SeoService);
  private readonly store = inject(Store);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  //#endregion

  //#region variables
  isOpenFilter = signal<boolean>(false);
  categories: Category[] = [
    { id: 'all', name: 'Todos' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Fullstack' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'devops', name: 'DevOps' },
  ];

  readonly searchTerm: WritableSignal<string | null> = signal<string | null>('');
  readonly categoryFilter: WritableSignal<CategoryId> = signal<CategoryId>('all');
  readonly visibilityFilter: WritableSignal<'all' | 'public' | 'private'> = signal<
    'all' | 'public' | 'private'
  >('all');
  readonly techFilters: WritableSignal<string[]> = signal<string[]>([]);
  readonly sortBy: WritableSignal<'date-desc' | 'date-asc' | 'name-asc' | 'name-desc'> =
    signal<SortBy>('date-desc');

  private readonly limit: WritableSignal<number> = signal<number>(PROJECTS_PER_PAGE);
  readonly currentPage: WritableSignal<number> = signal<number>(1);
  readonly totalPages: WritableSignal<number> = signal<number>(1);
  readonly hasNextPage: WritableSignal<boolean> = signal<boolean>(false);
  readonly totalItems: WritableSignal<number> = signal<number>(0);

  hasActiveFilters = computed(
    () =>
      this.searchTerm()!.trim().length > 0 ||
      this.categoryFilter()!.trim() !== 'all' ||
      this.visibilityFilter().trim() !== 'all' ||
      this.techFilters().length > 0
  );
  //#endregion

  //#region scroll infinito
  private readonly sentinel: Signal<ElementRef<HTMLDivElement> | undefined> =
    viewChild<ElementRef<HTMLDivElement>>('scrollAnchor');
  private observer?: IntersectionObserver | undefined;
  private requestInFlight: boolean = false;
  //#endregion

  //#region imports reducers
  readonly isLoading: Signal<boolean> = toSignal<boolean, false>(
    this.store.select(loadingProject),
    {
      initialValue: false,
    }
  );
  readonly isLoadingMore: Signal<boolean> = toSignal<boolean, false>(
    this.store.select(loadingMoreProject),
    { initialValue: false }
  );
  readonly projects: Signal<ProjectList[]> = toSignal<ProjectList[], ProjectList[]>(
    this.store.select(selectProjects),
    {
      initialValue: [],
    }
  );
  readonly allTechnologies: Signal<string[]> = toSignal(this.store.select(selectAllTechnologies), {
    initialValue: [],
  });
  readonly errorBack: Signal<string | null> = toSignal<string | null>(
    this.store.select(errorProject),
    {
      initialValue: null,
    }
  );
  readonly pagination$: Observable<Pagination | null> = this.store.select(paginationMeta);
  //#endregion

  //#region inicializacion y ciclo de vida
  constructor() {
    this.seo.updateSeoTags({
      title: 'Proyectos',
      description:
        'Página donde se demuestran todos los proyectos que he hecho a lo largo de mi experiencia',
    });
    this.seo.setIndexFollow(true);

    effect(() => {
      if (!this.isLoadingMore()) {
        this.requestInFlight = false;
      }
    });
  }

  ngOnInit(): void {
    this.initFilters();
    this.initPagination();
    this.store.dispatch(ProyectoActions.getAllTechnologies());
    this.initInfiniteScroll();
  }
  //#endregion

  //#region getters
  get skeletonItems(): number[] {
    return Array(this.limit());
  }
  //#endregion

  //#region inicializacion de datos
  private initPagination(): void {
    this.pagination$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((value: Pagination | null): value is Pagination => value !== null)
      )
      .subscribe({
        next: (value: Pagination) => {
          this.currentPage.set(value.currentPage);
          this.totalPages.set(value.totalPages);
          this.totalItems.set(value.totalItems);
          this.hasNextPage.set(value.hasNextPage);
        },
        error: (error: HttpErrorResponse) => {
          console.error(`Error obteniendo la paginación: ${error.message}`);
        },
      });
  }

  private initFilters(): void {
    const filters$ = combineLatest([
      toObservable(this.searchTerm, { injector: this.injector }),
      toObservable(this.categoryFilter, { injector: this.injector }),
      toObservable(this.visibilityFilter, { injector: this.injector }),
      toObservable(this.techFilters, { injector: this.injector }),
      toObservable(this.sortBy, { injector: this.injector }),
      toObservable(this.limit, { injector: this.injector }),
    ]).pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)));

    merge(filters$.pipe(take(1)), filters$.pipe(skip(1), debounceTime(400)))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.currentPage.set(1);
        this.fetchProjects(1);
      });
  }

  private initInfiniteScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    effect(
      () => {
        const el = this.sentinel()?.nativeElement;

        if (this.observer) {
          this.observer.disconnect();
          this.observer = undefined;
        }

        if (!el) return;

        this.observer = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting) this.loadNextPage();
          },
          { rootMargin: '0px' }
        );
        this.observer.observe(el);
      },
      { injector: this.injector }
    );

    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  private fetchProjects(page: number): void {
    this.store.dispatch(ProyectoActions.getProyectos({ paginado: this.buildPaginado(page) }));
  }
  //#endregion

  //#region paginado
  private buildPaginado(page: number): PaginacionProjectQuery {
    return {
      page,
      limit: this.limit(),
      search: this.searchTerm() || null,
      category: this.categoryFilter() !== 'all' ? this.categoryFilter() : 'all',
      visibility: this.visibilityFilter() !== 'all' ? this.visibilityFilter() : 'all',
      technologies: this.techFilters(),
      sortBy: this.sortBy(),
    };
  }

  loadNextPage(): void {
    if (!this.hasNextPage() || this.isLoading() || this.isLoadingMore() || this.requestInFlight) {
      return;
    }

    this.requestInFlight = true;
    const nextPage = this.currentPage() + 1;
    this.currentPage.set(nextPage);
    this.fetchProjects(nextPage);
  }

  readonly paginationLabel: Signal<string> = computed(
    () => `Mostrando ${this.projects().length} de ${this.totalItems()} proyectos`
  );

  readonly showEndOfListMessage: Signal<boolean> = computed(
    () => !this.hasNextPage() && this.totalPages() > 1
  );
  //#endregion

  //#region funciones
  handleTechFilterChange(tech: string): void {
    this.techFilters.update(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  }

  setSortBy(value: string | string[]): void {
    const raw = Array.isArray(value) ? value[0] : value;
    if (isSortBy(raw)) {
      this.sortBy.set(raw);
    }
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

  //#region clearfilters
  clearFilters(): void {
    this.searchTerm.set('');
    this.categoryFilter.set('all');
    this.visibilityFilter.set('all');
    this.techFilters.set([]);
    this.sortBy.set('date-desc');
    this.currentPage.set(1);
  }
  //#endregion
}
