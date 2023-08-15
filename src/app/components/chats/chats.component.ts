import { Component, OnInit } from '@angular/core';

export enum MessageStatusEnum {
  READ = 1, // Receiver has read the message
  NOT_READ = 2, // Receiver has not read the message
  DELIVERED = 3, // The message has been delivered to the receiver
  NOT_DELIVERED = 4, // The message has not been delivered to the receiver
  SEEN = 5, // User has seen the message
  NOT_SEEN = 6, // User has not seen the message
}

export type ChatItemInfoType = {
  id: string; 
  nickName: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
  messageStatus: MessageStatusEnum;
} 

@Component({
  selector: 'app-chats-component',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent  implements OnInit {

  public chats: Array<ChatItemInfoType> = [
      {
        id: '1',
        nickName: 'Trijit',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=trijit',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 3,
        messageStatus: MessageStatusEnum.NOT_SEEN
      },
      {
        id: '1',
        nickName: 'Sourav',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=sourav',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.READ
      },
      {
        id: '1',
        nickName: 'Rahul',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=rahul',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.NOT_READ
      },
      {
        id: '1',
        nickName: 'Sanjib',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=sanjib',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.SEEN
      },
      {
        id: '1',
        nickName: 'Bhaskar',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=bhaskar',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.NOT_DELIVERED
      },
      {
        id: '1',
        nickName: 'Akash',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=akash',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.DELIVERED
      },
      {
        id: '1',
        nickName: 'Bipraneel',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=bipraneel',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.DELIVERED
      },
      {
        id: '1',
        nickName: 'Tuhin',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.DELIVERED
      },
      {
        id: '1',
        nickName: 'Tuhin',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.DELIVERED
      },
      {
        id: '1',
        nickName: 'Tuhin',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.DELIVERED
      },
      {
        id: '1',
        nickName: 'Tuhin',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.DELIVERED
      },
      {
        id: '1',
        nickName: 'Tuhin',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.DELIVERED
      },
      {
        id: '1',
        nickName: 'Tuhin',
        avatarUrl: 'https://api.dicebear.com/6.x/micah/svg?seed=tuhin',
        lastMessage: 'This is some message!!!',
        lastMessageTime: '12:25 PM',
        unreadMessageCount: 0,
        messageStatus: MessageStatusEnum.DELIVERED
      },
  ];

  constructor() { }

  ngOnInit() {

  }

}
