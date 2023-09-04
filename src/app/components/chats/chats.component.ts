import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ChatItemInfoInterface } from 'src/app/pages/chats/chats.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-chats-component',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {

  private userId: string = '';
  public chats: Array<ChatItemInfoInterface> = new Array();
  public isLoadingChatItems!: boolean;

  constructor(
    private authService: AuthService,
    private readonly socketService: SocketService
  ) {
     this.isLoadingChatItems = true;
  }

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    this.authService.userInfoObservable.subscribe({
      next: (userInfo) => {
        console.log("userInfo", userInfo)
        if(userInfo && Object.keys(userInfo).length) {
         // this.socketService.sendUserId(userInfo.id);
         this.userId = userInfo.id;
         this.getAllConversations();
        }
      }
    })
  }

  public getAllConversations() {
     this.socketService.getAllConversations()
         .pipe(
            map((response) => {
                if(!response?.length) {
                  console.log('firing get convo event!')
                  this.socketService.sendConversationGettingEvent();
                  return null;
                } else {
                  let chats: Array<ChatItemInfoInterface> = new Array();
                  let filteredConversations = response?.filter(res => res.participants[0]._id === this.userId || res.participants[1]._id === this.userId);
                  if(filteredConversations?.length) {
                    filteredConversations.forEach(conversation => {
                      let receiver = conversation.participants.filter(el => el._id !== this.userId);
  
                      chats.push({
                         id: conversation._id,
                         receiverId: receiver[0]._id,
                         nickName: receiver[0].nickname,
                         avatarUrl: `https://api.dicebear.com/6.x/micah/svg?seed=${receiver[0].nickname}`,
                         lastMessage: conversation.lastMessageInfo.message,
                         lastMessageTime: conversation.lastMessageInfo.time,
                         messageStatus: conversation.lastMessageInfo.status,
                         unreadMessageCount: 0
                      });
                    });
                  }

                  return chats || [];
                } 
            })
         ).subscribe({
             next: (chats) => {
              console.log("chats", chats)
                   this.chats = chats!;
                   this.isLoadingChatItems = false;    
             }
         })
  }

}
