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

  createAuthorizationHeader() {
    const headers = new Headers();

    // Set authorization header
    const token = this.authService.getToken();
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
