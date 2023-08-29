import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { distinctUntilChanged, filter, Observable, tap } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // return this.authService.userLogStatusObservable.pipe(filter(status => status !== null), tap(status => this.logCheck(status)));
    return new Observable<boolean>(obs => {

       this.authService.userLogStatusObservable.pipe(filter(status => status !== null), distinctUntilChanged()).subscribe({
           next: (status) => {
              console.log("status", status)
              obs.next(status) 
              if(!status) {
                console.log("Open modal")
                this.authService.openLoginModal();
              }      
           }
       });
    })
  }

  // logCheck(status: boolean) {
  //   if(!status) this.router.navigate(['/login']); 
  // }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(AuthGuardService).canActivate(next, state);
}
