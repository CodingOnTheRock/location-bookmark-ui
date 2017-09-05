// Core Modules
import { Injectable } from '@angular/core';

// Services
import { LocalStorageUtils } from './../../../../core/browser/local-storage-utils';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(
    private localStorageUtils: LocalStorageUtils
  ) { }

  isLoggedIn() {
    const token = this.getToken();
    if (token) {
      return true;
    }

    return false;
  }

  getToken() {
    const key = environment.application.security.token_key;
    return this.localStorageUtils.get(key);
  }

  setToken(token) {
    const key = environment.application.security.token_key;
    this.localStorageUtils.set(key, token);
  }

  clearToken() {
    const key = environment.application.security.token_key;
    this.localStorageUtils.remove(key);
  }
}
