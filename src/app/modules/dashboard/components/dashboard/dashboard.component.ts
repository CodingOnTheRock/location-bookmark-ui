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
export class DashboardComponent extends BaseComponent implements OnInit {
  state = {
    ui: {
      toolbar: {
        avatar: undefined,
        icon: 'dashboard',
        title: 'Dashboard',
        username: undefined,
        isIconActive: false
      },
      accountInfo: {
        avatar: undefined,
        firstname: undefined,
        lastname: undefined,
        email: undefined,
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
    this.onReady.subscribe(() => {
      this.onComponentReady();
    });
  }

  onComponentReady() {
    const firstname = super.getFirstname();
    const lastname = super.getLastname();
    const name = super.getName();
    const email = super.getEmail();
    const photo = super.getPhoto();

    this.state.ui.toolbar.avatar = photo;
    this.state.ui.toolbar.username = name;

    this.state.ui.accountInfo.avatar = photo;
    this.state.ui.accountInfo.firstname = firstname;
    this.state.ui.accountInfo.lastname = lastname;
    this.state.ui.accountInfo.email = email;
  }

  onToolbarIconClick(isIconActive) {
    // No Action
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

  onAccountInfoAccountClick() {
    this.router.navigate(['/account']);
  }

  onAccountInfoSignOutClick() {
    super.signout();
  }

  panelClick() {
    if (this.state.ui.accountInfo.isShow) {
      this.showAccountInfo(false);
    }
  }

  iconClick(icon: String) {
    switch (icon) {
      case 'bookmark' :
        this.router.navigate(['/bookmark']);
        break;
      case 'account' :
      this.router.navigate(['/account']);
        break;
    }
  }
}
