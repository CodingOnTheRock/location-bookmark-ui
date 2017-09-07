// Core Modules
import { NgModule } from '@angular/core';

// Application Modules
import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  providers: [],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
