import { createFeature, createReducer, on } from '@ngrx/store';
import { ContactState } from '../interfaces';
import { ContactoAction } from './contact.action';

const initialState: ContactState = {
  isLoading: false,
  error: null,
  message: null,
  statusCode: null,
};

export const contactFeature = createFeature({
  name: 'contacts',
  reducer: createReducer(
    initialState,

    on(ContactoAction.sendContact, state => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,
      message: null,
    })),

    on(ContactoAction.sendContactSuccess, (state, { message, statusCode }) => ({
      ...state,
      isLoading: false,
      error: null,
      statusCode: statusCode,
      message: message,
    })),

    on(ContactoAction.sendContactFailed, (state, { error, statusCode }) => ({
      ...state,
      isLoading: false,
      error: error,
      statusCode: statusCode,
      message: null,
    }))
  ),
});
