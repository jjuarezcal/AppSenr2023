import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_UBICACION, ITEMS_UBICACION } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  maps: any[] = [];
  url = 'https://maps.google.com/maps?q=43.3614182,-8.408080700000028&hl=es;z=10&amp;output=embed';

  constructor(public http: Http) {
    this.cargar_maps();
   }

   cargar_maps() {

    const url = URL_UBICACION + ITEMS_UBICACION;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.maps = data.data.maps;
                console.log(this.maps);
              }

            });

  }
}
