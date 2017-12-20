import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ErrorMatcher } from '../../common/error-matcher';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public matcher = new ErrorMatcher();

  constructor() { }

  ngOnInit() {
  }

}
