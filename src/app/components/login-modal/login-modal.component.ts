import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

type LoginInfoType = {
  nickname: string;
  password: string;
}
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class LoginModalComponent  implements OnInit {

  public loginInfo: LoginInfoType = {
     nickname: '',
     password: ''
  }

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly modalController: ModalController,
    private readonly toastService: ToastService
  ) { }

  ngOnInit() {}

  public handleLogin() {
    if(this.isValidLoginInfo()) {
      this.authService.handleSignInUser(this.loginInfo)
                      .then(() => {
                        this.modalController.dismiss();
                        this.router.navigate(['/']);
                        this.toastService.show({
                          message: 'You have successfully signed in!',
                          status: 'success',
                          duration: 3000
                        })
                      })
                      .catch((error) => {
                        let message = Array.isArray(error?.error?.message) ? `${error?.error?.message[0]}!` : `${error?.error?.message}!`;
                        this.toastService.show({
                          message,
                          status: 'danger',
                          duration: 3000
                        })
                      })
    } else {
       this.toastService.show({
          message: 'Please provide necessary information!',
          status: 'danger',
          duration: 3000
       })
    }
  }

  public isValidLoginInfo() {
    return this.loginInfo.nickname && this.loginInfo.password;
  }

  public handleForgotPassword() {

  }

}
