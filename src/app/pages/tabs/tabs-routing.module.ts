import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'chats',
        loadChildren: () => import('../chats/chats.module').then(m => m.ChatsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        loadChildren: () => import('../tab3/find-users.module').then(m => m.FindUsersPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'chatfolio',
        loadChildren: () => import('../tab3/find-users.module').then(m => m.FindUsersPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/app/chats',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/chats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
