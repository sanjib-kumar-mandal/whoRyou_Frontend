import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-name-generator',
  templateUrl: './name-generator.component.html',
  styleUrls: ['./name-generator.component.scss'],
})
export class NameGeneratorComponent  implements OnInit {

  @Output() onPrevSlide: EventEmitter<void> = new EventEmitter<void>();
  @Output() onNextSlide: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  public goToPrevSlide() {
      this.onPrevSlide.emit();
  }

  public goToNextSlide() {
      this.onNextSlide.emit();
  }

  public changeNickName() {
    
  }

}
