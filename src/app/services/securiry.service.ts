import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserApplicationDTO } from '../utilerias/model/user-application-dto';
import { Constante } from '../utilerias/constantes/constante';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { UserInformation } from '../utilerias/model/user-information';
import { CurrentAccessService } from './current-access.service';
import { MenuAppItem } from '../utilerias/model/menu-app-item';
import { Mensajes } from './mensajes';
import { MensajeConstante } from '../utilerias/constantes/mensaje-constante';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private userValidation: Observable<UserInformation> | null = null;
  private url = environment.apiUrl;
  private userInformation: UserInformation | null = null;

  constructor(
    public http: HttpClient,
    private router: Router,
    private currentAccessService: CurrentAccessService,
    private msg: Mensajes
  ) { 

  }

  getMenu(appCode: string): Observable<MenuAppItem[]> {
    
    this.userInformation = this.currentAccessService.getUserInformation();
    //const userID = this.userInformation.userID;
    const userID ='yyy3d60'
    var domain = window.location.hostname;

    const host_public = environment.host_public;
    const paramentros = domain != host_public ? {} : {
      params: { userID }
    }
    
    appCode = appCode ? '/'+appCode : '';

    return this.http.get<MenuAppItem[]>(`${this.url}${UrlConstante.GET_ESTRUCTURA_MENU_APPS}`,{
      params: {
        userID
      }
    }).pipe(
      tap(response => {
        if (response == undefined || response == null || (response.length == 0 && appCode == Constante.EMPTY)) {
          this.router.navigate([UrlConstante.SECURITY]);
        }
      }),
      catchError(error => {
        if (error?.status == 401)
          this.router.navigateByUrl('/' + UrlConstante.SECURITY);
        else {
          //this.router.navigateByUrl('/' + UrlConstante.NOT_SPECIFIED);
          this.msg.err("",MensajeConstante.ERROR_CARGA_DE_MENUS)
        }
        throw error;
      })
    );
  }

  /* validateUser(): Observable<UserInformation> {
    if (!this.userValidation) {
      var domain = window.location.hostname;
      const host_public = environment.host_public;
      console.log("Dominio",domain)
      
      if(domain != host_public){
        this.userValidation = this.http.get<UserInformation>(`${this.url}${UrlConstante.GET_USER_INTER}`).pipe(
          shareReplay(1),
          catchError(error => {
            this.userValidation = null;
            throw error;
          })
        );
      }else{
        let userAuth = (window as any)['UsuarioISAM'];
        userAuth = userAuth ? userAuth : "yyy3v57";
        
        this.userValidation = this.http.get<UserInformation>(`${this.url}${UrlConstante.GET_USER}`, {
          params: { userAuth }
        }).pipe(
          shareReplay(1),
          catchError(error => {
            this.userValidation = null;
            throw error;
          })
        ); 
      }
    }
    return this.userValidation;
  }
   */

   validateUser(): Observable<UserInformation> {
    if (!this.userValidation) {
      let userAuth = (window as any)['UsuarioISAM'];
      userAuth = userAuth ?? "";

      const params = new HttpParams().set('userAuth', "yyy3d60");
      this.userValidation = this.http.get<UserInformation>(`${this.url}${UrlConstante.GET_USER}`, { params })
        .pipe(
          shareReplay(1),
          catchError(error => {
            this.userValidation = null;
            throw error;
          })
        );
    }
    return this.userValidation;
  }

  validateUserExt(): Observable<UserInformation> {
    if (!this.userValidation) {
      let userAuth = (window as any)['UsuarioISAM'];
      userAuth = userAuth ? userAuth : "yyy3v57";
      
      this.userValidation = this.http.get<UserInformation>(`${this.url}${UrlConstante.GET_USER}`, {
        params: { userAuth }
      }).pipe(
        shareReplay(1),
        catchError(error => {
          this.userValidation = null;
          throw error;
        })
      );
    }
    return this.userValidation;
  }

  getUsersByStatus(st_activo:boolean): Observable<UserInformation[]> {
    const params = new HttpParams()
    .set('status', st_activo);  

    return this.http.get<UserInformation[]>(`${this.url}${UrlConstante.GET_USERS}`,{params}).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}

