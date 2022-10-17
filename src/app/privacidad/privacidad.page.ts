import { Component, OnInit } from '@angular/core';

import { InformacionService } from '../providers/index.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.page.html',
  styleUrls: ['./privacidad.page.scss'],
})
export class PrivacidadPage implements OnInit {

  constructor(public _is: InformacionService,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {
  }

}
