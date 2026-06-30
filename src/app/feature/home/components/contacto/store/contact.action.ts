import { createActionGroup, props } from '@ngrx/store';
import { SendContact } from '../interfaces';

export const ContactoAction = createActionGroup({
  source: 'Contacts',
  events: {
    'Send Contact': props<{ data: SendContact }>(),
    'Send Contact Success': props<{ message: string; statusCode: number }>(),
    'Send Contact Failed': props<{ error: string; statusCode: number }>(),
  },
});
