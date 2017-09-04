// Core Modules
import { Component, trigger, transition, style, animate, OnInit } from '@angular/core';

// Animations
import { slideLTR, } from './../../../../core/animations/slide';
import { fade } from './../../../../core/animations/fade';

// Services
import { HttpService } from './../../../shared/services/http-service/http-service.service';
import { ProfileService } from './../../../shared/services/profile-service/profile-service.service';

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
    public profileService: ProfileService,
    private httpService: HttpService
  ) {
    super(profileService);
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

  showMenu(isShowMenu) {
    this.state.ui.toolbar.isIconActive = isShowMenu;
  }

  showAccountInfo(isShowAccountInfo) {
    this.state.ui.accountInfo.isShow = isShowAccountInfo;
  }
}
