import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StoreService {

  public successMessage: BehaviorSubject<string> = new BehaviorSubject('');
  public errorMessage: BehaviorSubject<string> = new BehaviorSubject('');
  public isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private cookies: CookieService) {
    this.isAuth.next(!!cookies.get('token'));
  }

}
