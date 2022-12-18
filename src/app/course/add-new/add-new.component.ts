import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { ErrorService } from 'src/app/shared/error.service';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {
  options: { name: string; value: string }[] = this.constants.options;
  @ViewChild('courseForm') form!: NgForm;
  @ViewChild('topics') topics!: NgModelGroup;
  constructor(
    private api: ApiService,
    private router: Router,
    private errorService: ErrorService,
    private auth: AuthService,
    private constants: ConstantsService
  ) {}
  submitForm() {
    const topics = [];
    const value: {
      name: string;
      description: string;
      imageUrl: string;
      topics: {};
      creator: {};
      likedUsers: [];
    } = this.form.value;
    if (this.form.invalid) {
      const errors = [];
      if (this.form.controls['description'].errors) {
        errors.push('Content must between 10 and 200 characters long');
      }
      if (this.form.controls['name'].errors) {
        errors.push('Name must between 6 and 30 characters long');
      }
      if (this.form.controls['imageUrl'].errors) {
        errors.push('ImageUrl must at least 5 characters long');
      }
      this.errorService.emitErrors({ other: errors });
    } else {
      const checked = Object.entries(value['topics']).filter(
        (entry) => entry[1]
      );
      for (const entry of checked) {
        if (entry[0] !== 'other') {
          for (let option of this.options) {
            if (option.value === entry[0]) {
              topics.push(option.name);
            }
          }
        } else {
          topics.push(entry[1]);
        }
      }
      value.topics = topics;
      value.likedUsers = [];
      let user: { objectId: string };
      this.auth.getCurrentUser().subscribe({
        next: (v: any) => {
          user = {
            objectId: v.objectId,
          };
          value.creator = {
            __type: 'Pointer',
            className: '_User',
            objectId: user.objectId,
          };
          console.log(value);
          this.api.post('/classes/Discussions', value).subscribe({
            next: (v: any) => {
              this.router.navigate(['/courses/all-courses']);
            },
            error: (err: any) => {
              this.errorService.emitErrors({ others: [err.error.error] });
            },
          });
        },
        error: () => {
          this.errorService.emitErrors({ others: ['Invalid session'] });
          localStorage.removeItem('userData');
          this.router.navigate(['/auth/login']);
        },
      });
    }
  }
}
