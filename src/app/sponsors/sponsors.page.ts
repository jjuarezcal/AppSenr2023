import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';

import { SponsorsService } from '../providers/sponsors.service';
import { ActivatedRoute, Router } from '@angular/router';

import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.page.html',
  styleUrls: ['./sponsors.page.scss'],
})
export class SponsorsPage implements OnInit {

  constructor(public _ss: SponsorsService,
              public _is: InformacionService,
              public router: Router,
              public route: ActivatedRoute,
              public iab: InAppBrowser) { }

  ngOnInit() {
  }

  enviarDetalles(sponsor) {
    this.route.snapshot.paramMap.getAll(sponsor);
    this.router.navigateByUrl('/sponsordetail/' + sponsor.id);
  }

  irUrl(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    };
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.iab.create(url, '_self', options);

  }

}
