import { MisponentesPage } from './../misponentes/misponentes.page';
import { MicongresoPage } from './micongreso.page';
import { MisnotasPage } from './../misnotas/misnotas.page';
import { MisprogramasPage } from './../misprogramas/misprogramas.page';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';





const routes: Routes = [
  {
    path: '',
    component: MicongresoPage
  },
  {
    path: '',
    component: MisnotasPage
  },
  {
    path: '',
    component: MisprogramasPage
  },
  {
    path: '',
    component: MisponentesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MicongresoPage, MisnotasPage, MisprogramasPage, MisponentesPage]
})
export class MicongresoPageModule {}
