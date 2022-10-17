import { PreguntasService } from './preguntas.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private preguntasService: PreguntasService,
              public afAuth: AngularFireAuth,
              private router: Router) {}

  doRegister(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err));
   });
  }

  doLogin(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err));
   });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(() => {
        console.log('llega al envio de preguntas service');
        this.preguntasService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        reject();
      });
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          console.log('El usuario no está logeado');
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }

  resetPassword(email: string) {
    let auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('Enviouse novo contrasinal o seu email'))
      .catch((error) => console.log(error));
  }
}
