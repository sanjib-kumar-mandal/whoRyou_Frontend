import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignInPayloadInterface, SignInResponseInterface, SignUpPayloadInterface, SignUpResponseInterface, UserInfoInterface, UserLogStatusResponseIntreface } from 'src/app/pages/onboarding/onboarding.interface';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBasePath: string = environment.apiBasePath;

  private userLogStatusObserver$ = new BehaviorSubject<boolean>(null!);
  public userLogStatusObservable = this.userLogStatusObserver$.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  private signUp(signUpPayload: SignUpPayloadInterface): Observable<SignUpResponseInterface> {
    return this.http.post<SignUpResponseInterface>(`${this.apiBasePath}/api/v1/auth/signup`, {
       ...signUpPayload
    });
  }

  private signIn(signInPayload: SignInPayloadInterface): Observable<SignInResponseInterface> {
     return this.http.post<SignInResponseInterface>(`${this.apiBasePath}/api/v1/auth/signin`, {
        ...signInPayload
     });
  }

  private logout() {
    return this.http.get(`${this.apiBasePath}/api/v1/auth/logout`, { observe: 'response' });
  }

  private setUserLogStatus(status: boolean) {
    this.userLogStatusObserver$.next(status);
  }

  private getUserLogStatus(nickname: string): Observable<UserLogStatusResponseIntreface> {
     return this.http.get<UserLogStatusResponseIntreface>(`${this.apiBasePath}/api/v1/auth/getLogStatus/${nickname}`);
  }

  public async handleSignUpUser(userInfo: SignUpPayloadInterface): Promise<UserInfoInterface> {
     return new Promise((resolve, reject) => {
        this.signUp(userInfo).subscribe({
          next: (response) => {
             const { accessToken } = response?.userInfo?.tokens!;

             if(accessToken) {
                this.setUserLogStatus(true);
                this.storageService.set('accessToken', accessToken);
                const { tokens, ...rest } = response?.userInfo;
                resolve(rest);
             } else {
                this.setUserLogStatus(false);
                resolve(null!);
             }
          },
          error: (error) => reject(error)
        })
     });
  }

  public async handleSignInUser(userInfo: SignInPayloadInterface): Promise<UserInfoInterface> {
    return new Promise((resolve, reject) => {
      this.signIn(userInfo).subscribe({
          next: (response) => {
            const { accessToken } = response?.userInfo?.tokens!;

            if(accessToken) {
              this.setUserLogStatus(true);
              this.storageService.set('accessToken', accessToken);
              const { tokens, ...rest } = response?.userInfo;
              resolve(rest);
           } else {
              this.setUserLogStatus(false);
              resolve(null!);
           }

          },
          error: (error) => reject(error)
      });
    });
  }

  public handleLogoutUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logout().subscribe({
        next: (response) => {
          if(response?.status === 200) {
            this.setUserLogStatus(false);
            resolve();
          }
        },
        error: (error) => reject(error)
      });
    })
  }

  public getUserInfo() {
    
  }

}
