import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { ErrorService } from 'src/app/shared/error.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth-shared-styles.scss'],
})
export class RegisterComponent {
  @ViewChild('registerForm') form!: NgForm;
  errors: {
    username: string[];
    password: string[];
    other: string[];
  } = {
    username: [],
    password: [],
    other: [],
  };
  constructor(
    private api: ApiService,
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router
  ) {}
  submitForm() {
    this.errors = this.authService.validateFields(this.form, true);
    if (
      this.errors.username.length === 0 &&
      this.errors.password.length === 0 &&
      this.errors.other.length === 0
    ) {
      this.api
        .post('/users', {
          username: this.form.controls['username'].value,
          email: this.form.controls['email'].value,
          password: this.form.controls['password'].value,
        })
        .subscribe({
          next: (v: any) => {
            console.log(v);

            this.authService.setUserData(v, true);
            this.router.navigate(['/']);
          },
          error: (err) => {
            if (err.error.code === 101) {
              this.errors.other.push('Incorrect username or password');
            } else {
              this.errors.other.push(err.error.error);
            }
            return this.errorService.emitErrors(this.errors);
          },
        });
    } else {
      return this.errorService.emitErrors(this.errors);
    }
  }
}
