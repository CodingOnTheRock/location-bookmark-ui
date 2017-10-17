// Core Modules
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// Dropzone
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Services
import { HttpService } from './../../../shared/services/http/http.service';
import { ProfileService } from './../../../shared/services/profile/profile.service';

// Components
import { BaseComponent } from './../../../shared/components/base/base.component';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent extends BaseComponent implements OnDestroy {
  @ViewChild('imageUploader') imageUploader;

  config: DropzoneConfigInterface = {
    url: '/api/user/photo',
    uploadMultiple: false,
    maxFiles: 1,
    maxFilesize: 1,
    acceptedFiles: 'image/jpg, image/jpeg, image/png',
    headers: this.httpService.createHttpHeaders().toJSON()
  };
  state = {
    events: {
      onReady: undefined,
      onProfileLoaded: undefined
    },
    ui: {
      message: 'Drop image here!!!<br><br>',
      placeholder: '',
      duration: 3000
    }
  };

  constructor(
    public router: Router,
    public profileService: ProfileService,
    private snackBar: MdSnackBar,
    private httpService: HttpService
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

  onUploadPhotoSuccess(data) {
    // Show message
    this.snackBar.open('New photo uploaded', '', {
      duration: this.state.ui.duration
    });

    // Reset uploaded image
    setTimeout(() => {
      this.imageUploader.reset();
    }, this.state.ui.duration);

    // Reload profile
    this.reloadProfile();
  }

  onUploadPhotoError(err) {
    // Show message
    const message = err[1];
    this.snackBar.open(message, '', {
      duration: this.state.ui.duration
    });

    // Reset uploaded image
    setTimeout(() => {
      this.imageUploader.reset();
    }, this.state.ui.duration);
  }

  initial() {
    // No Action
  }
}
