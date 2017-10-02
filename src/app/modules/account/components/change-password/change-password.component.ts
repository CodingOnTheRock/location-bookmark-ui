// Core Modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { HttpService } from './../../../shared/services/http/http.service';

// Models
import { ChangePassword } from './../../models/change-password.model';

// Components
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  // States
  state = {
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
    private router: Router,
    private snackBar: MdSnackBar,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.initialChangePasswordForm();
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

    // Clear form error message
    this.clearError();

    // Show message
    this.snackBar.open('Change password successful', '', {
      duration: 2000
    });

    // Redirect to Signout
    setTimeout(() => {
      this.router.navigate(['/signout']);
    }, 2000);
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
