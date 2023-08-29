import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  constructor(
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {}

  public handleLogout() {
      this.authService.handleLogoutUser().then((status) => {
          if(status) {
            this.authService.openLoginModal();
            this.toastService.show({
              message: 'You have successfully logged out!',
              status: 'success',
              duration: 3000
            })
          }
      });
  }

}
