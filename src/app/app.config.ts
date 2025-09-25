import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MatNativeDateModule } from '@angular/material/core';
// import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AuthGuard } from './security/auth-guard.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeMX from '@angular/common/locales/es-MX';
import { SpinnerInterceptor } from './services/spinner.interceptor';
registerLocaleData(localeMX);
export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    MatNativeDateModule,
    AuthGuard,
    // { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    //{ provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-MX' },
  ],
};
