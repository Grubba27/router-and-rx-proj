import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Params, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsEvenGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    {params}: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const {n} = params as Params & { n: number };

    if (n % 2 === 0) {
      return true;
    }

   return this.router.parseUrl('/dashboard');
  }

}
