import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms'  
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth,
  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: new FormControl('',Validators.email),
      password: new FormControl('',Validators.required)
    })
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then( (value) => {
        this.router.navigate([''])
      })
      .catch((err) => {
        this.errorMessage = err;
        console.log(err.message)
      })
     
    
  }

  // onLoginWithGoogle() {
  //   this.auth
  //     .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  // }

}
