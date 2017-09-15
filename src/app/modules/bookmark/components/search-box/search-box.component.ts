// Core Modules
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

// Extensions
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// Models
import { Bookmark } from './../../models/bookmark.model';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input() bookmarks: Array<Bookmark> = [];
  @Output() onFilter: EventEmitter<Array<Bookmark>> = new EventEmitter<Array<Bookmark>>();
  @Output() onSelect: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  state = {
    searchIcon: {
      class: {
        searchIconActive: false
      }
    }
  };

  tbx_search: FormControl;
  filteredBookmarks: Array<Bookmark> = [];

  constructor() { }

  ngOnInit() {
    this.initialSearchForm();
  }

  initialSearchForm() {
    this.tbx_search = new FormControl();
    this.tbx_search.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe((value) => {
        this.state.searchIcon.class.searchIconActive = (value.length >= 1) ? true : false;
        this.filteredBookmarks = this.searchPlaces(value);

        this.onFilter.emit(this.filteredBookmarks);
      });
  }

  searchPlaces(term) {
    if (term.length === 0) {
      return [];
    }

    term = term.toLowerCase();
    const places = this.bookmarks.filter((item) => {
      const name = item.name.toLowerCase();
      return name.indexOf(term) >= 0;
    });

    return places;
  }

  getPlace(term) {
    term = term.toLowerCase();
    const place = this.bookmarks
      .find((bookmark) => {
        const name = bookmark.name.toLowerCase();
        return name === term;
      });

    return place;
  }

  onSelectionChange(event) {
    const isSelected = event.source._selected;
    if (isSelected) {
      const value = event.source.value;
      const place = this.getPlace(value);

      this.onSelect.emit(place);
    }
  }
}