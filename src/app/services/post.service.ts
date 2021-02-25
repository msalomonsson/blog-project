import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map  } from "rxjs/operators"; 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection!: AngularFirestoreCollection<any>;
  posts!: Observable<any>;
  postDoc!: AngularFirestoreDocument<any>

  constructor(private fireStore: AngularFirestore) {
    // this.posts = this.fireStore.collection('posts').valueChanges()
    this.postCollection = this.fireStore.collection('posts', ref => ref.orderBy('published', 'desc'))

    this.posts = this.fireStore.collection('posts').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data
      })
    }))
  }

  getPosts(){
    return this.posts;
  }

  addPost(post:Post){
    this.postCollection.add(post);
  }

  getPostData(id:String){
    this.postDoc = this.fireStore.doc<Post>(`posts/${id}`)
    return this.postDoc.valueChanges()
  }

  getPost(id:string){
    return this.fireStore.doc<Post>(`posts/${id}`)
  }

  deletePost(id: string){
    return this.getPost(id).delete()
  }

  updatePost(id:string, formData: any){
    return this.getPost(id).update(formData)
  }
}