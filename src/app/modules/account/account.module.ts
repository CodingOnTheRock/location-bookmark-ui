// Core Modules
import { NgModule } from '@angular/core';

// Application Modules
import { SharedModule } from './../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';

// Components
import { AccountComponent } from './components/account/account.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  providers: [
    AccountComponent
  ],
  declarations: [
    AccountComponent,
    MenuItemComponent,
    MenuListComponent,
    ProfileComponent,
    UploadPhotoComponent,
    ChangePasswordComponent
  ]
})
export class AccountModule { }
