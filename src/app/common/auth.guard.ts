import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

import { StoreService } from './store.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private cookies: CookieService, private router: Router, private store: StoreService) {}

  canActivate(): boolean {
    if (!this.cookies.get('token')) {
      const errorMessage = 'Այս էջ այցելելու համար դուք պետք է մուտք գործեք'
      this.router.navigateByUrl('/error').then(() => this.store.errorMessage.next(errorMessage));
      return false;
    } else {
      return true;
    }
  }
}
