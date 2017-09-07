// Core Modules
import { NgModule } from '@angular/core';

// Application Modules
import { SharedModule } from './../shared/shared.module';
import { BookmarkRoutingModule } from './bookmark-routing.module';

// Components
import { BookmarkComponent } from './components/bookmark/bookmark.component';

@NgModule({
  imports: [
    SharedModule,
    BookmarkRoutingModule
  ],
  providers: [],
  declarations: [
    BookmarkComponent
  ]
})
export class BookmarkModule { }
