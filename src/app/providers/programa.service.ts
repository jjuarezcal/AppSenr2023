import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_PROGRAMAS, ITEMS_CATPROGRAMAS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  categorias: any[] = [];

  constructor(public http: Http) {
    this.cargar_categorias();
   }

   cargar_categorias() {

    const url = URL_PROGRAMAS + ITEMS_CATPROGRAMAS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.categorias = data.data.programs;
                console.log(this.categorias);
              }

            });

  }
}
