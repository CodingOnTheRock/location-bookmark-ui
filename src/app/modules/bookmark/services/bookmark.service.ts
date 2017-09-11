// Core Modules
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

// Services
import { HttpService } from './../../shared/services/http/http.service';

// Extensions
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Models
import { Bookmark } from './../models/bookmark.model';

@Injectable()
export class BookmarkService {

  constructor(
    private httpService: HttpService
  ) { }

  getBookmarks() {
    return this.httpService.get('/api/bookmarks')
      .map((response: Response) => <Array<Bookmark>>response.json());
  }

  convert(bookmark: any): Bookmark {
    const converted = new Bookmark(
      bookmark.name,
      bookmark.description,
      bookmark.lat,
      bookmark.lng,
      bookmark.created
    );

    return converted;
  }

  convertToArray(bookmarks: any): Array<Bookmark> {
    const converted: Array<Bookmark> = [];
    for (let i = 0; i < bookmarks.length; i++) {
      const temp = new Bookmark(
        bookmarks[i].name,
        bookmarks[i].description,
        bookmarks[i].lat,
        bookmarks[i].lng,
        bookmarks[i].created
      );

      converted.push(temp);
    }

    return converted;
  }
}
