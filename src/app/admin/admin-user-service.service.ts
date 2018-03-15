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

  private b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512) {

    const byteCharacters = atob(b64Data);
    const  byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
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

  getPDF(id: string): Observable<{fileBlob: Blob, fileName: string}> {
    return this.http.get<{file: string, fileName: string}>(`${this.environment.apiUrl}admin/pdf/${id}`, {headers: this.getAuthHeaders()})
      .map(pdf => ({fileBlob: this.b64toBlob(pdf.file, 'application/pdf'), fileName: pdf.fileName}));
  }
}
