import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../common/store.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(public store: StoreService) { }

  ngOnInit() {
  }

}
