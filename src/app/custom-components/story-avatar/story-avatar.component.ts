import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-story-avatar',
  templateUrl: './story-avatar.component.html',
  styleUrls: ['./story-avatar.component.scss'],
})
export class StoryAvatarComponent  implements OnInit {

  @Input() isAddStoryButton: boolean = false;
  @Input() avatarUrl: string = '';

  constructor() {}

  ngOnInit() {}

}
