// Core Modules
import { Component, OnInit } from '@angular/core';
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
export class SignoutComponent extends BaseComponent implements OnInit {

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
  }

  ngOnInit() {}

  onBaseComponentReady() {
    this.clearSession();
    this.redirectToSignin();
  }

  clearSession() {
    this.authService.clearToken();
    this.profileService.clearProfile();
  }

  redirectToSignin() {
    const profile = super.getProfile();
    this.router.navigate(['/signin'], { queryParams: { email: profile.email } });
  }
}
