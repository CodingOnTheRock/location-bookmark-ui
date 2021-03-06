// Core Modules
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProfileService } from './../../../shared/services/profile/profile.service';

// Components
import { BaseComponent } from './../../../shared/components/base/base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnDestroy {
  state = {
    events: {
      onReady: undefined,
      onProfileLoaded: undefined
    },
    ui: {
      firstname: '',
      lastname: '',
      name: '',
      email: '',
    }
  };

  constructor(
    public router: Router,
    public profileService: ProfileService
  ) {
    super(
      router,
      profileService
    );

    this.subscribeEvents();
  }

  ngOnDestroy() {
    this.unsubscribeEvents();
  }

  subscribeEvents() {
    this.state.events.onReady = this.onReady.subscribe(() => {
      this.childReady();
    });
    this.state.events.onProfileLoaded = this.onProfileLoaded.subscribe(() => {
      this.initial();
    });
  }

  unsubscribeEvents() {
    this.state.events.onReady.unsubscribe();
    this.state.events.onProfileLoaded.unsubscribe();
  }

  initial() {
    this.state.ui.firstname = this.getFirstname();
    this.state.ui.lastname = this.getLastname();
    this.state.ui.name = this.getName();
    this.state.ui.email = this.getEmail();
  }
}
