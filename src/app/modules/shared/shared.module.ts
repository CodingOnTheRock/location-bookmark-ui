// Core Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Angular Google Map's Modules
import { AgmCoreModule } from '@agm/core';

// Material Design's Modules
import { MdInputModule, MdButtonModule, MdProgressBarModule, MdSnackBarModule, MdTooltipModule, MdAutocompleteModule } from '@angular/material';

// Dropzone
import { DropzoneModule , DropzoneConfigInterface} from 'ngx-dropzone-wrapper';

// Services
import { HttpClient } from './../../core/net/http-client';
import { LocalStorageUtils } from './../../core/browser/local-storage-utils';
import { RegularExpression } from './../../core/utils/regular-expression';
import { HttpService } from './services/http/http.service';
import { AuthService } from './services/auth/auth.service';
import { ProfileService } from './services/profile/profile.service';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';

// Components
import { ProgressBarComponent } from './components/progressbar/progressbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { MapComponent } from './components/map/map/map.component';
import { LocationInfoComponent } from './components/map/location-info/location-info.component';
import { MarkerComponent } from './components/map/marker/marker.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';

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
    MdTooltipModule,
    MdAutocompleteModule,

    DropzoneModule.forRoot({})
  ],
  declarations: [
    ProgressBarComponent,
    ToolbarComponent,
    AccountInfoComponent,
    MapComponent,
    LocationInfoComponent,
    MarkerComponent,
    ImageUploaderComponent
  ],
  providers: [
    HttpClient,
    LocalStorageUtils,
    RegularExpression,

    HttpService,
    AuthService,
    ProfileService,

    AuthGuard
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
    MdAutocompleteModule,

    ProgressBarComponent,
    ToolbarComponent,
    AccountInfoComponent,
    MapComponent,
    LocationInfoComponent,
    MarkerComponent,
    ImageUploaderComponent
  ]
})
export class SharedModule { }
