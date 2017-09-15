// Core Modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Bookmark } from './../../models/bookmark.model';
import { Coords } from './../../../shared/models/map/coords.model';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css']
})
export class BookmarkListComponent implements OnInit {
  @Input() bookmarks: Array<Bookmark>;
  @Output() onBookmarkItemCoordsClick: EventEmitter<Coords> = new EventEmitter<Coords>();

  constructor() { }

  ngOnInit() {
  }

  bookmarkItemCoordsClick(coords: Coords) {
    this.onBookmarkItemCoordsClick.emit(coords);
  }
}
