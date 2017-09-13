// Core Modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProfileService } from './../../../shared/services/profile/profile.service';

@Component({
  template: ''
})
export class BaseComponent {
  base = {
    profile: {
      firstname: '',
      lastname: '',
      name: '',
      email: ''
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
    })
    .catch((err) => {
      // Authentication failed (Invalid token or somethings broken)
      this.router.navigate(['/signin']);
    });
  }

  manageProfile(profile) {
    this.base.profile = profile;
  }

  signout() {
    this.router.navigate(['/signout']);
  }
}
