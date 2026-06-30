import { ZardAlertComponent } from '@/shared/components/alert';
import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { ZardFormImports } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCircleCheck,
  lucideGlobe,
  lucideMail,
  lucideMapPin,
  lucideSend,
} from '@ng-icons/lucide';
import { SendContact, SendForm } from './interfaces';
import { Store } from '@ngrx/store';
import {
  ContactoAction,
  errorContact,
  messageContact,
  sendingContact,
  statusCodeContact,
} from './store';

@Component({
  selector: 'app-contacto',
  imports: [
    Card,
    CardContent,
    NgIcon,
    ZardFormImports,
    ZardInputDirective,
    ZardButtonComponent,
    ZardAlertComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './component.html',
  styleUrl: './component.css',
  viewProviders: [
    provideIcons({ lucideMail, lucideMapPin, lucideGlobe, lucideSend, lucideCircleCheck }),
  ],
})
export class Contacto {
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
    subject: new FormControl('', { nonNullable: true, validators: Validators.required }),
    message: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });
  //#endregion

  //#region Store
  readonly isLoading = this.store.selectSignal(sendingContact);
  private readonly errorBack = this.store.selectSignal(errorContact);
  private readonly messageBack = this.store.selectSignal(messageContact);
  private readonly statusCodeBack = this.store.selectSignal(statusCodeContact);
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

  get subjectControl() {
    return this.form.get('subject')!;
  }

  getSubjectError(): string {
    if (this.subjectControl.hasError('required') && this.subjectControl.touched) {
      return 'El asunto es requerido.';
    }

    return '';
  }

  get messageControl() {
    return this.form.get('message')!;
  }

  getMessageError(): string {
    if (this.messageControl.hasError('required') && this.messageControl.touched) {
      return 'El mensaje es requerido.';
    }

    return '';
  }
  //#endregion

  //#region funciones
  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: SendContact = this.form.getRawValue();
    this.status.set(null);
    this.messageStatus.set('');
    this.store.dispatch(ContactoAction.sendContact({ data }));
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
