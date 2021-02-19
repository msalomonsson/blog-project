import { UserService } from './../services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import firebase from 'firebase/app';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: Observable<firebase.User | null>

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private authService: UserService
  ) { 
    this.user = this.authService.userStatus()
  }

  ngOnInit(): void {
  }

  onLogout(){
    this.auth.signOut()
    console.log('signed out')
    this.router.navigate(['/'])
  }

  

}
