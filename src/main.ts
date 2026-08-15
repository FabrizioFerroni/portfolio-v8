import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import './imports-prims';

(globalThis as unknown as { process: unknown }).process = { env: {} };

bootstrapApplication(App, appConfig).catch(err => console.error(err));
