import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts!: Post[];

  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
    .subscribe(posts => {
      console.log(posts)
      this.posts = posts;
    })
    
  }

}
