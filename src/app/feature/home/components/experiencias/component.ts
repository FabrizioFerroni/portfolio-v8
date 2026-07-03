import { ZardBadgeComponent } from '@/shared/components/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/fabriziodev';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExperienceAction, selectExperiences, sendingExperience } from './store';
import { ExperienceData, ExperienceWithPeriod } from './interfaces';

@Component({
  selector: 'app-experiencias',
  imports: [Card, CardHeader, CardTitle, CardContent, ZardBadgeComponent],
  templateUrl: './component.html',
  styleUrl: './component.css',
})
export class Experiencias implements OnInit {
  //#region Inyecciones
  private readonly store = inject(Store);
  //#endregion

  //#region Store
  readonly isLoading = this.store.selectSignal(sendingExperience);
  readonly experiencesList = computed<ExperienceWithPeriod[]>(() =>
    this.store
      .selectSignal(selectExperiences)()
      .map((exp: ExperienceData) => ({
        ...exp,
        skills: exp.skills ?? [],
        achievements: exp.achievements ?? [],
        period: this.getPeriod(exp.startsDate, exp.endsDate, exp.currentPosition),
      }))
  );
  //#endregion

  //#region ciclo de vida de angular
  ngOnInit() {
    this.store.dispatch(ExperienceAction.getExperience());
  }
  //#endregion

  //#region Funciones
  getPeriod(startsDate: Date, endsDate: Date | null, currentPosition: boolean): string {
    const startYear = new Date(startsDate).getFullYear();

    if (currentPosition || !endsDate) {
      return `${startYear} - Presente`;
    }

    const endYear = new Date(endsDate).getFullYear();
    return `${startYear} - ${endYear}`;
  }
  //#endregion
}
