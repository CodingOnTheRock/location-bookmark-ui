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
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: [
    './account.component.css',
    './../../../shared/styles/shared.css'
  ],
  animations: [
    slideLTR,
    fade
  ]
})
export class AccountComponent extends BaseComponent implements OnInit {
  state = {
    ui: {
      toolbar: {
        icon: 'account_circle',
        title: 'Account',
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

  onToolbarIconClick(isIconActive) {
    this.router.navigate(['/dashboard']);
  }

  onToolbarAvatarClick() {
    this.showAccountInfo(!this.state.ui.accountInfo.isShow);
  }

  onToolbarAvatarMouseEnterLeave(isShowUserInfo) {
    // No Action
  }

  showAccountInfo(isShowAccountInfo) {
    this.state.ui.accountInfo.isShow = isShowAccountInfo;
  }

  onAccountInfoSignOutClick() {
    super.signout();
  }

  panelClick() {
    if (this.state.ui.accountInfo.isShow) {
      this.showAccountInfo(false);
    }
  }
}
