import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OtherServiceService {

  sharedData$: BehaviorSubject<number> = new BehaviorSubject(0);
  spacing$: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() {
  }

  // get and set
  getData(): BehaviorSubject<number> {
    return this.sharedData$;
  }

  getDataAsInArray(): number[] {
    return Array(Number(this.sharedData$.value)).fill(1);
  }

  setData(data: number): void {
    this.sharedData$.next(Number(data));
  }

  getSpacing(): BehaviorSubject<number> {
    return this.spacing$;
  }

  setSpacing(data: number): void {
    this.spacing$.next(Number(data));
  }

}
