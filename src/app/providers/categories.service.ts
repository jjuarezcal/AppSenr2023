import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Router, ActivatedRoute } from '@angular/router';

import { URL_CATEGORIAS,
         ITEMS_CATEGORIAS,
         ITEMS_DIAS,
         ITEMS_CAT_SPEAKERS,
         URL_ROOMS,
         ITEMS_ROOMS,
         ITEM_SESSIONS
         } from '../config/url.servicios';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  programas: any[] = [];
  categorias:  any[] = [];
  dias: any[] = [];
  eventos: any[] = [];
  id = 1;
  events: any[] = [];
  rooms: any[] = [];
  idTipoPrograma;


  constructor(public http: Http,
              public router: Router,
              public route: ActivatedRoute,
              public storage: Storage) {
     // this.cargar_categorias(this.id);

   }


   cargar_categorias(id) {
    const url = URL_CATEGORIAS + id + ITEMS_CATEGORIAS + ITEMS_DIAS + ITEM_SESSIONS + ITEMS_CAT_SPEAKERS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {

                this.programas = data.data.programs;

                this.categorias = this.programas[0].categories;

                this.dias = this.categorias[0].days[0].name;

                this.idTipoPrograma = id;

                this.eventos = this.categorias[0].days[0].events;


                console.log(this.programas);

                console.log(this.categorias);

               // console.log('Muesta el id recibido: ' + id);

              //  console.log(this.dias);

                console.log(this.eventos);


                this.router.navigateByUrl('/categorias');
              }

            });
  }
  cargar_rooms() {

    const url = URL_ROOMS + ITEMS_ROOMS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.rooms = data.data.rooms;
                console.log(this.rooms);
              }

            });

  }

  selectCategory(id) {
   // this.id = id;
    // console.log('Selected Item', this.id);
  }

  changeCategory(ev: any) {
    this.id = ev.target.value;
    console.log('change cat: ' + this.id);
    // this.virtualScroll();
  }

  getTodo(id) {
    return this.eventos.find(todo => todo.id === id);

  }



}
