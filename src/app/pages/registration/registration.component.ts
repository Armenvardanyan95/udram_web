import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Gender } from '../../common/gender.enum'
import { ErrorMatcher } from '../../common/error-matcher';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private idCardOrPassportGroup = {
    number: ['', Validators.required],
    issuedBy: ['', Validators.required],
    dateOfIssue: ['', Validators.required],
    validityDate: ['', Validators.required]
  };

  public form: FormGroup;
  public startDate = new Date(2000, 0, 1);
  public matcher = new ErrorMatcher();

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      personal: formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        gender: [Gender.Male],
        ssn: ['', Validators.required]
      }),
      auth: formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      })
    })
  }

  ngOnInit() {
  }

}
