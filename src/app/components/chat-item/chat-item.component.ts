import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatItemInfoType } from '../chats/chats.component';
@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent  implements OnInit {

  @Input() chatItemInfo!: ChatItemInfoType;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  navigateToChatroom() {
      this.router.navigate(['chat-room']);
  }

}
