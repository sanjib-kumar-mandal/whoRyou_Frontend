import { Component, OnInit } from '@angular/core';
import { filter, map, tap } from 'rxjs';
import { ChatItemInfoInterface, MessageStatusEnum } from 'src/app/pages/chats/chats.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-chats-component',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {

  public chats: Array<ChatItemInfoInterface> = [
    // {
    //   id: '1',
    //   nickName: 'Trijit',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=trijit',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 3,
    //   messageStatus: MessageStatusEnum.NOT_SEEN
    // },
    // {
    //   id: '1',
    //   nickName: 'Sourav',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=sourav',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.READ
    // },
    // {
    //   id: '1',
    //   nickName: 'Rahul',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=rahul',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.NOT_READ
    // },
    // {
    //   id: '1',
    //   nickName: 'Sanjib',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=sanjib',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.SEEN
    // },
    // {
    //   id: '1',
    //   nickName: 'Bhaskar',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=bhaskar',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.NOT_DELIVERED
    // },
    // {
    //   id: '1',
    //   nickName: 'Akash',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=akash',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.DELIVERED
    // },
    // {
    //   id: '1',
    //   nickName: 'Bipraneel',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=bipraneel',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.DELIVERED
    // },
    // {
    //   id: '1',
    //   nickName: 'Tuhin',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.DELIVERED
    // },
    // {
    //   id: '1',
    //   nickName: 'Tuhin',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.DELIVERED
    // },
    // {
    //   id: '1',
    //   nickName: 'Tuhin',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.DELIVERED
    // },
    // {
    //   id: '1',
    //   nickName: 'Tuhin',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.DELIVERED
    // },
    // {
    //   id: '1',
    //   nickName: 'Tuhin',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.DELIVERED
    // },
    // {
    //   id: '1',
    //   nickName: 'Tuhin',
    //   avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
    //   lastMessage: 'This is some message!!!',
    //   lastMessageTime: '12:25 PM',
    //   unreadMessageCount: 0,
    //   messageStatus: MessageStatusEnum.DELIVERED
    // },
  ];

  constructor(
    private authService: AuthService,
    private readonly socketService: SocketService
  ) {
    this.getAllConversations();
  }

  ngOnInit() {
    this.authService.userInfoObservable.subscribe({
      next: (userInfo) => {
        console.log("userInfo", userInfo)
        if(userInfo && Object.keys(userInfo).length) {
          this.socketService.sendUserId(userInfo.id);
        }
      }
    })
  }

  public getAllConversations() {
     this.socketService.getAllConversations()
         .pipe(
            filter(res => res !== null),
            tap((res) => console.log("res", res)),
            map((response) => {
                let chats: Array<ChatItemInfoInterface> = [];
                response.forEach(conversation => {
                  chats.push({
                     id: conversation._id,
                     nickName: conversation.participants[1].nickname,
                     avatarUrl: `https://api.dicebear.com/6.x/micah/svg?seed=${conversation.participants[1].nickname}`,
                     lastMessage: conversation.lastMessageInfo.message,
                     lastMessageTime: conversation.lastMessageInfo.time,
                     messageStatus: conversation.lastMessageInfo.status,
                     unreadMessageCount: 0
                  });
                });

                return chats;
            })
         ).subscribe({
             next: (response) => {
                 console.log("response", response)
                 this.chats = response;
             }
         })
  }

}
