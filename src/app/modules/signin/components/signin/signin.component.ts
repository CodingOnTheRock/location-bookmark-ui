import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EMAIL_REGEX } from './../../../../core/utils/regular-expression';
import { Signin } from './../../models/signin.model';
import { HttpService } from './../../../shared/services/http-service/http-service.service';
import { LocalStorageUtils } from './../../../../core/browser/local-storage-utils';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  // States
  isProcessing: Boolean = false;
  isAuthFailed: Boolean = false;
  authMsg: String = '';

  // Form Controls
  form_signin: FormGroup;
  tbx_email: FormControl;
  tbx_password: FormControl;

  // Constructor
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private localStorageUtils: LocalStorageUtils) { }

  ngOnInit() {
    this.initialSigninForm();
  }

  initialSigninForm() {
    this.route
      .queryParams
      .subscribe(params => {
        const email = params['email'];

        this.tbx_email = new FormControl(email, [
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ]);
        this.tbx_password = new FormControl('', [
          Validators.required
        ]);

        this.form_signin = new FormGroup({
          email: this.tbx_email,
          password: this.tbx_password
        });
    });
  }

  isSigninFormValid() {
    return this.form_signin.valid;
  }

  resetSigninForm() {
    this.form_signin.reset();
  }

  disableSigninForm() {
    this.form_signin.disable();
  }

  enableSigninForm() {
    this.form_signin.enable();
  }

  raiseSigninFormError() {
    this.tbx_email.markAsTouched();
    this.tbx_password.markAsTouched();
  }

  signinFormSubmit() {
    const isSigninFormValid = this.isSigninFormValid();
    if (!isSigninFormValid) {
      this.raiseSigninFormError();
      return;
    }

    this.signin();
  }

  beforeAuthenticationRequest() {
    // Clear error
    this.clearError();

    // Show progress bar
    this.isProcessing = true;

    // Disable signin form
    this.disableSigninForm();
  }

  afterAuthenticationRequest() {
    // Hide progress bar
    this.isProcessing = false;

    // Enable signin form
    this.enableSigninForm();
  }

  authenticationRequest() {
    this.beforeAuthenticationRequest();

    const signinData = new Signin(this.tbx_email.value, this.tbx_password.value);
    this.httpService.post('/api/authenticate', signinData)
    .subscribe(
      (data) => this.authenticationSuccess(data.json()),
      (err) => this.authenticationFailed(err),
      () => this.authenticationCompleted()
    );
  }

  authenticationSuccess(data) {
    if (!data.success) {
      this.authenticationFailed(data.message);
      return;
    }

    // Clear form error message
    this.clearError();

    // Set token
    this.setToken(data.token);

    // Redirect to Dashboard
    this.router.navigate(['/dashboard']);
  }

  authenticationFailed(err) {
    // Set form error message
    this.authMsg = err;
    this.isAuthFailed = true;
  }

  authenticationCompleted() {
    this.afterAuthenticationRequest();
  }

  signin() {
    this.authenticationRequest();
  }

  clearError() {
    this.authMsg = '';
    this.isAuthFailed = false;
  }

  setToken(token) {
    const token_key = environment.application.security.token_key;
    this.localStorageUtils.setToken(token_key, token);
  }
}
