// Core Modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  @Input() firstname: String = '';
  @Input() lastname: String = '';
  @Input() email: String = '';
  @Output() onSignOutClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  signOutClick() {
    this.onSignOutClick.emit();
  }
}
