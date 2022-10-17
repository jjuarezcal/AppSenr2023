import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../providers/preguntas.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, ModalController, NavParams } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-respondermodal',
  templateUrl: './respondermodal.page.html',
  styleUrls: ['./respondermodal.page.scss'],
})
export class RespondermodalPage implements OnInit {

  validations_form: FormGroup;
  validation_messages = {
    'titulo': [
      { type: 'required', message: 'Complete su respuesta.' },
      { type: 'pattern', message: 'Complete su respuesta.' }
    ],
    'respuesta': [
      { type: 'required', message: 'Complete su respuesta.' },
      { type: 'pattern', message: 'Complete su respuesta.' }
    ]
  };

  items: Array<any>;
  item: any;

  usuario: any;

  dataRecibida;
  id: string;

  constructor(public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private preguntasServices: PreguntasService,
              public afAuth: AngularFireAuth,
              public nav: NavParams,
              public _is: InformacionService) {

              this.dataRecibida = this.nav.data;
              this.id = this.dataRecibida.modal.id;

             }

  ngOnInit() {

    this.getData();
    this.recuperarUsuario();

    this.validations_form = this.formBuilder.group({
      respuesta: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    });

  }

  recuperarUsuario() {
    this.afAuth.user.subscribe(currentUser => {
      this.usuario = currentUser.email;
      console.log(this.usuario);
    });

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

  dismiss() {
   this.modalCtrl.dismiss();
  }


  onSubmit(id, value) {
    console.log(value.respuesta);
    console.log(id);
    let data = {
      respuesta: value.respuesta,
    };
    this.preguntasServices.responderPregunta(id, data)
    .then(
      res => {
        this.modalCtrl.dismiss();
      }
    );
  }


}

