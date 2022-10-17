import { Component, OnInit } from '@angular/core';

import { RoomsService, InformacionService } from '../providers/index.services';

import { ActivatedRoute, Router } from '@angular/router';

import { AvatarPipe } from '../pipes/avatar.pipe';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  constructor(public _rs: RoomsService,
              public _is: InformacionService,
              public router: Router,
              public route: ActivatedRoute) { }

  ngOnInit() {
  }

  enviarDetalles(room) {
    this.route.snapshot.paramMap.getAll(room);
    this.router.navigateByUrl('/roomdetail/' + room.id);
  }

  avatar(val) {
    const avat = new AvatarPipe();
    return avat.transform(val);
  }

}
