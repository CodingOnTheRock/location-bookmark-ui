// Core Modules
import { NgModule } from '@angular/core';

// Application Modules
import { SharedModule } from './../shared/shared.module';
import { SignoutRoutingModule } from './signout-routing.module';

// Components
import { SignoutComponent } from './components/signout/signout.component';

@NgModule({
  imports: [
    SharedModule,
    SignoutRoutingModule
  ],
  providers: [],
  declarations: [
    SignoutComponent
  ]
})
export class SignoutModule { }
