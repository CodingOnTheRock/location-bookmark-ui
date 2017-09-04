import { Component, trigger, transition, style, animate, OnInit } from '@angular/core';

import { slideLTR, } from './../../../../core/animations/slide';
import { fade } from './../../../../core/animations/fade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    './../../../shared/styles/shared.css'
  ],
  animations: [
    slideLTR,
    fade
  ]
})
export class DashboardComponent implements OnInit {
  state = {
    user: {
      firstname: 'Jittichai',
      lastname: 'Chetjaroenchat',
      username: 'Anonymous',
      email: 'j.chetjaroenchat@gmail.com'
    },
    ui: {
      toolbar: {
        icon: 'dashboard',
        title: 'Dashboard',
        isIconActive: false
      },
      accountInfo: {
        isShow: false
      }
    }
  };

  constructor() { }

  ngOnInit() {
  }

  onToolbarIconClicked(isIconActive) {
    this.showMenu(isIconActive);
    this.showAccountInfo(false);
  }

  onToolbarAvatarClicked() {
    this.showAccountInfo(!this.state.ui.accountInfo.isShow);
  }

  onToolbarAvatarMouseEnterLeave(isShowUserInfo) {
    // Do something
  }

  showMenu(isShowMenu) {
    this.state.ui.toolbar.isIconActive = isShowMenu;
  }

  showAccountInfo(isShowAccountInfo) {
    this.state.ui.accountInfo.isShow = isShowAccountInfo;
  }
}
