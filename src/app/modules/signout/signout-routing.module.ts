// Core Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { SignoutComponent } from './components/signout/signout.component';

// Routes
const routes: Routes = [
  { path: 'signout', component: SignoutComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SignoutRoutingModule { }
