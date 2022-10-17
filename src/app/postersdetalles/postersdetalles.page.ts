import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { PostersService } from '../providers/index.services';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-postersdetalles',
  templateUrl: './postersdetalles.page.html',
  styleUrls: ['./postersdetalles.page.scss'],
})
export class PostersdetallesPage implements OnInit {

  public todo;

  url: string;

  constructor(public _ps: PostersService,
              public _is: InformacionService,
              public router: Router,
              public route: ActivatedRoute,
              public socialSharing: SocialSharing,
              public fileOpener: FileOpener,
              public file: File,
              public iab: InAppBrowser,
              public document: DocumentViewer,
              public transfer: FileTransfer) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const todoId = this.route.snapshot.paramMap.get('id');
    this.todo = this._ps.getTodo(todoId);
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

  abrirPdf(url: string) {
    let path = null;
    path = this.file.dataDirectory;

    const transfer = this.transfer.create();
    transfer.download(url, path + 'myfile.pdf').then(entry => {
      const urlPdf = entry.toURL();
      this.document.viewDocument(urlPdf, 'application/pdf', {});
    });

    }

    irUrl(url: string) {
      const options: InAppBrowserOptions = {
        zoom: 'no'
      };

      // Opening a URL and returning an InAppBrowserObject
      const browser = this.iab.create(url, '_self', options);

    }

}