import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';

import { UbicacionService } from '../providers/index.services';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.page.html',
  styleUrls: ['./ubicacion.page.scss'],
})
export class UbicacionPage implements OnInit {

  url = 'https://maps.google.com/maps?q=43.3614182,-8.408080700000028&hl=es;z=10&output=embed';


  constructor(public _us: UbicacionService,
              public _is: InformacionService,
              public sanitizer: DomSanitizer) {

   }

  ngOnInit() {
  }

}
