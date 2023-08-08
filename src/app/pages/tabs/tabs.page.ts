import { Component } from '@angular/core';

type TabType = {
    name: string;
    icon: { active: string; inActive: string; };
    isActive: boolean;
    displayLabel: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public tabs: Array<TabType> = [
    {
        name: 'chats',
        icon: {
          active: 'chatbox-ellipses',
          inActive: 'chatbox-ellipses-outline'
        },
        isActive: true,
        displayLabel: 'Chats'
    },
    {
        name: 'search',
        icon: {
          active: 'search',
          inActive: 'search-outline'
        },
        isActive: false,
        displayLabel: 'Search'
    },
    {
        name: 'chatfolio',
        icon: {
          active: 'bulb',
          inActive: 'bulb-outline'
        },
        isActive: false,
        displayLabel: 'Chatfolio'
    },
    {
        name: 'profile',
        icon: {
          active: 'person-circle',
          inActive: 'person-circle-outline'
        },
        isActive: false,
        displayLabel: 'Profile'
    }
  ]

  constructor() {}

  public onTabChanged(event: { tab: string; }): void {
    this.tabs.forEach(tab => {
        tab.isActive = tab.name === event.tab;
    });
  }

}
