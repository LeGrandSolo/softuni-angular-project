import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../core/api.service';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: ApiService,
    private errorService: ErrorService,
    private router: Router
  ) {}
  validateFields(form: any, isRegister: boolean) {
    const errors: {
      username: string[];
      email: string[];
      password: string[];
      other: string[];
    } = {
      username: [],
      email: [],
      password: [],
      other: [],
    };
    if (form.invalid) {
      if (form.controls['username'].errors) {
        errors.username.push('Username must be at least 3 characters long');
      }
      if (form.controls['password'].errors) {
        errors.password.push('Password must be at least 5 characters long!');
      }
      if (isRegister) {
        if (form.controls['email'].errors) {
          errors.email.push('Email must be a valid one!');
        }
      }
    }
    return errors;
  }
  setUserData(
    data: {
      username: string;
      email: string;
      sessionToken: string;
      objectId: string;
    },
    isRegister: boolean
  ) {
    let userData;
    if (isRegister) {
      this.api.get('/users/me', null, data.sessionToken).subscribe({
        next: (v: any) => {
          userData = {
            username: v.username,
            email: v.email,
            sessionToken: v.sessionToken,
            objectId: v.objectId,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
        },
      });
    } else {
      userData = {
        username: data.username,
        email: data.email,
        sessionToken: data.sessionToken,
        objectId: data.objectId,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
  getUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    return userData;
  }
  getCurrentUser(): any {
    let userDataStorage: any = localStorage.getItem('userData');
    if (userDataStorage) {
      userDataStorage = JSON.parse(userDataStorage);
      return this.api.get('/users/me', null, userDataStorage.sessionToken);
    }
    return new Observable((observer) => {
      observer.error(new Error('Not logged in!'));
    });
  }
}
