import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/pluck';

import { ErrorMatcher } from '../../common/error-matcher';
import { UserService } from '../../common/user.service';
import { StoreService } from '../../common/store.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public form: FormGroup;
  public matcher: ErrorMatcher = new ErrorMatcher();
  public errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private userService: UserService, public store: StoreService, public router: Router) {
    this.form = formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      hash: ['', Validators.required]
    });

    this.route.queryParams
      .pluck('hash')
      .subscribe(hash => this.form.controls['hash'].setValue(hash));
  }

  ngOnInit() {
  }

  public changePassword(): void {
    if (this.form.valid) {
      this.userService.changePassword(this.form.value)
        .subscribe(
          res => {
            this.router.navigateByUrl('/success').then(() => this.store.successMessage.next(res.message))
          },
          err => this.errorMessage = err.error.message
        );
    }
  }

}
