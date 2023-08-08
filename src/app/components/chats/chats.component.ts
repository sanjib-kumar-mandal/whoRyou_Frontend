import { Component, OnInit } from '@angular/core';

type ChatType = {
  id: number;
  name: string;
  lastMessage: string;
}  

@Component({
  selector: 'app-chats-component',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent  implements OnInit {

  public chats: Array<ChatType> = [

  ];

  constructor() { }

  ngOnInit() {}

}
