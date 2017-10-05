// Core Modules
import { Injectable, Output, EventEmitter } from '@angular/core';

// Services
import { HttpService } from './../http/http.service';
import { AuthService } from './../auth/auth.service';
import { LocalStorageUtils } from './../../../../core/browser/local-storage-utils';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class ProfileService {
  @Output() onLoaded = new EventEmitter();
  @Output() onReloaded = new EventEmitter();
  @Output() onFailed = new EventEmitter();

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private localStorageUtils: LocalStorageUtils
  ) {
    this.initial();
  }

  private profile = {
    firstname: '',
    lastname: '',
    name: '',
    email: '',
    photo: ''
  };

  initial() {
    this.load();
  }

  load() {
    this.internalLoad()
      .then((res: any) => {
        // Delete password
        delete res.profile.password;

        // Keep profile in local storage
        this.setProfile(res.profile);

        this.onLoaded.emit();
      })
      .catch((err) => {
        this.onFailed.emit();
      });
  }

  reload() {
    this.internalReload()
      .then((res: any) => {
        // Delete password
        delete res.profile.password;

        // Keep profile in local storage
        this.setProfile(res.profile);

        // Keep new token in local storage
        this.authService.setToken(res.token);

        this.onReloaded.emit();
      })
      .catch((err) => {
        this.onFailed.emit();
      });
  }

  getProfile() {
    return this.profile;
  }

  setProfile(profile) {
    this.profile = profile;

    const key = environment.application.security.profile_key;
    this.localStorageUtils.set(key, JSON.stringify(profile));
  }

  clearProfile() {
    this.profile = undefined;

    const key = environment.application.security.profile_key;
    this.localStorageUtils.remove(key);
  }

  private internalLoad() {
    const promise = new Promise((resolve, reject) => {
      let profile;

      // Get profile from local storage
      profile = this.getProfileFromLocalStorage();
      if (profile) {
        const data = {
          profile: JSON.parse(profile)
        };

        resolve(data);
      } else {
        // Get profile from service
        this.loadProfile(null)
          .then((loaded: any) => {
            resolve(loaded);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });

    return promise;
  }

  private internalReload() {
    const promise = new Promise((resolve, reject) => {
      // Get profile from service
      this.loadProfile('new=true')
        .then((loaded: any) => {
          resolve(loaded);
        })
        .catch((err) => {
          reject(err);
        });
    });

    return promise;
  }

  private loadProfile(params) {
    const promise = new Promise((resolve, reject) => {
      this.getProfileFromService(params)
        .subscribe(
          (data) => {
            resolve(data.json());
          },
          (err) => {
            reject(err);
          },
          () => {}
        );
    });

    return promise;
  }

  private getProfileFromLocalStorage() {
    const key = environment.application.security.profile_key;
    const profile = this.localStorageUtils.get(key);

    return profile;
  }

  private getProfileFromService(params) {
    if (params) {
      return this.httpService.get(`api/profile?${params}`);
    }

    return this.httpService.get('api/profile');
  }
}
