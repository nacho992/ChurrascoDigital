import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";


import { routes } from './layout/app.routes';
import { errorInterceptor } from './Interceptors/errors/error.interceptor';
import { authInterceptor } from './Interceptors/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withFetch(),withInterceptors([errorInterceptor,authInterceptor]))
  ]
};
