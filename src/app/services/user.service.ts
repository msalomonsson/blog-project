import { Injectable } from '@angular/core';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import 'firebase/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$!: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) {  
  }

  userStatus(){
    return this.fireAuth.authState;
  }
}
