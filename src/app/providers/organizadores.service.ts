import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_ORGANIZATIONS, ITEMS_ORGANIZATIONS} from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class OrganizadoresService {

  organizadores: any[] = [];

  constructor(public http: Http) {
    this.cargar_organizadores();
   }

   cargar_organizadores() {

    const url = URL_ORGANIZATIONS + ITEMS_ORGANIZATIONS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.organizadores = data.data.organizations;
                console.log(this.organizadores);
              }

            });

  }

  getTodo(id) {
    return this.organizadores.find(todo => todo.id === id);
  }
}
