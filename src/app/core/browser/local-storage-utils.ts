// Core Modules
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageUtils {
    constructor() {}

    get(key: string) {
        const token = localStorage.getItem(key);
        if (token) {
            return token;
        }

        return null;
    }

    set(key: string, token: string) {
        localStorage.setItem(key, token);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}
