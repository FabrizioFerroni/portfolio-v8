import { createActionGroup, props } from '@ngrx/store';
import { SendNewsletter } from '../interface';

export const NewsletterAction = createActionGroup({
  source: 'Subscribers',
  events: {
    'Send Subscriber': props<{ data: SendNewsletter }>(),
    'Send Subscriber Success': props<{ message: string; statusCode: number }>(),
    'Send Subscriber Failed': props<{ error: string; statusCode: number }>(),
  },
});
