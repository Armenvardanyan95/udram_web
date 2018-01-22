import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {Environment} from '../common/environment';
import { CookieService } from 'ngx-cookie';
import {RequestStatus} from '../common/request.status.enum';

@Injectable()
export class AdminUserService {

  constructor(private environment: Environment, private http: HttpClient, private cookies: CookieService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookies.get('token');
    return new HttpHeaders({'Authorization': `Token ${token}`});
  }

  authenticate(credentials: {email: string, password: string}): Observable<{token: string}> {
    return <Observable<{token: string}>>this.http.post(`${this.environment.apiUrl}admin-token`, credentials);
  }

  getUsers(search: {page: number, filters: any}): Observable<{users: IUser[], count: number}> {
    let params: HttpParams = new HttpParams().append('page', search.page.toString());
    for (const filter in search.filters) {
      if (search.filters.hasOwnProperty(filter)) {
       params = params.append(filter, search.filters[filter].value);
      }
    }
    console.log(params);
    const options: {headers: HttpHeaders, params: HttpParams} = {
      headers: this.getAuthHeaders(),
      params: params
    };
    return <Observable<{users: IUser[], count: number}>>this.http.get(`${this.environment.apiUrl}users`, options)
  }

  changeRequestStatus(id: string, status: RequestStatus): Observable<{message: string}> {
    return <Observable<{message: string}>>this.http
      .post(`${this.environment.apiUrl}admin/change-status`, {id, status}, {headers: this.getAuthHeaders()});
  }
}
