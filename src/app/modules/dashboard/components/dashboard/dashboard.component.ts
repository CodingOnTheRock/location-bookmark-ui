// Core Modules
import { Component, trigger, transition, style, animate, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Animations
import { slideLTR, } from './../../../../core/animations/slide';
import { fade } from './../../../../core/animations/fade';

// Services
import { HttpService } from './../../../shared/services/http/http.service';
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
        icon: 'dashboard',
        title: 'Dashboard',
        isIconActive: false
      },
      accountInfo: {
        isShow: false
      }
    }
  };

  constructor(
    public router: Router,
    public profileService: ProfileService,
    private httpService: HttpService
  ) {
    super(
      router,
      profileService
    );
  }

  ngOnInit() {
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

  onAccountInfoSignOutClick() {
    super.signout();
  }

  iconClick(icon: String) {
    switch (icon) {
      case 'bookmark' :
        this.router.navigate(['/bookmark']);
        break;
      case 'my-account' :
        console.log('my-account');
        break;
    }
  }
}
