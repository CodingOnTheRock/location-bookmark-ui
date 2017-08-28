// Core Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Routes
const homeRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
