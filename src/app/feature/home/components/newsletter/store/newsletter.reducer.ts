import { GenericState } from '@/shared/interfaces';
import { createFeature, createReducer, on } from '@ngrx/store';
import { NewsletterAction } from './newsletter.action';

const initialState: GenericState = {
  isLoading: false,
  error: null,
  message: null,
  statusCode: null,
};

export const newsletterFeature = createFeature({
  name: 'subscriber',
  reducer: createReducer(
    initialState,

    on(NewsletterAction.sendSubscriber, state => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,
      message: null,
    })),

    on(NewsletterAction.sendSubscriberSuccess, (state, { message, statusCode }) => ({
      ...state,
      isLoading: false,
      message,
      statusCode,
      error: null,
    })),

    on(NewsletterAction.sendSubscriberFailed, (state, { error, statusCode }) => ({
      ...state,
      isLoading: false,
      error,
      statusCode,
      message: null,
    }))
  ),
});
