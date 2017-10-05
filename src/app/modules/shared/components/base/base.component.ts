// Core Modules
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProfileService } from './../../../shared/services/profile/profile.service';

export class BaseComponent implements OnInit {
  @Output() onReady = new EventEmitter();
  @Output() onProfileLoaded = new EventEmitter();
  @Output() onProfileReloaded = new EventEmitter();
  @Output() onProfileFailed = new EventEmitter();

  constructor(
    public router: Router,
    public profileService: ProfileService
  ) {}

  ngOnInit() {
    this.profileService.onLoaded.subscribe(() => {
      this.onProfileLoaded.emit();
    });

    this.profileService.onReloaded.subscribe(() => {
      this.onProfileReloaded.emit();
    });

    this.profileService.onFailed.subscribe(() => {
      const url = this.router.url;

      switch (url) {
        case '/signout':
          this.onProfileFailed.emit();
          break;
        default:
          this.signout();
          break;
      }
    });

    this.onReady.emit();
  }

  childReady() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.load();
  }

  reloadProfile() {
    this.profileService.reload();
  }

  getProfile() {
    return this.profileService.getProfile();
  }

  getFirstname() {
    const profile = this.getProfile();
    if (!profile.firstname) {
      return undefined;
    }

    return profile.firstname;
  }

  getLastname() {
    const profile = this.getProfile();
    if (!profile.lastname) {
      return undefined;
    }

    return profile.lastname;
  }

  getName() {
    const profile = this.getProfile();
    if (!profile.name) {
      return undefined;
    }

    return profile.name;
  }

  getEmail() {
    const profile = this.getProfile();
    if (!profile.email) {
      return undefined;
    }

    return profile.email;
  }

  getPhoto() {
    const profile = this.getProfile();
    if (!profile.photo) {
      return undefined;
    }

    return './../../' + profile.photo;
  }

  signout() {
    this.router.navigate(['/signout']);
  }
}
