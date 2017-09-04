import { Component, trigger, transition, style, animate, OnInit } from '@angular/core';

import { slideLTR, } from './../../../../core/animations/slide';
import { fade } from './../../../../core/animations/fade';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: [
    './bookmark.component.css',
    './../../../shared/styles/shared.css'
  ],
  animations: [
    slideLTR,
    fade
  ]
})
export class BookmarkComponent implements OnInit {
  state = {
    user: {
      firstname: 'Jittichai',
      lastname: 'Chetjaroenchat',
      username: 'Anonymous',
      email: 'j.chetjaroenchat@gmail.com'
    },
    ui: {
      toolbar: {
        icon: 'place',
        title: 'Bookmark',
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

  onMapFocus() {
    this.showMenu(false);
    this.showAccountInfo(false);
  }

  showMenu(isShowMenu) {
    this.state.ui.toolbar.isIconActive = isShowMenu;
  }

  showAccountInfo(isShowAccountInfo) {
    this.state.ui.accountInfo.isShow = isShowAccountInfo;
  }
}
