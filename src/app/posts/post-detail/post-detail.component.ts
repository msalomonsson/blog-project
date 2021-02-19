import { Post } from './../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  editeState!: boolean;
  id = this.route.snapshot.paramMap.get('id');
  user: Observable<firebase.User | null>

  constructor(
    private postService: PostService,
    private router:Router,
    private route: ActivatedRoute,
    private location: Location,
    private authService: UserService
  ) { 
    this.user = this.authService.userStatus()
  }

  ngOnInit(): void {
    this.postService.getPostData(this.id!).subscribe(post => (this.post = post))
  }

  // getPost() {
  //   return this.postService.getPostData(this.id!).subscribe(post => (this.post = post))
  // }

  editPost(){
    this.editeState = true;
  }

  updatePost(){
    const formData = {
      title: this.post.title,
      desciption: this.post.description,
      secondTitle: this.post.secondTitle,
      content: this.post.content,
    }
    this.postService.updatePost(this.id!, formData)
    this.editeState = false;
  }

  deletePost(){
    this.postService.deletePost(this.id!)
    this.editeState = false;
    this.router.navigate(['./posts'])
  }

  closeEdit(){
    this.editeState = false;
  }

  goBack(){
    this.location.back();
  }

}
