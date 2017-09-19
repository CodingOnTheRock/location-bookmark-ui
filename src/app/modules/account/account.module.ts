// Core Modules
import { NgModule } from '@angular/core';

// Application Modules
import { SharedModule } from './../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';

// Components
import { AccountComponent } from './components/account/account.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  providers: [
    AccountComponent
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
