import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { OrganizadoresService } from '../providers/index.services';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-organizadoresdetail',
  templateUrl: './organizadoresdetail.page.html',
  styleUrls: ['./organizadoresdetail.page.scss'],
})
export class OrganizadoresdetailPage implements OnInit {

  public todo;

  constructor(public _os: OrganizadoresService,
              public router: Router,
              public route: ActivatedRoute,
              public socialSharing: SocialSharing,
              public file: File,
              public _is: InformacionService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const todoId = this.route.snapshot.paramMap.get('id');
    this.todo = this._os.getTodo(todoId);
  }


  share(titulo, descripcion) {

    const url = this.router.url;

    let compartirWeb: any;
    compartirWeb = window.navigator;

    if (compartirWeb && compartirWeb.share) {
      console.log('estamos dentro de la PWA');

      compartirWeb.share({
        title: titulo,
        text: descripcion,
        url: url,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
    console.log('click share');
    this.socialSharing.share(titulo, descripcion, null, url)
    .then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
    }

  }


}
