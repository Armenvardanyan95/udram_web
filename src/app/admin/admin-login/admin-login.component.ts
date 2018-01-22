import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

import { ErrorMatcher } from '../../common/error-matcher';
import { AdminUserService } from '../admin-user-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public form: FormGroup;
  public matcher = new ErrorMatcher();
  public errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private userService: AdminUserService,
              private cookies: CookieService, private router: Router) {
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
            this.router.navigateByUrl('/admin/dashboard');
          },
          err => this.errorMessage = err.error.message
        );
    }
  }

}
