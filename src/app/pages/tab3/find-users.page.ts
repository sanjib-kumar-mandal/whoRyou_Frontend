import { Component, OnInit } from '@angular/core';
import { FindUsersService } from './find-users.service';
import { UserInfoInterface } from '../onboarding/onboarding.interface';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-users',
  templateUrl: 'find-users.page.html',
  styleUrls: ['find-users.page.scss']
})
export class FindUsersPage implements OnInit {

  private userId: string = '';
  public users: Array<UserInfoInterface> = new Array();
  public isFetchingUsers!: boolean;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly findUsersService: FindUsersService
  ) {
    this.isFetchingUsers = true;
  }

  ngOnInit(): void {
    this.authService.userInfoObservable.pipe(filter(info => info !== null)).subscribe({
      next: info => {
        this.userId = info.id;
        console.log(this.userId);
        this.getAllUsers();
      }
    })
     
  }

  private getAllUsers() {
    this.findUsersService.getAllUsers()
        .pipe(
          map(users => {
            users = users?.filter(user => user._id !== this.userId);
            users?.map(user => {
              user.avatarUrl = `https://api.dicebear.com/6.x/micah/svg?seed=${user.nickname}`
            });
            return users || [];
          })
        )
        .subscribe({
      next: users => {
        if(users?.length) {
          console.log('users', users)
          this.users = users;
        }
        this.isFetchingUsers = false;
      }
    })
  }

  public goToChatRoom(user: UserInfoInterface) {
     this.router.navigate(['/chat-room', user.nickname, user._id]);
  }

}
