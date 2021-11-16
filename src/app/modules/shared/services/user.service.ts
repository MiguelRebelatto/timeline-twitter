import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const KEY_LOCAL_STORAGE = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): User {
    let userStringfy = localStorage.getItem(KEY_LOCAL_STORAGE);
    return userStringfy ? JSON.parse(userStringfy) : null;
  }

  setUser(user: User) {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(user));
  }
}
