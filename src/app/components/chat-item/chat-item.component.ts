import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatItemInfoInterface, MessageStatusEnum } from 'src/app/pages/chats/chats.interface';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
})
export class ChatItemComponent  implements OnInit {

  @Input() chatItemInfo!: ChatItemInfoInterface;

  public MessageStatusEnum = MessageStatusEnum;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(this.chatItemInfo)
  }

  navigateToChatroom() {
    this.router.navigate(['chat-room', this.chatItemInfo?.nickName, this.chatItemInfo?.receiverId]);
  }

}
