// Core Modules
import { Injectable } from '@angular/core';

// Services
import { HttpService } from './../http/http.service';
import { LocalStorageUtils } from './../../../../core/browser/local-storage-utils';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class ProfileService {

  constructor(
    private httpService: HttpService,
    private localStorageUtils: LocalStorageUtils
  ) { }

  getProfile() {
    const promise = new Promise((resolve, reject) => {
      let profile;

      // Get profile from local storage
      profile = this.getProfileFromLocalStorage();
      if (profile) {
        resolve(JSON.parse(profile));
        return;
      }

      // Get profile from service
      this.getProfileFromService()
        .subscribe(
          (data) => {
            const response = data.json();
            profile = response.decoded._doc;
            delete profile.password;

            // Keep profile in local storage
            this.setProfile(JSON.stringify(profile));

            resolve(profile);
          },
          (err) => {
            reject(err);
          },
          () => {}
        );
    });

    return promise;
  }

  setProfile(profile) {
    const key = environment.application.security.profile_key;
    this.localStorageUtils.set(key, profile);
  }

  clearProfile() {
    const key = environment.application.security.profile_key;
    this.localStorageUtils.remove(key);
  }

  getProfileFromLocalStorage() {
    const key = environment.application.security.profile_key;
    const profile = this.localStorageUtils.get(key);

    return profile;
  }

  getProfileFromService() {
    return this.httpService.get('api/profile');
  }
}
