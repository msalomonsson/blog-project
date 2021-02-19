import { Post } from './../models/post';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms' 
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  post: Post = {
    title: '',
    author: '',
    authorId: '',
    content: '',
    image: '',
    published: Date.now(),
    id: '',
    description: '',
    secondTitle: ''
  }

  postForm!: FormGroup;

  constructor( 
    private postService: PostService,
    private fb: FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.postForm = this.fb.group({
      title: new FormControl('',Validators.required),
      author: new FormControl('',Validators.required),
      authorId: (''),
      content: new FormControl('',Validators.required),
      image: (''),
      published: new Date(Date.now()).toLocaleString().split(',')[0],
      id: (''),
      description: new FormControl('',Validators.required),
      secondTitle: new FormControl('')
    })
  }

  onSubmit(){
    this.postService.addPost(this.postForm.value)
    this.postForm.reset();
    this.router.navigate(['/posts'])
  }

}
