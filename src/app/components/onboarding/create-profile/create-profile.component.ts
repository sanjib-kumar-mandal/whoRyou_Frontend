import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent  implements OnInit {

  @Output() onPrevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCreateProfile: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  public goToPrevSlide() {
      this.onPrevSlide.emit();
  }

  public createProfile() {
      this.onCreateProfile.emit();
  }

}
