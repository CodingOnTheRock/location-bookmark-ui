// Core Modules
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

// Services
import { HttpService } from './../../shared/services/http/http.service';

// Extensions
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Models
import { Coords } from './../../shared/models/map/coords.model';
import { Marker } from './../../shared/models/map/marker.model';
import { LocationInfo } from './../../shared/models/map/locationInfo.model';
import { InfoWindow } from './../../shared/models/map/infowindow.model';
import { Bookmark } from './../models/bookmark.model';

// Environment
import { environment } from './../../../../environments/environment';

@Injectable()
export class BookmarkService {

  constructor(
    private httpService: HttpService
  ) { }

  getBookmarks() {
    return this.httpService.get('/api/bookmarks')
      .map((response: Response) => <Array<Bookmark>>response.json());
  }

  createBookmark(newBookmark: Bookmark) {
    return this.httpService.post('/api/bookmark', newBookmark)
      .map((response: Response) => <Bookmark>response.json());
  }

  updateBookmark(id: String, updateBookmark: Bookmark) {
    return this.httpService.put(`/api/bookmarks/${id}`, updateBookmark)
      .map((response: Response) => <Bookmark>response.json());
  }

  deleteBookmark(id: String) {
    return this.httpService.delete(`/api/bookmarks/${id}`)
      .map((response: Response) => <Bookmark>response.json());
  }

  convert(bookmark: any): Bookmark {
    const converted = new Bookmark(
      bookmark._id,
      bookmark.name,
      bookmark.description,
      bookmark.lat,
      bookmark.lng,
      bookmark.created,
      bookmark.updated
    );

    return converted;
  }

  convertToArray(bookmarks: any): Array<Bookmark> {
    const converted: Array<Bookmark> = [];
    for (let i = 0; i < bookmarks.length; i++) {
      const temp = this.convert(bookmarks[i]);

      converted.push(temp);
    }

    return converted;
  }

  createMarker(bookmark: Bookmark) {
    const locationInfo = new LocationInfo(bookmark.id, bookmark.name, bookmark.description, bookmark.created, bookmark.updated);
    const coords = new Coords(bookmark.lat, bookmark.lng);
    const infoWindow = new InfoWindow(true);
    const marker = new Marker(
      'add',
      '/assets/images/map/new-marker.png',
      '',
      bookmark.name,
      locationInfo,
      coords,
      infoWindow
    );

    return marker;
  }

  buildMarker(bookmark: Bookmark) {
    const locationInfo = new LocationInfo(bookmark.id, bookmark.name, bookmark.description, bookmark.created, bookmark.updated);
    const coords = new Coords(bookmark.lat, bookmark.lng);
    const infoWindow = new InfoWindow(false);
    const marker = new Marker(
      'view',
      '',
      '',
      bookmark.name,
      locationInfo,
      coords,
      infoWindow
    );

    return marker;
  }

  buildMarkers(bookmarks: Array<Bookmark>) {
    const markers: Array<Marker> = [];
    for (let i = 0; i < bookmarks.length; i++) {
      const marker = this.buildMarker(bookmarks[i]);
      markers.push(marker);
    }

    return markers;
  }

  getCurrentLocation() {
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
            reject(err);
          }
        );
      }
    });

    return promise;
  }

  getDefaultLocation() {
    const lat = environment.apis.google_map.default_coordinates.lat;
    const lng = environment.apis.google_map.default_coordinates.lng;

    const coords = new Coords(lat, lng);
    return coords;
  }
}
