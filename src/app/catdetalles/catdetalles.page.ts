import { InformacionService } from './../providers/informacion.service';
import { GuardadasList, GuardaNotasList, EventoList } from './../providers/micongreso.service';
import { PonenteList } from '../providers/speakers.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { TasksServiceService, MicongresoService, CategoriesService, SpeakersService } from '../providers/index.services';
import { AlertController, NavController, LoadingController} from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-catdetalles',
  templateUrl: './catdetalles.page.html',
  styleUrls: ['./catdetalles.page.scss'],
})
export class CatdetallesPage implements OnInit {

  // events;
  todoId;

  tituloPrograma;
  tituloNota;

  contenido: string;
  notaPrograma;
  estado;
  nota;

  badge: true;

  public ProgramasDb: any;
  public NotasDb: any;
  public GuardadasDb: any;
  public GuardaNotaDb: any;
  public EventoCompletoDb: any;
  public PonenteCompletoDb: any;
  public PonentesDb: any;

  guardadas: GuardadasList[];
  guardadanotas: GuardaNotasList[];
  events: EventoList[];
  ponente: PonenteList[];

  tit = 'titulo';
  des = 'descripcion';
  archivo: string = null;
  url: string = null;

  urlActual: string;

  constructor(public route: ActivatedRoute,
              public _cs: CategoriesService,
              public _ms: MicongresoService,
              public _ss: SpeakersService,
              public tasksService: TasksServiceService,
              public alertController: AlertController,
              public storage: Storage,
              public router: Router,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public socialSharing: SocialSharing,
              public file: File,
              public fileOpener: FileOpener,
              public _is: InformacionService,
              public document: DocumentViewer,
              public transfer: FileTransfer,
              public iab: InAppBrowser) {

           this.ProgramasDb = new Storage({
                  name: '__programas',
                  storeName: '_programas',
                  driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
            });

            this.NotasDb = new Storage({
              name: '__notas',
              storeName: '_notas',
              driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.GuardadasDb = new Storage({
          name: '__guardadas',
          storeName: '_guardadas',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.GuardaNotaDb = new Storage({
          name: '__guardanota',
          storeName: '_guardanota',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.EventoCompletoDb = new Storage({
          name: '__eventocompleto',
          storeName: '__eventocompleto',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.PonenteCompletoDb = new Storage({
          name: '__ponentecompleto',
          storeName: '____ponentecompleto',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

        this.PonentesDb = new Storage({
          name: '__ponentes',
          storeName: '__ponentes',
          driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        });

  }

  ngOnInit() {
  }


  async guardarPrograma(id) {
    this.tituloPrograma = 'programa-' + id.id;
    await this.ProgramasDb.set(this.tituloPrograma, id);
    await this.GuardadasDb.set(this.tituloPrograma, true);
   // this.router.navigateByUrl('/catdetalles/' + id);
   // location.reload();
   this.programaGuardado(id.title);
  }


  async programaGuardado(id) {
    const alert = await this.alertController.create({
      header: 'Guardar',
      message: id,
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


  async openAlertNewTask (id) {

    this.tituloNota = id.title;

    const alert = await this.alertController.create({
      header: 'Tus Notas',
      message: id.title,
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

 async ionViewDidEnter() {
  let loading = await this.loadingCtrl.create();
  loading.present();

   this._ms.getAllGuardadas()
    .then((result) => {
      this.guardadas = result;
    });

  this._ms.getAllGuardaNotas()
    .then((result) => {
      this.guardadanotas = result;
    });

 this._ms.getEvento()
    .then((result) => {
     this.events = result;
     console.log(result);
    });

 this._ss.getPonente()
    .then((result) => {
     this.ponente = result;
    });

    loading.dismiss();

}


share(titulo, descripcion) {

  const url = this.router.url;

  let compartirWeb: any;
  compartirWeb = window.navigator;

  if (compartirWeb && compartirWeb.share) {
    console.log('estamos dentro de la PWA');

    compartirWeb.share({
      title: titulo,
      text: descripcion,
      url: url,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  } else {
  console.log('click share');
  this.socialSharing.share(titulo, descripcion, null, url)
  .then(() => {
    // Success
  }).catch((e) => {
    // Error!
  });
  }


}


/*
detalles(events) {
  //  this.nav.push(CatdetallesPage, events);
  this.PonentesDb.set('ponente', events);
  this.router.navigateByUrl('/ponentesdetalles/' + events.id);
}
*/
getActivePage(): string {
  this.urlActual = this.router.url;
  console.log(this.urlActual);
  return this.router.url;
}

async detalles(events) {
  console.log(events);

  this.getActivePage();

  this.PonentesDb.set('ponente', events);

  this.router.navigateByUrl('/ponentesdetalles/' + events.id);

}


  async detallesPonencia(events) {

    console.log(events);

    this.getActivePage();

    this.EventoCompletoDb.set('evento', events);

    this.router.navigateByUrl('/catdetalles/' + events.id);

  }
  abrirPdf(url: string) {
    let path = null;
    path = this.file.dataDirectory;

    const transfer = this.transfer.create();
    transfer.download(url, path + 'myfile.pdf').then(entry => {
      const urlPdf = entry.toURL();
      this.document.viewDocument(urlPdf, 'application/pdf', {});
    });

    }

    irUrl(url: string) {
      const options: InAppBrowserOptions = {
        zoom: 'no'
      };

      // Opening a URL and returning an InAppBrowserObject
      const browser = this.iab.create(url, '_self', options);

    }

}
