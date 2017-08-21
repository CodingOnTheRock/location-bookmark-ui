import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdInputModule, MdButtonModule, MdProgressBarModule } from '@angular/material';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    MdInputModule,
    MdButtonModule,
    MdProgressBarModule,

    SignupRoutingModule
  ],
  declarations: [
    SignupComponent
  ]
})
export class SignupModule { }
