export interface CVState {
  isLoadingDownloadCV: boolean;
  downloadCV: string | null;
  errorDownloadCV: string | null;
  statusCodeDownloadCV: number | null;
}
