import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_INFOGENERAL,
         ITEMS_INFOGENERAL,
         ITEMS_INFOGENERAL_FOTOS,
         ITEMS_INFOGENERAL_COLORES,
         URL_INFO_ITEMS,
         ITEMS_INFO_ITEMS,
         ITEMS_PRIVACIDAD,
         URL_PRIVACIDAD } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  informacion: any[] = [];
  items: any[] = [];
  privacidad: any[] = [];
  imagenHome: string;
  primary: string;
  secondary: string;
  sponsor: string;
  estilo;
  estiloSecundario;
  textos;


  constructor(public http: Http) {
    this.cargar_categorias();
    this.cargar_items();
    this.cargar_privacidad();
   }


   cargar_categorias() {
    const url = URL_INFOGENERAL + ITEMS_INFOGENERAL + ITEMS_INFOGENERAL_FOTOS + ITEMS_INFOGENERAL_COLORES;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.informacion = data.data.infogenerals;
                this.imagenHome = data.data.infogenerals[0].url_photo_home;
                this.primary = data.data.infogenerals[0].main_color;
                this.secondary = data.data.infogenerals[0].secondary_color;
                this.sponsor = data.data.infogenerals[0].url_photo_sponsors;
                console.log(this.informacion);
                console.log(this.imagenHome);

                const stylePrimary = {
                  'background': this.primary,
                  'color': this.secondary,
                };

                const styleSecondary = {
                  'background': this.primary, // cambiar por el color secundario
                  'color': this.secondary, // cambiar por el color de los textos
                };

                const styleTextIcons = {
                  'color': this.primary,
                };


                this.estilo = stylePrimary;
                this.estiloSecundario = styleSecondary;
                this.textos = styleTextIcons;
                console.log(this.estilo);
              }

            });

  }

  cargar_items() {
    const url = URL_INFO_ITEMS + ITEMS_INFO_ITEMS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.items = data.data.infoitems;
                console.log(this.items);
              }

            });

  }
  getTodo(id) {
    return this.items.find(todo => todo.id === id);
  }

  cargar_privacidad() {
    const url = URL_PRIVACIDAD + ITEMS_PRIVACIDAD;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.privacidad = data.data.infoitems;
                console.log(this.privacidad);
              }

            });

  }
}
