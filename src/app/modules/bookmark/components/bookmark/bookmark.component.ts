// Core Modules
import { Component, trigger, transition, style, animate, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Animations
import { slideLTR, } from './../../../../core/animations/slide';
import { fade } from './../../../../core/animations/fade';

// Services
import { ProfileService } from './../../../shared/services/profile/profile.service';
import { BookmarkService } from './../../services/bookmark.service';

// Models
import { Coords } from './../../../shared/models/map/coords.model';
import { Marker } from './../../../shared/models/map/marker.model';
import { LocationInfo } from './../../../shared/models/map/locationInfo.model';
import { InfoWindow } from './../../../shared/models/map/infowindow.model';
import { Bookmark } from './../../models/bookmark.model';

// Components
import { BaseComponent } from './../../../shared/components/base/base.component';
import { MdSnackBar } from '@angular/material';

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
        coords: new Coords(0, 0),
        zoom: 12,
        markers: new Array<Marker>(),
        infoWindow: new InfoWindow(new Coords(0, 0), false)
      },
      searchBox: {
        bookmarks: new Array<Bookmark>()
      },
      bookmarkList: {
        bookmarks: new Array<Bookmark>()
      }
    },
    data: {
      bookmarks: new Array<Bookmark>()
    }
  };

  isShowRightClick: Boolean = false;

  constructor(
    public router: Router,
    public profileService: ProfileService,
    private bookmarkService: BookmarkService,
    private snackBar: MdSnackBar
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
    const tasks = this.refreshTask();
    tasks
      .then(() => {
        return this.getLocationTask();
      })
      .then((coords: Coords) => {
        // Set location
        this.setMapCoordinates(coords);
      })
      .catch((err) => { console.log(err); });
  }

  createMarkersTask(bookmarks: Array<Bookmark>) {
    const promise = new Promise((resolve, reject) => {
      // Create markers
      const markers = this.bookmarkService.buildMarkers(bookmarks);
      resolve(markers);
    });

    return promise;
  }

  createSearchBoxTask(bookmarks: Array<Bookmark>) {
    const promise = new Promise((resolve, reject) => {
      this.state.ui.searchBox.bookmarks = bookmarks;
      resolve();
    });

    return promise;
  }

  createBookmarkListTask(bookmarks: Array<Bookmark>) {
    const promise = new Promise((resolve, reject) => {
      this.state.ui.bookmarkList.bookmarks = bookmarks;
      resolve();
    });

    return promise;
  }

  setMapCoordinates(coords: Coords) {
    this.state.ui.map.coords = coords;
  }

  loadTask() {
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

  refreshTask() {
    const promise = new Promise((resolve, reject) => {
      const loadTask = this.loadTask();
      loadTask
        .then((bookmarks: Array<Bookmark>) => {
          if (bookmarks) {
            // Convert to array of Bookmark
            this.state.data.bookmarks = this.bookmarkService.convertToArray(bookmarks);
          }

          return this.renderTask();
        })
        .then((results) => {
          this.state.ui.map.markers = <Array<Marker>>results[0];

          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });

    return promise;
  }

  renderTask() {
    const createMakersTask = this.createMarkersTask(this.state.data.bookmarks);
    const createSearchBoxTask = this.createSearchBoxTask(this.state.data.bookmarks);
    const createBookmarkListTask = this.createBookmarkListTask(this.state.data.bookmarks);

    const promises = Promise.all([createMakersTask, createSearchBoxTask, createBookmarkListTask]);

    return promises;
  }

  getLocationTask() {
    const promise = new Promise((resolve, reject) => {
      this.bookmarkService.getCurrentLocation()
        .then((coords: Coords) => {
          resolve(coords);
        })
        .catch((err) => {
          const markers = this.state.ui.map.markers;
          const firstMarkerCoords = (markers.length > 0) ? markers[0].coords : undefined;

          resolve(firstMarkerCoords);
        });
    });

    return promise;
  }

  onMenuClick() {
    this.showMenu(true);
    this.showAccountInfo(false);
    this.closeSnackBar();
  }

  onToolbarIconClick(isIconActive: Boolean) {
    // No Action
  }

  onToolbarAvatarClick() {
    this.showAccountInfo(!this.state.ui.accountInfo.isShow);
    this.closeSnackBar();
  }

  onToolbarAvatarMouseEnterLeave(isShowUserInfo) {
    // No Action
  }

  onSearchBoxFilter(event) {
    const search = event.search;
    const bookmarks = event.bookmarks;

    if (search.length === 0) {
      this.state.ui.bookmarkList.bookmarks = this.state.data.bookmarks;
    } else {
      this.state.ui.bookmarkList.bookmarks = bookmarks;
    }
  }

  onSearchBoxSelect(bookmark: Bookmark) {
    const marker = this.bookmarkService.buildMarker(bookmark);
    this.setMapCoordinates(marker.coords);
  }

  onMapFocus() {
    this.showMenu(false);
    this.showAccountInfo(false);
    this.closeSnackBar();
  }

  onMapLostFocus() {
    this.closeSnackBar();
  }

  onMapRightClick(coords: Coords) {
    this.showInfoWindow(coords);
    this.closeSnackBar();
  }

  onMapCenterChange(coords: Coords) {
    this.setMapCoordinates(coords);
  }

  onMarkerUpdate(marker: Marker) {
    const snackbar = this.createSnackBar('Do you want to update?', 'Confirm');
    snackbar.onAction().subscribe(() => {
      this.updateMarker(marker);
    });
  }

  onMarkerDelete(marker: Marker) {
    const snackbar = this.createSnackBar('Do you want to delete?', 'Confirm');
    snackbar.onAction().subscribe(() => {
      this.deleteMarker(marker);
    });
  }

  onBookmarkListCoordsClick(coords: Coords) {
    this.setMapCoordinates(coords);
  }

  createSnackBar(message: string, action: string) {
    const snackbar = this.snackBar.open(message, action, {
      duration: 5000
    });

    return snackbar;
  }

  updateMarker(marker: Marker) {
    const original = this.getBookmark(marker.locationInfo.id);
    const update = Object.assign({}, original);
    update.name = marker.locationInfo.name;
    update.description = marker.locationInfo.description;

    this.bookmarkService.updateBookmark(update.id, update)
      .subscribe(
        (updated) => {
          // Refresh
          this.refreshTask()
            .then(() => {})
            .catch((err) => {});
        },
        (err) => {
          console.log('err', err);
        },
        () => {}
      );
  }

  deleteMarker(marker: Marker) {
    const original = this.getBookmark(marker.locationInfo.id);
    this.bookmarkService.deleteBookmark(original.id)
      .subscribe(
        (deleted) => {
          // Refresh
          this.refreshTask()
          .then(() => {})
          .catch((err) => {});
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  getBookmarkIndex(id: String) {
    const index = this.state.data.bookmarks.findIndex((item) => {
      return item.id === id;
    });

    return index;
  }

  getBookmark(id: String) {
    const index = this.getBookmarkIndex(id);

    return (index >= 0) ? this.state.data.bookmarks[index] : null;
  }

  showInfoWindow(coords: Coords) {
    this.state.ui.map.infoWindow.coords = coords;
    this.state.ui.map.infoWindow.isOpen = false;
    setTimeout(() => {
      this.state.ui.map.infoWindow.isOpen = true;
    }, 0);
  }

  showMenu(isShowMenu) {
    this.state.ui.toolbar.isIconActive = isShowMenu;
  }

  showAccountInfo(isShowAccountInfo) {
    this.state.ui.accountInfo.isShow = isShowAccountInfo;
  }

  closeSnackBar() {
    this.snackBar.dismiss();
  }

  onAccountInfoSignOutClick() {
    super.signout();
  }
}
