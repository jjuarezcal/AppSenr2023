import { Component, OnInit } from '@angular/core';

import { MicongresoService, ProgramaList  } from '../providers/micongreso.service';
import { SpeakersService } from '../providers/speakers.service';

import { Storage } from '@ionic/storage';

import { AvatarPipe } from '../pipes/avatar.pipe';

@Component({
  selector: 'app-misprogramas',
  templateUrl: './misprogramas.page.html',
  styleUrls: ['./misprogramas.page.scss'],
})
export class MisprogramasPage implements OnInit {

  programas: ProgramaList[];

  constructor(public _ms: MicongresoService,
              public _ss: SpeakersService,
              public storage: Storage) {

               }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this._ms.getAllProgramas()
      .then((result) => {
        this.programas = result;
        console.log(this.programas);
      });
  }

  avatar(val) {
    const avat = new AvatarPipe();
    return avat.transform(val);
  }

}
