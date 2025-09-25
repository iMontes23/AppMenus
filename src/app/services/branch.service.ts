import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UrlConstante } from '../utilerias/constantes/url-constante';
import { BranchDTO } from '../models/branch-dto';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private url = environment.apiUrl;

  constructor(
    public http: HttpClient,
  ) { }


  getBranch(cd_Entidad: number): Observable<BranchDTO[]> {
    const paramentros =  {
      params: { cd_Entidad }
    }

    return this.http.get<BranchDTO[]>(`${this.url}${UrlConstante.GET_BRANCH_LIST}`,paramentros
    ).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
}
