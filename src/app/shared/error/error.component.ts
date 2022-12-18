import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  animations: [
    trigger('showErrors', [
      transition(':enter', [
        style({ transform: 'translateX(20%)', opacity: 0 }),
        animate('0.5s', style({ transform: 'translateX(0%)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('0.5s', style({ transform: 'translateX(20%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ErrorComponent implements OnInit, OnDestroy {
  recievedErrors: Object = {};
  displayErrors: string[] = [];
  timeout!: NodeJS.Timeout;
  constructor(private errorService: ErrorService) {}
  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }
  ngOnInit(): void {
    clearTimeout(this.timeout);
    this.errorService.errorObservable.subscribe({
      next: (err: Object) => {
        this.displayErrors = [];
        clearTimeout(this.timeout);
        this.recievedErrors = err;
        for (const mess of Object.values(this.recievedErrors)) {
          mess.forEach((el: string) => {
            this.displayErrors?.push(el);
          });
        }
        this.timeout = setTimeout(() => {
          console.log('timeout');
          this.displayErrors = [];
          this.recievedErrors = {};
        }, 4000);
      },
    });
  }
}
