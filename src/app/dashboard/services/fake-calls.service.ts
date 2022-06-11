import {Injectable} from '@angular/core';
import {map, Observable, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FakeCallsService {

  constructor() {
  }

  private static getRandomNumber(n: number): number {
    return Math.floor(Math.random() * (n + 10));
  }

  getSomeData(
    tabNumber: number
  ): Observable<Maybe<Data, CustomErr>> {
    return timer(1000)
      .pipe(
        map(() => {
          const random = FakeCallsService.getRandomNumber(tabNumber)
          if (tabNumber <= random) {
            return {
              status: StatusNames.ERROR,
              data: 'Deu ruim :('
            };
          }
          return {
            status: StatusNames.SUCCESS,
            data: 'Deu boa :)'
          };
        }));
  }
}

type Maybe<T, Err = null> = (T | Err);
type Data = { status: StatusNames.SUCCESS, data: string };
type CustomErr = { status: StatusNames.ERROR, data: string };

export enum StatusNames {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
