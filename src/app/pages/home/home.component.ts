import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../common/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isAuth: boolean = false;

  constructor(private store: StoreService) { }

  ngOnInit() {
    this.store.isAuth.subscribe(isAuth => this.isAuth = isAuth);
  }

}
