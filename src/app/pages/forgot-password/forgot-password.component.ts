import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorMatcher } from '../../common/error-matcher';
import { UserService } from '../../common/user.service';
import { StoreService } from '../../common/store.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public matcher = new ErrorMatcher();
  public errorMessage: string = '';

  constructor(private router: Router, private userService: UserService, private store: StoreService) { }

  ngOnInit() {
  }

  forgotPassword() : void {
    if (this.emailControl.valid) {
      this.userService.forgotPassword({email: this.emailControl.value})
        .subscribe(
          res => {
            this.router.navigateByUrl('/success').then(() => this.store.successMessage.next(res.message));
          },
          err => this.errorMessage = err.error.message
        );
    }
  }

}
