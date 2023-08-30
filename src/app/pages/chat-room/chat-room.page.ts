import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageInterface, MessageTypeEnum } from './chat-room.interface';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomService } from './chat-room.service';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content!: IonContent;

  private senderId: string = '';
  public message: string = '';
  public isShowEmojiStore: boolean = false;
  public messages: Array<MessageInterface> = new Array();
  public MessageType = MessageTypeEnum;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly chatRoomService: ChatRoomService,
    private readonly authService: AuthService
  ) { 
    this.getReceiverId();
  }

  ngOnInit() {
      // this.messages.push(
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_SENDER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_SENDER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_USER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_USER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_SENDER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_USER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_SENDER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_USER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you!',
      //     type: MessageTypeEnum.FROM_SENDER,
      //     time: '12:25 PM'
      //   },
      //   {
      //     id: '1',
      //     message: 'Hey! How are you! last',
      //     type: MessageTypeEnum.FROM_USER,
      //     time: '12:25 PM'
      //   }
      // )

      Promise.all([
        this.getReceiverId(),
        this.getUserId()
      ])
        .then(([
          receiverId,
          userId
        ]) => {
           console.log({receiverId, userId});
           this.getChats({ receiverId, userId });
        })

      

      setTimeout(() => {
        this.content.scrollToBottom();
      }, 50);
  }

  private getUserId(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.authService.userInfoObservable.subscribe({
        next: (userInfo) => {
          console.log("userInfo", userInfo)
          if(userInfo && Object.keys(userInfo).length) {
            resolve(userInfo.id);
          }
        }
      })
    })
  }

  private getReceiverId(): Promise<string> {
    return new Promise((resolve, reject) => {
       this.activatedRoute.params.subscribe(params  => {
           resolve(params['receiverId']);
       });
    });
  }

  private async getChats({ receiverId, userId }: { receiverId: string; userId: string; }) {

    this.chatRoomService.getChats(receiverId)
        .pipe(
          map((response) => {
             let messages: Array<MessageInterface> = [];
             response.forEach((messageInfo) => {
                messages.push({
                  id: messageInfo._id,
                  message: messageInfo.message,
                  time: messageInfo.time,
                  type: messageInfo.senderId === userId ? MessageTypeEnum.FROM_USER : MessageTypeEnum.FROM_SENDER
                })
             });
             return messages;
          })
        )
        .subscribe({
           next: (messages) => {
               this.messages = messages;
           }
    });
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
