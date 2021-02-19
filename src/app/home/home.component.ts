import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts!: Post[];


  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
    .subscribe(posts => {
      this.posts = posts;
    })
  }

}
