import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMatcher } from '../../../common/error-matcher';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @Input() form: FormGroup;
  public matcher: ErrorMatcher = new ErrorMatcher();

  constructor() { }

  ngOnInit() {
  }

}
