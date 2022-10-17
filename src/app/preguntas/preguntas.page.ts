import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../providers/auth.service';
import { PreguntasService } from '../providers/preguntas.service';
import { UsuariosService } from '../providers/usuarios.service';

import { ModalController, ToastController, Platform, AlertController } from '@ionic/angular';

import { PreguntamodalPage } from '../preguntamodal/preguntamodal.page';
import { RespondermodalPage } from '../respondermodal/respondermodal.page';
import { PantallaPage } from '../pantalla/pantalla.page';

//import * as firebase from 'Firebase';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})


export class PreguntasPage implements OnInit {

  items: Array<any>;
  preguntas: Array<any>;
  pregunta: any;
  respuestas: Array<any>;
  respuesta: any;
  item: any;

 // public PreguntaIdDb: any;
  public snapshotChangesSubscription: any;

  usuario: string;
  usuarioLog;
  esponente: boolean;
  esmoderador: boolean;
  message;
  animacion: boolean;
  showImage;
  color: string;
  contador: number;
  UID;

  idComunicacion;

  public categorias;

  comunicacion;

  constructor(private authService: AuthService,
              public usuariosServices: UsuariosService,
              public afAuth: AngularFireAuth,
              public route: ActivatedRoute,
              public router: Router,
              public modalCtrl: ModalController,
              public preguntasServices: PreguntasService,
              public _is: InformacionService,
              public afs: AngularFirestore,
              public platform: Platform,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController) {

      }


      ngOnInit() {
        const todoId = this.route.snapshot.paramMap.get('id');
        this.idComunicacion = todoId;

        this.getData();
        this.getPreguntas();
        this.getRespuestas();
        this.recuperarUsuario();
        this.getComunicacion();

      }


      async presentToast() {
        const toast = await this.toastCtrl.create({
          message: this.message,
          duration: 3000
        });
        toast.present();
      }

     recuperarUsuario() {
        this.afAuth.user.subscribe(currentUser => {
          this.usuario = currentUser.uid;
         // console.log(this.usuario);
          return new Promise<any>((resolve, reject) => {
            // let currentUser = firebase.auth().currentUser;
            this.snapshotChangesSubscription = this.afs.doc<any>('usuarios/' + this.usuario).valueChanges()
            .subscribe(snapshots => {
             resolve(snapshots);
              this.usuarioLog = snapshots.permisos;
              this.esponente = snapshots.ponente;
              this.esmoderador = snapshots.moderador;
              this.color = snapshots.color;
              this.UID = currentUser.uid;
            }, err => {
              reject(err);
            });
          });

        });
      }


      getData() {
        this.preguntasServices.getTasks()
        .then(data => {
          data.subscribe(usuarios => {
            this.items = usuarios;
          });
        });
      }


      async openNewUserModal() {
        const modal = await this.modalCtrl.create({
          component: PreguntamodalPage,
          componentProps: {
            idComunicacion: this.idComunicacion
          }
        });

        modal.onDidDismiss().then((dataReturned) => {
          if (dataReturned !== null) {
            console.log('Modal Sent Data :', dataReturned);
          }
        });

        modal.present();
      }


getPreguntas() {
  console.log(this.idComunicacion);
  this.preguntasServices.getPreguntas(this.idComunicacion)
  .then(data => {
    data.subscribe(preguntas => {
      this.preguntas = preguntas;
      console.log(this.preguntas.length);
      this.showImage = true;

      setTimeout(() => {
            this.showImage = false;
       }, 6000);
    });
  });
}

getComunicacion() {
  this.preguntasServices.getComunicacion(this.idComunicacion)
  .then(data => {
    data.subscribe(comunicacion =>  {
      this.comunicacion = comunicacion;
      console.log(this.comunicacion);
    });
  });
}



async eliminarPregunta(key) {
  console.log(key);
  const alert = await this.alertCtrl.create({
    header: 'Eliminar pregunta',
    message: '¿Estás seguro que quieres eliminar esta pregunta?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('cancel');
        }
      }, {
        text: 'Eliminar',
        handler: () => {
         // firebase.database().ref('preguntas/' + key).remove();

        this.afs.collection('preguntas').doc(key).delete().then(function() {
            console.log('Document successfully deleted');
        }).catch(function(error) {
            console.error('Error removing document: ', error);
        });

        }
      }
    ]
  });

  await alert.present();
}



// detectar cambios y crear animación //
 cerrarNotificacion() {
  this.preguntasServices.animacion = false;
}

getRespuestas() {
  this.preguntasServices.getRespuestas()
  .then(data => {
    data.subscribe(respuestas => {
      this.respuestas = respuestas;
     // console.log(this.respuestas);
    });
  });
}

async responderPreguntaModal(id, data) {
  console.log(id);
  let modal = await this.modalCtrl.create({
    component: RespondermodalPage,
    id: id
  });
  modal.present();
}

async pantallaCompleta(id) {

  this.preguntasServices.getPreguntaPantalla(id);

  let modal = await this.modalCtrl.create({
    component: PantallaPage,
    id: id
  });
  modal.present();
}

}



