import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MessageInterface, MessageTypeEnum } from './chat-room.interface';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomService } from './chat-room.service';
import { Subscription, filter, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { MessageStatusEnum } from '../chats/chats.interface';
import { UserInfoInterface } from '../onboarding/onboarding.interface';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(IonContent, { read: IonContent, static: false }) content!: IonContent;
  @ViewChild('messageBox') messageBox!: ElementRef;

  private senderId: string = '';
  private receiverId: string = '';
  public nickname: string = '';
  public avatarUrl: string = '';
  public message: string = '';
  public isShowEmojiStore: boolean = false;
  public messages: Array<MessageInterface> = new Array();
  public MessageType = MessageTypeEnum;
  public receiverInfo!: UserInfoInterface;
  public chatSubscription!: Subscription;
  public isTyping!: boolean;
  public isLoadingChats!: boolean;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly chatRoomService: ChatRoomService,
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
    private readonly zone: NgZone
  ) { 
    this.isLoadingChats = true;
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

      this.chatSubscription = this.socketService.getChat().pipe(filter(messageInfo => messageInfo !== null)).subscribe({
        next: messageInfo => {
            console.log("Received msg", messageInfo);
            this.messages.push({
              id: messageInfo._id!,
              message: messageInfo.message,
              time: messageInfo.time,
              type: messageInfo.senderId === this.senderId ? MessageTypeEnum.FROM_USER : MessageTypeEnum.FROM_SENDER
            });
            this.scrollToBottom(50);
        }
      });

      Promise.all([
        this.getReceiverIdAndName(),
        this.getUserId()
      ])
        .then(([
          { receiverId, nickname },
          userId
        ]) => {
           console.log({receiverId, userId});
           [this.receiverId, this.nickname, this.senderId] = [receiverId, nickname, userId];
           this.avatarUrl = `https://api.dicebear.com/6.x/micah/svg?seed=${nickname}`;
           this.getReceiverInfo(receiverId);
           this.getChats({ receiverId, userId });
           this.socketService.placeTypingEventListener()
                             .pipe(filter(payload => payload !== null))
                             .subscribe({
                               next: payload => {
                                    this.isTyping = payload?.senderId === this.receiverId && payload?.receiverId === this.senderId;
                                    this.isTyping && this.scrollToBottom(50);
                               }
                             })
        });
  }

  ngAfterViewInit(): void {
    this.scrollToBottom(500);
  }

  private scrollToBottom(time: number) {
    this.zone.run(() => {

      const duration : number = 300;

      setTimeout(() => {
        this.messageBox.nativeElement.focus();
        this.content.scrollToBottom(duration).then(()=>{
        setTimeout(()=>{
            this.content.getScrollElement().then((element:any)=>{
              if (element.scrollTopMax != element.scrollTop) {
                this.content.scrollToBottom(duration).then(()=>{ });
              }
            });
          });
        });

      }, time);
    }); 
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

  private getReceiverInfo(receiverId: string): Promise<UserInfoInterface> {
     return new Promise((resolve, reject) => {
        this.authService.getUserById(receiverId).subscribe({
          next: (receiverInfo) => {
              if(receiverInfo && Object.keys(receiverInfo).length) {
                console.log("receiverInfo", receiverInfo);
                this.receiverInfo = receiverInfo;
              }
          }
        })
     })
  }

  private getReceiverIdAndName(): Promise<{ receiverId: string; nickname: string; }> {
    return new Promise((resolve, reject) => {
       this.activatedRoute.params.subscribe(params  => {
           resolve({ receiverId: params['receiverId'], nickname: params['nickname'] });
       });
    });
  }

  private async getChats({ receiverId, userId }: { receiverId: string; userId: string; }) {

    this.chatRoomService.getChats(receiverId)
        .pipe(
          map((response) => {
             console.log("response", response)
             let messages: Array<MessageInterface> = [];
             response.forEach((messageInfo) => {
                messages.push({
                  id: messageInfo._id!,
                  message: messageInfo.message,
                  time: messageInfo.time,
                  type: messageInfo.senderId === userId ? MessageTypeEnum.FROM_USER : MessageTypeEnum.FROM_SENDER
                })
             });
             return messages || [];
          })
        )
        .subscribe({
           next: (messages) => {
               this.messages = messages;
               this.isLoadingChats = false;
               this.scrollToBottom(50);
               console.log('messages', this.messages)
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

  public autoGrow(event: any) {
     let element = event.target;
     element.style.height = "5px";
     element.style.height = (element.scrollHeight) + "px";
     if(event.target.value) {
       this.socketService.sendTypingEvent(this.senderId, this.receiverId);
     } else {
       this.socketService.sendTyingOffEvent();
     }
  }

  public sendMessage() {
     this.socketService.sendChat({
        message: this.message,
        status: MessageStatusEnum.DELIVERED,
        time: new Date().toISOString(),
        receiverId: this.receiverId,
        senderId: this.senderId
     });
     this.socketService.sendTyingOffEvent();
     this.scrollToBottom(50);
     this.message = '';
  }


  ngOnDestroy(): void {
      this.chatSubscription?.unsubscribe();
      this.socketService.removeChatListener();
      this.socketService.removeTypingStatusListener();
      this.socketService.sendTyingOffEvent();
  }
}
