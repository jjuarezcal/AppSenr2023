import { InformacionService } from './../providers/informacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../providers/preguntas.service';
import { LoadingController, ToastController, ModalController, AlertController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';

import { AvatarPipe } from '../pipes/avatar.pipe';


@Component({
  selector: 'app-catpreguntas',
  templateUrl: './catpreguntas.page.html',
  styleUrls: ['./catpreguntas.page.scss'],
})
export class CatpreguntasPage implements OnInit {

  items: Array<any>;
  item: any;
  categorias: any;

  constructor(public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private preguntasServices: PreguntasService,
              public afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public route: ActivatedRoute,
              public _is: InformacionService,
              public router: Router) {

             }

  ngOnInit() {
    this.getData();
    this.getCategoriasPreguntas();
    console.log(this.items);
    console.log(this.categorias);

  }

  getData() {
    this.preguntasServices.getTasks()
    .then(data => {
      data.subscribe(publicaciones => {
        this.items = publicaciones;
        console.log(this.items);
      });
    });
  }

  getCategoriasPreguntas() {
    this.preguntasServices.getCategorias()
    .then(data => {
      data.subscribe(categorias => {
        this.categorias = categorias;
      });
    });
  }

  getTodo(id) {
    return this.categorias.find(todo => todo.id === id);
  }

  dismiss() {
   this.modalCtrl.dismiss();
  }

  goToPreguntas(id) {
    console.log(id);
    this.route.snapshot.paramMap.getAll(id);
    this.router.navigateByUrl('/preguntas/' + id.idPonencias);
  }

  avatar(val) {
    const avat = new AvatarPipe();
    return avat.transform(val);
  }

}



