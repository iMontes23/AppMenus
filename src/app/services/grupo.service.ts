import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { GrupoDTO } from '../models/grupo-dto';
import { UserGroupDTO } from '../models/user-group-dto';
@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getGruposByStatus(st_activo:boolean): Observable<GrupoDTO[]> {
    const params = new HttpParams()
    .set('status', st_activo);  

    return this.http.get<GrupoDTO[]>(`${this.url}${UrlConstante.GET_GRUPOS}`,{params}).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getGruposUsuarioByStatus(st_activo:boolean): Observable<UserGroupDTO[]> {
    const params = new HttpParams()
    .set('status', st_activo);  
    
    return this.http.get<UserGroupDTO[]>(`${this.url}${UrlConstante.GET_GRUPOS_USUARIO}`,{params}).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

}
