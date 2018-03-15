import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import { Gender } from '../../common/gender.enum'
import { IdentificationType } from '../../common/identification.type.enum'
import { ErrorMatcher } from '../../common/error-matcher';
import { UserService } from '../../common/user.service';
import { StoreService } from '../../common/store.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private passportGroup = {
    number: ['', [Validators.required, Validators.pattern(/^[A-z]{2}[0-9]+$/), Validators.minLength(9)]],
    issuedBy: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(3)]],
    dateOfIssue: ['', Validators.required],
    validityDate: ['', Validators.required]
  };

  private idCardGroup = {
    number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(9)]],
    issuedBy: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(3)]],
    dateOfIssue: ['', Validators.required],
    validityDate: ['', Validators.required]
  };

  public form: FormGroup;
  public startDate = new Date(2000, 0, 1);
  public matcher = new ErrorMatcher();
  public smallScreen: boolean = window.innerWidth < 900;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private userService: UserService, private store: StoreService) {
    this.form = formBuilder.group({
      personal: formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        gender: [Gender.Male],
        ssn: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10)]]
      }),
      auth: formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/), Validators.minLength(8)]]
      }, {validator: (form: FormGroup) => {
        return form.get('password').value !== form.get('confirmPassword').value ? {passwordsDontMatch: true} : null;
      }}),
      identification: formBuilder.group({
        identificationType: [IdentificationType.Passport],
        passport: formBuilder.group(this.passportGroup),
      }),
      additional: formBuilder.group({
        province: [''],
        city: [''],
        address: [''],
        other: ['']
      }),
      request: formBuilder.group({
        amount: ['', Validators.required],
        description: [''],
        mobilePhone: ['', Validators.required],
        isEmployed: [null, Validators.required],
        hasHistory: [null, Validators.required],
        isDifficult: [null, Validators.required]
      }),
      hasAgreedToTerms: ['', Validators.requiredTrue]
    });

    const emailCtrl: AbstractControl = this.form.get('auth.email');
    emailCtrl.valueChanges.subscribe(() => this.validateEmailNotTaken(emailCtrl));
  }

  private redirect(): void {
    this.router.navigateByUrl('/success').then(() => {
      const user = this.form.value.personal;
      const message = `Հարգելի ${user.firstName} ${user.lastName}, Դուք հաջողությամբ գրանցվել եք UDram համակարգում։ 
                               Դուք կստանաք ծանուցում Ձեր հայտի կարգավիճակի փոփոխության մասին։ Շնորհակալություն։`;
      this.store.successMessage.next(message);
    });
  }

  private validateEmailNotTaken(control: AbstractControl) {
    if (!Validators.email(control)) {
      console.log('validating')
      this.userService.checkEmailUniqueness(control.value).subscribe(res => {
        control.setErrors(res.isUnique ? null : {emailTaken: true});
      });
    }
  }

  ngOnInit() {
  }

  @HostListener('window:resize')
  onResize() {
    this.smallScreen = window.innerWidth < 900;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.userService.registerUser(this.form.value)
        .subscribe(
          result => this.redirect(),
          err => console.log(err)
        )
    }
  }

  public onIdentificationTypeChange(type: IdentificationType): void {
    if (type === IdentificationType.Passport) {
      if (this.form.get('identification.idCard')) {
        (<FormGroup>this.form.get('identification')).removeControl('idCard');
      }
      if (!this.form.get('identification.passport')) {
        (<FormGroup>this.form.get('identification')).addControl('passport', this.formBuilder.group(this.passportGroup));
      }
    }

    if (type === IdentificationType.IDCard) {
      if (this.form.get('identification.passport')) {
        (<FormGroup>this.form.get('identification')).removeControl('passport');
      }
      if (!this.form.get('identification.idCard')) {
        (<FormGroup>this.form.get('identification')).addControl('idCard', this.formBuilder.group(this.idCardGroup));
      }
    }

    if (type === IdentificationType.Both) {
      if (!this.form.get('identification.passport')) {
        (<FormGroup>this.form.get('identification')).addControl('passport', this.formBuilder.group(this.passportGroup));
      }
      if (!this.form.get('identification.idCard')) {
        (<FormGroup>this.form.get('identification')).addControl('idCard', this.formBuilder.group(this.idCardGroup));
      }
    }

    this.form.updateValueAndValidity();
  }

}
