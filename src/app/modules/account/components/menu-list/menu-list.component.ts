// Core Modules
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Components
import { MenuItemComponent } from './../menu-item/menu-item.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Output() onReady: EventEmitter<MenuListComponent> = new EventEmitter<MenuListComponent>();
  @Output() onMenuItemSelected: EventEmitter<MenuItemComponent> = new EventEmitter<MenuItemComponent>();

  state = {
    ui: {
      menuItems: new Array<MenuItemComponent>(),
      menus: [
        { name: 'profile', title: 'Profile' },
        { name: 'upload-photo', title: 'Upload Photo' },
        { name: 'change-password', title: 'Change Password' }
      ],
      changes: {
        previous: null,
        current: null
      }
    }
  };

  constructor() { }

  ngOnInit() {
    this.onReady.emit(this);
  }

  menuItemReady(menuItem: MenuItemComponent) {
    this.state.ui.menuItems.push(menuItem);
  }

  menuItemClick(menuItem: MenuItemComponent) {
    if (this.state.ui.changes.current === menuItem) {
      return;
    }

    this.state.ui.changes.previous = this.state.ui.changes.current === null ? menuItem : this.state.ui.changes.current;
    this.state.ui.changes.current = menuItem;

    this.clearMenuItemSelected();
    menuItem.setSelected(true);

    this.onMenuItemSelected.emit(menuItem);
  }

  clearMenuItemSelected() {
    for (let i = 0; i < this.state.ui.menuItems.length; i++) {
      this.state.ui.menuItems[i].setSelected(false);
    }
  }

  getMenuByName(name: String) {
    let menu = null;
    for (let i = 0; i < this.state.ui.menuItems.length; i++) {
      if (this.state.ui.menuItems[i].name === name) {
        menu = this.state.ui.menuItems[i];
        break;
      }
    }

    return menu;
  }
}
