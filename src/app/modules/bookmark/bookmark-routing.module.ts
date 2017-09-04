// Core Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { BookmarkComponent } from './components/bookmark/bookmark.component';

// Routes
const routes: Routes = [
  { path: 'bookmark', component: BookmarkComponent }
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
