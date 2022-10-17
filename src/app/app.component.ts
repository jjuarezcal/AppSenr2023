import { UsuariosService } from './providers/usuarios.service';
import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { PushnotificationService } from './providers/pushnotification.service';

import { AngularFireAuth } from '@angular/fire/auth';

import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { InformacionService } from './providers/informacion.service';

import { AuthService } from './providers/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mi congreso',
      url: '/micongreso',
      icon: 'send'
    },
    {
      title: 'Programa',
      url: '/programa',
      icon: 'albums'
    },
    {
      title: 'Ponentes / Moderadores',
      url: '/speakers',
      icon: 'people'
    },
    {
      title: 'Comunicaciones Orales',
      url: '/orales',
      icon: 'mic'
    },
    {
      title: 'Comunicaciones Posters',
      url: '/posters',
      icon: 'list-box'
    },
    {
      title: 'Salas',
      url: '/rooms',
      icon: 'logo-buffer'
    },
    {
      title: 'Patrocinadores',
      url: '/sponsors',
      icon: 'albums'
    },
    {
      title: 'Noticias',
      url: '/news',
      icon: 'list-box'
    },
    {
      title: 'Comité y miembros',
      url: '/organizadores',
      icon: 'contacts'
    },
    {
      title: 'Información',
      url: '/informacion',
      icon: 'information-circle'
    },
    {
      title: 'Ubicación',
      url: '/ubicacion',
      icon: 'locate'
    },
    {
      title: 'Privacidad',
      url: '/privacidad',
      icon: 'quote'
    },
    {
      title: 'Preguntas',
      url: '/catpreguntas',
      icon: 'help-circle'
    }
  ];

  user;
  imagen: string;
  nombre: string;
  apellidos: string;
  color: string;
  UID;

  private snapshotChangesSubscription: any;

  constructor(public platform: Platform,
              public splashScreen: SplashScreen,
              public statusBar: StatusBar,
              public _pn: PushnotificationService,
              public _is: InformacionService,
              public _us: UsuariosService,
              private router: Router,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public menuCtrl: MenuController,
              public route: ActivatedRoute,
              public authServices: AuthService) {
                this.initializeApp();


  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this._pn.init_notifications();
    });

    this.recuperarUsuario();

  }

  recuperarUsuario() {
    this.afAuth.user.subscribe(currentUser => {
      return new Promise<any>((resolve, reject) => {
        console.log(currentUser.uid);
        // let currentUser = firebase.auth().currentUser



        this.snapshotChangesSubscription = this.afs.doc<any>('usuarios/' + currentUser.uid).valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
          console.log(snapshots.image);
          this.imagen = snapshots.image;
          this.nombre = snapshots.nombre;
          this.apellidos  = snapshots.apellidos;
          this.color  = snapshots.color;
          this.UID = currentUser.uid;
        }, err => {
          reject(err);
        });
      });

    });
  }

  async viewDetails(id) {
    this.route.snapshot.paramMap.getAll(id);
    this.router.navigate(['/details/' + id]);
    this.menuCtrl.close();
  }

  async logout() {
        this.menuCtrl.close();
        window.location.reload();
        this.authServices.doLogout()
        .then(res => {
        }, err => {
          // debugger;
          console.log(err);
        });
      }
}
