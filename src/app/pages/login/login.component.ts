import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { ErrorMatcher } from '../../common/error-matcher';
import { UserService } from '../../common/user.service';
import { StoreService } from '../../common/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public matcher = new ErrorMatcher();
  public errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private cookies: CookieService, private router: Router, private store: StoreService) {
    this.form = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(): void {
    if (this.form.valid) {
      this.userService.authenticate(this.form.value)
        .subscribe(
          res => {
            this.cookies.put('token', res.token);
            this.router.navigateByUrl('/profile');
            this.store.isAuth.next(true);
          },
          err => this.errorMessage = err.error.message
        );
    }
  }

}
