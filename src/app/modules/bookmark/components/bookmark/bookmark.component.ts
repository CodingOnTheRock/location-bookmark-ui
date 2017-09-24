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
        avatar: undefined,
        icon: 'place',
        title: 'Bookmark',
        isIconActive: false
      },
      accountInfo: {
        avatar: undefined,
        isShow: false
      },
      map: {
        coords: new Coords(0, 0),
        zoom: 12,
        markers: new Array<Marker>()
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

          if (firstMarkerCoords) {
            resolve(firstMarkerCoords);
            return;
          }

          throw err;
        })
        .catch((err) => {
          const defaultCoordinates = this.bookmarkService.getDefaultLocation();
          resolve(defaultCoordinates);
        });
    });

    return promise;
  }

  onMenuClick() {
    this.showMenu(true);
    this.showAccountInfo(false);
    this.closeSnackBar();
  }

  onBaseComponentReady() {
    const photo = super.getPhoto();
    this.state.ui.toolbar.avatar = this.state.ui.accountInfo.avatar = photo;
  }

  onToolbarIconClick(isIconActive: Boolean) {
    this.router.navigate(['/dashboard']);
  }

  onToolbarAvatarClick() {
    this.showAccountInfo(!this.state.ui.accountInfo.isShow);
    this.closeSnackBar();
  }

  onToolbarAvatarMouseEnterLeave(isShowUserInfo) {
    // No Action
  }

  onAccountInfoAccountClick() {
    this.router.navigate(['/account']);
  }

  onAccountInfoSignOutClick() {
    super.signout();
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
    // Remove previous new marker
    this.removeNewMarker();
    // Create new marker
    const newMarker = this.createNewMarker(coords);
    // Add new marker
    this.state.ui.map.markers.push(newMarker);
    // Close snackbar
    this.closeSnackBar();
  }

  onMapCenterChange(coords: Coords) {
    this.setMapCoordinates(coords);
  }

  onNewMarkerInfoWindowClose(marker: Marker) {
    // Remove previous new marker
    this.removeNewMarker();
  }

  onMarkerSave(marker: Marker) {
    const snackbar = this.createSnackBar('Do you want to create?', 'Confirm');
    snackbar.onAction().subscribe(() => {
      this.createMarker(marker);
    });
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

  createMarker(marker: Marker) {
    const name = marker.locationInfo.name;
    const description = marker.locationInfo.description;
    const lat = marker.coords.lat;
    const lng = marker.coords.lng;

    const newBookmark = new Bookmark('', name, description, lat, lng, new Date(), new Date());
    this.bookmarkService.createBookmark(newBookmark)
    .subscribe(
      (createdBookmark) => {
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

  updateMarker(marker: Marker) {
    const originalBookmark = this.getBookmark(marker.locationInfo.id);
    const updateBookmark = Object.assign({}, originalBookmark);
    updateBookmark.name = marker.locationInfo.name;
    updateBookmark.description = marker.locationInfo.description;

    this.bookmarkService.updateBookmark(updateBookmark.id, updateBookmark)
      .subscribe(
        (updatedBookmark) => {
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

  createNewMarker(coords: Coords) {
    const newBookmark = new Bookmark('', '', '', coords.lat, coords.lng, new Date(), new Date());
    const marker = this.bookmarkService.createMarker(newBookmark);

    return marker;
  }

  getNewMarkerIndex() {
    const index = this.state.ui.map.markers.findIndex((item) => {
      return item.mode === 'add';
    });

    return index;
  }

  removeNewMarker() {
    const newMarkerIndex = this.getNewMarkerIndex();
    if (newMarkerIndex >= 0) {
      this.removeMarker(newMarkerIndex);
    }
  }

  removeMarker(index: number) {
    this.state.ui.map.markers.splice(index, 1);
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
}
