import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from './environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//takes the data from the file to set it in the environment
const configFilePath = environment.production
  ? './assets/config.json'  //producción
  : './config.json';        //desarrollo

fetch(configFilePath)
  .then(response => response.json())
  .then(config => {
    (window as any).APP_CONFIG = config;

    environment.apiUrl = config.apiUrl;
    environment.baseHref = config.baseHref;
    environment.host_public = config.host_public;

    bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...appConfig.providers,
        { provide: APP_BASE_HREF, useValue: config.baseHref }, provideAnimationsAsync(),
      ]
    }).catch((err) => console.error(err));
  })
  .catch(err => {
    console.error('Error al cargar config.json:', err);

  });