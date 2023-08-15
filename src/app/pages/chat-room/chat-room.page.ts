import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageInterface, MessageTypeEnum } from './chat-room.interface';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  public message: string = '';
  public isShowEmojiStore: boolean = false;
  public messages: Array<MessageInterface> = new Array();
  public MessageType = MessageTypeEnum;

  constructor() { }

  ngOnInit() {
      this.messages.push(
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_SENDER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_SENDER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_USER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_USER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_SENDER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_USER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_SENDER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_USER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you!',
          type: MessageTypeEnum.FROM_SENDER,
          time: '12:25 PM'
        },
        {
          id: '1',
          message: 'Hey! How are you! last',
          type: MessageTypeEnum.FROM_USER,
          time: '12:25 PM'
        }
      )

      setTimeout(() => {
        this.content.scrollToBottom();
      }, 50);
  }

  public showEmojiStore() {
    setTimeout(() => {
      this.isShowEmojiStore = true;
    }, 250)
  }

  public addEmoji(event: any) {
    this.message = `${this.message} ${event.emoji.native} `;
  }

  public onFocusMessage() {
    this.isShowEmojiStore = false;
  }

}
