// Core Modules
import { Component, trigger, transition, style, animate, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Animations
import { slideLTR, } from './../../../../core/animations/slide';
import { fade } from './../../../../core/animations/fade';

// Services
import { HttpService } from './../../../shared/services/http/http.service';
import { ProfileService } from './../../../shared/services/profile/profile.service';
import { BookmarkService } from './../../services/bookmark.service';

// Models
import { Coords } from './../../../shared/models/map/coords.model';
import { Marker } from './../../../shared/models/map/marker.model';
import { Bookmark } from './../../models/bookmark.model';

// Components
import { BaseComponent } from './../../../shared/components/base/base.component';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: [
    './bookmark.component.css',
    './../../../shared/styles/shared.css'
  ],
  animations: [
    slideLTR,
    fade
  ]
})
export class BookmarkComponent extends BaseComponent implements OnInit {
  state = {
    ui: {
      toolbar: {
        icon: 'place',
        title: 'Bookmark',
        isIconActive: false
      },
      accountInfo: {
        isShow: false
      },
      map: {
        coordinates: {
          lat: 0,
          lng: 0
        },
        zoom: 12
      }
    }
  };

  bookmarks: Array<Bookmark> = [];
  coords: Coords = new Coords(0, 0);
  markers: Array<Marker> = [];

  constructor(
    public router: Router,
    public profileService: ProfileService,
    private bookmarkService: BookmarkService
  ) {
    super(
      router,
      profileService
    );
  }

  ngOnInit() {
    this.initial();
  }

  initial() {
    const tasks = this.loadBookmarks();
    tasks
      .then((bookmarks: Array<Bookmark>) => {
        if (bookmarks) {
          // Convert to array of Bookmark
          this.bookmarks = this.bookmarkService.convertToArray(bookmarks);
          // Create markers
          return this.createMakers(bookmarks);
        }
      })
      .then((markers: Array<Marker>) => {
        if (markers) {
          // Set location
          this.markers = markers;
          return this.setLocation(markers);
        }
      })
      .then((coords: Coords) => {
        if (coords) {
          // Set Coordinates
          this.coords = coords;
        }
      })
      .catch((err) => { console.log(err); });
  }

  loadBookmarks() {
    const promise = new Promise((resolve, reject) => {
      this.bookmarkService.getBookmarks()
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          },
          () => {});
    });

    return promise;
  }

  createMakers(bookmarks: Array<Bookmark>) {
    const promise = new Promise((resolve, reject) => {
      // Create markers
      const markers: Array<Marker> = [];
      for (let i = 0; i < bookmarks.length; i++) {
        const marker = this.createMarkerFromBookmark(bookmarks[i]);
        markers.push(marker);
      }

      resolve(markers);
    });

    return promise;
  }

  createMarkerFromBookmark(bookmark: Bookmark) {
    const marker = new Marker(
      '',
      '',
      bookmark.name,
      bookmark.name,
      bookmark.description,
      new Coords(bookmark.lat, bookmark.lng)
    );

    return marker;
  }

  setLocation(markers: Array<Marker>) {
    const promise = new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        // Set location from current location
        navigator.geolocation.getCurrentPosition(
          (location) => {
            const lat = location.coords.latitude;
            const lng = location.coords.longitude;

            const coords = new Coords(lat, lng);
            resolve(coords);
          },
          (err) => {
            // Set location from first of marker coordinates
            const coords = this.setLocationFromMarkers(this.markers);
            resolve(coords);
          }
        );
      } else {
        // Set location from first of marker coordinates
        const coords = this.setLocationFromMarkers(this.markers);
        resolve(coords);
      }
    });

    return promise;
  }

  setLocationFromMarkers(markers: Array<Marker>) {
    return (markers.length > 0) ? markers[0].coords : null;
  }

  setLocationFromMarker(marker: Marker) {
    if (marker && marker.coords) {
      this.coords = marker.coords;
    }
  }

  onMenuClick() {
    this.showMenu(true);
    this.showAccountInfo(false);
  }

  onToolbarIconClick(isIconActive) {
    // No Action
  }

  onToolbarAvatarClick() {
    this.showAccountInfo(!this.state.ui.accountInfo.isShow);
  }

  onToolbarAvatarMouseEnterLeave(isShowUserInfo) {
    // No Action
  }

  onSearchBoxFilter(bookmarks: Array<Bookmark[]>) {
    // No Action
  }

  onSearchBoxSelect(bookmark: Bookmark) {
    const marker = this.createMarkerFromBookmark(bookmark);
    this.setLocationFromMarker(marker);
  }

  onMapFocus() {
    this.showMenu(false);
    this.showAccountInfo(false);
  }

  showMenu(isShowMenu) {
    this.state.ui.toolbar.isIconActive = isShowMenu;
  }

  showAccountInfo(isShowAccountInfo) {
    this.state.ui.accountInfo.isShow = isShowAccountInfo;
  }

  onAccountInfoSignOutClick() {
    super.signout();
  }
}
