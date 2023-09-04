import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatInfoInterface } from './chat-room.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  private apiBasePath: string = environment.apiBasePath;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getChats(receiverId: string): Observable<Array<ChatInfoInterface>> {
    console.log("receiverId", receiverId)
    return this.http.get<Array<ChatInfoInterface>>(`${this.apiBasePath}/api/v1/chat/chats/${receiverId}`);
  }
}
