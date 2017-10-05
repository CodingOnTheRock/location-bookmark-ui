// Core Modules
import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { AuthService } from './../../../shared/services/auth/auth.service';
import { ProfileService } from './../../../shared/services/profile/profile.service';

// Components
import { BaseComponent } from './../../../shared/components/base/base.component';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: [
    './signout.component.css',
    './../../../shared/styles/shared.css'
  ]
})
export class SignoutComponent extends BaseComponent implements OnDestroy {
  state = {
    events: {
      onReady: undefined,
      onProfileLoaded: undefined,
      onProfileFailed: undefined
    }
  };
  profile = undefined;

  constructor(
    public router: Router,
    public profileService: ProfileService,
    private route: ActivatedRoute,
    private authService: AuthService
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
    this.state.events.onProfileFailed = this.onProfileFailed.subscribe(() => {
      this.redirectToSignin({});
      return;
    });
  }

  unsubscribeEvents() {
    this.state.events.onReady.unsubscribe();
    this.state.events.onProfileLoaded.unsubscribe();
    this.state.events.onProfileFailed.unsubscribe();
  }

  initial() {
    this.profile = super.getProfile();
    const params = { queryParams: { email: this.profile.email } };

    this.clearSession();
    this.redirectToSignin(params);
  }

  clearSession() {
    this.authService.clearToken();
    this.profileService.clearProfile();
  }

  redirectToSignin(params) {
    this.router.navigate(['/signin'], params);
  }
}
