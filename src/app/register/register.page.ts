import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { UsuariosService } from '../providers/usuarios.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
// import { WebView } from '@ionic-native/ionic-webview/ngx';

import { PreguntasService } from '../providers/preguntas.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage = '';
  successMessage = '';

  image: any;

  validation_messages = {
    'name': [
      { type: 'required', message: 'El nombre es requerido.' },
      { type: 'pattern', message: 'Añadir un nombre válido.' }
    ],
    'apellidos': [
      { type: 'required', message: 'Los apellidos son requeridos.' },
      { type: 'pattern', message: 'Añadir unos apelidos válidos.' }
    ],
   'email': [
     { type: 'required', message: 'El email es requerido' },
     { type: 'pattern', message: 'Añadir un email válido.' }
   ],
   'password': [
     { type: 'required', message: 'El password es requerido.' },
     { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' }
   ],
   'color': [
     { type: 'required', message: 'Eliga un color para su usuario.' },
     { type: 'minlength', message: 'Seleccione un color.' }
   ]
  };

  colores =[
    { nombre: 'Verde', hex: '#0cd1e8' },
    { nombre: 'Azul',  hex: '#3880ff' },
    { nombre: 'Violeta', hex: '#7044ff' },
    { nombre: 'Amarillo', hex: '#ffce00' },
    { nombre: 'Rojo', hex: '#f04141'},
    { nombre: 'Negro', hex: '#000000'}
     ];

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private usuariosServices: UsuariosService,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private preguntasServices: PreguntasService,
              public _is: InformacionService) {

              }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      color: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.resetFields();

  }

  resetFields() {
    this.image = 'assets/imgs/default_image.jpg';
  }

  dismiss() {
   this.modalCtrl.dismiss();
  }

  tryRegister(value) {
    console.log(value.color);
    this.authService.doRegister(value)
     .then(res => {
      // console.log(res);
        const data = value;
        const credentials = {
          name: data.name,
          apellidos: data.apellidos,
          email: value.email,
          color: value.color,
          image: this.image,
          password: value.password,
        };
      this.usuariosServices.createUsuarios(credentials);
       // this.errorMessage = '';
      // this.successMessage = 'Your account has been created. Please log in.';
      this.router.navigate(['/home']);
      }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = '';
     });
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }
}

