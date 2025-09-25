import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const showSpinner = !(
      req.url.includes(UrlConstante.GET_RECENT_APPS) ||
      req.url.includes(UrlConstante.SAVE_RECENT_APPS)
    );

    if (showSpinner) {
      this.spinnerService.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (showSpinner) {
          this.spinnerService.hide();
        }
      })
    );
  }
}