import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  private snapshotChangesSubscription: any;

  usuarioLog: string;
  animacion = false;
  preg;

  contadorOld;

  pantalla;

  image: Array<any>;

  idComunicacion;

  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public route: ActivatedRoute) {

                this.getPreguntasContador();
                console.log(this.contadorOld);
             }

      createUsuarios(value) {
        return new Promise<any>((resolve, reject) => {
          let currentUser = firebase.auth().currentUser;
          this.afs.collection('usuarios').doc(currentUser.uid).set({
            nombre: value.name,
            apellidos: value.apellidos,
            email: value.email,
            image: value.image,
            ponente: false,
            permisos: {
              autor: false,
              lector: false
            }
          })
          .then(
            res => resolve(res),
            err => reject(err)
          );
        });
      }


      getTasks() {
        return new Promise<any>((resolve, reject) => {
              this.snapshotChangesSubscription = this.afs.collection('usuarios', ref => ref.orderBy('orden', 'asc')).snapshotChanges();
              resolve(this.snapshotChangesSubscription);

        });
      }
      getTask(taskId) {
        return new Promise<any>((resolve, reject) => {
          let currentUser = firebase.auth().currentUser;
          this.snapshotChangesSubscription = this.afs.doc<any>('usuarios/' + currentUser.uid).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
            this.usuarioLog = snapshots.permisos;
          //  console.log(this.usuarioLog);
          }, err => {
            reject(err);
          });
        });
      }

      updateTask(taskKey, value) {
       // console.log(taskKey);
       // console.log(value);
        return new Promise<any>((resolve, reject) => {
         // let currentUser = firebase.auth().currentUser;
          this.afs.collection('usuarios').doc(taskKey).set(value)
          .then(
            res => resolve(res),
            err => reject(err)
          );
        });
      }

      deleteTask(taskKey) {
        return new Promise<any>((resolve, reject) => {
         // let currentUser = firebase.auth().currentUser;
          this.afs.collection('usuarios').doc(taskKey).delete()
          .then(
            res => resolve(res),
            err => reject(err)
          );
        });
      }

      meGusta(taskKey, value) {
        return new Promise<any>((resolve, reject) => {
          let currentUser = firebase.auth().currentUser;
          this.afs.collection('ponentes').doc(taskKey).update(value)
          .then(
            res => resolve(res),
            err => reject(err)
          );
        });
      }


      encodeImageUri(imageUri, callback) {
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');
        let img = new Image();
        img.onload = function () {
          let aux:any = this;
          c.width = aux.width;
          c.height = aux.height;
          ctx.drawImage(img, 0, 0);
          let dataURL = c.toDataURL('image/jpeg');
          callback(dataURL);
        };
        img.src = imageUri;
      }

      uploadImage(imageURI, randomId) {
        console.log('llega aquí');
        console.log(imageURI);
        let file = imageURI.target.files[0];
        console.log(file.name);
         let storageRef = firebase.storage().ref('image/' + randomId + file.name);
         let task = storageRef.put(file)
         .then(snapshot => {
          snapshot.ref.getDownloadURL()
             .then(res => {
                console.log(res);
                this.image = res;
             });
         // this.image = snapshot.ref.getDownloadURL();
          console.log(this.image);
         });

      }

      unsubscribeOnLogOut() {
        // remember to unsubscribe from the snapshotChanges
        console.log('llega a desuscribir');
        this.snapshotChangesSubscription.unsubscribe();
      }

      async enviarNotificacion() {
        const alertController = document.querySelector('ion-alert-controller');
        await alertController.componentOnReady();

        const alert = await alertController.create({
          header: 'Ha recibido una nueva pregunta',
          message: 'el usuario ha creado una nueva pregunta',
          buttons: ['Ver pregunta']
        });
        return await alert.present();
      }


      /// creamos las preguntas en la base de datos firebase ///

      createPregunta(value, contador) {
        const todoId = this.route.snapshot.paramMap.get('cuenta');
       // console.log(todoId);
        this.contadorOld = contador;
        console.log(this.contadorOld);
        return new Promise<any>((resolve, reject) => {
          let currentUser = firebase.auth().currentUser;
          this.afs.collection('preguntas').add({
            id: value.id,
            titulo: value.titulo,
            image: value.image,
            autor: currentUser.uid,
            ponente: value.ponente,
            comunicacion: value.comunicacion,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(
            res => {
              resolve(res);
              this.animacion = true;
            },
            err => reject(err)
          );
        });
      }
/*
      getPreguntas() {
        return new Promise<any>((resolve, reject) => {
        this.snapshotChangesSubscription = this.afs.collection('preguntas', ref => ref.orderBy('fecha', 'desc')).snapshotChanges();
        resolve(this.snapshotChangesSubscription);
        });
      }
*/
      getPreguntas(comunicacion) {
        console.log('numero de la comunicacion: ' + comunicacion);
        this.idComunicacion = comunicacion;
        return new Promise<any>((resolve, reject) => {
          this.snapshotChangesSubscription = this.afs
          .collection('preguntas', ref => ref.where('comunicacion', '==', comunicacion).orderBy('fecha', 'desc')).snapshotChanges();
          resolve(this.snapshotChangesSubscription);
          });
      }


      getComunicacion(idPonencias) {
        return new Promise<any>((resolve, reject) => {
        this.snapshotChangesSubscription = this.afs
        .collection('comunicaciones', ref => ref.where('idPonencias', '==', idPonencias)).snapshotChanges();
        resolve(this.snapshotChangesSubscription);
        });
      }


      getCategorias() {
        return new Promise<any>((resolve, reject) => {
        this.snapshotChangesSubscription = this.afs
        .collection('comunicaciones').snapshotChanges();
        resolve(this.snapshotChangesSubscription);
        });
      }

      getPreguntasContador() {
        this.getPreguntas(this.idComunicacion)
        .then(data => {
          data.subscribe(preguntas => {
            if ( this.contadorOld == null ) {
              this.contadorOld = preguntas.length;
            }
            console.log(this.contadorOld);
          });
        });
      }


      getRespuestas() {
        return new Promise<any>((resolve, reject) => {
              this.snapshotChangesSubscription = this.afs.collection('respuestas').snapshotChanges();
              resolve(this.snapshotChangesSubscription);

        });
      }
      getPregunta(PreguntaId) {
        return new Promise<any>((resolve, reject) => {
          let currentUser = firebase.auth().currentUser;
          this.snapshotChangesSubscription = this.afs.doc<any>('preguntas/' + currentUser.uid).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
            this.usuarioLog = snapshots.permisos;
           // console.log(this.usuarioLog);
          }, err => {
            reject(err);
          });
        });
      }

      getPreguntaPantalla(PreguntaId) {
        return new Promise<any>((resolve, reject) => {
          this.snapshotChangesSubscription = this.afs.doc<any>('preguntas/' + PreguntaId).valueChanges()
          .subscribe(snapshots => {
            resolve(snapshots);
            this.pantalla = snapshots;
             console.log(this.pantalla);
          }, err => {
            reject(err);
          });
        });
      }

      updatePregunta(PreguntaKey, value) {
       // console.log(PreguntaKey);
        // console.log(value);
        return new Promise<any>((resolve, reject) => {
         // let currentUser = firebase.auth().currentUser;
          this.afs.collection('preguntas').doc(PreguntaKey).set(value)
          .then(
            res => resolve(res),
            err => reject(err)
          );
        });
      }

      deletePregunta(PreguntaKey) {
        return new Promise<any>((resolve, reject) => {
         // let currentUser = firebase.auth().currentUser;
          this.afs.collection('usuarios').doc(PreguntaKey).delete()
          .then(
            res => resolve(res),
            err => reject(err)
          );
        });
      }

      // respuesta pregunta

      responderPregunta(id, value) {
       // console.log(id, value);
        return new Promise<any>((resolve, reject) => {
          this.afs.collection('respuestas').add({
            preguntaId: id,
            respuesta: value.respuesta,

        })
          .then(
            res => resolve(res),
            err => reject(err)
          );
        });
      }


}
