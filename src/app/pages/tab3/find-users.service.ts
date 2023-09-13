import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfoInterface } from '../onboarding/onboarding.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FindUsersService {

  private apiBasePath: string = environment.apiBasePath;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllUsers(): Observable<Array<UserInfoInterface>> {
    return this.http.get<Array<UserInfoInterface>>(`${this.apiBasePath}/api/v1/users/getAllUsers`);
  }
}
