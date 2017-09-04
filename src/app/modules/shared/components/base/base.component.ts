// Core Modules
import { Component, OnInit } from '@angular/core';

// Services
import { ProfileService } from './../../../shared/services/profile-service/profile-service.service';

@Component({
  template: ''
})
export class BaseComponent {
  base = {
    profile: {}
  };

  constructor(
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
      throw err;
    });
  }

  manageProfile(profile) {
    this.base.profile = profile;
  }
}
