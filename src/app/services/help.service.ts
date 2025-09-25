import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { HelpTopicDTO } from '../utilerias/model/help-topic-dto';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }


  getList(): Observable<HelpTopicDTO[]> {
    return this.http.get<HelpTopicDTO[]>(`${this.url}${UrlConstante.GET_HELPS}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
