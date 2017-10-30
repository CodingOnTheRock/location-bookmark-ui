// Core Modules
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

// Services
import { HttpClient } from './../../../../core/net/http-client';
import { AuthService } from './../auth/auth.service';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class HttpService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  createHttpHeaders() {
    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);
    headers = this.createCacheControlHeader(headers);

    return headers;
  }

  createAuthorizationHeader(headers: Headers) {
    // Set authorization header
    const token = this.authService.getToken();
    if (token) {
        headers.append('Authorization', token);
    }

    return headers;
  }

  createCacheControlHeader(headers: Headers) {
    headers.append('Cache-Control', 'no-cache');

    return headers;
  }

  // GET
  get(url) {
    const headers = this.createHttpHeaders();

    return this.httpClient.get(url, { headers: headers });
  }

  // POST
  post(url, data) {
    const headers = this.createHttpHeaders();

    return this.httpClient.post(url, data, { headers: headers });
  }

  // PUT
  put(url, data) {
    const headers = this.createHttpHeaders();

    return this.httpClient.put(url, data, { headers: headers });
  }

  // DELETE
  delete(url) {
    const headers = this.createHttpHeaders();

    return this.httpClient.delete(url, { headers: headers });
  }
}
