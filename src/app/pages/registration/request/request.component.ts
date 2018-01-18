import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ErrorMatcher } from '../../../common/error-matcher';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  @Input() form: FormGroup;

  public matcher = new ErrorMatcher();

  constructor() { }

  ngOnInit() {
  }

}
