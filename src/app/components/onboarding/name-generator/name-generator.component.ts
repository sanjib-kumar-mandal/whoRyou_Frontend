import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnboardingService } from 'src/app/pages/onboarding/onboarding.service';
import { LoaderService } from 'src/app/services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.component.html',
  styleUrls: ['./name-generator.component.scss'],
})
export class NameGeneratorComponent  implements OnInit {

  @Output() onPrevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() onNextSlide: EventEmitter<void> = new EventEmitter<void>();
  
  public nickname!: string;
  private errorMessage!: string;
  private isNickNameAlreadySet!: boolean;

  constructor(
    private readonly toastService: ToastService,
    private readonly loaderService: LoaderService,
    private readonly onBoardingService: OnboardingService
  ) { }

  ngOnInit(): void {
    this.onBoardingService.nicknameObservable.subscribe({
      next: (nickname) => {
        this.isNickNameAlreadySet = !!nickname;
      }
    })
  }

  public onTypingNickname(event: any): void {
     this.nickname = event.detail.value?.toLowerCase();
  }

  private async isValidNickName(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.onBoardingService.personalInfoObservable.subscribe({
        next: (personalInfo) => {
          if(!this.nickname) {
            this.errorMessage = 'Please enter a nick name to proceed!';
            resolve(false);
          } else if(this.nickname.includes(personalInfo.firstname.toLowerCase()) || this.nickname.includes(personalInfo.lastname.toLowerCase())) {
            this.errorMessage = 'Nick name must not include you first or last name!'
            resolve(false);
          } else {
            this.loaderService.show({ message: 'Checking for availablity...' });

            // this.onBoardingService.isNickNameExists(this.nickname).subscribe({
            //   next: (response) => {
            //     this.loaderService.dismiss();
            //     if(response?.status) {
            //       this.errorMessage = 'Nick name already exists. Please try another!'
            //       resolve(false);
            //     } else {
            //       this.errorMessage = '';
            //       resolve(true);
            //     }
            //   }
            // })
            
          }          
        }
      }).unsubscribe();
    });
  }

  public goToPrevSlide(): void {
      this.onPrevSlide.emit();
  }

  public async goToNextSlide(): Promise<void> {
 
    if(this.isNickNameAlreadySet) {
      this.onNextSlide.emit();
    } else {
      let isValidNickName = await this.isValidNickName();
  
      if(isValidNickName) {
        this.toastService.show({
          message: 'Nick name available!',
          status: 'success',
          duration: 3000
        });
        this.onBoardingService.setNickname(this.nickname);
        this.onNextSlide.emit();
      } else {
        this.toastService.show({
          message: this.errorMessage,
          status: 'danger',
          duration: 3000
        });
      }
    }

  }


}
