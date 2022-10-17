import { InformacionService } from './../providers/informacion.service';
import { MisponentesPage } from './../misponentes/misponentes.page';
import { MisprogramasPage } from './../misprogramas/misprogramas.page';
import { MisnotasPage } from './../misnotas/misnotas.page';

import { Component, OnInit } from '@angular/core';

import { MicongresoService, NotaList, ProgramaList  } from '../providers/micongreso.service';

import { SpeakersService, GuardaPonentesList } from '../providers/speakers.service';

import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-micongreso',
  templateUrl: './micongreso.page.html',
  styleUrls: ['./micongreso.page.scss'],
})
export class MicongresoPage implements OnInit {

  misnotas = MisnotasPage;
  misprogramas = MisprogramasPage;
  misponentes = MisponentesPage;
  currentPage: any = this.misnotas;

  notas: NotaList[];
  programas: ProgramaList[];
  guardarponentes: GuardaPonentesList[];

  constructor(public _ms: MicongresoService,
              public _ss: SpeakersService,
              public storage: Storage,
              public _is: InformacionService) {
               }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this._ms.getAllNotas()
    .then((result) => {
      this.notas = result;
      console.log(this.notas);
    });

    this._ms.getAllProgramas()
      .then((result) => {
        this.programas = result;
        console.log(this.programas);
      });

      this._ss.getAllGuardaPonentes()
      .then((result) => {
        this.guardarponentes = result;
        console.log(this.guardarponentes);
      });

  }
}
