// Core Modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { Bookmark } from './../../models/bookmark.model';
import { Coords } from './../../../shared/models/map/coords.model';

@Component({
  selector: 'app-bookmark-item',
  templateUrl: './bookmark-item.component.html',
  styleUrls: ['./bookmark-item.component.css']
})
export class BookmarkItemComponent implements OnInit {
  @Input() bookmark: Bookmark;
  @Output() onCoordsClick: EventEmitter<Coords> = new EventEmitter<Coords>();

  constructor() { }

  ngOnInit() {
  }

  coordsClick() {
    const coords = new Coords(this.bookmark.lat, this.bookmark.lng);

    this.onCoordsClick.emit(coords);
  }
}
