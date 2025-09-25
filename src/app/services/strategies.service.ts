import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { StrategiesRequestDTO } from '../models/strategies-request-dto';

@Injectable({
  providedIn: 'root'
})
export class StrategiesService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }


  getList(strategies: StrategiesRequestDTO): Observable<any> {
    return this.http.post<any>(`${this.url}${UrlConstante.GET_STRATEGIES}`, strategies).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
