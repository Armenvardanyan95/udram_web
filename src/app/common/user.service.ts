import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';

import { Environment } from './environment';
import { StoreService } from './store.service';
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private environment: Environment, private cookies: CookieService,
              private store: StoreService, private router: Router) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookies.get('token');
    return new HttpHeaders({'Authorization': `Token ${token}`});
  }

  registerUser(data: any): Observable<{message: string, id: string}> {
    return <Observable<{message: string, id: string}>>this.http.post(`${this.environment.apiUrl}users`, data);
  }

  authenticate(credentials: {email: string, password: string}): Observable<{token: string}> {
    return <Observable<{token: string}>>this.http.post(`${this.environment.apiUrl}token`, credentials);
  }

  forgotPassword(credentials: {email: string}): Observable<{message: string}> {
    return <Observable<{message: string}>>this.http.post(`${this.environment.apiUrl}forgot-password`, credentials);
  }

  changePassword(credentials: {password: string, confirmPassword: string, hash: string}): Observable<{message: string}> {
    return <Observable<{message: string}>>this.http.post(`${this.environment.apiUrl}change-password`, credentials);
  }

  currentUser(): Observable<IUser> {
    const options = {headers: this.getAuthHeaders()};
    return <Observable<IUser>>this.http.get(`${this.environment.apiUrl}current`, options);
  }

  logOut(): void {
    this.cookies.removeAll();
    this.store.isAuth.next(false);
    this.router.navigateByUrl('/');

  }

  updateUser(data): Observable<{message: string}> {
    const options = {headers: this.getAuthHeaders()};
    return <Observable<{message: string}>>this.http.patch(`${this.environment.apiUrl}updateUser`, data, options);
  }

  uploadPassportScan(id: string, file: File): Observable<{message: string}> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('scan', file);
    return <Observable<{message: string}>>this.http.post(`${this.environment.apiUrl}passport`, formData);
  }

  uploadAcraScan(id: string, file: File): Observable<{message: string}> {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('scan', file);
    return <Observable<{message: string}>>this.http.post(`${this.environment.apiUrl}acra`, formData);
  }

  checkEmailUniqueness(email: string): Observable<{isUnique: boolean}> {
    return <Observable<{isUnique: boolean}>>this.http.post(`${this.environment.apiUrl}check-email`, {email});
  }

}
