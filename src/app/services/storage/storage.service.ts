import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string) {
      let value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
  }

  set(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    if(localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  }

  clear() {
    localStorage.clear();
  }
}
