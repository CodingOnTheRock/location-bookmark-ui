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
import { MenuListComponent } from './../menu-list/menu-list.component';
import { MenuItemComponent } from './../menu-item/menu-item.component';

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
        avatar: undefined,
        icon: 'account_circle',
        title: 'Account',
        username: undefined,
        isIconActive: false
      },
      accountInfo: {
        avatar: undefined,
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        isShow: false
      },
      menu: {
        selected: undefined
      },
      panel: {
        isShowProfile: false,
        isShowChangePassword: false,
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

  onAccountInfoAccountClick() {
    // No Action
  }

  onAccountInfoSignOutClick() {
    super.signout();
  }

  onMenuListReady(menuList: MenuListComponent) {
    menuList.selectDefault();
  }

  onMenuListItemSelected(menuItem: MenuItemComponent) {
    this.state.ui.menu.selected = menuItem;

    setTimeout(() => {
      this.hideContent();
      this.showContent(menuItem);
    }, 100);
  }

  panelClick() {
    if (this.state.ui.accountInfo.isShow) {
      this.showAccountInfo(false);
    }
  }

  showContent(menu: MenuItemComponent) {
    const name = menu.name;
    switch (name) {
      case 'profile':
        this.state.ui.panel.isShowProfile = true;
        break;
      case 'change-password':
        this.state.ui.panel.isShowChangePassword = true;
        break;
    }
  }

  hideContent() {
    this.state.ui.panel.isShowProfile = false;
    this.state.ui.panel.isShowChangePassword = false;
  }
}
