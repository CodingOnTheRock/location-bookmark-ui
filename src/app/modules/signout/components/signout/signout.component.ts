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

  ngOnInit() {
    setTimeout(() => {
      this.clearSession();
      this.redirectToSignin();
    }, 1000);
  }

  clearSession() {
    this.authService.clearToken();
    this.profileService.clearProfile();
  }

  redirectToSignin() {
    this.router.navigate(['/signin'], { queryParams: { email: this.base.profile.email } });
  }
}
