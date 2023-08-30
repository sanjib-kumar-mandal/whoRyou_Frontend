import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatInfoInterface } from 'src/app/pages/chat-room/chat-room.interface';
import { ConversationInfoInterface } from 'src/app/pages/chats/chats.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: Socket;
  private conversations$ = new BehaviorSubject<Array<ConversationInfoInterface>>(null!);
  private chats$ = new BehaviorSubject<Array<ChatInfoInterface>>(null!);

  constructor() {
    this.setupSocketConnection();
  }

  private setupSocketConnection() {
    this.socket = io(environment.apiBasePath, { transports : ['websocket'] });
  }

  public sendUserId(userId: string) {
    this.socket?.emit('USER_ID', { userId });
  }

  public getAllConversations(): Observable<Array<ConversationInfoInterface>> {
    this.socket.on('CONVERSATIONS', (payload: Array<ConversationInfoInterface>) => {
        console.log("ConversationInfo payload", payload);
        this.conversations$.next(payload);
    });

    return this.conversations$.asObservable();
  }

  public getChats(): Observable<Array<ChatInfoInterface>> {
     this.socket.on('CHAT', (payload: Array<ChatInfoInterface>) => {
         console.log('ChatInfo payload', payload);
         this.chats$.next(payload);
     });
    
     return this.chats$.asObservable();
  }
}
