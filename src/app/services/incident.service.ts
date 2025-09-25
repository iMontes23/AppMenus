import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { IncidentsTypeDTO } from '../models/incident-type-dto';
import { IncidentDTO } from '../models/incident-dto';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }

  getAllTypeIncident(): Observable<IncidentsTypeDTO[]> {
    return this.http.get<IncidentsTypeDTO[]>(`${this.url}${UrlConstante.GET_INCIDENT_TYPE}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  saveIncident(incidents: IncidentDTO[]): Observable<unknown> {
    return this.http.post<unknown>(`${this.url}${UrlConstante.SAVE_INCIDENT}`, incidents).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  getAllIncident(): Observable<IncidentDTO[]> {
    return this.http.get<IncidentDTO[]>(`${this.url}${UrlConstante.GET_INCIDENT}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

}
