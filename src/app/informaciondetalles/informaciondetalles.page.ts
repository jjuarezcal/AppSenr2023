import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformacionService } from '../providers/index.services';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-informaciondetalles',
  templateUrl: './informaciondetalles.page.html',
  styleUrls: ['./informaciondetalles.page.scss'],
})
export class InformaciondetallesPage implements OnInit {

  public todo;

  constructor(public _is: InformacionService,
    public router: Router,
    public route: ActivatedRoute,
    public socialSharing: SocialSharing,
    public file: File,
    public iab: InAppBrowser,
    public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const todoId = this.route.snapshot.paramMap.get('id');
    this.todo = this._is.getTodo(todoId);
  }
  share(titulo, subtitulo, url) {
    this.socialSharing.share(titulo, subtitulo, null, url)
    .then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  irUrl(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.iab.create(url, '_self', options);
  }
  volver() {
    this.navCtrl.back();
  }
}
