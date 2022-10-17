import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recordar',
  templateUrl: './recordar.page.html',
  styleUrls: ['./recordar.page.scss'],
})
export class RecordarPage implements OnInit {

  validations_form: FormGroup;
  errorMessage = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'El email es requerido.' },
     { type: 'pattern', message: 'Añadir un email válido.' }
   ]
 };

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder,
              public toastCtrl: ToastController,
              private router: Router,
              public route: ActivatedRoute,
              public _is: InformacionService) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

 async cambiarPassword(value) {
    console.log(value.email);
    this.authService.resetPassword(value.email);

    const toast = await this.toastCtrl.create({
      message: 'Se ha enviado un email con intrucciones para restablecer la contraseña',
      duration: 5000
    });

    toast.present();

    this.router.navigate(['/login']);

   }

}
