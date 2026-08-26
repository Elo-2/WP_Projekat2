import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getCurrentUser(): any {

    const user = localStorage.getItem('currentUser');

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  getUserKey(): string {

    const user = this.getCurrentUser();

    if (user && user.email) {
      return user.email;
    }

    return 'guest';
  }

  setCurrentUser(user: any) {

    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );
  }

  logout() {

    localStorage.removeItem('currentUser');
  }

}