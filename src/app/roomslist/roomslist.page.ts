import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';

import { RoomsService, SpeakersService, CategoriesService } from '../providers/index.services';

import { ActivatedRoute, Router } from '@angular/router';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-roomslist',
  templateUrl: './roomslist.page.html',
  styleUrls: ['./roomslist.page.scss'],
})
export class RoomslistPage implements OnInit {

  dia;
  dias: string;
  public EventoCompletoDb: any;

  customActionSheetOptions: any = {
    header: 'Seleccionar categoría',
    // subHeader: 'Seleccionar categoría'
  };


  constructor(public router: Router,
              public route: ActivatedRoute,
              public _rs: RoomsService,
              public _ss: SpeakersService,
              public _cs: CategoriesService,
              public _is: InformacionService,
              public storage: Storage) {

                this.dia = _rs.dias;
                console.log(this.dia);

                this.EventoCompletoDb = new Storage({
                  name: '__eventocompleto',
                  storeName: '__eventocompleto',
                  driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
                });

               }

  ngOnInit() {
    this.dias = this.dia;
    console.log(this.dias);
  }

  detalles(events) {
    //  this.nav.push(CatdetallesPage, events);
    this.EventoCompletoDb.set('evento', events);
    this.router.navigateByUrl('/catdetalles/' + events.id);
  }

}
