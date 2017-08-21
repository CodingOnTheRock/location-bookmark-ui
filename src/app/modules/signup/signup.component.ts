import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isProcessing: Boolean = false;

  fc_firstname: FormControl;
  fc_lastname: FormControl;
  fc_email: FormControl;
  fc_password: FormControl;
  fc_confirmpassword: FormControl;

  constructor() { }

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.fc_firstname = new FormControl('', [
      Validators.required
    ]);
    this.fc_lastname = new FormControl('', [
      Validators.required
    ]);
    this.fc_email = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]);
    this.fc_password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.fc_confirmpassword = new FormControl('', [
      Validators.required
    ]);
  }

  btnSignupClick() {
    this.isProcessing = !this.isProcessing;
  }
}
