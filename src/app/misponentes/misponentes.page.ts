import { Component, OnInit } from '@angular/core';

import { AvatarPipe } from '../pipes/avatar.pipe';

import { SpeakersService, GuardaPonentesList  } from '../providers/speakers.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-misponentes',
  templateUrl: './misponentes.page.html',
  styleUrls: ['./misponentes.page.scss'],
})
export class MisponentesPage implements OnInit {

  guardarponentes: GuardaPonentesList[];

  constructor(public _ss: SpeakersService,
              public storage: Storage) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this._ss.getAllGuardaPonentes()
      .then((result) => {
        this.guardarponentes = result;
        console.log(this.guardarponentes);
      });
  }
  avatar(val) {
    const avat = new AvatarPipe();
    return avat.transform(val);
  }

}
