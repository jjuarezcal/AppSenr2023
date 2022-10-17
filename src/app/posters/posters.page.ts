import { InformacionService } from './../providers/informacion.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PostersService } from '../providers/index.services';

import { AvatarPipe } from '../pipes/avatar.pipe';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { URL_POSTER, ITEMS_POSTERS} from '../config/url.servicios';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.page.html',
  styleUrls: ['./posters.page.scss'],
})
export class PostersPage implements OnInit {

dias;
postername: any[] = [];
pag;

  constructor(public _ps: PostersService,
              public http: Http,
              public router: Router,
              public _is: InformacionService) {

    this.cargar_name();

   }

  ngOnInit() {
  }

  cargar_name() {

    const url = URL_POSTER + ITEMS_POSTERS;
    this.http.get( url )
            .map( resp => resp.json() )
            .subscribe( data => {

              if ( data.error ) {
                // problemas!
              } else {
                this.postername = data.data.postercategories;
                this.pag = this.postername[0].name;
                this.dias = this.pag;

                console.log(this.pag);
              }

            });

  }
  avatar(val) {
    const avat = new AvatarPipe();
    return avat.transform(val);
  }

  async detalles(posters) {
     this.router.navigateByUrl('/postersdetalles/' + posters);
   }

}
