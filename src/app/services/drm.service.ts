import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { VisitRegistrationDTO } from '../models/visit-registration-dto';
import { EntityTypeDTO } from '../models/entity-type-dto';
import { EntityDTO } from '../models/entity-dto';
import { UserGroupDTO } from '../models/user-group-dto';
import { ParamDTO } from '../models/param-dto';

@Injectable({
  providedIn: 'root'
})
export class DrmService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }


  getAllVisit(startDate: Date, endDate: Date): Observable<VisitRegistrationDTO[]> {
    const parametros = new HttpParams()
    .set('startDate', startDate.toISOString().split('T')[0])
    .set('endDate', endDate.toISOString().split('T')[0]);

    return this.http.get<VisitRegistrationDTO[]>
    (`${this.url}${UrlConstante.GET_VISIT}`,{ params: parametros }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  saveWithFile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}${UrlConstante.SAVE_VISIT}`, formData).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  delete(visit: VisitRegistrationDTO): Observable<VisitRegistrationDTO> {
    return this.http.post<VisitRegistrationDTO>(`${this.url}${UrlConstante.DELETE_VISIT}`, visit);
  }


  getAllEntities(): Observable<EntityDTO[]> {
    return this.http.get<EntityDTO[]>(`${this.url}${UrlConstante.GET_ENTITY}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getAllEntityTypes(): Observable<EntityTypeDTO[]> {
    return this.http.get<EntityTypeDTO[]>(`${this.url}${UrlConstante.GET_ENTITY_TYPE}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }


  getGroup(): Observable<UserGroupDTO[]> {
    return this.http.get<UserGroupDTO[]>(`${this.url}${UrlConstante.GET_USER_GROUP}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getParam(descripcion:string): Observable<ParamDTO> {
    const paramentros =  {
      params: { descripcion }
    }

    return this.http.get<ParamDTO>(`${this.url}${UrlConstante.GET_PARAM}`,paramentros
    ).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
