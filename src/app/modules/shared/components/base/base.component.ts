// Core Modules
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProfileService } from './../../../shared/services/profile/profile.service';

@Component({
  selector: 'app-base-component',
  template: ''
})
export class BaseComponent {
  @Output() onReady = new EventEmitter();

  base = {
    profile: {
      firstname: '',
      lastname: '',
      name: '',
      email: '',
      photo: ''
    }
  };

  constructor(
    public router: Router,
    public profileService: ProfileService
  ) {
    this.customInit();
  }

  customInit() {
    this.profileService.getProfile()
    .then((profile) => {
      this.manageProfile(profile);
      this.onReady.emit();
    })
    .catch((err) => {
      // Authentication failed (Invalid token or somethings broken)
      this.router.navigate(['/signin']);
    });
  }

  manageProfile(profile) {
    this.base.profile = profile;
  }

  getProfile() {
    return this.base.profile;
  }

  getPhoto() {
    if (!this.base.profile.photo) {
      return undefined;
    }

    return './../../' + this.base.profile.photo;
  }

  signout() {
    this.router.navigate(['/signout']);
  }
}
