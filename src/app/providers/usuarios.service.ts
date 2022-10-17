import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import AuthProvider = firebase.auth.AuthProvider;

import { Router } from '@angular/router';

export interface Usuario {
  id?: string;
  name: string;
  apellidos: string;
  email: string;
  image: string;
  ponente: boolean;
  moderador: boolean;
  permisos: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usersCollection: AngularFirestoreCollection<Usuario>;

  public users: Observable<Usuario[]>;

  image: any;

  idGoogle;

  private snapshotChangesSubscription: any;

  UID;

  constructor(public db: AngularFirestore,
              public afAuth: AngularFireAuth,
              public router: Router) {

    this.usersCollection = db.collection<Usuario>('userProfile');

    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          console.log(data);
          console.log(id);
          return { id, ...data };
        });
      })
    );



  }

  createUsuarios(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.db.collection('usuarios').doc(currentUser.uid).set({
        nombre: value.name,
        apellidos: value.apellidos,
        email: value.email,
        image: value.image,
        ponente: false,
        moderador: false,
        color: value.color,
        permisos: 'usuario',
        cargo: 'Usuario Común',
        orden: 100
      })
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    return this.usersCollection.doc<Usuario>(id).valueChanges();
  }

  updateUser(users: Usuario, id: string) {
    return this.usersCollection.doc(id).update(users);
  }

  addUser(users: Usuario) {
    return this.usersCollection.add(users);
  }

  removeUser(id) {
    return this.usersCollection.doc(id).delete();
  }


  /*login con google*/

  signInWithFacebook() {
    console.log('Sign in with facebook');
    return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
  }

  signInWithGoogle() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }



  private oauthSignIn(provider: AuthProvider) {

    this.recuperarUsuario();

     if (!(<any>window).cordova) {
          return this.afAuth.auth.signInWithPopup(provider);
        } else {
          return this.afAuth.auth.signInWithRedirect(provider)
          .then(() => {
            return this.afAuth.auth.getRedirectResult().then( result => {
              // This gives you a Google Access Token.
              // You can use it to access the Google API.
             // let token = result.credential.accessToken;
            // let token = result.credential.providerId;
             console.log(result);
              // The signed-in user info.
              let user = result.user;
              console.log(user);

            }).catch(function(error) {
              // Handle Errors here.
              alert(error.message);
            });
          });
        }
  }


  recuperarUsuario() {
    this.afAuth.user.subscribe(currentUser => {
      return new Promise<any>((resolve, reject) => {
        // let currentUser = firebase.auth().currentUser
        this.UID = currentUser;
        this.idGoogle = currentUser.uid;
        console.log(this.UID);
        console.log(this.idGoogle);
        this.createUsuariosGoogle(this.UID);
        console.log('enviamos a crear el usuario');
        this.router.navigate(['/catpreguntas']);
       });
    });
  }

  createUsuariosGoogle(value) {

        return new Promise<any>((resolve, reject) => {
          console.log(this.idGoogle);
          console.log(value.uid);

            this.db.collection('usuarios').doc(value.uid).set({
              nombre: value.displayName,
              apellidos: '',
              email: value.email,
              image: value.photoURL,
              ponente: false,
              moderador: false,
              color: '#000000',
              permisos: 'usuario',
              cargo: 'Usuario Común',
              orden: 100
            })
            .then(
              res => resolve(res),
              err => reject(err)
            );

        });
  }

}