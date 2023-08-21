import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OnboardingService, PersonalInfoType } from 'src/app/pages/onboarding/onboarding.service';
import { ToastService } from 'src/app/services/toast/toast.service';

type GenderType = {
  value: string;
  label: string;
}
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {

  @Output() onNextSlide: EventEmitter<void> = new EventEmitter<void>();

  public isGenderSelectTouched: boolean = false;
  public isGenderSelected: boolean = false;
  public genders: Array<GenderType> = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    }
  ];

  public personalInfo: PersonalInfoType = {
    firstname: null!,
    lastname: null!,
    gender: null!,
    age: null!
  };

  constructor(
    private readonly toastService: ToastService,
    private readonly onBoardingService: OnboardingService
  ) { }

  ngOnInit(): void {}

  public onDismissGenderSelect(): void {
    this.isGenderSelectTouched = true;
    this.isGenderSelected = !!this.personalInfo.gender;
  }

  public onChangeGender(event: any): void {
    this.personalInfo = { ...this.personalInfo, gender: event.detail.value}
  }

  private isValidPersonalInfo(): boolean {
     return !Object.values(this.personalInfo).includes(null!);
  }

  public goToNextSlide(): void {
    console.log(this.personalInfo)
    let isValidPersonalInfo = this.isValidPersonalInfo();

    if(isValidPersonalInfo) {
      this.onBoardingService.setPerfonalInfo(this.personalInfo);
      this.onNextSlide.emit();
    } else {
      this.toastService.show({
        message: 'Please enter necessary details to proceed!',
        status: 'danger',
        duration: 3000
      })
    }
  }

}
