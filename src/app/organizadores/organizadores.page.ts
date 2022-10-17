import { InformacionService } from './../providers/informacion.service';
import { Component, OnInit } from '@angular/core';

import { OrganizadoresService } from '../providers/index.services';
import { ActivatedRoute, Router } from '@angular/router';


import { AvatarPipe } from '../pipes/avatar.pipe';

@Component({
  selector: 'app-organizadores',
  templateUrl: './organizadores.page.html',
  styleUrls: ['./organizadores.page.scss'],
})
export class OrganizadoresPage implements OnInit {

  constructor(public _os: OrganizadoresService,
              public router: Router,
              public route: ActivatedRoute,
              public _is: InformacionService) { }

  ngOnInit() {
  }
  enviarDetalles(organizadores) {
    this.route.snapshot.paramMap.getAll(organizadores);
    this.router.navigateByUrl('/organizadoresdetail/' + organizadores.id);
  }

  avatar(val) {
    const avat = new AvatarPipe();
    return avat.transform(val);
  }

}
