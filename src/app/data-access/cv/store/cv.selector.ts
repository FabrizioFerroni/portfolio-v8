import { cvFeature } from './cv.reducer';

export const downloadCV = cvFeature.selectDownloadCV;
export const isLoadingDownloadCV = cvFeature.selectIsLoadingDownloadCV;
export const errorDownloadCV = cvFeature.selectErrorDownloadCV;
export const statusCodeDownloadCV = cvFeature.selectStatusCodeDownloadCV;
