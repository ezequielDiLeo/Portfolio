import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';


// CUSTOM TRANSLATE LOADER
export class JsonTranslateLoader implements TranslateLoader {

  getTranslation(lang: string): Observable<any> {
    return new Observable(observer => {

      fetch(`/i18n/${lang}.json`)
        .then(res => res.json())
        .then(json => {
          observer.next(json);
          observer.complete();
        })
        .catch(err => {
          console.error('Error loading translations:', err);
          observer.next({});
          observer.complete();
        });

    });
  }
}


// APP CONFIG
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),

    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useClass: JsonTranslateLoader
      }
    }),

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
