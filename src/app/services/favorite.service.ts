import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { FavoriteApplicationDTO } from '../utilerias/model/favorite-application-dto';
import { UrlConstante } from '../utilerias/constantes/url-constante';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }


  getList(appCode: string): Observable<FavoriteApplicationDTO[]> {
    return this.http.get<FavoriteApplicationDTO[]>(`${this.url}${UrlConstante.GET_FAVORITE_APPS}`, {
      params: { appCode }
    }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  save(favorite: FavoriteApplicationDTO): Observable<FavoriteApplicationDTO> {
    return this.http.post<FavoriteApplicationDTO>(`${this.url}${UrlConstante.SAVE_FAVORITE_APPS}`, favorite).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  delete(favorite: FavoriteApplicationDTO): Observable<FavoriteApplicationDTO> {
    return this.http.post<FavoriteApplicationDTO>(`${this.url}${UrlConstante.DELETE_FAVORITE_APPS}`, favorite);
  }
}
