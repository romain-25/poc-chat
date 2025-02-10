import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(withFetch()) ,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }]
};
