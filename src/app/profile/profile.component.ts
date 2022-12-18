import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: { username: string; objectId: string } = { username: '', objectId: '' };
  discussions!: { objectId: string; name: string }[];
  liked!: { objectId: string; name: string }[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.api.get('/users/' + id).subscribe({
      next: (v: any) => {
        this.user = v;
        const data = {
          __type: 'Pointer',
          className: '_User',
          objectId: this.user.objectId,
        };
        console.log(JSON.stringify(data));

        this.api
          .get('/classes/Discussions', { creator: data }, undefined, true)
          .subscribe({
            next: (v: any) => {
              this.discussions = v.results;
            },
          });
        /* this.api
          .get(
            '/classes/Discussions',
            { likedUsers: this.user.objectId },
            undefined,
            true
          )
          .subscribe({
            next: (v: any) => {
              this.liked = v.results;
            },
          }); */
      },
    });
  }
}
