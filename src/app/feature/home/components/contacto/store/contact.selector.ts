import { contactFeature } from './contact.reducer';

export const sendingContact = contactFeature.selectIsLoading;
export const errorContact = contactFeature.selectError;
export const messageContact = contactFeature.selectMessage;
export const statusCodeContact = contactFeature.selectStatusCode;
