import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrls: ['./pilot.component.scss'],
})
export class PilotComponent implements OnInit {

  @Output() onNextSlide: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  public goToNextSlide() {
    this.onNextSlide.emit();
  }
}
