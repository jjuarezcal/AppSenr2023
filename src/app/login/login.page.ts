import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../providers/auth.service';
import { UsuariosService } from '../providers/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'El email es requerido.' },
     { type: 'pattern', message: 'Añadir un email válido.' }
   ],
   'password': [
     { type: 'required', message: 'La contraseña es requerida.' },
     { type: 'minlength', message: 'La contraseña debe tener al menos 5 caracteres.' }
   ]
 };

 // profilePicture: any = 'assets/imgs/default_image.jpg';
 // email: any;


  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public _is: InformacionService,
              public _us: UsuariosService) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }
  tryLogin(value) {
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/catpreguntas']);

    }, err => {
      this.errorMessage = err.message;
      console.log(err);
    });
  }

  goRegisterPage() {
    this.router.navigate(['/register']);
  }

  loginWithGoogle() {
    this._us.signInWithGoogle();
  }
  loginWithFacebook() {
    this._us.signInWithFacebook();
  }

}

