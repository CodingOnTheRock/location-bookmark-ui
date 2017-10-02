// Core Modules
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProfileService } from './../../../shared/services/profile/profile.service';

export class BaseComponent {
  @Output() onReady = new EventEmitter();

  private profile: {
    firstname: '',
    lastname: '',
    name: '',
    email: '',
    photo: ''
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
        this.setProfile(profile);

        // Set delay without time
        setTimeout(() => {
          this.onReady.emit();
        });
      })
      .catch((err) => {
        // Authentication failed (Invalid token or somethings broken)
        this.router.navigate(['/signin']);
      });
  }

  setProfile(profile) {
    this.profile = profile;
  }

  getProfile() {
    return this.profile;
  }

  getFirstname() {
    if (!this.profile.firstname) {
      return undefined;
    }

    return this.profile.firstname;
  }

  getLastname() {
    if (!this.profile.lastname) {
      return undefined;
    }

    return this.profile.lastname;
  }

  getName() {
    if (!this.profile.name) {
      return undefined;
    }

    return this.profile.name;
  }

  getEmail() {
    if (!this.profile.email) {
      return undefined;
    }

    return this.profile.email;
  }

  getPhoto() {
    if (!this.profile.photo) {
      return undefined;
    }

    return './../../' + this.profile.photo;
  }

  signout() {
    this.router.navigate(['/signout']);
  }
}
