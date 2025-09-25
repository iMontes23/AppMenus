import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (this.authenticationService.isAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-Auth-Token': this.authenticationService.getToken()
                }
            });
        }

        return next.handle(request);
    }
}