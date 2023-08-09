import { Component, OnInit } from '@angular/core';

export type StoryInfoType = {
  id: string;
  content: string;
  postedBy: string;
  isSeen: boolean;
}
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent  implements OnInit {

  avatarUrl: string = 'https://api.dicebear.com/6.x/micah/svg?seed=rahul';

  public stories: Array<StoryInfoType> = [
    {
      id: '1',
      content: 'https://api.dicebear.com/6.x/micah/svg?seed=trijit',
      postedBy: 'Trijit',
      isSeen: false
    },
    {
      id: '2',
      content: 'https://api.dicebear.com/6.x/micah/svg?seed=sourav',
      postedBy: 'Sourav',
      isSeen: true
    },
    {
      id: '3',
      content: 'https://api.dicebear.com/6.x/micah/svg?seed=rahul',
      postedBy: 'Rahul',
      isSeen: false
    },
    {
      id: '4',
      content: 'https://api.dicebear.com/6.x/micah/svg?seed=bhaskar',
      postedBy: 'Bhaskar',
      isSeen: false
    },
    {
      id: '5',
      content: 'https://api.dicebear.com/6.x/micah/svg?seed=akash',
      postedBy: 'Akash',
      isSeen: false
    }
  ];

  constructor() { }

  ngOnInit() {}

}
