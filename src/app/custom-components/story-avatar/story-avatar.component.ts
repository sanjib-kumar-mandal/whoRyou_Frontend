import { Component, Input, OnInit } from '@angular/core';
import { StoryInfoType } from 'src/app/components/story/story.component';

@Component({
  selector: 'app-story-avatar',
  templateUrl: './story-avatar.component.html',
  styleUrls: ['./story-avatar.component.scss'],
})
export class StoryAvatarComponent  implements OnInit {

  @Input() isAddStoryButton: boolean = false;
  @Input() storyInfo!: StoryInfoType;

  constructor() {}

  ngOnInit() {}

}
