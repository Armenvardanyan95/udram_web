import { Component } from '@angular/core';
import { MatIconRegistry, MatDialog, MatDialogRef } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import { StoreService } from './common/store.service';
import { UserService } from './common/user.service';
import { ContactsDialogComponent } from './components/contacts-dialog/contacts-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth: boolean = false;

  constructor(private store: StoreService, private userService: UserService, private dialog: MatDialog,
              private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    store.isAuth.subscribe(isAuth => this.isAuth = isAuth);
    iconRegistry.addSvgIcon('udram', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sg848-m3krh.svg'));
  }

  logOut(): void {
    this.userService.logOut();
  }

  openContactsDialog(): void {
    const dialog: MatDialogRef<ContactsDialogComponent> = this.dialog.open(ContactsDialogComponent);
    dialog.componentInstance.onClose.subscribe(() => dialog.close());
  }
}
