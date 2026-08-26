import { Injectable } from '@angular/core';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import { FirebaseService } from './firebase';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private firebaseService: FirebaseService
  ) {}

  async saveUserData(
    uid: string,
    name: string,
    email: string,
    theme: string
  ) {

    const userRef = doc(
      this.firebaseService.getDatabase(),
      'users',
      uid
    );

    await setDoc(userRef, {
      name: name,
      email: email,
      theme: theme
    });
  }

  async getUserData(uid: string) {

    const userRef = doc(
      this.firebaseService.getDatabase(),
      'users',
      uid
    );

    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }

    return null;
  }
}