import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isProcessing: Boolean = false;
  fc_email: FormControl;
  fc_password: FormControl;

  constructor() { }

  ngOnInit() {
    this.initialForm();
  }

  initialForm() {
    this.fc_email = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]);
    this.fc_password = new FormControl('', [
      Validators.required
    ]);
  }

  btnSigninClick() {
    this.isProcessing = !this.isProcessing;
  }
}
