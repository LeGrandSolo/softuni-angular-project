import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { LogoutComponent } from './logout/logout.component';
import { NotLoggedGuard } from '../not-logged.guard';
import { LoggedGuard } from '../logged.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotLoggedGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotLoggedGuard],
      },
      { path: 'logout', component: LogoutComponent, canActivate: [LoggedGuard] },
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
