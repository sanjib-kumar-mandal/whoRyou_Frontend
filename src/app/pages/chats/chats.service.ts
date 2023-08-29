import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConversationInfoInterface } from './chats.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private apiBasePath: string = environment.apiBasePath;

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllConversationsByUserId(): Observable<Array<ConversationInfoInterface>> {
      return this.http.get<Array<ConversationInfoInterface>>(`${this.apiBasePath}/api/v1/chat/conversations`);
  }
}
