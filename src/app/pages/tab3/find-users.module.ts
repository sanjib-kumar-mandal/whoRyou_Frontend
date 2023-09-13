import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FindUsersPage } from './find-users.page';
import { ExploreContainerComponentModule } from 'src/app/components/explore-container/explore-container.module';

import { FindUsersRoutingModule } from './find-users-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FindUsersRoutingModule
  ],
  declarations: [FindUsersPage]
})
export class FindUsersPageModule {}
