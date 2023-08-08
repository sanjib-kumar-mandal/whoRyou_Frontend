import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatsPage } from './chats.page';

import { ChatsPageRoutingModule } from './chats-routing.module';
import { StoryComponent } from 'src/app/components/story/story.component';
import { StoryAvatarComponent } from 'src/app/custom-components/story-avatar/story-avatar.component';
import { ChatsComponent } from 'src/app/components/chats/chats.component';
import { ChatItemComponent } from 'src/app/components/chat-item/chat-item.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatsPageRoutingModule
  ],
  declarations: [
    ChatsPage, 
    StoryComponent, 
    StoryAvatarComponent, 
    ChatsComponent, 
    ChatItemComponent
  ]
})
export class ChatsPageModule {}
