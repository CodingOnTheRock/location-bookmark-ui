// Core Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './../shared/guards/auth/auth.guard';

// Components
import { BookmarkComponent } from './components/bookmark/bookmark.component';

// Routes
const routes: Routes = [
  { path: 'bookmark', component: BookmarkComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BookmarkRoutingModule { }
