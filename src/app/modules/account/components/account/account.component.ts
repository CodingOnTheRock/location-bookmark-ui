// Core Modules
import { Component, trigger, transition, style, animate, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('menuList') menuList: MenuListComponent;

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
      this.selectMenuByPath();
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
    this.router.navigate(['/account']);
  }

  onAccountInfoSignOutClick() {
    super.signout();
  }

  onMenuListReady(menuList: MenuListComponent) {
    // No Action
  }

  onMenuListItemSelected(menuItem: MenuItemComponent) {
    const name = menuItem.name;
    this.router.navigate(['/account/' + name]);
  }

  panelClick() {
    if (this.state.ui.accountInfo.isShow) {
      this.showAccountInfo(false);
    }
  }

  selectMenuByPath() {
    const urlPaths = this.router.url.split('/');
    let menuName = urlPaths[urlPaths.length - 1];
    menuName = menuName === 'account' ? 'profile' : menuName;

    switch (menuName) {
      case 'profile':
      case 'change-password':
        const menuItem = this.menuList.getMenuByName(menuName);
        this.menuList.menuItemClick(menuItem);
        break;
    }
  }
}
