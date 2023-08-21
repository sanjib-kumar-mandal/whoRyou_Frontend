import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnboardingService } from 'src/app/pages/onboarding/onboarding.service';
import { ToastService } from 'src/app/services/toast/toast.service';

type InputType = 'text' | 'password';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent  implements OnInit {

  @Output() onPrevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCreateProfile: EventEmitter<void> = new EventEmitter<void>();

  public password!: string;
  public passwordCopy!: string;
  public inputType: InputType = 'password';
  private errorMessage!: string;

  constructor(
    private readonly toastService: ToastService,
    private readonly onBoardingService: OnboardingService
  ) { }

  ngOnInit() {}

  public onCheckboxClicked(event: any) {
    this.inputType = event.detail.checked ? 'text' : 'password';
  }

  public isValidPassword(): boolean {
    if(!this.password) {
       this.errorMessage = 'Please enter password!'
       return false;
    } 
    
    if(!this.passwordCopy) {
       this.errorMessage = 'Please confirm password!'
       return false;
    } 
    
    if(!PASSWORD_REGEX.test(this.password)) {
       this.errorMessage = 'Password should contain minimum eight characters, at least one letter and one number!';
       return false;
    } 

    if(this.password !== this.passwordCopy) {
      this.errorMessage = 'Password doesn\'t match!';
      return false;
    }

    return true;
  }

  public goToPrevSlide() {
      this.onPrevSlide.emit();
  }

  public createProfile() {
    let isValidPassword = this.isValidPassword();

    if(isValidPassword) {
      this.onBoardingService.setPassword(this.password);
      this.onCreateProfile.emit();
    } else {
      this.toastService.show({
        message: this.errorMessage,
        status: 'danger',
        duration: 3000
      })
    }
  }

}
