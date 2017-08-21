// System Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Extended Modules
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Application Modules
import { AppComponent } from './app.component';
import { HttpClient } from './core/net/http-client';

// Routing Modules
import { HomeComponent } from './modules/home/home.component';
import { SigninModule } from './modules/signin/signin.module';
import { SignupModule } from './modules/signup/signup.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    Angular2FontawesomeModule,
    BrowserAnimationsModule,

    SigninModule,
    SignupModule,
    AppRoutingModule
  ],
  providers: [ HttpClient ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
