import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: {
    name: string;
    imageUrl: string;
    creator: string;
    description: string;
    objectId: string;
  }[] | null = null;
  ngOnInit(): void {
    this.api.get('/classes/Discussions').subscribe({
      next: (v: any) => {
        this.courses = []
        this.courses = v.results;
      },
    });
  }
  constructor(private api: ApiService, private auth: AuthService) {}
}
