import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_SPEAKERS,
         ITEMS_SPEAKERS,
         ITEMS_SPEAKERS_EVENTS,
         URL_ROOMS, ITEMS_ROOMS,
         ITEMS_SPEAKERS_SPEAKERS } from '../config/url.servicios';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {

  speakers: any[] = [];
  rooms: any[] = [];

  public PonentesDb: any;
  public PonenteCompletoDb: any;
  public GuardaPonenteDb: any;

  constructor(public http: Http,
              public storage: Storage) {
    this.cargar_speakers();
    this.cargar_rooms();

    this.PonentesDb = new Storage({
      name: '__ponentes',
      storeName: '__ponentes',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });

    this.GuardaPonenteDb = new Storage({
      name: '__guardaponente',
      storeName: '____guardaponente',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });
    this.PonenteCompletoDb = new Storage({
      name: '__ponentecompleto',
      storeName: '____ponentecompleto',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    });

   }

   cargar_speakers() {

    const url = URL_SPEAKERS + ITEMS_SPEAKERS + ITEMS_SPEAKERS_EVENTS + ITEMS_SPEAKERS_SPEAKERS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.speakers = data.data.speakers;
                console.log(this.speakers);
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


  public async getPonente() {

    const ponentes: PonenteList[] = [];

    return await this.PonentesDb.forEach((value: Ponente, key: string, iterationNumber: Number) => {
      const ponente = new PonenteList();
      ponente.key = key;
      ponente.contenido = value;
      ponentes.push(ponente);
      console.log(ponente);
    })
      .then(() => {
        return  Promise.resolve(ponentes);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAllGuardaPonentes() {

    const guardadaponentes: GuardaPonentesList[] = [];

    return this.PonenteCompletoDb.forEach((value: Ponente, key: string, iterationNumber: Number) => {
      const guardadaponente = new GuardaPonentesList();
      guardadaponente.key = key;
      guardadaponente.contenido = value;
      guardadaponentes.push(guardadaponente);
     // console.log(guardanota);
    })
      .then(() => {
        return Promise.resolve(guardadaponentes);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }


}
export class Ponente {
  id: string;
  activo: boolean;
}
export class PonenteList {
  key: string;
  contenido: Ponente;
}

export class GuardaPonentes {
  id: string;
  activo: boolean;
}
export class GuardaPonentesList {
  key: string;
  contenido: GuardaPonentes;
}