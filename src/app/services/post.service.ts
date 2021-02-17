import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map  } from "rxjs/operators"; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postCollection!: AngularFirestoreCollection<Post>;
  posts!: Observable<any>;

  constructor(private fireStore: AngularFirestore) {
    this.posts = this.fireStore.collection('posts').valueChanges()  
  }

  getPosts(){
    return this.posts;
  }
}