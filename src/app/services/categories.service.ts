import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private Afs: AngularFirestore) {}

  loadData() {
    return this.Afs.collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
}
