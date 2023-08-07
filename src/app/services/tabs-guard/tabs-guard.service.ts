import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
class TabGuardService {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(obs => {

        let isOnboardingDone = this.storageService.get('isOnboardingDone');
        console.log("isOnboardingDone", isOnboardingDone);
        if(isOnboardingDone) {
          obs.next(true);
        } else {
          obs.next(false);
          this.router.navigate(['/onboarding']);
        }
      })
  }
}

export const TabsGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(TabGuardService).canActivate(next, state);
}