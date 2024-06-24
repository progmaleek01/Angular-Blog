import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { increment } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afs: AngularFirestore) {}

  loadData() {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(3)
      )
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

  loadLatestPost() {
    return this.afs
      .collection('posts', (ref) => ref.orderBy('createdAt'))
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

  loadCategoryPost(categoryId) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', categoryId).limit(3)
      )
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

  loadSingleData(id) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  loadSimilar(catId) {
    return this.afs
      .collection('posts', (ref) =>
        ref.where('category.categoryId', '==', catId).limit(3)
      )
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

  countViews(postId) {
    // this.afs.firestore.
    const viewCount = {
      views: increment(1),
    };
    this.afs.doc(`posts/${postId}`).update(viewCount);
  }
}
