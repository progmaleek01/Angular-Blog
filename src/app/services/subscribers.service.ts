import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private afs: AngularFirestore) {}

  addSubs(subData) {
    this.afs
      .collection('subscribers')
      .add(subData)
      .then(() => {});
  }

  checkSubs(email) {
    return this.afs
      .collection('subscribers', (ref) => ref.where('email', '==', email))
      .get();
  }
}
