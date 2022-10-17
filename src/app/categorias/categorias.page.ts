import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';

import { CategoriesService, SpeakersService } from '../providers/index.services';

import { ActivatedRoute, Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

dia;
dias: string;

public EventoCompletoDb: any;

onSuccess;
onError;
  customActionSheetOptions: any = {
    header: 'Seleccionar categoría',
    // subHeader: 'Seleccionar categoría'
  };


  constructor(public router: Router,
              public route: ActivatedRoute,
              public _cs: CategoriesService,
              public storage: Storage,
              public _ss: SpeakersService,
              public _is: InformacionService,
              private nativePageTransitions: NativePageTransitions ) {

               this.dia = _cs.dias;
               console.log(this.dia);

               this.EventoCompletoDb = new Storage({
                name: '__eventocompleto',
                storeName: '__eventocompleto',
                driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
              });


  }

  ngOnInit() {
    this.dias = this.dia;

  }


  async detalles(events) {
    console.log(events);
   // this.nativePageTransitions.slide(options);
    //  this.nav.push(CatdetallesPage, events);
    this.EventoCompletoDb.set('evento', events);
    this.router.navigateByUrl('/catdetalles/' + events.id);
  }
}