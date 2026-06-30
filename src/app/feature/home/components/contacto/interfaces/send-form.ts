import { FormControl } from '@angular/forms';

export interface SendForm {
  name: FormControl<string>;
  email: FormControl<string>;
  subject: FormControl<string>;
  message: FormControl<string>;
}

export interface SendContact {
  name: string;
  email: string;
  subject: string;
  message: string;
}
