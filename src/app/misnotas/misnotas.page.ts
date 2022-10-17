import { Component, OnInit } from '@angular/core';

import { MicongresoService, NotaList } from '../providers/micongreso.service';

import { Storage } from '@ionic/storage';

import { AlertController } from '@ionic/angular';

import { AvatarPipe } from '../pipes/avatar.pipe';


@Component({
  selector: 'app-misnotas',
  templateUrl: './misnotas.page.html',
  styleUrls: ['./misnotas.page.scss'],
})
export class MisnotasPage implements OnInit {

  public NotasDb: any;
  public GuardaNotaDb: any;

  notas: NotaList[];
  letra: string;

  constructor(public _ms: MicongresoService,
              public storage: Storage,
              public alertController: AlertController) {

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

  ionViewDidEnter() {
      this._ms.getAllNotas()
      .then((result) => {
        this.notas = result;
        console.log(this.notas);
      });
  }
/*
  async editarNota(contenido, key) {
    const alert = await this.alertController.create({
      header: key,
      message: contenido,
      buttons: ['OK']
    });

    await alert.present();
  }
*/

  async editarNota (contenido, key) {

    const alert = await this.alertController.create({
      header: 'Editar nota',
      message: key,
      inputs: [
        {
          name: 'nota',
          type: 'text',
          id: 'nota',
          placeholder: contenido,
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

            this.NotasDb.set(key, data.nota)
            .then(response => {
              this.GuardaNotaDb.set(key, true);
              console.log(data);
              location.reload();
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

  avatar(val) {
    const avat = new AvatarPipe();
    return avat.transform(val);
  }

}
