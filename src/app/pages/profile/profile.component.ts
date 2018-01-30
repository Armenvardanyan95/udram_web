import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Gender } from '../../common/gender.enum'
import { IdentificationType } from '../../common/identification.type.enum'
import { RequestStatus } from '../../common/request.status.enum'

import { UserService } from '../../common/user.service';
import { StoreService } from '../../common/store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  public status = {
    [RequestStatus.Pending]: {
      text: 'Ձեր հայտը դեռ ուսումնասիրման մեջ է',
      color: 'accent',
      icon: 'access_time'
    },
    [RequestStatus.Accepted]: {
      text: 'Ձեր հայտը ընդունվել է',
      color: 'green',
      icon: 'check'
    },
    [RequestStatus.Rejected]: {
      text: 'Ցավոք, Ձեր հայտը մերժվել է',
      color: 'warn',
      icon: 'clear'
    }
  };

  public user: IUser;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
              private userService: UserService, private store: StoreService) {

    this.form = formBuilder.group({
      _id: [''],
      personal: formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        gender: [Gender.Male],
        ssn: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10)]]
      }),
      identification: formBuilder.group({
        identificationType: [''],
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
        isEmployed: [false],
        hasHistory: [false],
        isDifficult: [false]
      })
    })

  }

  ngOnInit() {
    this.route.data.pluck('user').subscribe((user: IUser) => {
      this.onIdentificationTypeChange(user.identification.identificationType);
      this.form.patchValue(user);
      this.user = user;
    });
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

  public onSubmit() {
    if (this.form.valid) {
      this.userService.updateUser(this.form.value)
        .subscribe(
          () => this.router.navigateByUrl('/success')
            .then(() => this.store.successMessage.next(`Ձեր հայտում ներկայացված տվյալները հաջողությամբ թարմացվել են`)),
          err => console.log(err)
        );
    }
  }

}
