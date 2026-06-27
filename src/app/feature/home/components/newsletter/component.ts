import { ZardAlertComponent } from '@/shared/components/alert';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardFormImports } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleCheck, lucideMail } from '@ng-icons/lucide';

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
  isSubmitting = signal<boolean>(false);
  status = signal<'iddle' | 'success' | 'error' | null>('iddle');
  messageStatus = signal<string>('');

  form: FormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
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

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);

    const rawValue = this.form.getRawValue();

    if (
      rawValue['name'] === 'Fabrizio Ferroni' &&
      rawValue['email'] === 'fabrizioferroni@outlook.com'
    ) {
      this.status.set('success');
      this.messageStatus.set(
        `Gracias por suscribirte, ${rawValue['name']}. Pronto recibirás un email de confirmación.`
      );
    } else {
      this.status.set('error');
      this.messageStatus.set(`Hubo un error al subscribirte`);
    }
    console.log(rawValue);
    setTimeout(() => {
      this.isSubmitting.set(false);
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
