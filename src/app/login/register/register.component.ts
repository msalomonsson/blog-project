import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder,private auth: AngularFireAuth,
  private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,
      Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  createUser(){
    const {email, password, fullName} = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('registerd', user)
      this.router.navigate(['']);
    })
    .catch((err) => {
      this.errorMessage = err;
      console.log(err.message)
    })
  }

}
