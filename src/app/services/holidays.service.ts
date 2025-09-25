import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { DiasFestivosDTO } from '../models/dias_festivos-dto';
import { map } from 'rxjs/operators';
import { RangoFechasDTO } from '../models/rango-fechas-dto';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getDiasFestivosEnRango(rango: RangoFechasDTO): Observable<DiasFestivosDTO[]> {
    return this.http.post<DiasFestivosDTO[]>(`${this.url}${UrlConstante.GET_DAYS_IN_RANGE}`, rango).pipe(
      catchError(error => {
        console.error('Error al consultar días festivos:', error);
         throw error;
      })
    );
  }

  validateHolidaysList(list: DiasFestivosDTO[]): Observable<DiasFestivosDTO[]> {
    return this.http.post<DiasFestivosDTO[]>(`${this.url}${UrlConstante.VALIDATE_DAY_LIST}`, list
    ).pipe(
      catchError(error => {
        throw error;
      })
    )
  }

  SaveHolidaysList(list: DiasFestivosDTO[]): Observable<DiasFestivosDTO[]> {
    return this.http.post<DiasFestivosDTO[]>(`${this.url}${UrlConstante.SAVE_DAY_LIST}`, list
    ).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  downloadTemplate(pais: number): Observable<Blob> {
    const parametros = { pais };

    const options = {
      params: parametros,
      responseType: 'arraybuffer' as 'json'
    };

    return this.http.get<ArrayBuffer>(`${this.url}${UrlConstante.DOWNLOAD_TEMPLATE}`, options)  // Specify ArrayBuffer as the response type
      .pipe(
        map((arrayBuffer: ArrayBuffer) => {
          return new Blob([arrayBuffer]);
        })
      );
  }
}
