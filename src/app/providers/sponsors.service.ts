import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_SPONSORS_CATEGORIAS, ITEMS_SPONSORS_CATEGORIAS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  sponsor: any[] = [];

  constructor(public http: Http) {
    this.cargar_sponsors();
   }

   cargar_sponsors() {

    const url = URL_SPONSORS_CATEGORIAS + ITEMS_SPONSORS_CATEGORIAS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.sponsor = data.data.sponsorcategories;
                console.log(this.sponsor);
              }

            });

  }

  getTodo(id) {
    return this.sponsor.find(todo => todo.id === id);
  }
}
