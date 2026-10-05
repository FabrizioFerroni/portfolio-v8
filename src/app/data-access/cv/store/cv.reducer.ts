import { createFeature, createReducer, on } from '@ngrx/store';
import { CVState } from '../interface';
import { CVActions } from './cv.action';

const initialState: CVState = {
  isLoadingDownloadCV: false,
  downloadCV: null,
  errorDownloadCV: null,
  statusCodeDownloadCV: null,
};

export const cvFeature = createFeature({
  name: 'cv',
  reducer: createReducer(
    initialState,

    on(CVActions.downloadCV, state => ({
      ...state,
      isLoadingDownloadCV: true,
      downloadCV: null,
      errorDownloadCv: null,
      statusCodeDownloadCV: null,
    })),

    on(CVActions.downloadCVSuccess, (state, { filename }) => ({
      ...state,
      isLoadingDownloadCV: false,
      downloadCV: filename,
      errorDownloadCv: null,
      statusCodeDownloadCV: null,
    })),

    on(CVActions.downloadCVFailure, (state, { error, statusCode }) => ({
      ...state,
      isLoadingDownloadCV: false,
      downloadCV: null,
      errorDownloadCv: error,
      statusCodeDownloadCV: statusCode,
    }))
  ),
});
