// Core Modules
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { HttpService } from './../../../shared/services/http/http.service';
import { ProfileService } from './../../../shared/services/profile/profile.service';

// Models
import { ChangePassword } from './../../models/change-password.model';

// Components
import { BaseComponent } from './../../../shared/components/base/base.component';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseComponent implements OnDestroy {
  // States
  state = {
    events: {
      onReady: undefined,
      onProfileLoaded: undefined
    },
    isProcessing: false,
    isChangePasswordFailed: false,
    changePasswordMsg: ''
  };

  // Form Controls
  form_change_password: FormGroup;
  tbx_current_password: FormControl;
  tbx_new_password: FormControl;
  tbx_confirm_password: FormControl;

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

    this.initialChangePasswordForm();
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
      // No Action
    });
  }

  unsubscribeEvents() {
    this.state.events.onReady.unsubscribe();
    this.state.events.onProfileLoaded.unsubscribe();
  }

  initialChangePasswordForm() {
    this.tbx_current_password = new FormControl('', [
      Validators.required
    ]);
    this.tbx_new_password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.tbx_confirm_password = new FormControl('', [
      Validators.required
    ]);

    this.form_change_password = new FormGroup({
      current_password: this.tbx_current_password,
      new_password: this.tbx_new_password,
      confirm_password: this.tbx_confirm_password
    });
  }

  isChangePasswordFormValid() {
    return this.form_change_password.valid;
  }

  isChangePasswordFormManualValid() {
    const newPassword = this.tbx_new_password.value;
    const confirmPassword = this.tbx_confirm_password.value;

    if (newPassword !== confirmPassword) {
      this.state.changePasswordMsg = 'Confirm password does not match new password';
      this.state.isChangePasswordFailed = true;

      return false;
    }

    return true;
  }

  resetChangePasswordForm() {
    this.form_change_password.reset();
  }

  disableChangePasswordForm() {
    this.form_change_password.disable();
  }

  enableChangePasswordForm() {
    this.form_change_password.enable();
  }

  raiseChangePasswordFormError() {
    this.tbx_current_password.markAsTouched();
    this.tbx_new_password.markAsTouched();
    this.tbx_confirm_password.markAsTouched();
  }

  changePasswordFormSubmit() {
    const isChangePasswordFormValid = this.isChangePasswordFormValid();
    if (!isChangePasswordFormValid) {
      this.raiseChangePasswordFormError();
      return;
    }

    const isChangePasswordFormManualValid = this.isChangePasswordFormManualValid();
    if (!isChangePasswordFormManualValid) {
      return;
    }

    this.changePassword();
  }

  beforeChangePasswordRequest() {
    // Clear error
    this.clearError();

    // Show progress bar
    this.state.isProcessing = true;

    // Disable change password form
    this.disableChangePasswordForm();
  }

  afterChangePasswordRequest() {
    // Hide progress bar
    this.state.isProcessing = false;

    // Enable change password form
    this.enableChangePasswordForm();
  }

  changePasswordRequest() {
    this.beforeChangePasswordRequest();

    const changePasswordData = new ChangePassword(this.tbx_current_password.value, this.tbx_new_password.value);
    this.httpService.put('/api/user/update/password', changePasswordData)
      .subscribe(
        (data) => this.changePasswordSuccess(data.json()),
        (err) => this.changePasswordFailed(err),
        () => this.changePasswordCompleted()
      );
  }

  changePasswordSuccess(data) {
    if (!data.success) {
      this.changePasswordFailed(data.message);
      return;
    }

    // Clear form
    this.resetChangePasswordForm();

    // Clear form error message
    this.clearError();

    // Reload profile
    this.reloadProfile();

    // Show message
    this.snackBar.open('Change password successful', '', {
      duration: 2000
    });
  }

  changePasswordFailed(err) {
    this.state.changePasswordMsg = err;
    this.state.isChangePasswordFailed = true;

    this.afterChangePasswordRequest();
  }

  changePasswordCompleted() {
    this.afterChangePasswordRequest();
  }

  changePassword() {
    this.changePasswordRequest();
  }

  clearError() {
    this.state.changePasswordMsg = '';
    this.state.isChangePasswordFailed = false;
  }
}
