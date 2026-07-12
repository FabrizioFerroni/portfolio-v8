import { Footer, Navbar } from '@/layout';
import { ZardButtonComponent } from '@/shared/components/button';
import { Rutas } from '@/shared/utils';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowLeft,
  lucideArrowRight,
  lucideContainer,
  lucideExternalLink,
  lucideFolder,
  lucideFolderSearch,
  lucideGithub,
  lucideHome,
  lucideImageOff,
  lucideLock,
  lucideMaximize2,
  lucideMonitor,
  lucideMonitorSmartphone,
  lucideQuote,
  lucideServer,
  lucideTabletSmartphone,
} from '@ng-icons/lucide';
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
import { SeoService } from '@/core';
import { Store } from '@ngrx/store';
import {
  errorProject,
  imageLoadingProject,
  imagesSelectedProject,
  loadingProject,
  ProjectImageList,
  ProjectList,
  ProjectRelated,
  ProjectTechnologieList,
  ProyectoActions,
  relatedsSelectedProject,
  selectProject,
  statusCodeProject,
} from '@/data-access';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

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
      lucideImageOff,
      lucideMonitor,
      lucideServer,
      lucideMonitorSmartphone,
      lucideTabletSmartphone,
      lucideContainer,
      lucideFolder,
    }),
  ],
})
export class Proyecto {
  //#region Inyecciones
  private readonly seo = inject(SeoService);
  private readonly store = inject(Store);
  //#endregion

  //#region Variables
  readonly slug: InputSignal<string> = input.required<string>();
  readonly baseRoute: string = `/${Rutas.PROYECTOS}`;
  readonly homeRoute: string = `/${Rutas.HOME}`;
  selectedImage: WritableSignal<{ url: string; description: string } | null> = signal<{
    url: string;
    description: string;
  } | null>(null);
  activeTab: WritableSignal<string> = signal<string>('overview');
  //#endregion

  //#region imports reducers
  project: Signal<ProjectList | null> = toSignal<ProjectList | null>(
    this.store.select(selectProject),
    { initialValue: null }
  );
  galleryImages: Signal<ProjectImageList[] | null> = toSignal<
    ProjectImageList[] | null,
    ProjectImageList[]
  >(this.store.select(imagesSelectedProject), {
    initialValue: [] as ProjectImageList[],
  });
  groupedTechnologies: Signal<{
    frontend: ProjectTechnologieList[];
    backend: ProjectTechnologieList[];
    devops: ProjectTechnologieList[];
    databases: ProjectTechnologieList[];
    tools: ProjectTechnologieList[];
    others: ProjectTechnologieList[];
  }> = computed(() => {
    const techs = this.project()?.technologies ?? [];
    return {
      frontend: techs.filter(t => t.category === 'frontend'),
      backend: techs.filter(t => t.category === 'backend'),
      devops: techs.filter(t => t.category === 'devops'),
      databases: techs.filter(t => t.category === 'database'),
      tools: techs.filter(t => t.category === 'tools'),
      others: techs.filter(t => t.category === 'other'),
    };
  });
  projectLoading: Signal<boolean> = toSignal<boolean, false>(this.store.select(loadingProject), {
    initialValue: false,
  });
  isLoadingImagesBack: Signal<boolean> = toSignal<boolean, false>(
    this.store.select(imageLoadingProject),
    {
      initialValue: false,
    }
  );
  error$: Observable<string | null> = this.store.select(errorProject);
  statusCode$: Observable<number | null> = this.store.select(statusCodeProject);
  relatedProjects: Signal<ProjectRelated[]> = toSignal<ProjectRelated[], ProjectRelated[]>(
    this.store.select(relatedsSelectedProject),
    {
      initialValue: [] as ProjectRelated[],
    }
  );
  //#endregion

  //#region Ciclo de vida angular
  constructor() {
    effect(() => {
      const slug: string = this.slug();
      this.store.dispatch(ProyectoActions.getProyectoBySlug({ slug }));
    });

    effect(() => {
      const project: ProjectList | null = this.project();

      if (project) {
        this.seo.updateSeoTags({
          title: project.title,
          description: project.description,
          image: project.imageFullUrl,
          type: 'proyect',
          locale: 'es_AR',
        });
        this.seo.setIndexFollow(true);
        this.getDataImg(project.id);
        this.getRelatedProjects(project.id);
      } else if (!this.projectLoading()) {
        this.seo.updateSeoTags({
          title: 'Proyecto no encontrado',
          description: 'El proyecto buscado no fue encontrado, pruebe con otro metodo de busqueda',
          type: 'proyect',
        });

        this.seo.setIndexFollow(false);
      }
    });
  }
  //#endregion

  //#region Funciones
  getDataImg(projectId: string) {
    this.store.dispatch(ProyectoActions.getImagesByProjectId({ projectId }));
  }

  getRelatedProjects(projectId: string) {
    this.store.dispatch(ProyectoActions.getRelatedProjectsByProjectId({ projectId }));
  }

  setActiveTab(value: string | string[]) {
    this.activeTab.set(value as string);
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
