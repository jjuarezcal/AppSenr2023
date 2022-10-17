import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_EVENTS, ITEMS_EVENTS } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: any[] = [];

  constructor(public http: Http) {
    this.cargar_events();
   }

   cargar_events() {
    const url = URL_EVENTS + ITEMS_EVENTS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.events = data.data.events;
                console.log(this.events);
              }

            });

  }
}
