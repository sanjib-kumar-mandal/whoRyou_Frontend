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
  private chats$ = new BehaviorSubject<ChatInfoInterface>(null!);
  private typingStatus$ = new BehaviorSubject<{ senderId: string; receiverId: string; }>(null!);

  constructor() {
    this.setupSocketConnection();
  }

  private setupSocketConnection() {
    this.socket = io(environment.apiBasePath, { transports : ['websocket'] });
  }

  public sendConversationGettingEvent() {
    this.socket?.emit('GET_CONVERSATIONS');
  }

  public getAllConversations(): Observable<Array<ConversationInfoInterface>> {
    this.socket.on('SEND_CONVERSATIONS', (payload: Array<ConversationInfoInterface>) => {
        console.log("ConversationInfo payload", payload);
        this.conversations$.next(payload);
    });

    return this.conversations$.asObservable();
  }

  public getChat(): Observable<ChatInfoInterface> {
     this.socket.on('SEND_CHAT', (payload: ChatInfoInterface) => {
         console.log('ChatInfo payload', payload);
         this.chats$.next(payload);
     });
    
     return this.chats$.asObservable();
  }

  public sendChat(chatInfo: ChatInfoInterface) {
    this.socket.emit('CREATE_CHAT', chatInfo);
  }

  public sendTypingEvent(senderId: string, receiverId: string) {
    this.socket?.emit('TYPING', { senderId, receiverId });
  }

  public sendTyingOffEvent() {
    this.socket?.emit('TYPING', { userId: null, receiverId: null });
  }

  public placeTypingEventListener() {
    this.socket.on('ON_TYPING', (payload: { senderId: string; receiverId: string; }) => {
      console.log('on typing payload', payload);
      this.typingStatus$.next(payload);
    });
 
    return this.typingStatus$.asObservable();
  }

  public removeChatListener() {
    this.socket?.off('SEND_CHAT');
  }

  public removeTypingStatusListener() {
    this.socket?.off('ON_TYPING');
  }
}
