import { ZardAlertComponent } from '@/shared/components/alert';
import { ZardButtonComponent } from '@/shared/components/button';
import { Card, CardContent } from '@/shared/components/fabriziodev';
import { ZardFormImports } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCircleCheck,
  lucideGlobe,
  lucideMail,
  lucideMapPin,
  lucideSend,
} from '@ng-icons/lucide';

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
  isSubbmiting = signal<boolean>(false);
  status = signal<'iddle' | 'success' | 'error' | null>('iddle');
  messageStatus = signal<string>('');

  form: FormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    subject: new FormControl('', { nonNullable: true, validators: Validators.required }),
    message: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

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

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubbmiting.set(true);

    const rawValue = this.form.getRawValue();

    if (
      rawValue['name'] === 'Fabrizio Ferroni' &&
      rawValue['email'] === 'fabrizioferroni@outlook.com' &&
      rawValue['subject'] === 'Test' &&
      rawValue['message'] === 'Test form'
    ) {
      this.status.set('success');
      this.messageStatus.set(
        `Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo lo antes posible.`
      );
    } else {
      this.status.set('error');
      this.messageStatus.set(`Hubo un error al enviar el correo, por favor intente mas tarde!`);
    }
    console.log(rawValue);
    setTimeout(() => {
      this.isSubbmiting.set(false);
    }, 2500);

    setTimeout(() => {
      this.resetForm();
    }, 5000);
  }

  resetForm() {
    this.form.reset();
    this.status.set(null);
    this.messageStatus.set('');
  }
}
