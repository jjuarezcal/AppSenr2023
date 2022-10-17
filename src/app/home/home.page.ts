import { Component } from '@angular/core';

import { NewsService } from '../providers/index.services';
import { InformacionService } from '../providers/informacion.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  subject = 'Mensaje enviado desde la APP de Congresos';
  cc = 'info@tramasolutions.com';

  constructor(public _ns: NewsService,
              public _is: InformacionService,
              public router: Router,
              public route: ActivatedRoute ) {}

  envio(email) {
       window.open(`mailto:${email}?cc=${this.cc}&subject=${this.subject}`, '_system');
    }
  abrir(url) {
      window.open(url, '_system');
   }

    enviarDetalles(news) {
      this.route.snapshot.paramMap.getAll(news);
      this.router.navigateByUrl('/newsdetail/' + news.id);
    }
}
