import { Component, OnInit } from '@angular/core';

import { SpeakersService } from '../providers/speakers.service';
import { InformacionService } from '../providers/informacion.service'

import { ActivatedRoute, Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.page.html',
  styleUrls: ['./speakers.page.scss'],
})
export class SpeakersPage implements OnInit {

  public PonentesDb: any;

  constructor(public _ss: SpeakersService,
              public _is: InformacionService,
              public router: Router,
              public route: ActivatedRoute,
              public storage: Storage,
              public navCtrl: NavController) {

                this.PonentesDb = new Storage({
                  name: '__ponentes',
                  storeName: '__ponentes',
                  driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
                });

               }

  ngOnInit() {
  }

  detalles(events) {
    this.PonentesDb.set('ponente', events);
    this.router.navigateByUrl('/ponentesdetalles/' + events.id);
   // this.navCtrl.navigateRoot('/ponentesdetalles/' + events.id);
  }

}
