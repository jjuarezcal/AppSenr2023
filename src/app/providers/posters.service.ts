import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_POSTER, ITEMS_POSTERS} from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class PostersService {

  postercategories: any[] = [];
  poster: any[] = [];
  post: any = [];

  constructor(public http: Http) {
    this.cargar_posters();
   }

   cargar_posters() {

    const url = URL_POSTER + ITEMS_POSTERS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.postercategories = data.data.postercategories;
                console.log(this.postercategories);

                for ( let x = 0; x < this.postercategories.length; x++ ) {

                  this.poster = this.postercategories[x].posters;
                  console.log(this.postercategories[x].posters);

                  for ( let i = 0; i < this.poster.length; i++ ) {

                    const posterarray = {
                      id: this.poster[i].id,
                      title: this.poster[i].title,
                      authors: this.poster[i].authors,
                      description: this.poster[i].description,
                      body_html: this.poster[i].body_html,
                      url: this.poster[i].url,
                      url_pdf: this.poster[i].url_pdf,
                     };

                     this.post.push(posterarray);

                  }

                   console.log(this.post);

                }


              }

            });

  }
  getTodo(id) {
    return this.post.find(todo => todo.id === id);
  }
}
