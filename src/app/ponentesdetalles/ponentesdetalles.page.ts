import { InformacionService } from './../providers/informacion.service';

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { SpeakersService, PonenteList, GuardaPonentesList } from '../providers/speakers.service';

import { MicongresoService, GuardaNotasList } from './../providers/micongreso.service';

import { CallNumber } from '@ionic-native/call-number/ngx';

import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ponentesdetalles',
  templateUrl: './ponentesdetalles.page.html',
  styleUrls: ['./ponentesdetalles.page.scss'],
})


export class PonentesdetallesPage implements OnInit {

  public PonentesDb: any;

  ponentes: PonenteList[];
  guardadaponentes: GuardaPonentesList[];
  guardadanotas: GuardaNotasList[];

  public EventoCompletoDb: any;
  public GuardaPonenteDb: any;
  public PonenteCompletoDb: any;
  public NotasDb: any;
  public GuardaNotaDb: any;

  subject = 'Mensaje enviado desde la APP de Congresos';
  cc = '';

  tituloPonente;
  tituloNota;

  idPonente;

  urlActual: string;

  constructor(public route: ActivatedRoute,
              public navCtrl: NavController,
              public alertController: AlertController,
              public _ss: SpeakersService,
              public _ms: MicongresoService,
              public storage: Storage,
              public router: Router,
              public callNumber: CallNumber,
              public loadingCtrl: LoadingController,
              public _is: InformacionService) {

                this.PonentesDb = new Storage({
                  name: '__ponentes',
                  storeName: '__ponentes',
                  driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
                });

                this.EventoCompletoDb = new Storage({
                  name: '__eventocompleto',
                  storeName: '__eventocompleto',
                  driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
                });

                this.GuardaPonenteDb = new Storage({
                  name: '__guardaponente',
                  storeName: '____guardaponente',
                  driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
                });

                this.PonenteCompletoDb = new Storage({
                  name: '__ponentecompleto',
                  storeName: '____ponentecompleto',
                  driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
                });

                this.NotasDb = new Storage({
                  name: '__notas',
                  storeName: '_notas',
                  driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
            });

            this.GuardaNotaDb = new Storage({
              name: '__guardanota',
              storeName: '_guardanota',
              driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
            });




               }

  ngOnInit() {
  }

 async ionViewDidEnter() {
    let loading = await this.loadingCtrl.create();
    loading.present();

    this._ss.getPonente()
     .then((result) => {
       this.ponentes = result;
     });

     this._ss.getAllGuardaPonentes()
     .then((result) => {
       this.guardadaponentes = result;
     });

    this._ms.getAllGuardaNotas()
     .then((result) => {
       this.guardadanotas = result;
     });

     this.getActivePage();

     loading.dismiss();
 }

 llamarMovil(numero) {

  let compartirWeb: any;

  compartirWeb = window.open;

  if (compartirWeb && window.open) {
    setTimeout(() => {
      const tel = numero;
      window.open(`tel:${tel}`, '_system');
    }, 100);
  } else {
    this.callNumber.callNumber(numero, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

 }

 envio(email) {
  window.open(`mailto:${email}?cc=${this.cc}&subject=${this.subject}`, '_system');
}

abrirRedSocial(red) {
  window.open(red, '_system');
}

getActivePage(): string {
  this.urlActual = this.router.url;
  console.log(this.urlActual);
  return this.router.url;
}

detalles(events) {

  this.EventoCompletoDb.set('evento', events);

  this.router.navigateByUrl('/catdetalles/' + events.id);

}


async openAlertNewTask (id) {

  this.tituloNota = id.name + ' ' + id.surname;

  const alert = await this.alertController.create({
    header: 'Tus Notas sobre',
    message: id.name + ' ' + id.surname,
    inputs: [
      {
        name: 'nota',
        type: 'text',
        id: 'nota',
        placeholder: 'Escribir nota',
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: () => {
          console.log('cancelar');
        }
      },
      {
        text: 'Guardar',
        handler: (data) => {
          data.completed = false;

          this.NotasDb.set(this.tituloNota, data.nota)
          .then(response => {
            this.GuardaNotaDb.set(this.tituloNota, true);
            console.log(data);
            this.navCtrl.back();
          })
          .catch( error => {
            console.error( error );
          });
        }
      }
    ]
  });
  await alert.present();
}

async guardarPonente(id) {
  this.tituloPonente = 'ponente-' + id.id;
  await this.PonenteCompletoDb.set(this.tituloPonente, id);
  await this.GuardaPonenteDb.set(this.tituloPonente, true);
 // this.router.navigateByUrl('/catdetalles/' + id);
 // location.reload();
 this.programaGuardado(id.name, id.surname);

}

async programaGuardado(name, surname) {
  const alert = await this.alertController.create({
    header: 'Guardar ponente',
    message: name + surname,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancelar',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Guardar',
        handler: () => {
          console.log('Confirm Okay');
          this.navCtrl.back();
        }
      }
    ]
  });

  await alert.present();
}




}
