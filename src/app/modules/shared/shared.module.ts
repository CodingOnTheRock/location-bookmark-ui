// Core Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular Google Map's Modules
import { AgmCoreModule } from '@agm/core';

// Material Design's Modules
import { MdInputModule, MdButtonModule, MdProgressBarModule, MdSnackBarModule, MdTooltipModule } from '@angular/material';

// Services
import { HttpClient } from './../../core/net/http-client';
import { HttpService } from './services/http-service/http-service.service';
import { LocalStorageUtils } from './../../core/browser/local-storage-utils';
import { RegularExpression } from './../../core/utils/regular-expression';

// Components
import { ProgressBarComponent } from './components/progressbar/progressbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';

import { MapComponent } from './components/map/map/map.component';

// Environment
import { environment } from './../../../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    AgmCoreModule.forRoot({
      apiKey: environment.apis.google_map.key
    }),

    MdInputModule,
    MdButtonModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdTooltipModule
  ],
  declarations: [
    ProgressBarComponent,
    ToolbarComponent,
    AccountInfoComponent,
    MapComponent
  ],
  providers: [
    HttpClient,
    HttpService,
    LocalStorageUtils,
    RegularExpression
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    MdInputModule,
    MdButtonModule,
    MdProgressBarModule,
    MdSnackBarModule,
    MdTooltipModule,

    ProgressBarComponent,
    ToolbarComponent,
    AccountInfoComponent,
    MapComponent
  ]
})
export class SharedModule { }
