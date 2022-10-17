import { Component, OnInit } from '@angular/core';

import { ProgramaService } from '../providers/programa.service';
import { CategoriesService } from '../providers/categories.service';
import { InformacionService } from '../providers/informacion.service';


@Component({
  selector: 'app-programa',
  templateUrl: './programa.page.html',
  styleUrls: ['./programa.page.scss'],
})
export class ProgramaPage implements OnInit {



  constructor(public _ps: ProgramaService,
              public _is: InformacionService,
              public _cs: CategoriesService) {

  }
  ngOnInit() {
  }

}
