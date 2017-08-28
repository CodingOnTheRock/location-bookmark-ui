// Core Modules
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

// Services
import { HttpClient } from './../../../../core/net/http-client';
import { LocalStorageUtils } from './../../../../core/browser/local-storage-utils';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class HttpService {

  constructor(private httpClient: HttpClient, private localStorageUtils: LocalStorageUtils) { }

  createAuthorizationHeader() {
    const headers = new Headers();

    // Set token
    const key = environment.application.security.token_key;
    const token = this.localStorageUtils.getToken(key);
    if (token) {
        headers.append('Authorization', token);
    }

    return headers;
  }

  // GET
  get(url) {
    const headers = this.createAuthorizationHeader();

    return this.httpClient.get(url, { headers: headers });
  }

  // POST
  post(url, data) {
      const headers = this.createAuthorizationHeader();

      return this.httpClient.post(url, data, { headers: headers });
  }

  // PUT
  put(url, data) {
      const headers = this.createAuthorizationHeader();

      return this.httpClient.put(url, data, { headers: headers });
  }

  // DELETE
  delete(url) {
      const headers = this.createAuthorizationHeader();

      return this.httpClient.delete(url, { headers: headers });
  }
}
