import { Injectable } from '@angular/core';

import {
  getFirestore
} from 'firebase/firestore';

import {
  firebaseApp
} from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firestore = getFirestore(firebaseApp);

  getDatabase() {
    return this.firestore;
  }

}