// Core Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './../shared/guards/auth/auth.guard';

// Components
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

// Routes
const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'upload-photo', component: UploadPhotoComponent, canActivate: [AuthGuard] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule { }
