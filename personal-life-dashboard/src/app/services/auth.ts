import { Injectable } from '@angular/core';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';

import { firebaseApp } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = getAuth(firebaseApp);

  register(email: string, password: string) {

    return createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  login(email: string, password: string) {

    return signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  logout() {

    return signOut(this.auth);
  }

  getCurrentUser(): User | null {

    return this.auth.currentUser;
  }

}