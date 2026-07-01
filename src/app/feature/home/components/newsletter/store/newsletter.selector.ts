import { newsletterFeature } from './newsletter.reducer';

export const sendingNewsletter = newsletterFeature.selectIsLoading;
export const errorNewsletter = newsletterFeature.selectError;
export const messageNewsletter = newsletterFeature.selectMessage;
export const statusCodeNewsletter = newsletterFeature.selectStatusCode;
