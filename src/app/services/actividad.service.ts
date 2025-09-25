import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { ActividadDTO } from '../models/actividad-dto';
@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getActividadesSemanales(cd_grupo: number): Observable<ActividadDTO[]> {
    return this.http.get<ActividadDTO[]>(`${this.url}${UrlConstante.GET_ACTIVITY}`,{
      params: { cd_grupo }
    }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

}
