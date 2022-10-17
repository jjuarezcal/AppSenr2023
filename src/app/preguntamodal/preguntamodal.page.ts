import { InformacionService } from './../providers/informacion.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../providers/preguntas.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, ModalController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-preguntamodal',
  templateUrl: './preguntamodal.page.html',
  styleUrls: ['./preguntamodal.page.scss'],
})
export class PreguntamodalPage implements OnInit {

  validations_form: FormGroup;
  validation_messages = {
    'ponente': [
      { type: 'required', message: 'Seleccione un relator.' },
      { type: 'pattern', message: 'Seleccione un relator.' }
    ],
    'titulo': [
      { type: 'required', message: 'Faga unha pregunta.' },
      { type: 'pattern', message: 'Faga unha pregunta.' }
    ]
  };

  image: any;

  items: Array<any>;
  item: any;

  nombre: string;
  apellidos: string;

  preguntas: any;

  contador: any;

  formSubmit: boolean;

  idComunicacion;

  constructor(private imagePicker: ImagePicker,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private modalCtrl: ModalController,
              private webview: WebView,
              private preguntasServices: PreguntasService,
              public afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public route: ActivatedRoute,
              public _is: InformacionService) {

             }

  ngOnInit() {
    this.resetFields();
    this.getData();
    this.getPreguntas();

    console.log(this.items);
    this.validations_form = this.formBuilder.group({
      ponente: new FormControl(''),
      titulo: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
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

  getPreguntas() {
    this.preguntasServices.getPreguntas(this.idComunicacion)
    .then(data => {
      data.subscribe(preguntas => {
        this.preguntas = preguntas;
        this.contador = preguntas.length;
       // this.PreguntaIdDb.set('contador', this.contador);
        this.route.snapshot.paramMap.getAll(this.contador);
      });
    });
  }

  resetFields() {
    this.image = './assets/imgs/default_image.jpg';
  }

  dismiss() {
   this.modalCtrl.dismiss();
  }

   onSubmit(value, contador) {
    let data = {
      id: this.contador,
      titulo: value.titulo,
      ponente: value.ponente,
      image: this.image,
      comunicacion: this.idComunicacion
    };
    this.preguntasServices.createPregunta(data, contador)
    .then(
      res => {
        this.modalCtrl.dismiss();
      }
    );
  }
/*
  openImagePicker() {
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if (result === false) {
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      } else if (result === true) {
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (let i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  async uploadImageToFirebase(image) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    // uploads img to firebase storage
    this.preguntasServices.uploadImage(image_src, randomId)
    .then(photoURL => {
      this.image = photoURL;
      loading.dismiss();
      toast.present();
    }, err => {
      console.log(err);
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }
*/
}


