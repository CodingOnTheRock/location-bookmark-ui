// Core Modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() name: String;
  @Input() title: String;
  @Output() onReady = new EventEmitter();
  @Output() onMenuClick: EventEmitter<MenuItemComponent> = new EventEmitter<MenuItemComponent>();

  state = {
    selected : {
      class: {
        itemSelected: false
      }
    }
  };

  constructor() { }

  ngOnInit() {
    this.onReady.emit(this);
  }

  menuClick() {
    this.setSelected(true);

    this.onMenuClick.emit(this);
  }

  setSelected(isSelected: boolean) {
    this.state.selected.class.itemSelected = isSelected;
  }
}
