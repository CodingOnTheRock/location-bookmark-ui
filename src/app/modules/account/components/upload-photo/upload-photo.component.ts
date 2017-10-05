// Core Modules
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { ProfileService } from './../../../shared/services/profile/profile.service';

// Components
import { BaseComponent } from './../../../shared/components/base/base.component';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent extends BaseComponent implements OnDestroy {
  state = {
    events: {
      onReady: undefined,
      onProfileLoaded: undefined
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
    // No Action
  }
}
