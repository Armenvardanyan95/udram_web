import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-contacts-dialog',
  templateUrl: './contacts-dialog.component.html',
  styleUrls: ['./contacts-dialog.component.scss']
})
export class ContactsDialogComponent implements OnInit {

  public onClose: Subject<void> = new Subject();
  constructor() { }

  ngOnInit() {
  }

  closePopup(): void {
    this.onClose.next();
    this.onClose.complete();
  }

}
