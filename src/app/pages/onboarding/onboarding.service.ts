import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NickNameExistanceResponseIntreface, SignUpResponseInterface, UserInfoInterface } from './onboarding.interface';

export type PersonalInfoType = {
  firstname: string;
  lastname: string;
  gender: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  private apiBasePath: string = environment.apiBasePath;

  private personalInfoObserver$ = new BehaviorSubject<PersonalInfoType>({
    firstname: null!,
    lastname: null!,
    gender: null!,
    age: null!
  });
  public personalInfoObservable = this.personalInfoObserver$.asObservable();

  private nicknameObserver$ = new BehaviorSubject<string>(null!);
  public nicknameObservable = this.nicknameObserver$.asObservable();

  private passwordObserver$ = new BehaviorSubject<string>(null!);
  public passwordObservable = this.passwordObserver$.asObservable();

  constructor(
    private readonly http: HttpClient
  ) { }

  public setPerfonalInfo(personalInfo: PersonalInfoType): void {
    this.personalInfoObserver$.next(personalInfo);
  }

  public setNickname(nickname: string): void {
    this.nicknameObserver$.next(nickname);
  }

  public setPassword(password: string): void {
    this.passwordObserver$.next(password);
  }

  public isNickNameExists(nickname: string): Observable<NickNameExistanceResponseIntreface> {
    return this.http.get<NickNameExistanceResponseIntreface>(`${this.apiBasePath}/api/v1/users/nicknameExistance/${nickname}`)
                    .pipe(delay(3000))
  }
}
