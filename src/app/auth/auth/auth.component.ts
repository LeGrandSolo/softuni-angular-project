import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/shared/error.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  errors: Object = {};
  constructor() {}
  
}
