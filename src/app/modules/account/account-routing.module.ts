// Core Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './../shared/guards/auth/auth.guard';

// Components
import { AccountComponent } from './components/account/account.component';

// Routes
const routes: Routes = [
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
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
