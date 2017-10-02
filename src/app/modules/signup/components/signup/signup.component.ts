// Core Modules
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { EMAIL_REGEX } from './../../../../core/utils/regular-expression';
import { HttpService } from './../../../shared/services/http/http.service';

// Models
import { Signup } from './../../models/signup.model';

// Components
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // States
  state = {
    isProcessing: false,
    isSignupFailed: false,
    signupMsg: ''
  };

  // Form Controls
  form_signup: FormGroup;
  tbx_firstname: FormControl;
  tbx_lastname: FormControl;
  tbx_name: FormControl;
  tbx_email: FormControl;
  tbx_password: FormControl;
  tbx_confirmpassword: FormControl;

  // Constructor
  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.tbx_firstname = new FormControl('', [
      Validators.required
    ]);
    this.tbx_lastname = new FormControl('', [
      Validators.required
    ]);
    this.tbx_name = new FormControl('', [
      Validators.required
    ]);
    this.tbx_email = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]);
    this.tbx_password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.tbx_confirmpassword = new FormControl('', [
      Validators.required
    ]);

    this.form_signup = new FormGroup({
      firstname: this.tbx_firstname,
      lastname: this.tbx_lastname,
      name: this.tbx_name,
      email: this.tbx_email,
      password: this.tbx_password,
      comfirmpassword: this.tbx_confirmpassword
    });
  }

  isSignupFormValid() {
    return this.form_signup.valid;
  }

  isSignupFormManualValid() {
    const password = this.tbx_password.value;
    const confirmPassword = this.tbx_confirmpassword.value;

    if (password !== confirmPassword) {
      this.state.signupMsg = 'Confirm password does not match password';
      this.state.isSignupFailed = true;

      return false;
    }

    return true;
  }

  disableSignupForm() {
    this.form_signup.disable();
  }

  enableSignupForm() {
    this.form_signup.enable();
  }

  raiseSignupFormError() {
    this.tbx_firstname.markAsTouched();
    this.tbx_lastname.markAsTouched();
    this.tbx_name.markAsTouched();
    this.tbx_email.markAsTouched();
    this.tbx_password.markAsTouched();
    this.tbx_confirmpassword.markAsTouched();
  }

  signupFormSubmit() {
    const isSignupFormValid = this.isSignupFormValid();
    if (!isSignupFormValid) {
      this.raiseSignupFormError();
      return;
    }

    const isSignupFormManualValid = this.isSignupFormManualValid();
    if (!isSignupFormManualValid) {
      return;
    }

    this.signup();
  }

  beforeSignupRequest() {
    // Clear error
    this.clearError();

    // Show progress bar
    this.state.isProcessing = true;

    // Disable signin form
    this.disableSignupForm();
  }

  afterSignupRequest() {
    // Hide progress bar
    this.state.isProcessing = false;

    // Enable signin form
    this.enableSignupForm();
  }

  signupRequest() {
    this.beforeSignupRequest();

    const signupData = new Signup(this.tbx_firstname.value, this.tbx_lastname.value, this.tbx_name.value, this.tbx_email.value, this.tbx_password.value);
    this.httpService.post('/api/signup', signupData)
    .subscribe(
      (data) => this.signupSuccess(data.json()),
      (err) => this.signupFailed(err),
      () => this.signupCompleted()
    );
  }

  signupSuccess(data) {
    if (!data.success) {
      this.signupFailed(data.message);
      return;
    }

    // Clear form error message
    this.clearError();

    // Show message
    this.snackBar.open('Signup successful', '', {
      duration: 2000
    });

    // Redirect to Signin
    setTimeout(() => {
      this.router.navigate(['/signin'], { queryParams: { email: this.tbx_email.value } });
    }, 2000);
  }

  signupFailed(err) {
    this.state.signupMsg = err;
    this.state.isSignupFailed = true;

    this.afterSignupRequest();
  }

  signupCompleted() {
    this.afterSignupRequest();
  }

  signup() {
    this.signupRequest();
  }

  clearError() {
    this.state.signupMsg = '';
    this.state.isSignupFailed = false;
  }
}
