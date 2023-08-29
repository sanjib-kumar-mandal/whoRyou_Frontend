import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignInPayloadInterface, SignInResponseInterface, SignUpPayloadInterface, SignUpResponseInterface, TokenInfoInterface, UserInfoInterface, UserLogStatusResponseIntreface } from 'src/app/pages/onboarding/onboarding.interface';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBasePath: string = environment.apiBasePath;

  private userLogStatusObserver$ = new BehaviorSubject<boolean>(null!);
  public userLogStatusObservable = this.userLogStatusObserver$.asObservable();

  private userInfoObserver$ = new BehaviorSubject<UserInfoInterface>(null!);
  public userInfoObservable = this.userInfoObserver$.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private readonly modalController: ModalController
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

  public getUserInfo(): Observable<UserInfoInterface> {
     return this.http.get<UserInfoInterface>(`${this.apiBasePath}/api/v1/users/getUserInfo`);
  }

  public setUserInfo(userInfo: UserInfoInterface) {
    this.userInfoObserver$.next(userInfo);
  }

  public setUserLogStatus(status: boolean) {
    this.userLogStatusObserver$.next(status);
  }

  public async handleSignUpUser(userInfo: SignUpPayloadInterface): Promise<UserInfoInterface> {
     return new Promise((resolve, reject) => {
        this.signUp(userInfo).subscribe({
          next: (response) => {
             const { accessToken, refreshToken } = response?.userInfo?.tokens!;

             if(accessToken && refreshToken) {

                this.setUserInfo({
                  id: response.userInfo.id,
                  firstname: response.userInfo.firstname,
                  lastname: response.userInfo.lastname,
                  nickname: response.userInfo.nickname,
                  gender: response.userInfo.gender,
                  age: response.userInfo.age,
                  isLoggedIn: true,
                  lastLogggedInAt: response.userInfo.lastLogggedInAt,
                  lastLogggedOutAt: response.userInfo.lastLogggedOutAt,
                });

                this.setUserLogStatus(true);

                this.storageService.set('accessToken', accessToken);
                this.storageService.set('refreshToken', refreshToken);

                const { tokens, ...rest } = response?.userInfo;
                resolve(rest);
             } else {
                this.setUserInfo(null!);
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
            const { accessToken, refreshToken } = response?.userInfo?.tokens!;

            if(accessToken && refreshToken) {
              this.setUserInfo({
                id: response.userInfo.id,
                firstname: response.userInfo.firstname,
                lastname: response.userInfo.lastname,
                nickname: response.userInfo.nickname,
                gender: response.userInfo.gender,
                age: response.userInfo.age,
                isLoggedIn: true,
                lastLogggedInAt: response.userInfo.lastLogggedInAt,
                lastLogggedOutAt: response.userInfo.lastLogggedOutAt,
              });
              this.setUserLogStatus(true);

              this.storageService.set('accessToken', accessToken);
              this.storageService.set('refreshToken', refreshToken);

              const { tokens, ...rest } = response?.userInfo;
              resolve(rest);
           } else {
              this.setUserInfo(null!);
              this.setUserLogStatus(false);
              resolve(null!);
           }

          },
          error: (error) => reject(error)
      });
    });
  }

  public handleLogoutUser(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.logout().subscribe({
        next: (response) => {
          if(response?.status === 200) {
            this.setUserInfo(null!);
            this.setUserLogStatus(false);
            resolve(true);
          }
        },
        error: (error) => reject(false)
      });
    })
  } 

  public validateAuthentication() {
       
    let accessToken = this.storageService.get('accessToken'); 

    if(accessToken) { 
       this.getUserInfo().subscribe({
        next: (response) => {
          if(Object.keys(response).length) {
            this.setUserLogStatus(response.isLoggedIn);
            this.setUserInfo(response);
          }
        },
        error: (error) => {
          this.setUserLogStatus(false);
          this.setUserInfo(null!);
        }
       })
    } else {
      this.setUserLogStatus(null!);
      this.setUserInfo(null!);
    } 

  }

  public loginWithRefreshToken(): Promise<UserInfoInterface> {
    return new Promise<UserInfoInterface>((resolve, reject) => {
      this.getTokens().subscribe({
        next: (response) => {
          const { accessToken, refreshToken } = response?.userInfo?.tokens!;

            if(accessToken && refreshToken) {
              this.setUserInfo({
                id: response.userInfo.id,
                firstname: response.userInfo.firstname,
                lastname: response.userInfo.lastname,
                nickname: response.userInfo.nickname,
                gender: response.userInfo.gender,
                age: response.userInfo.age,
                isLoggedIn: true,
                lastLogggedInAt: response.userInfo.lastLogggedInAt,
                lastLogggedOutAt: response.userInfo.lastLogggedOutAt,
              });
              this.setUserLogStatus(true);

              this.storageService.set('accessToken', accessToken);
              this.storageService.set('refreshToken', refreshToken);

              const { tokens, ...rest } = response?.userInfo;
              resolve(rest);
           } else {
              this.setUserInfo(null!);
              this.setUserLogStatus(false);
              resolve(null!);
           }
        },
        error: (error) => reject(error)
      })
    })
  }

  private getTokens(): Observable<SignInResponseInterface> {
    // const refreshToken = this.storageService.get('refreshToken');
    return this.http.get<SignInResponseInterface>(`${this.apiBasePath}/api/v1/auth/refresh`, {
      // headers: {
      //   Authorization: `Bearer ${refreshToken}`
      // }
    }); 
  }

  public async openLoginModal() {
      const modal = await this.modalController.create({
         component: LoginModalComponent,
         mode: 'ios'
      });

      await modal.present();
  }

}
