import { FormControl } from '@angular/forms';

export interface SendForm {
  name: FormControl<string>;
  email: FormControl<string>;
}

export interface SendNewsletter {
  name: string;
  email: string;
  source: string;
}
