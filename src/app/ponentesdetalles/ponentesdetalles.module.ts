import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PonentesdetallesPage } from './ponentesdetalles.page';

const routes: Routes = [
  {
    path: '',
    component: PonentesdetallesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PonentesdetallesPage]
})
export class PonentesdetallesPageModule {}
