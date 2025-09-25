import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { CountryDTO } from '../models/country-dto';

@Injectable({
  providedIn: 'root'
})
export class ConutryService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }


  getAllCountry(): Observable<CountryDTO[]> {
    return this.http.get<CountryDTO[]>(`${this.url}${UrlConstante.GET_COUNTRY_LIST}`
    ).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
