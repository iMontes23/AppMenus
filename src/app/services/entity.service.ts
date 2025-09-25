import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { EntityDTO } from '../models/entity-dto';
@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getAllEntities(): Observable<EntityDTO[]> {
    return this.http.get<EntityDTO[]>(`${this.url}${UrlConstante.GET_ENTITY}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getAllEntitiesByUserAndType(IdUser:string, idTipo:number): Observable<EntityDTO[]> {

    const params = new HttpParams()
    .set('IdUser', IdUser.toString())
    .set('idEntityType', idTipo.toString());  

    return this.http.get<EntityDTO[]>(`${this.url}${UrlConstante.GET_ENTITY_BY_COUNTRY_AND_TYPE}`,{params}).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  saveNewClient(newClient: EntityDTO): Observable<any> {
    return this.http.post<any>(`${this.url}${UrlConstante.SAVE_NEW_CLIENT}`, newClient).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  saveEntity(formData: FormData, cd_pais: number): Observable<any> {
    const params = new HttpParams() 
    .set('cd_pais', cd_pais.toString());

    return this.http.post<any>(`${this.url}${UrlConstante.SAVE_ENTITY}`, formData, {params}).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

}
