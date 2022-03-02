import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable()
export class DataService {
  private wagonsSubject$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public wagons$ = this.wagonsSubject$.asObservable();

  private seatsSubject$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public seats$ = this.seatsSubject$.asObservable();

  private wagonsStore = [
    { name: '1A', code: '1A', class: 'A' },
    { name: '2A', code: '2A', class: 'A' },
    { name: '1B', code: '1B', class: 'B' },
    { name: '2B', code: '2B', class: 'B' },
    { name: '1C', code: '1C', class: 'C' },
    { name: '2C', code: '2C', class: 'C' },
  ];

  constructor() {}

  public getClasses() {
    return of([
      { name: 'First Class', code: 'A', factor: 1 },
      { name: 'Second Class', code: 'B', factor: 2 },
      { name: 'Third Class', code: 'C', factor: 3 },
    ]);
  }
  public dispatch(action: { type: string; payload: any }) {
    console.log('dispatch', action);

    if (action.type === 'CLASS-CHANGED') {
      this.wagonsSubject$.next([
        ...this.wagonsStore.filter((w) => w.class === action.payload),
      ]);
      this.seatsSubject$.next([]);
    }
    if (action.type === 'WAGON-CHANGED') {
      this.seatsSubject$.next([
        { key: 1, value: 1 },
        { key: 2, value: 2 },
        { key: 3, value: 3 },
        { key: 4, value: 4 },
        { key: 5, value: 5 },
      ]);
    }
  }
}
