import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { UserService } from './user.service';

@Injectable()
export class CurrentUserResolverService implements Resolve<IUser> {

  constructor(private userService: UserService) { }

  resolve() {
    return this.userService.currentUser();
  }

}
