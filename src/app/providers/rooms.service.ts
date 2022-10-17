import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


import { Router, ActivatedRoute } from '@angular/router';

import { URL_ROOMS,
         ITEMS_ROOMS,
         URL_CAT_SALAS,
         ITEMS_CATEGORIAS,
         ITEMS_DIAS,
         ITEMS_CAT_SPEAKERS} from '../config/url.servicios';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  rooms: any[] = [];

  programas: any[] = [];
  categorias:  any[] = [];
  dias: any[] = [];
  eventos: any[] = [];
  id = 1;
  events: any[] = [];
  roomName;

  constructor(public http: Http,
              public route: ActivatedRoute,
              public router: Router,
              public storage: Storage) {

                this.cargar_rooms();

   }


  cargar_categorias(room) {

    this.roomName = room;
    console.log(this.roomName);

    const url = URL_CAT_SALAS + ITEMS_CATEGORIAS + ITEMS_DIAS + ITEMS_CAT_SPEAKERS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {

                this.programas = data.data.programs;

                this.categorias = this.programas[0].categories;

                this.dias = this.categorias[0].days[0].name;

                this.eventos = this.categorias[0].days[0].events;


                console.log(this.programas);

                console.log(this.categorias);

                console.log(this.eventos);

                console.log(this.dias);


                this.router.navigateByUrl('/roomslist');
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
    return this.rooms.find(todo => todo.id === id);
  }
}
