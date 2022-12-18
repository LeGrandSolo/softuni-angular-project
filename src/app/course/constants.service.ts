import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  options: { name: string; value: string }[] = [
    { name: 'Maths', value: 'maths' },
    { name: 'Biology', value: 'biology' },
    { name: 'Science', value: 'science' },
    { name: 'Literature', value: 'literature' },
    { name: 'Music', value: 'music' },
    { name: 'Art', value: 'art' },
    { name: 'Physical', value: 'phisical' },
  ];
  constructor() { }
}
