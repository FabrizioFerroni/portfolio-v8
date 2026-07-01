import { ZardAlertComponent } from '@/shared/components/alert';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardFormImports } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleCheck, lucideMail } from '@ng-icons/lucide';
import { Store } from '@ngrx/store';
import { SendForm, SendNewsletter } from './interface';
import {
  errorNewsletter,
  messageNewsletter,
  NewsletterAction,
  sendingNewsletter,
  statusCodeNewsletter,
} from './store';

@Component({
  selector: 'app-newsletter',
  imports: [
    NgIcon,
    ZardButtonComponent,
    ZardFormImports,
    ZardInputDirective,
    ReactiveFormsModule,
    ZardAlertComponent,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [provideIcons({ lucideMail, lucideCircleCheck })],
})
export class Newsletter {
  //#region Inyecciones
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  //#endregion

  //#region Variables
  status = signal<'iddle' | 'success' | 'error' | null>('iddle');
  messageStatus = signal<string>('');
  private dismissTimeoutId: ReturnType<typeof setTimeout> | null = null;
  //#endregion

  //#region formulario
  form: FormGroup<SendForm> = new FormGroup<SendForm>({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });
  //#endregion

  //#region Store
  readonly isLoading = this.store.selectSignal(sendingNewsletter);
  private readonly errorBack = this.store.selectSignal(errorNewsletter);
  private readonly messageBack = this.store.selectSignal(messageNewsletter);
  private readonly statusCodeBack = this.store.selectSignal(statusCodeNewsletter);
  //#endregion

  //#region inicializacion
  constructor() {
    this.handleResponse();
  }
  //#endregion

  //#region Getter validators
  get nameControl() {
    return this.form.get('name')!;
  }

  getNameError(): string {
    if (this.nameControl.hasError('required') && this.nameControl.touched) {
      return 'El nombre es requerido.';
    }

    return '';
  }

  get emailControl() {
    return this.form.get('email')!;
  }

  getEmailError(): string {
    if (this.emailControl.hasError('required') && this.emailControl.touched) {
      return 'El correo electrónico es requerido.';
    } else if (this.emailControl.hasError('email') && this.emailControl.touched) {
      return 'Porfavor ingresa un correo valido.';
    }

    return '';
  }
  //#endregion

  //#region Funciones
  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();

    const data: SendNewsletter = {
      name: rawValue.name,
      email: rawValue.email,
      source: 'portfolio',
    };

    this.status.set(null);
    this.messageStatus.set('');
    this.store.dispatch(NewsletterAction.sendSubscriber({ data }));
  }

  private handleResponse(): void {
    effect(() => {
      const statusCode = this.statusCodeBack();
      if (statusCode === null) return;

      if (statusCode >= 200 && statusCode < 300) {
        this.status.set('success');
        this.messageStatus.set(this.messageBack() ?? '');
        this.form.reset();
      } else {
        this.status.set('error');
        this.messageStatus.set(this.errorBack() ?? 'Ocurrió un error inesperado');
      }

      this.scheduleDismiss();
    });

    this.destroyRef.onDestroy(() => {
      if (this.dismissTimeoutId) clearTimeout(this.dismissTimeoutId);
    });
  }

  private scheduleDismiss(durationMs = 5000): void {
    if (this.dismissTimeoutId) clearTimeout(this.dismissTimeoutId);

    this.dismissTimeoutId = setTimeout(() => {
      this.status.set(null);
      this.messageStatus.set('');
    }, durationMs);
  }
  //#endregion
}
