import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

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
    this.form.controls['hasHistory'].valueChanges.subscribe(value => this.switchValidation(value))
  }

  private switchValidation(hasHistory: boolean): void {
    if (hasHistory) {
      this.form.controls['description'].setValidators([Validators.required, Validators.minLength(10)]);
      this.form.controls['description'].updateValueAndValidity();
    } else {
      this.form.controls['description'].clearValidators();
      this.form.controls['description'].updateValueAndValidity();
    }
  }
}
