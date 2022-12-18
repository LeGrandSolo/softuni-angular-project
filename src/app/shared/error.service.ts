import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorsSub$ = new BehaviorSubject({});
  errorObservable = this.errorsSub$.asObservable()
  constructor() {}
  emitErrors(errors: Object) {
    this.errorsSub$.next(errors);
  }
}
