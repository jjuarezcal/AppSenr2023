import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../providers/preguntas.service';
import { LoadingController, ToastController, ModalController, NavParams } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-pantalla',
  templateUrl: './pantalla.page.html',
  styleUrls: ['./pantalla.page.scss'],
})
export class PantallaPage implements OnInit {

  items: Array<any>;
  item: any;

  usuario: any;

  dataRecibida;
  autor;
  id: string;
  public snapshotChangesSubscription: any;

  constructor(public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              public preguntasServices: PreguntasService,
              public nav: NavParams,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore) {

              this.dataRecibida = this.preguntasServices.pantalla;
              this.autor = this.dataRecibida.autor;
             }

  ngOnInit() {
   // console.log(this.id);
    this.recuperarUsuario();
  }

  recuperarUsuario() {
    this.afAuth.user.subscribe(currentUser => {
      this.usuario = currentUser.uid;
     // console.log(this.usuario);
      return new Promise<any>((resolve, reject) => {
        // let currentUser = firebase.auth().currentUser;
        this.snapshotChangesSubscription = this.afs.doc<any>('usuarios/' + this.autor).valueChanges()
        .subscribe(snapshots => {
         resolve(snapshots);
          this.usuario = snapshots;
          // console.log(this.usuario);
        }, err => {
          reject(err);
        });
      });

    });
  }

  dismiss() {
   this.modalCtrl.dismiss();
  }


}

