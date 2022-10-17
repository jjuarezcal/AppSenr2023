import { InformacionService } from './../providers/informacion.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuariosService } from './../providers/usuarios.service';
import { PreguntasService } from './../providers/preguntas.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  validations_form: FormGroup;
  image: any;
  item: any;
  load = false;
  color: string;
  email: string;

  items;
  id;

  private routeData;

  selectedCheckbox: any;
  esponente: boolean;

  public todo;
  usuario;
  usuarioLog;
  nombre: string;
  apellidos: string;

  private snapshotChangesSubscription: any;

  constructor(private imagePicker: ImagePicker,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private preguntasService: PreguntasService,
              public _is: InformacionService,
              private webview: WebView,
              private alertCtrl: AlertController,
              private router: Router,
              public route: ActivatedRoute,
              public usuarioService: UsuariosService,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore) {

              this.selectedCheckbox = {};

             }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      imagen: new FormControl('', null),
      nombre: new FormControl('', Validators.compose([
        Validators.required
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
         this.recuperarUsuario();

  }

   recuperarUsuario() {
        this.afAuth.user.subscribe(currentUser => {
          this.usuario = currentUser;
          console.log(this.usuario);
          return new Promise<any>((resolve, reject) => {
            this.snapshotChangesSubscription = this.afs.doc<any>('usuarios/' + currentUser.uid).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
              this.usuarioLog = snapshots;
              console.log(this.usuarioLog);
              console.log(this.usuarioLog.nombre);
              this.nombre = this.usuarioLog.nombre;
              this.apellidos = this.usuarioLog.apellidos;
            }, err => {
              reject(err);
            });
          });

        });
      }

  getChanged(e) {
    if (!this.selectedCheckbox[e]) {

      this.selectedCheckbox[e] = true;
    } else {
      this.selectedCheckbox[e] = false;
    }
    console.log(this.selectedCheckbox);
    this.esponente = e.detail.checked;

    console.log(this.esponente);
  }

  onSubmit(value) {

    const todoId = this.route.snapshot.paramMap.get('id');

    if ( !this.image ) {
      let data = {
        nombre: value.nombre,
        apellidos: value.apellidos,
        email: this.usuarioLog.email,
        moderador: this.usuarioLog.moderador,
        ponente: this.usuarioLog.ponente,
        permisos: this.usuarioLog.permisos,
        color: this.usuarioLog.color,
        cargo: this.usuarioLog.cargo,
        orden: this.usuarioLog.orden,
        image: this.usuarioLog.image
      };

      this.preguntasService.updateTask(todoId, data)
      .then(
        res => {
          this.dismiss();
        });
      } else {
        let data = {
          nombre: value.nombre,
          apellidos: value.apellidos,
          email: this.usuarioLog.email,
          moderador: this.usuarioLog.moderador,
          ponente: this.usuarioLog.ponente,
          permisos: this.usuarioLog.permisos,
          color: this.usuarioLog.color,
          cargo: this.usuarioLog.cargo,
          orden: this.usuarioLog.orden,
          image: this.preguntasService.image
        };
        this.preguntasService.updateTask(todoId, data)
        .then(
          res => {
            this.dismiss();
          });
      }
  }

  dismiss() {
    this.router.navigate(['/home']);
  }

  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: 'Seguro que quiere eliminar ' + this.item.title + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: 'Si',
          handler: () => {
            this.preguntasService.deleteTask(this.item.id)
            .then(
              res => {
               // debugger
                this.dismiss();
              },
              err => console.log(err)
            );
          }
        }
      ]
    });
    await alert.present();
  }

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
    console.log(image.target.files[0]);
      const loading = await this.loadingCtrl.create({
        message: 'Por favor espere, subiendo imagen...'
      });
      const toast = await this.toastCtrl.create({
        message: 'La imagen fue subida correctamente, se actualizará al guardar los datos',
        duration: 3000
      });
      this.presentLoading(loading);
     // let image_src = this.webview.convertFileSrc(image);
      let randomId = Math.random().toString(36).substr(2, 5);
      // uploads img to firebase storage
      this.preguntasService.uploadImage(image, randomId);
        loading.dismiss();
        toast.present();
        this.image = image;

        console.log(this.image);

    }

  async presentLoading(loading) {
    return await loading.present();
  }


}
