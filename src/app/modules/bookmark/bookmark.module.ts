// Core Modules
import { NgModule } from '@angular/core';

// Application Modules
import { SharedModule } from './../shared/shared.module';
import { BookmarkRoutingModule } from './bookmark-routing.module';

// Services
import { BookmarkService } from './services/bookmark.service';

// Components
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { BookmarkItemComponent } from './components/bookmark-item/bookmark-item.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  imports: [
    SharedModule,
    BookmarkRoutingModule
  ],
  providers: [
    BookmarkService
  ],
  declarations: [
    BookmarkComponent,
    BookmarkListComponent,
    BookmarkItemComponent,
    SearchBoxComponent
  ]
})
export class BookmarkModule { }
