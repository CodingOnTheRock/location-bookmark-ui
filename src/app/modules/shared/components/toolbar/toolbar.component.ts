// Core Modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Animations
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
  @Input() avatar: String = undefined;
  @Input() icon: String = '';
  @Input() title: String = '';
  @Input() username: String = '';
  @Input() isIconActive: Boolean = false;
  @Output() onIconClick: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() onAvatarClick = new EventEmitter();
  @Output() onAvatarMouseEnterLeave: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  isShowUsername: Boolean = false;

  constructor() {}

  ngOnInit() {}

  iconClick() {
    this.isIconActive = !this.isIconActive;
    this.onIconClick.emit(this.isIconActive);
  }

  avatarClick() {
    this.onAvatarClick.emit();
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
