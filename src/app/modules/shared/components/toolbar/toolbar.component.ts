import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { slideLTR } from './../../../../core/animations/slide';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  animations: [
    slideLTR
  ]
})
export class ToolbarComponent implements OnInit {
  @Input() icon: String = '';
  @Input() title: String = '';
  @Input() username: String = '';
  @Input() isIconActive: Boolean = false;
  @Output() onIconClicked: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() onAvatarClicked = new EventEmitter();
  @Output() onAvatarMouseEnterLeave: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  isShowUsername: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  iconClick() {
    this.isIconActive = !this.isIconActive;
    this.onIconClicked.emit(this.isIconActive);
  }

  avatarClick() {
    this.onAvatarClicked.emit();
  }

  avatarMouseEnter() {
    this.toggleShowUsername();

    this.onAvatarMouseEnterLeave.emit(this.isShowUsername);
  }

  avatarMouseLeave() {
    this.toggleShowUsername();

    this.onAvatarMouseEnterLeave.emit(this.isShowUsername);
  }

  toggleShowUsername() {
    this.isShowUsername = !this.isShowUsername;
  }
}
