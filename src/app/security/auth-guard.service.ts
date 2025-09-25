
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SecurityService } from '../services/securiry.service';
import { CurrentAccessService } from '../services/current-access.service';
import { UrlConstante } from '../utilerias/constantes/url-constante';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private currentAccessService: CurrentAccessService,
    private securityService: SecurityService
  ) { }

  canActivate(): Observable<boolean> {
    return this.securityService.validateUser().pipe(
      map(response => {
        if (response && response.userName) {
          this.currentAccessService.setUserInformation(response);
          return true;
        } else {
          this.router.navigate([UrlConstante.SECURITY]);
          return false;
        }
      }),
      catchError(error => {
        this.router.navigate([UrlConstante.SECURITY]);
        throw error;
      })
    );
  }

  canActivateChild(): boolean {
    return true;
  }
}
