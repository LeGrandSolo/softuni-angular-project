import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './course-list/course-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ShowInFrontDirective } from './show-in-front.directive';
import { DetailsComponent } from './details/details.component';
import { AddNewComponent } from './add-new/add-new.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { LoggedGuard } from '../logged.guard';

const routes: Routes = [
  { path: 'all-courses', component: CourseListComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'edit/:id', component: EditComponent, canActivate: [LoggedGuard] },
  { path: 'add-new', component: AddNewComponent, canActivate: [LoggedGuard] },
];

@NgModule({
  declarations: [
    CourseListComponent,
    ShowInFrontDirective,
    DetailsComponent,
    AddNewComponent,
    EditComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class CourseModule {}
