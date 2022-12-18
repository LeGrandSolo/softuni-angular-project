import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/api.service';
import { AuthService } from 'src/app/core/auth.service';
import { ErrorService } from 'src/app/shared/error.service';
import { Course } from '../types';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @ViewChild('comment-form') form!: NgForm;
  hasLiked = true;
  isLogged = false;
  isOwner = false;
  user: { username: string; objectId: string; comments: string[] } = {
    objectId: '',
    username: '',
    comments: [],
  };
  course: {
    name: string;
    comments: {
      username: string;
      objectId: string;
      title: string;
      comment: string;
    }[];
    description: string;
    imageUrl: string;
    topics: [];
    objectId: string;
    createdAt: string;
    creator: { objectId: string };
    likedUsers: string[];
  } = {
    comments: [],
    createdAt: '',
    description: '',
    imageUrl: '',
    name: '',
    creator: {
      objectId: '',
    },
    objectId: '',
    topics: [],
    likedUsers: [],
  };
  topics = '';
  creator: { username: string; objectId: string } | null = null;
  id: string = this.activatedRoute.snapshot.params['id'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private errorService: ErrorService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: (v: any) => {
        this.user = {
          objectId: v.objectId,
          comments: v.comments,
          username: v.username,
        };
        this.api
          .getById('/classes/Discussions', { objectId: this.id })
          .subscribe({
            next: (v: any) => {
              this.course = v.results[0];
              if (!this.course.likedUsers.includes(this.user.objectId)) {
                this.hasLiked = false;
              }
              this.api
                .get(`/users/${this.course?.creator.objectId}`)
                .subscribe({
                  next: (v: any) => {
                    this.creator = v;
                    if (v.objectId === this.user?.objectId) {
                      this.isOwner = true;
                    }
                    this.isLogged = true;
                  },
                  error(e) {
                    console.log(e);
                  },
                });
              this.topics = this.course.topics.join(', ');
            },
          });
      },
      error: () => {
        this.api
          .getById('/classes/Discussions', { objectId: this.id })
          .subscribe({
            next: (v: any) => {
              this.course = v.results[0];
              this.topics = this.course.topics.join(', ');
              this.api
                .get(`/users/${this.course?.creator.objectId}`)
                .subscribe({
                  next: (v: any) => {
                    this.creator = v;
                  },
                });
            },
          });
      },
    });
  }
  delete() {
    this.auth.getCurrentUser().subscribe({
      next: (v: any) => {
        if (v.objectId === this.course?.creator.objectId) {
          this.api
            .delete(`/classes/Discussions/${this.course?.objectId}`)
            .subscribe({
              next: () => {
                this.router.navigate(['/courses/all-courses']);
              },
              error: (err) => {
                console.log(err.error.error);

                this.errorService.emitErrors({ others: err.error.error });
                this.router.navigate(['/courses/all-courses']);
              },
            });
        }
      },
    });
  }
  like() {
    if (
      this.user.objectId !== '' &&
      !this.course.likedUsers.includes(this.user.objectId)
    ) {
      this.course.likedUsers.push(this.user.objectId);
      this.api
        .put('/classes/Discussions/' + this.course.objectId, {
          likedUsers: this.course.likedUsers,
        })
        .subscribe({
          next: (v) => {
            console.log('success');
          },
          error: (err) => {
            this.errorService.emitErrors(err.error.message);
          },
        });
      this.hasLiked = true;
    } else {
      this.errorService.emitErrors({ others: ['Already liked!'] });
    }
  }
  /* submitForm() {
    if (this.form.invalid) {
      this.errorService.emitErrors({
        others: ['All fields must be at least 5 characters long'],
      });
    } else {
      if (!this.user.comments) {
        this.user.comments = [];
      }
      this.user.comments.push(this.course.objectId);
      this.api
        .put('/users/' + this.user.objectId, { comments: this.user.comments })
        .subscribe({
          next: () => {
            console.log('success');
            this.course.comments.push({
              username: this.user.username,
              objectId: this.user.objectId,
              title: this.form.controls['title'].value,
              comment: this.form.controls['comment'].value,
            });
            this.api.put('/classes/Discussions', {
              comments: this.course.comments,
            });
          },
        });
      const data = {
        title: this.form.controls['title'].value,
        comment: this.form.controls['comment'].value,
      };
      this.api.post('/classes/Discussions', data);
    }
  } */
}
