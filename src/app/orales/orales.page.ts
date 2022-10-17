import { Component, OnInit } from '@angular/core';

import { OralesService, SpeakersService, CategoriesService } from '../providers/index.services';

import { ActivatedRoute, Router } from '@angular/router';

import { AvatarPipe } from '../pipes/avatar.pipe';


import { Storage } from '@ionic/storage';

import { InformacionService } from '../providers/informacion.service';

@Component({
  selector: 'app-orales',
  templateUrl: './orales.page.html',
  styleUrls: ['./orales.page.scss'],
})
export class OralesPage implements OnInit {

  pag;
  dia;
  public EventoCompletoDb: any;

  constructor(public _os: OralesService,
              public _ss: SpeakersService,
              public router: Router,
              public route: ActivatedRoute,
              public _cs: CategoriesService,
              public storage: Storage,
              public _is: InformacionService) {
      _os.cargar_rooms();

      this.EventoCompletoDb = new Storage({
        name: '__eventocompleto',
        storeName: '__eventocompleto',
        driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
      });

     }

ngOnInit() {

  this.pag = this._os.dias;

  this.dia = this.pag;

  console.log(this.pag);
}


detalles(events) {
  //  this.nav.push(CatdetallesPage, events);
  this.EventoCompletoDb.set('evento', events);
  this.router.navigateByUrl('/catdetalles/' + events.id);
}

avatar(val) {
  const avat = new AvatarPipe();
  return avat.transform(val);
}

}




