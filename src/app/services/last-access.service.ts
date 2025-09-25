import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { RecentAppDTO } from '../utilerias/model/last-access-dto';
import { UrlConstante } from '../utilerias/constantes/url-constante';

@Injectable({
  providedIn: 'root'
})
export class LastAccessService {

  private url = environment.apiUrl;
  private applications: RecentAppDTO[] = [];

  constructor(
    public http: HttpClient,
    private router: Router
  ) {
    this.applications = [];
  }


  getList(appCode: string): Observable<RecentAppDTO[]> {
    return this.http.get<RecentAppDTO[]>(`${this.url}${UrlConstante.GET_RECENT_APPS}`, {
      params: { appCode }
    }).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  save(lastAccessDTO: RecentAppDTO): Observable<RecentAppDTO> {
    return this.http.post<RecentAppDTO>(`${this.url}${UrlConstante.SAVE_RECENT_APPS}`, lastAccessDTO).pipe(
      tap(response => {
        if (response == undefined || response == null) {
          this.router.navigate([UrlConstante.SECURITY]);
        }
      }),
      catchError(error => {
        throw error;
      })
    );
  }




  getApplications(): RecentAppDTO[] {
    return this.applications;
  }

  addApplication(application: RecentAppDTO): void {
    this.applications.unshift(application);
  }

  removeApplication(id: number): void {
    this.applications = this.applications.filter(app => app.id !== id);
  }
}
