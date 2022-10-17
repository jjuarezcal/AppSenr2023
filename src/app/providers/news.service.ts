import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_BREAKINGNEWS, ITEMS_BREAKINGNEWS} from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  informacion: any[] = [];

  constructor(public http: Http) {
    this.cargar_breakingnews();
   }

   cargar_breakingnews() {

    const url = URL_BREAKINGNEWS + ITEMS_BREAKINGNEWS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.informacion = data.data.breakingnews;
                console.log(this.informacion);
              }

            });

  }

  getTodo(id) {
    return this.informacion.find(todo => todo.id === id);
  }
}
