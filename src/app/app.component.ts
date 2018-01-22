import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import { StoreService } from './common/store.service';
import {UserService} from './common/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth: boolean = false;

  constructor(private store: StoreService, private userService: UserService,
              private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    store.isAuth.subscribe(isAuth => this.isAuth = isAuth);
    iconRegistry.addSvgIcon('udram', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sg848-m3krh.svg'));
  }

  logOut(): void {
    this.userService.logOut();
  }
}
