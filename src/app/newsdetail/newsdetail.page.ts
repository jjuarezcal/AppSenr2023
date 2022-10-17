import { InformacionService } from './../providers/informacion.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../providers/index.services';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.page.html',
  styleUrls: ['./newsdetail.page.scss'],
})
export class NewsdetailPage implements OnInit {

  public todo;


  constructor(public _ns: NewsService,
              public router: Router,
              public route: ActivatedRoute,
              public socialSharing: SocialSharing,
              public file: File,
              public navCtrl: NavController,
              public _is: InformacionService) {

              }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const todoId = this.route.snapshot.paramMap.get('id');
    this.todo = this._ns.getTodo(todoId);
  }

  share(titulo, subtitulo, archivo, url) {

    let compartirWeb: any;

    compartirWeb = window.navigator;

    if (compartirWeb && compartirWeb.share) {
      console.log('estamos dentro de la PWA');

      compartirWeb.share({
        title: titulo,
        text: subtitulo,
        url: url,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('estamos en la app');
      this.socialSharing.share(titulo, subtitulo, archivo, url)
      .then(() => {
        // Success
      }).catch((e) => {
        // Error!
      });

      alert('share not supported');
    }

  }

volver() {
  this.navCtrl.back();
}

}
