// Core Modules
import { Component, trigger, transition, style, animate, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Animations
import { slideLTR, } from './../../../../core/animations/slide';
import { fade } from './../../../../core/animations/fade';

// Services
import { ProfileService } from './../../../shared/services/profile/profile.service';

// Components
import { BaseComponent } from './../../../shared/components/base/base.component';

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
export class BookmarkComponent extends BaseComponent implements OnInit {
  state = {
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

  constructor(
    public router: Router,
    public profileService: ProfileService
  ) {
    super(
      router,
      profileService
    );
  }

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
    // No Action
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

  onAccountInfoSignOutClicked() {
    super.signout();
  }
}
