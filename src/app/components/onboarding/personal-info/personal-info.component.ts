import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent  implements OnInit {

  @Output() onNextSlide: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  public goToNextSlide() {
    this.onNextSlide.emit();
  }

}
